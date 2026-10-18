create table public.superpowers_public_kits (
 id uuid primary key default gen_random_uuid(), email text not null,
 title text not null check(length(title) between 3 and 80), description text not null check(length(description) between 20 and 1000),
 tool_ids jsonb not null check(jsonb_typeof(tool_ids)='array' and jsonb_array_length(tool_ids) between 1 and 100),
 status text not null default 'published' check(status in ('published','revoked')), consent_at timestamptz not null default now(),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index on public.superpowers_public_kits(email);
create table public.superpowers_preferences (
 email text primary key, watched jsonb not null default '[]' check(jsonb_typeof(watched)='array' and jsonb_array_length(watched)<=50),
 digest_enabled boolean not null default false, consent_at timestamptz, unsubscribe_token text not null check(length(unsubscribe_token)=64),
 next_digest_at timestamptz not null default now()+interval '7 days', last_digest_at timestamptz not null default now(),
 version integer not null default 1 check(version>0), updated_at timestamptz not null default now()
);
create unique index on public.superpowers_preferences(unsubscribe_token);
create index on public.superpowers_preferences(next_digest_at) where digest_enabled;
create table public.superpowers_tool_reports (
 id uuid primary key default gen_random_uuid(), email text not null, tool_id text not null references public.superpowers_tools(id),
 kind text not null check(kind in ('pricing','broken-link','availability','other')), source_url text not null check(source_url like 'https://%'),
 details text not null check(length(details) between 20 and 2000), status text not null default 'pending' check(status in ('pending','resolved','dismissed')),
 review_note text not null default '' check(length(review_note)<=1000), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index on public.superpowers_tool_reports(email);
create index on public.superpowers_tool_reports(tool_id);
create index on public.superpowers_tool_reports(status,created_at);
create table public.superpowers_tool_events (
 id uuid primary key default gen_random_uuid(), tool_id text not null references public.superpowers_tools(id),
 summary text not null, created_at timestamptz not null default now()
);
create index on public.superpowers_tool_events(tool_id,created_at desc);
create table public.superpowers_digest_outbox (
 id uuid primary key default gen_random_uuid(), email text not null references public.superpowers_preferences(email),
 period timestamptz not null, payload jsonb not null, status text not null default 'pending' check(status in ('pending','sending','sent','cancelled','review')),
 attempts integer not null default 0, lease_until timestamptz, lease_token uuid, provider_id text,
 created_at timestamptz not null default now(), sent_at timestamptz, unique(email,period)
);
create index on public.superpowers_digest_outbox(status,created_at);
alter table public.superpowers_public_kits enable row level security;
alter table public.superpowers_preferences enable row level security;
alter table public.superpowers_tool_reports enable row level security;
alter table public.superpowers_tool_events enable row level security;
alter table public.superpowers_digest_outbox enable row level security;
revoke all on public.superpowers_public_kits,public.superpowers_preferences,public.superpowers_tool_reports,public.superpowers_tool_events,public.superpowers_digest_outbox from public,anon,authenticated;
grant select,insert,update,delete on public.superpowers_public_kits,public.superpowers_preferences,public.superpowers_tool_reports,public.superpowers_tool_events,public.superpowers_digest_outbox to service_role;

create function public.superpowers_record_tool_event() returns trigger language plpgsql security invoker set search_path='' as $$
declare changed text[]:='{}';
begin
 if not new.published then return new; end if;
 if not old.published then changed:=array_append(changed,'Listing published'); end if;
 if (new.data->>'pricing_source') is not null and (new.data->>'pricing_checked_at') is not null and
    (new.data->'pricing_model' is distinct from old.data->'pricing_model' or new.data->'pricing' is distinct from old.data->'pricing' or new.data->'trial_available' is distinct from old.data->'trial_available') then changed:=array_append(changed,'Pricing or trial details reviewed and updated'); end if;
 if (new.data->>'availability_source') is not null and (new.data->>'availability_checked_at') is not null and
    (new.data->'availability' is distinct from old.data->'availability' or new.data->'availability_note' is distinct from old.data->'availability_note') then changed:=array_append(changed,'Availability information reviewed and updated'); end if;
 if cardinality(changed)>0 then insert into public.superpowers_tool_events(tool_id,summary) values(new.id,array_to_string(changed,'. ')||'. Read the current listing for details and sources.'); end if;
 return new;
end $$;
revoke all on function public.superpowers_record_tool_event() from public,anon,authenticated;
grant execute on function public.superpowers_record_tool_event() to service_role;
create trigger superpowers_record_tool_event after update on public.superpowers_tools for each row execute function public.superpowers_record_tool_event();

-- Queue and advance a subscription atomically. Resubscribing cannot replay old notifications.
create function public.superpowers_queue_digest(p_email text,p_version integer,p_period timestamptz,p_payload jsonb)
returns boolean language plpgsql security invoker set search_path='' as $$
declare r public.superpowers_preferences;
begin
 select * into r from public.superpowers_preferences where email=p_email and version=p_version and digest_enabled and next_digest_at=p_period and next_digest_at<=now() for update;
 if not found then return false; end if;
 if jsonb_array_length(p_payload->'items')>0 then
  insert into public.superpowers_digest_outbox(email,period,payload) values(p_email,p_period,p_payload) on conflict(email,period) do nothing;
 end if;
 update public.superpowers_preferences set last_digest_at=greatest(r.last_digest_at,least(now(),coalesce((p_payload->>'cutoff')::timestamptz,now()))),next_digest_at=now()+interval '7 days' where email=p_email;
 return true;
end $$;
create function public.superpowers_claim_digests() returns setof public.superpowers_digest_outbox language plpgsql security invoker set search_path='' as $$
begin
 update public.superpowers_digest_outbox o set status='cancelled',lease_until=null where status in ('pending','sending') and not exists(select 1 from public.superpowers_preferences p where p.email=o.email and p.digest_enabled);
 update public.superpowers_digest_outbox set status='review',lease_until=null where status in ('pending','sending') and (created_at<now()-interval '23 hours' or attempts>=3) and (lease_until is null or lease_until<now());
 return query with candidates as (
  select id from public.superpowers_digest_outbox where status in ('pending','sending') and (lease_until is null or lease_until<now()) and attempts<3 and created_at>=now()-interval '23 hours' order by created_at limit 2 for update skip locked
 ) update public.superpowers_digest_outbox o set status='sending',attempts=attempts+1,lease_token=gen_random_uuid(),lease_until=now()+interval '30 minutes' from candidates c where o.id=c.id returning o.*;
end $$;
create function public.superpowers_unsubscribe_digest(p_token text) returns boolean language plpgsql security invoker set search_path='' as $$
declare em text;
begin
 update public.superpowers_preferences set digest_enabled=false,version=version+1,updated_at=now() where unsubscribe_token=p_token and digest_enabled returning email into em;
 if em is not null then update public.superpowers_digest_outbox set status='cancelled' where email=em and status in ('pending','sending'); end if;
 return true;
end $$;
revoke all on function public.superpowers_queue_digest(text,integer,timestamptz,jsonb),public.superpowers_claim_digests(),public.superpowers_unsubscribe_digest(text) from public,anon,authenticated;
grant execute on function public.superpowers_queue_digest(text,integer,timestamptz,jsonb),public.superpowers_claim_digests(),public.superpowers_unsubscribe_digest(text) to service_role;
