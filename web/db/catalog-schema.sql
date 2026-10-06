create table public.superpowers_tools (
 id text primary key check (id ~ '^[a-z0-9-]+$'),
 data jsonb not null check (data->>'id'=id),
 editorial_order integer not null default 1000,
 published boolean not null default true,
 updated_at timestamptz not null default now(),
 search_vector tsvector generated always as (
 setweight(to_tsvector('english',coalesce(data->>'name','') || ' ' || coalesce(data->>'publisher','')),'A') ||
 setweight(to_tsvector('english',coalesce(data->>'category','') || ' ' || coalesce(data->>'type','') || ' ' || coalesce(data->'roles','[]'::jsonb)::text),'B') ||
 setweight(to_tsvector('english',coalesce(data->>'description','')),'C')
 ) stored
);
create index superpowers_tools_search_idx on public.superpowers_tools using gin(search_vector);
alter table public.superpowers_tools enable row level security;
revoke all on public.superpowers_tools from anon,authenticated;
grant select on public.superpowers_tools to anon,authenticated;
create policy superpowers_public_catalog on public.superpowers_tools for select to anon,authenticated using (published);
create function public.superpowers_search(q text default '',category_filter text default 'All',role_filter text default 'All',type_filter text default 'All',level_filter text default 'All',reviewed_only boolean default false,sort_by text default 'editorial',page_limit integer default 12,page_offset integer default 0)
returns jsonb language sql stable security invoker set search_path='' as $$
 with matched as (
 select data,editorial_order,ts_rank(search_vector,websearch_to_tsquery('english',left(q,300))) as rank
 from public.superpowers_tools
 where published
 and (btrim(q)='' or search_vector @@ websearch_to_tsquery('english',left(q,300)))
 and (category_filter='All' or data->>'category'=category_filter)
 and (type_filter='All' or data->>'type'=type_filter)
 and (level_filter='All' or data->>'level'=level_filter)
 and (role_filter='All' or data->'roles' ? role_filter)
 and (not reviewed_only or data->>'status'='Documentation reviewed')
 ), paged as (
 select data from matched order by
 case when sort_by='az' then lower(data->>'name') end,
 case when sort_by<>'az' and btrim(q)<>'' then rank end desc,
 editorial_order, data->>'id'
 limit least(greatest(page_limit,1),500) offset least(greatest(page_offset,0),100000)
 )
 select jsonb_build_object('items',coalesce((select jsonb_agg(data) from paged),'[]'::jsonb),'total',(select count(*) from matched));
$$;
revoke all on function public.superpowers_search(text,text,text,text,text,boolean,text,integer,integer) from public;
grant execute on function public.superpowers_search(text,text,text,text,text,boolean,text,integer,integer) to anon,authenticated;
