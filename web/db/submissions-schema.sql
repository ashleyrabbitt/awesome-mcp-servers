-- Private editorial intake; publishable-key clients can only insert pending rows.
create table public.superpowers_submissions (
 id uuid primary key,
 created_at timestamptz not null default now(),
 kind text not null check(kind in ('tool','service')),
 name text not null check(length(name) between 2 and 120),
 website text not null check(length(website)<=1000 and website ~ '^https://[^[:space:]@]+\.[^[:space:]@]+'),
 description text not null check(length(description) between 30 and 2000),
 category text not null check(length(category) between 2 and 80),
 audience text not null default '' check(length(audience)<=160),
 location text not null default '' check(length(location)<=160),
 pricing text not null default '' check(length(pricing)<=160),
 contact_name text not null check(length(contact_name) between 2 and 100),
 contact_email text not null check(length(contact_email) between 3 and 254 and contact_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 consent boolean not null check(consent),
 status text not null default 'pending' check(status in ('pending','accepted','declined','needs_info')),
 review_notes text not null default ''
);
alter table public.superpowers_submissions enable row level security;
revoke all on public.superpowers_submissions from anon, authenticated;
grant insert (id,kind,name,website,description,category,audience,location,pricing,contact_name,contact_email,consent) on public.superpowers_submissions to anon, authenticated;
create policy "Visitors submit pending entries only" on public.superpowers_submissions for insert to anon,authenticated with check(status='pending' and review_notes='' and consent=true);
create index superpowers_submission_queue on public.superpowers_submissions(status,created_at);

-- Separate public records: private contact details never enter this table.
create table public.superpowers_services (
 id uuid primary key default gen_random_uuid(),
 submission_id uuid unique references public.superpowers_submissions(id),
 name text not null check(length(name) between 2 and 120),
 website text not null check(website ~ '^https://[^[:space:]@]+\.[^[:space:]@]+'),
 description text not null check(length(description) between 30 and 2000),
 category text not null,
 audience text not null default '', location text not null default '', pricing text not null default '',
 published boolean not null default false,
 reviewed_at timestamptz not null default now()
);
alter table public.superpowers_services enable row level security;
revoke all on public.superpowers_services from anon,authenticated;
grant select (id,name,website,description,category,audience,location,pricing,reviewed_at) on public.superpowers_services to anon,authenticated;
create policy "Visitors read published services" on public.superpowers_services for select to anon,authenticated using (published=true);
