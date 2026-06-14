-- ============================================================
-- phone / access カラム追加 & 店舗情報更新
-- Supabase SQL Editor で実行してください
-- ============================================================

-- カラム追加
alter table shops
  add column if not exists phone  text,
  add column if not exists access text;

-- ----------------------------------------------------------------
-- 1. Bar Daisy
-- ----------------------------------------------------------------
update shops set
  address        = '沖縄県那覇市牧志2-18-7 共伸産業ビル3F',
  phone          = '098-861-3001',
  business_hours = '20:00〜3:00',
  closed_days    = '年中無休',
  access         = '美栄橋駅徒歩30秒',
  website_url    = 'https://bar-daisy.okinawa',
  instagram_url  = 'https://www.instagram.com/bar.daisy/',
  sub_area       = '牧志',
  updated_at     = now()
where slug = 'bar-daisy';

-- ----------------------------------------------------------------
-- 2. BAR Sou
-- ----------------------------------------------------------------
update shops set
  address        = '沖縄県那覇市牧志2-18-7 共伸産業ビル2F-A',
  phone          = '098-863-3030',
  business_hours = '20:00〜3:00',
  closed_days    = '不定休',
  access         = '美栄橋駅徒歩30秒',
  website_url    = 'https://bar-sou.com',
  instagram_url  = 'https://www.instagram.com/barsou2021/',
  sub_area       = '牧志',
  updated_at     = now()
where slug = 'bar-sou';

-- ----------------------------------------------------------------
-- 3. Bar Stir Laboratory
-- ----------------------------------------------------------------
update shops set
  address        = '沖縄県那覇市久茂地2-24-18',
  phone          = '098-963-9492',
  business_hours = '18:00〜25:00',
  closed_days    = '日曜日・第2・第4月曜日',
  budget         = '¥3,000〜',
  instagram_url  = 'https://www.instagram.com/bar.stirlaboratory/',
  website_url    = null,
  sub_area       = '久茂地',
  updated_at     = now()
where slug = 'bar-stir-laboratory';

-- 確認
select slug, name, address, phone, business_hours, closed_days, access, website_url, instagram_url
from shops
where slug in ('bar-daisy', 'bar-sou', 'bar-stir-laboratory')
order by slug;
