-- Private operational tables. Only the authenticated server bridge may access them.
create table public.superpowers_config(key text primary key,value jsonb not null);
create table public.superpowers_admins(email text primary key);
create table public.superpowers_codes(email text primary key,code_hash text not null,expires_at timestamptz not null);
create table public.superpowers_sessions(token_hash text primary key,email text not null,expires_at timestamptz not null);
create table public.superpowers_limits(key text primary key,hits integer not null,expires_at timestamptz not null);
create table public.superpowers_owners(tool_id text primary key references public.superpowers_tools(id),email text not null,verified_by text not null,verified_at timestamptz not null default now());
create table public.superpowers_changes(id uuid primary key default gen_random_uuid(),email text not null,tool_id text not null references public.superpowers_tools(id),kind text not null check(kind in ('claim','update')),details jsonb not null,status text not null default 'pending' check(status in ('pending','accepted','declined')),note text not null default '',created_at timestamptz not null default now());
create table public.superpowers_orders(id uuid primary key,email text not null,name text not null,offer text not null check(offer in ('working-session','launch-kit','featured','workflow','training','newsletter')),details text not null,preferred_time text not null default '',tool_id text references public.superpowers_tools(id),amount integer not null check(amount>=0),status text not null default 'requested' check(status in ('requested','approved','paid','fulfilled','cancelled','refunded','disputed')),scope text not null default '',scheduled_at timestamptz,slot integer check(slot in (1,2)),payment_link text,checkout_session text unique,created_at timestamptz not null default now());
create table public.superpowers_payments(event_id text primary key,session_id text not null,payment_intent text,order_id uuid references public.superpowers_orders(id),amount integer not null,email text not null,outcome text not null,created_at timestamptz not null default now());
create table public.superpowers_placements(id uuid primary key default gen_random_uuid(),order_id uuid unique not null references public.superpowers_orders(id),tool_id text not null references public.superpowers_tools(id),slot integer not null check(slot in (1,2)),starts_at timestamptz not null,ends_at timestamptz not null,check(ends_at=starts_at+interval '7 days'));
create table public.superpowers_metrics(day date not null default current_date,tool_id text not null,kind text not null check(kind in ('tool_click','featured_impression','featured_click','service_inquiry','submission_received')),count bigint not null default 1,primary key(day,tool_id,kind));
create table public.superpowers_mail(id text primary key,email text not null,subject text not null,body text not null,sent_at timestamptz,created_at timestamptz not null default now());
alter table public.superpowers_submissions add column public_data jsonb not null default '{}',add column public_note text not null default '',add column published_tool_id text references public.superpowers_tools(id);
do $$ declare t text; begin foreach t in array array['config','admins','codes','sessions','limits','owners','changes','orders','payments','placements','metrics','mail'] loop execute format('alter table public.superpowers_%I enable row level security',t);execute format('revoke all on public.superpowers_%I from public,anon,authenticated',t);execute format('grant all on public.superpowers_%I to service_role',t);end loop;end $$;
grant all on public.superpowers_submissions,public.superpowers_tools,public.superpowers_services to service_role;
create index superpowers_sessions_expiry on public.superpowers_sessions(expires_at);
create index superpowers_limits_expiry on public.superpowers_limits(expires_at);
create index superpowers_orders_email on public.superpowers_orders(email,created_at);
create index superpowers_changes_email on public.superpowers_changes(email,created_at);
create index superpowers_submissions_email on public.superpowers_submissions(contact_email,created_at);
create index superpowers_owners_email on public.superpowers_owners(email);
create index superpowers_payments_intent on public.superpowers_payments(payment_intent);
create function public.superpowers_rate(p_key text,p_limit integer,p_seconds integer) returns boolean language plpgsql security invoker set search_path='' as $$ declare n integer;begin
 delete from public.superpowers_limits where expires_at<now();delete from public.superpowers_codes where expires_at<now();delete from public.superpowers_sessions where expires_at<now();
 insert into public.superpowers_limits(key,hits,expires_at) values(p_key,1,now()+make_interval(secs=>p_seconds)) on conflict(key) do update set hits=superpowers_limits.hits+1 returning hits into n;return n<=p_limit;end $$;
create function public.superpowers_count(p_tool text,p_kind text) returns void language sql security invoker set search_path='' as $$ insert into public.superpowers_metrics(tool_id,kind) values(p_tool,p_kind) on conflict(day,tool_id,kind) do update set count=superpowers_metrics.count+1; $$;
create function public.superpowers_publish(p_id uuid,p_tool jsonb) returns text language plpgsql security invoker set search_path='' as $$ declare s public.superpowers_submissions;tid text;begin
 select * into s from public.superpowers_submissions where id=p_id for update;if not found then raise exception 'Submission not found';end if;if s.status='accepted' then return s.published_tool_id;end if;
 if s.kind='service' then insert into public.superpowers_services(submission_id,name,website,description,category,audience,location,pricing,published) values(s.id,s.name,s.website,s.description,s.category,s.audience,s.location,s.pricing,true) on conflict(submission_id) do update set published=true;
 else tid=p_tool->>'id';if tid is null or tid!~'^[a-z0-9-]{2,120}$' or p_tool->>'status'<>'Documentation reviewed' or coalesce((p_tool->>'tested')::boolean,true) then raise exception 'Invalid reviewed listing';end if;
 perform pg_advisory_xact_lock(hashtext('superpowers-publish'));
 if exists(select 1 from public.superpowers_tools where lower(regexp_replace(data->>'url','/$',''))=lower(regexp_replace(p_tool->>'url','/$',''))) then raise exception 'This website is already listed. Review an update instead.';end if;
 insert into public.superpowers_tools(id,data) values(tid,p_tool);end if;
 update public.superpowers_submissions set status='accepted',published_tool_id=tid,public_note='Your listing has been published.' where id=p_id;return tid;end $$;
-- Reserve featured inventory before payment, so two approvals cannot sell the same slot.
create function public.superpowers_approve(p_id uuid,p_scope text,p_start timestamptz,p_slot integer,p_link text) returns void language plpgsql security invoker set search_path='' as $$ declare o public.superpowers_orders;begin
 perform pg_advisory_xact_lock(hashtext('superpowers-schedule'));
 select * into o from public.superpowers_orders where id=p_id for update;if not found or o.status not in ('requested','approved') then raise exception 'Only an unpaid request can be approved';end if;
 if o.offer in ('featured','working-session') and (p_start is null or p_start<=now()) then raise exception 'Confirm a future start time before payment';end if;
 if o.offer='featured' then
 if p_slot is null or p_slot not in (1,2) or o.tool_id is null then raise exception 'Choose a featured slot and published tool';end if;
 if exists(select 1 from public.superpowers_orders where id<>p_id and offer='featured' and status in ('approved','paid','fulfilled') and slot=p_slot and tstzrange(scheduled_at,scheduled_at+interval '7 days','[)') && tstzrange(p_start,p_start+interval '7 days','[)')) then raise exception 'This sponsored slot is reserved for those dates';end if;end if;
 update public.superpowers_orders set status='approved',scope=p_scope,scheduled_at=p_start,slot=case when offer='featured' then p_slot else null end,payment_link=p_link where id=p_id;end $$;
-- Event and session replay-safe. Only exact approved orders can be fulfilled.
create function public.superpowers_payment(p_event text,p_session text,p_order uuid,p_intent text,p_amount integer,p_email text,p_link text) returns text language plpgsql security invoker set search_path='' as $$ declare o public.superpowers_orders;r text;begin
 perform pg_advisory_xact_lock(hashtext('superpowers-payment-'||p_session));
 if exists(select 1 from public.superpowers_payments where event_id=p_event or session_id=p_session) then return 'duplicate';end if;
 select * into o from public.superpowers_orders where id=p_order for update;
 r=case when not found then 'unmatched' when o.status<>'approved' then 'refund needed' when o.amount<>p_amount or lower(o.email)<>lower(p_email) or o.payment_link<>p_link then 'refund needed' when o.offer='featured' and o.scheduled_at<=now() then 'refund needed' else 'paid' end;
 insert into public.superpowers_payments(event_id,session_id,order_id,payment_intent,amount,email,outcome) values(p_event,p_session,o.id,p_intent,p_amount,p_email,r);
 if r='paid' then update public.superpowers_orders set status='paid',checkout_session=p_session where id=o.id;
 if o.offer='featured' then insert into public.superpowers_placements(order_id,tool_id,slot,starts_at,ends_at) values(o.id,o.tool_id,o.slot,o.scheduled_at,o.scheduled_at+interval '7 days');update public.superpowers_orders set status='fulfilled' where id=o.id;end if;end if;return r;end $$;
revoke all on function public.superpowers_rate(text,integer,integer),public.superpowers_count(text,text),public.superpowers_publish(uuid,jsonb),public.superpowers_approve(uuid,text,timestamptz,integer,text),public.superpowers_payment(text,text,uuid,text,integer,text,text) from public,anon,authenticated;
grant execute on function public.superpowers_rate(text,integer,integer),public.superpowers_count(text,text),public.superpowers_publish(uuid,jsonb),public.superpowers_approve(uuid,text,timestamptz,integer,text),public.superpowers_payment(text,text,uuid,text,integer,text,text) to service_role;

create function public.superpowers_search_v2(q text default '',category_filter text default 'All',role_filter text default 'All',type_filter text default 'All',level_filter text default 'All',reviewed_only boolean default false,sort_by text default 'editorial',page_limit integer default 12,page_offset integer default 0,pricing_filter text default 'All')
returns jsonb language sql stable security invoker set search_path='' as $$
 with matched as (
 select data,editorial_order,ts_rank(search_vector,websearch_to_tsquery('english',left(q,300))) as rank
 from public.superpowers_tools
 where published and (pricing_filter='All' or coalesce(data->>'pricing_model','Unknown')=pricing_filter)
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
revoke all on function public.superpowers_search_v2(text,text,text,text,text,boolean,text,integer,integer,text) from public;
grant execute on function public.superpowers_search_v2(text,text,text,text,text,boolean,text,integer,integer,text) to anon,authenticated;
