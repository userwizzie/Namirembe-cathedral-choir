-- Run this in Supabase SQL Editor after the original tables.sql.
-- The policies should be reviewed if you later add a separate admin role table.

alter table contact_messages add column if not exists status text not null default 'unread';

create table if not exists media_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  media_type text not null check (media_type in ('Photos', 'Videos')),
  url text not null,
  caption text not null,
  category text not null default 'General'
);

alter table applications enable row level security;
alter table contact_messages enable row level security;
alter table events enable row level security;
alter table news enable row level security;
alter table media_items enable row level security;

create policy "Public can submit applications" on applications for insert to anon, authenticated with check (true);
create policy "Public can submit contact messages" on contact_messages for insert to anon, authenticated with check (true);
create policy "Authenticated admins can read applications" on applications for select to authenticated using (true);
create policy "Authenticated admins can update applications" on applications for update to authenticated using (true) with check (true);
create policy "Authenticated admins can read contacts" on contact_messages for select to authenticated using (true);
create policy "Authenticated admins can update contacts" on contact_messages for update to authenticated using (true) with check (true);
create policy "Public can read events" on events for select to anon, authenticated using (true);
create policy "Authenticated admins can manage events" on events for all to authenticated using (true) with check (true);
create policy "Public can read news" on news for select to anon, authenticated using (true);
create policy "Authenticated admins can manage news" on news for all to authenticated using (true) with check (true);
create policy "Public can read media" on media_items for select to anon, authenticated using (true);
create policy "Authenticated admins can manage media" on media_items for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

create policy "Public can view choir media" on storage.objects for select
to anon, authenticated using (bucket_id = 'media');
create policy "Authenticated admins can upload choir media" on storage.objects for insert
to authenticated with check (bucket_id = 'media');
create policy "Authenticated admins can delete choir media" on storage.objects for delete
to authenticated using (bucket_id = 'media');
