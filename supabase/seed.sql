-- ============================================================
-- 沖縄ナイトガイド2.0 — Seed Data (shops × 10)
-- ============================================================
-- 実行前に schema.sql が適用済みであることを確認してください。
-- 重複実行に備え、同一 slug は上書きします。
-- ============================================================

insert into shops (
  slug,
  name,
  area,
  sub_area,
  genres,
  tags,
  description,
  catch_copy,
  address,
  business_hours,
  closed_days,
  budget,
  google_map_url,
  instagram_url,
  website_url,
  main_image,
  gallery_images,
  is_featured,
  is_popular,
  latitude,
  longitude
)
values

-- ----------------------------------------------------------------
-- 1. Bar Daisy
-- ----------------------------------------------------------------
(
  'bar-daisy',
  'Bar Daisy',
  'naha',
  '松山',
  array['bar']::shop_genre[],
  array['カクテル', 'ウイスキー', '落ち着いた', '一人飲み', 'カウンター'],
  '松山エリアに佇む隠れ家バー。厳選されたウイスキーと本格カクテルが楽しめる。カウンター中心の静かな空間で、会話とお酒をゆっくり味わえる一軒。',
  '静かな夜に、一杯の贅沢を。',
  '沖縄県那覇市松山2丁目',
  '20:00〜翌3:00',
  '不定休',
  '¥2,000〜¥4,000',
  null,
  'https://www.instagram.com/bar_daisy_naha/',
  null,
  'bar-daisy/main.jpg',
  array[
    'bar-daisy/gallery-01.jpg',
    'bar-daisy/gallery-02.jpg',
    'bar-daisy/gallery-03.jpg'
  ],
  true,
  true,
  26.2172800,
  127.6844400
),

-- ----------------------------------------------------------------
-- 2. Bar Sou
-- ----------------------------------------------------------------
(
  'bar-sou',
  'Bar Sou',
  'naha',
  '松山',
  array['bar']::shop_genre[],
  array['日本酒', 'クラフトビール', 'ペアリング', 'おつまみ', '大人の隠れ家'],
  '松山の路地裏に構える、日本酒とクラフトビールにこだわったバー。季節の肴と合わせるペアリングが評判で、知る人ぞ知る名店。',
  '旨い酒と、旨い肴。',
  '沖縄県那覇市松山2丁目',
  '19:00〜翌2:00',
  '日曜定休',
  '¥2,500〜¥5,000',
  null,
  null,
  null,
  'bar-sou/main.jpg',
  array[
    'bar-sou/gallery-01.jpg',
    'bar-sou/gallery-02.jpg'
  ],
  false,
  true,
  26.2175000,
  127.6848000
),

-- ----------------------------------------------------------------
-- 3. Bar Stir Laboratory
-- ----------------------------------------------------------------
(
  'bar-stir-laboratory',
  'Bar Stir Laboratory',
  'naha',
  '松山',
  array['bar']::shop_genre[],
  array['クラフトカクテル', '実験的', 'オリジナル', 'おしゃれ', 'バーテンダー'],
  'カクテルを"実験"として追求するクリエイティブバー。独創的なオリジナルカクテルと遊び心あるメニュー構成が話題を呼ぶ。バーテンダーとの会話も楽しみの一つ。',
  'カクテルは、実験室から生まれる。',
  '沖縄県那覇市松山1丁目',
  '21:00〜翌4:00',
  '月曜定休',
  '¥2,000〜¥4,500',
  null,
  null,
  null,
  'bar-stir-laboratory/main.jpg',
  array[
    'bar-stir-laboratory/gallery-01.jpg',
    'bar-stir-laboratory/gallery-02.jpg',
    'bar-stir-laboratory/gallery-03.jpg'
  ],
  true,
  false,
  26.2170000,
  127.6842000
),

-- ----------------------------------------------------------------
-- 4. Bar Hammock
-- ----------------------------------------------------------------
(
  'bar-hammock',
  'Bar Hammock',
  'naha',
  '松山',
  array['bar', 'lounge']::shop_genre[],
  array['リラックス', 'ソファ', 'カクテル', 'ゆったり', 'カップル'],
  'ハンモックやソファが並ぶリラックス空間。ゆったりと流れる時間の中でカクテルや泡盛を楽しめる。デートや少人数での利用に最適な落ち着いたラウンジバー。',
  'ゆれながら、飲む夜。',
  '沖縄県那覇市松山2丁目',
  '19:00〜翌2:00',
  '不定休',
  '¥2,000〜¥4,000',
  null,
  null,
  null,
  'bar-hammock/main.jpg',
  array[
    'bar-hammock/gallery-01.jpg',
    'bar-hammock/gallery-02.jpg'
  ],
  false,
  false,
  26.2168000,
  127.6850000
),

-- ----------------------------------------------------------------
-- 5. BAR 30's Room
-- ----------------------------------------------------------------
(
  'bar-30s-room',
  'BAR 30''s Room',
  'naha',
  '松山',
  array['bar']::shop_genre[],
  array['大人バー', '30代', 'ウイスキー', '落ち着いた', 'マスター'],
  '30代の"大人の余暇"をテーマにした居心地抜群のバー。マスターのセレクトしたウイスキーが揃い、静かに飲みたい夜のお供に最適。常連客との距離感が心地よい一軒。',
  '大人が、大人らしく飲む場所。',
  '沖縄県那覇市松山1丁目',
  '20:00〜翌3:00',
  '日曜・月曜定休',
  '¥2,500〜¥5,000',
  null,
  null,
  null,
  'bar-30s-room/main.jpg',
  array[
    'bar-30s-room/gallery-01.jpg',
    'bar-30s-room/gallery-02.jpg'
  ],
  false,
  false,
  26.2173000,
  127.6840000
),

-- ----------------------------------------------------------------
-- 6. Bar & Cafe 7c
-- ----------------------------------------------------------------
(
  'bar-cafe-7c',
  'Bar & Cafe 7c',
  'naha',
  '国際通り周辺',
  array['bar', 'cafe']::shop_genre[],
  array['カフェバー', 'コーヒー', 'カクテル', 'デイユース', '観光客歓迎'],
  '昼はカフェ、夜はバーとして機能する二面性が魅力。良質なコーヒーと個性的なカクテルを同じ空間で楽しめる。観光客にも地元客にも親しまれるオープンな雰囲気。',
  '昼も夜も、7cで過ごす時間。',
  '沖縄県那覇市牧志',
  '12:00〜翌0:00',
  '水曜定休',
  '¥1,000〜¥3,000',
  null,
  null,
  null,
  'bar-cafe-7c/main.jpg',
  array[
    'bar-cafe-7c/gallery-01.jpg',
    'bar-cafe-7c/gallery-02.jpg',
    'bar-cafe-7c/gallery-03.jpg'
  ],
  false,
  true,
  26.2155000,
  127.6870000
),

-- ----------------------------------------------------------------
-- 7. BAR FORTUNA
-- ----------------------------------------------------------------
(
  'bar-fortuna',
  'BAR FORTUNA',
  'naha',
  '松山',
  array['bar']::shop_genre[],
  array['カクテル', 'フォルトゥナ', 'バーテンダー', 'クラシック', '本格バー'],
  'クラシックカクテルから創作カクテルまで幅広く揃える本格バー。熟練のバーテンダーが一杯一杯丁寧に仕上げる。バーカルチャーを深く楽しみたい人に向けた大人の空間。',
  '運命の一杯に、出会う夜。',
  '沖縄県那覇市松山2丁目',
  '20:00〜翌4:00',
  '不定休',
  '¥2,500〜¥5,000',
  null,
  null,
  null,
  'bar-fortuna/main.jpg',
  array[
    'bar-fortuna/gallery-01.jpg',
    'bar-fortuna/gallery-02.jpg'
  ],
  true,
  true,
  26.2176000,
  127.6846000
),

-- ----------------------------------------------------------------
-- 8. BAR No.11
-- ----------------------------------------------------------------
(
  'bar-no-11',
  'BAR No.11',
  'naha',
  '松山',
  array['bar']::shop_genre[],
  array['ウイスキー', 'スコッチ', 'バーボン', '静か', '一人飲み'],
  'ウイスキー専門バー。スコッチ・バーボン・ジャパニーズを中心に100種類以上のボトルが並ぶ。初心者からマニアまで対応できるマスターのガイドが評判。',
  'No.11番地で、運命のウイスキーを。',
  '沖縄県那覇市松山1丁目',
  '20:00〜翌3:00',
  '日曜定休',
  '¥2,000〜¥5,000',
  null,
  null,
  null,
  'bar-no-11/main.jpg',
  array[
    'bar-no-11/gallery-01.jpg',
    'bar-no-11/gallery-02.jpg',
    'bar-no-11/gallery-03.jpg'
  ],
  false,
  false,
  26.2171000,
  127.6843000
),

-- ----------------------------------------------------------------
-- 9. Whisky&JAPAN
-- ----------------------------------------------------------------
(
  'whisky-and-japan',
  'Whisky&JAPAN',
  'naha',
  '松山',
  array['bar']::shop_genre[],
  array['ジャパニーズウイスキー', '国産', 'レア', 'コレクション', 'シングルモルト'],
  'ジャパニーズウイスキーに特化した専門バー。山崎・白州・余市などの定番から入手困難なヴィンテージまで取り揃える。日本のウイスキー文化を深く知りたい人のための聖地。',
  '日本の魂が宿る、一滴。',
  '沖縄県那覇市松山2丁目',
  '19:00〜翌3:00',
  '月曜定休',
  '¥3,000〜¥6,000',
  null,
  null,
  null,
  'whisky-and-japan/main.jpg',
  array[
    'whisky-and-japan/gallery-01.jpg',
    'whisky-and-japan/gallery-02.jpg'
  ],
  true,
  false,
  26.2178000,
  127.6849000
),

-- ----------------------------------------------------------------
-- 10. らいず酒場
-- ----------------------------------------------------------------
(
  'rise-sakaba',
  'らいず酒場',
  'naha',
  '久茂地',
  array['izakaya', 'bar']::shop_genre[],
  array['泡盛', '沖縄料理', 'わいわい', 'グループ', 'ローカル'],
  '地元那覇っ子に愛されるにぎやかな居酒屋バー。沖縄料理と豊富な泡盛が揃い、グループでの宴会からふらっと一人飲みまで幅広く対応。沖縄の夜の熱気を体感できる一軒。',
  '泡盛と笑声で、沖縄の夜を上げろ。',
  '沖縄県那覇市久茂地',
  '18:00〜翌2:00',
  '不定休',
  '¥2,000〜¥4,000',
  null,
  null,
  null,
  'rise-sakaba/main.jpg',
  array[
    'rise-sakaba/gallery-01.jpg',
    'rise-sakaba/gallery-02.jpg',
    'rise-sakaba/gallery-03.jpg'
  ],
  false,
  true,
  26.2160000,
  127.6830000
)

on conflict (slug) do update set
  name           = excluded.name,
  area           = excluded.area,
  sub_area       = excluded.sub_area,
  genres         = excluded.genres,
  tags           = excluded.tags,
  description    = excluded.description,
  catch_copy     = excluded.catch_copy,
  address        = excluded.address,
  business_hours = excluded.business_hours,
  closed_days    = excluded.closed_days,
  budget         = excluded.budget,
  google_map_url = excluded.google_map_url,
  instagram_url  = excluded.instagram_url,
  website_url    = excluded.website_url,
  main_image     = excluded.main_image,
  gallery_images = excluded.gallery_images,
  is_featured    = excluded.is_featured,
  is_popular     = excluded.is_popular,
  latitude       = excluded.latitude,
  longitude      = excluded.longitude,
  updated_at     = now();
