-- Private account and moderation data. Public responses are explicitly projected by the bridge.
create table if not exists public.superpowers_libraries (
 email text primary key,
 collections jsonb not null default '[]'::jsonb check (jsonb_typeof(collections)='array' and jsonb_array_length(collections)<=10),
 topics jsonb not null default '[]'::jsonb check (jsonb_typeof(topics)='array' and jsonb_array_length(topics)<=8),
 version integer not null default 1 check (version>0),
 updated_at timestamptz not null default now()
);
create table if not exists public.superpowers_requests (
 id uuid primary key default gen_random_uuid(),
 email text not null,
 kind text not null check (kind in ('request','question')),
 tool_id text references public.superpowers_tools(id),
 title text not null check (length(title) between 10 and 140),
 body text not null check (length(body) between 30 and 2000),
 status text not null default 'pending' check (status in ('pending','published','declined')),
 answer text not null default '' check (length(answer)<=4000),
 answer_tools jsonb not null default '[]'::jsonb check (jsonb_typeof(answer_tools)='array' and jsonb_array_length(answer_tools)<=8),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check ((kind='request' and tool_id is null) or (kind='question' and tool_id is not null))
);
create index if not exists superpowers_requests_status_created_idx on public.superpowers_requests(status,created_at desc);
create index if not exists superpowers_requests_email_idx on public.superpowers_requests(email);
create index if not exists superpowers_requests_tool_idx on public.superpowers_requests(tool_id);
create table if not exists public.superpowers_votes (
 request_id uuid not null references public.superpowers_requests(id) on delete cascade,
 email text not null,
 created_at timestamptz not null default now(),
 primary key(request_id,email)
);
create index if not exists superpowers_votes_email_idx on public.superpowers_votes(email);
create table if not exists public.superpowers_answers (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null references public.superpowers_requests(id) on delete cascade,
 email text not null,
 body text not null check (length(body) between 30 and 4000),
 status text not null default 'pending' check(status in ('pending','published','declined')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists superpowers_answers_request_idx on public.superpowers_answers(request_id);
create index if not exists superpowers_answers_status_idx on public.superpowers_answers(status);
create table if not exists public.superpowers_deals (
 id uuid primary key default gen_random_uuid(),
 tool_id text not null references public.superpowers_tools(id),
 title text not null check(length(title) between 5 and 140),
 terms text not null check(length(terms) between 30 and 2000),
 url text not null check(url like 'https://%'),
 source_url text not null check(source_url like 'https://%'),
 code text not null default '' check(length(code)<=100),
 relationship text not null check(relationship in ('affiliate','sponsored','none')),
 approval_note text not null check(length(approval_note) between 20 and 2000),
 starts_at timestamptz not null,
 ends_at timestamptz not null,
 status text not null default 'draft' check(status in ('draft','published','archived')),
 checked_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check(ends_at>starts_at)
);
create index if not exists superpowers_deals_tool_idx on public.superpowers_deals(tool_id);
create index if not exists superpowers_deals_active_idx on public.superpowers_deals(status,ends_at);
alter table public.superpowers_libraries enable row level security;
alter table public.superpowers_requests enable row level security;
alter table public.superpowers_votes enable row level security;
alter table public.superpowers_answers enable row level security;
alter table public.superpowers_deals enable row level security;
revoke all on public.superpowers_libraries,public.superpowers_requests,public.superpowers_votes,public.superpowers_answers,public.superpowers_deals from public,anon,authenticated;
grant select,insert,update,delete on public.superpowers_libraries,public.superpowers_requests,public.superpowers_votes,public.superpowers_answers,public.superpowers_deals to service_role;

create or replace function public.superpowers_discovery_public()
returns jsonb language sql stable security invoker set search_path=public as $$
 select jsonb_build_object(
 'requests',coalesce((select jsonb_agg(x order by x.created_at desc) from (
   select r.id,r.kind,r.tool_id,r.title,r.body,r.answer,r.answer_tools,r.created_at,r.updated_at,
   (select count(*) from public.superpowers_votes v where v.request_id=r.id) as votes,
   coalesce((select jsonb_agg(jsonb_build_object('body',a.body,'created_at',a.created_at,'attribution','Verified maker at review')) from public.superpowers_answers a where a.request_id=r.id and a.status='published'),'[]'::jsonb) as maker_answers
   from public.superpowers_requests r where r.status='published' order by r.created_at desc limit 100
 ) x),'[]'::jsonb),
 'deals',coalesce((select jsonb_agg(x) from (
   select d.id,d.tool_id,d.title,d.terms,d.url,d.source_url,d.code,d.relationship,d.starts_at,d.ends_at,d.checked_at
   from public.superpowers_deals d join public.superpowers_tools t on t.id=d.tool_id and t.published
   where d.status='published' and d.starts_at<=now() and d.ends_at>now() order by d.ends_at limit 50
 ) x),'[]'::jsonb),
 'popular',coalesce((select jsonb_agg(x) from (
   select m.tool_id,sum(m.count)::integer as clicks,count(distinct m.day)::integer as active_days
   from public.superpowers_metrics m join public.superpowers_tools t on t.id=m.tool_id and t.published
   where m.kind='tool_click' and m.day>=current_date-29 and m.day<=current_date
   group by m.tool_id having sum(m.count)>=10 and count(distinct m.day)>=3
   order by sum(m.count) desc,m.tool_id limit 6
 ) x),'[]'::jsonb));
$$;
revoke all on function public.superpowers_discovery_public() from public,anon,authenticated;
grant execute on function public.superpowers_discovery_public() to service_role;

create or replace function public.superpowers_search_v2(q text default '',category_filter text default 'All',role_filter text default 'All',type_filter text default 'All',level_filter text default 'All',reviewed_only boolean default false,sort_by text default 'editorial',page_limit integer default 12,page_offset integer default 0,pricing_filter text default 'All')
returns jsonb language sql stable security invoker set search_path='' as $$
 with matched as (
 select data,editorial_order,ts_rank(search_vector,websearch_to_tsquery('english',left(q,300))) as rank
 from public.superpowers_tools
 where published and (pricing_filter='All' or coalesce(data->>'pricing_model','Unknown')=pricing_filter or (pricing_filter='Free trial' and data->>'trial_available'='true' and data->>'pricing_model'='Paid'))
 and (btrim(q)='' or search_vector @@ websearch_to_tsquery('english',left(q,300)))
 and (category_filter='All' or data->>'category'=category_filter)
 and (type_filter='All' or data->>'type'=type_filter)
 and (level_filter='All' or data->>'level'=level_filter)
 and (role_filter='All' or data->'roles' ? role_filter)
 and (not reviewed_only or data->>'status'='Documentation reviewed')
 ), paged as (
 select data from matched order by
 case when sort_by='recent' then coalesce(data->>'directory_updated_at',data->>'date','') end desc,
 case when sort_by='az' then lower(data->>'name') end,
 case when sort_by<>'az' and btrim(q)<>'' then rank end desc,
 editorial_order, data->>'id'
 limit least(greatest(page_limit,1),500) offset least(greatest(page_offset,0),100000)
 )
 select jsonb_build_object('items',coalesce((select jsonb_agg(data) from paged),'[]'::jsonb),'total',(select count(*) from matched));
$$;
revoke all on function public.superpowers_search_v2(text,text,text,text,text,boolean,text,integer,integer,text) from public;
grant execute on function public.superpowers_search_v2(text,text,text,text,text,boolean,text,integer,integer,text) to anon,authenticated;

