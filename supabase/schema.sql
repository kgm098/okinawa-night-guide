-- ============================================================
-- 沖縄ナイトガイド2.0 — Supabase Schema
-- ============================================================

-- ----------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------
create extension if not exists "unaccent";

-- ----------------------------------------------------------------
-- Enum Types
-- ----------------------------------------------------------------
create type shop_genre as enum (
  'bar',
  'club',
  'lounge',
  'izakaya',
  'karaoke',
  'live_house',
  'snack',
  'restaurant',
  'cafe',
  'other'
);

create type shop_area as enum (
  'naha',
  'chatan',
  'okinawa_city',
  'nago',
  'itoman',
  'urasoe',
  'ginowan',
  'other'
);

-- ----------------------------------------------------------------
-- shops
-- ----------------------------------------------------------------
create table shops (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  area             shop_area not null,
  sub_area         text,

  -- 複数ジャンル・タグは配列で管理
  genres           shop_genre[] not null default '{}',
  tags             text[]       not null default '{}',

  description      text,
  catch_copy       text,

  address          text,
  business_hours   text,
  closed_days      text,
  budget           text,

  google_map_url   text,
  instagram_url    text,
  website_url      text,

  -- 画像はStorageのパスを保存
  main_image       text,
  gallery_images   text[] not null default '{}',

  is_featured      boolean not null default false,
  is_popular       boolean not null default false,

  latitude         numeric(10, 7),
  longitude        numeric(10, 7),

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- updated_at 自動更新トリガー
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger shops_set_updated_at
  before update on shops
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------
create index idx_shops_area     on shops (area);
create index idx_shops_genres   on shops using gin (genres);
create index idx_shops_tags     on shops using gin (tags);
create index idx_shops_featured on shops (is_featured) where is_featured = true;
create index idx_shops_popular  on shops (is_popular)  where is_popular  = true;
create index idx_shops_location on shops (latitude, longitude);

-- ----------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------
alter table shops enable row level security;

-- 一般ユーザー：公開済み店舗のみ読み取り可
create policy "shops_public_read"
  on shops for select
  using (true);

-- サービスロール（管理者）のみ書き込み可
create policy "shops_service_write"
  on shops for all
  using (auth.role() = 'service_role');

-- ----------------------------------------------------------------
-- Storage バケット（Supabase Dashboard で作成 or SQL）
-- ----------------------------------------------------------------
-- insert into storage.buckets (id, name, public)
-- values ('shop-images', 'shop-images', true);
