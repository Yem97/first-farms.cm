-- ============================================================
-- Firstfarms Digital Cooperative / AgriExpert AI — Initial Schema
-- Supabase (Postgres) · Phase 1 Foundation
-- Run this in the Supabase SQL Editor (or via `supabase db push`).
-- ============================================================

create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- ------------------------------------------------------------
-- profiles  (1:1 with auth.users — holds role + farmer details)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          text not null default 'member' check (role in ('member','admin')),
  full_name     text,
  phone         text,
  region        text,
  farming_type  text,
  avatar_url    text,
  bio           text,
  suspended     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Role check helper. SECURITY DEFINER so it bypasses RLS and never
-- recurses into the profiles policies that call it.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ------------------------------------------------------------
-- products  (member-owned marketplace listings, admin-moderated)
-- ------------------------------------------------------------
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  owner_id        uuid not null references public.profiles(id) on delete cascade,
  name            text not null,
  description     text,
  price           numeric(12,2),
  currency        text not null default 'XAF',
  unit            text,
  category        text,
  region          text,
  farmer_name     text,
  whatsapp_number text,
  image_url       text,
  status          text not null default 'pending' check (status in ('pending','approved','rejected')),
  available       boolean not null default true,
  featured        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists products_owner_idx    on public.products(owner_id);
create index if not exists products_status_idx   on public.products(status);
create index if not exists products_featured_idx on public.products(featured);

-- ------------------------------------------------------------
-- blog_posts  (admin-authored, simple blog)
-- ------------------------------------------------------------
create table if not exists public.blog_posts (
  id              uuid primary key default gen_random_uuid(),
  author_id       uuid references public.profiles(id) on delete set null,
  title           text not null,
  slug            text not null unique,
  excerpt         text,
  body            text,
  cover_image_url text,
  published       boolean not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists blog_published_idx on public.blog_posts(published, published_at desc);

-- ------------------------------------------------------------
-- training_events  (admin-authored)
-- ------------------------------------------------------------
create table if not exists public.training_events (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  slug              text,
  event_date        timestamptz,
  location          text,
  region            text,
  topic             text,
  description       text,
  trainer           text,
  image_url         text,
  registration_open boolean not null default true,
  spots_available   integer,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists events_date_idx on public.training_events(event_date asc);

-- ------------------------------------------------------------
-- testimonials  (admin-curated)
-- ------------------------------------------------------------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  quote        text not null,
  farmer_name  text,
  region       text,
  photo_url    text,
  featured     boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ------------------------------------------------------------
-- team_members  (admin-curated — board of directors + supervisory)
-- ------------------------------------------------------------
create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  board       text not null default 'directors' check (board in ('directors','supervisory')),
  photo_url   text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- advert_packages  (admin-curated)
-- ------------------------------------------------------------
create table if not exists public.advert_packages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  price       numeric(12,2),
  currency    text not null default 'XAF',
  description text,
  features    jsonb not null default '[]'::jsonb,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- Triggers
-- ============================================================

-- New auth user → create a matching profile (role defaults to 'member').
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, region, farming_type, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'region',
    new.raw_user_meta_data->>'farming_type',
    'member'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Members can never self-approve or self-feature a listing. Editing key
-- content on an approved listing sends it back to 'pending' for re-review.
create or replace function public.enforce_product_moderation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    if (tg_op = 'INSERT') then
      new.status   := 'pending';
      new.featured := false;
    elsif (tg_op = 'UPDATE') then
      new.featured := old.featured;   -- only admins toggle featured
      if (new.name        is distinct from old.name
       or new.description is distinct from old.description
       or new.price       is distinct from old.price
       or new.image_url   is distinct from old.image_url
       or new.category    is distinct from old.category) then
        new.status := 'pending';
      else
        new.status := old.status;     -- e.g. just toggling availability
      end if;
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists products_moderation on public.products;
create trigger products_moderation
  before insert or update on public.products
  for each row execute function public.enforce_product_moderation();

-- Generic updated_at touch for the admin-authored tables.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists blog_touch on public.blog_posts;
create trigger blog_touch before update on public.blog_posts
  for each row execute function public.touch_updated_at();

drop trigger if exists events_touch on public.training_events;
create trigger events_touch before update on public.training_events
  for each row execute function public.touch_updated_at();

-- ============================================================
-- Row-Level Security
-- ============================================================
alter table public.profiles        enable row level security;
alter table public.products        enable row level security;
alter table public.blog_posts      enable row level security;
alter table public.training_events enable row level security;
alter table public.testimonials    enable row level security;
alter table public.team_members    enable row level security;
alter table public.advert_packages enable row level security;

-- ---------- profiles ----------
-- (INSERT is done by the handle_new_user trigger, which is SECURITY DEFINER.)
create policy "profiles_select_self_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles_update_self_or_admin" on public.profiles
  for update using (id = auth.uid() or public.is_admin())
             with check (id = auth.uid() or public.is_admin());
create policy "profiles_delete_admin" on public.profiles
  for delete using (public.is_admin());

-- ---------- products ----------
-- Public sees only approved + available. Owners see their own (any status).
-- Admins see and manage everything.
create policy "products_read_public_approved" on public.products
  for select using (status = 'approved' and available = true);
create policy "products_read_own" on public.products
  for select using (owner_id = auth.uid());
create policy "products_read_admin" on public.products
  for select using (public.is_admin());
create policy "products_insert_own" on public.products
  for insert with check (owner_id = auth.uid());
create policy "products_update_own" on public.products
  for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "products_update_admin" on public.products
  for update using (public.is_admin()) with check (public.is_admin());
create policy "products_delete_own_or_admin" on public.products
  for delete using (owner_id = auth.uid() or public.is_admin());

-- ---------- blog_posts ----------
create policy "blog_read_published" on public.blog_posts
  for select using (published = true);
create policy "blog_all_admin" on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- training_events ----------
create policy "events_read_all" on public.training_events
  for select using (true);
create policy "events_all_admin" on public.training_events
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- testimonials ----------
create policy "testimonials_read_all" on public.testimonials
  for select using (true);
create policy "testimonials_all_admin" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- team_members ----------
create policy "team_read_all" on public.team_members
  for select using (true);
create policy "team_all_admin" on public.team_members
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- advert_packages ----------
create policy "adverts_read_all" on public.advert_packages
  for select using (true);
create policy "adverts_all_admin" on public.advert_packages
  for all using (public.is_admin()) with check (public.is_admin());
