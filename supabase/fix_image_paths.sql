-- ============================================================
-- 画像パス修正：shop-images/ プレフィックスを除去
-- Supabase SQL Editor で一度だけ実行してください
-- ============================================================

update shops set
  main_image = replace(main_image, 'shop-images/', ''),
  gallery_images = array(
    select replace(unnest(gallery_images), 'shop-images/', '')
  )
where main_image like 'shop-images/%'
   or exists (
     select 1 from unnest(gallery_images) g where g like 'shop-images/%'
   );

-- 確認
select slug, main_image, gallery_images from shops order by slug;
