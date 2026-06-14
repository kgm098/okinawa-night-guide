-- ============================================================
-- Supabase Storage バケット設定
-- Supabase SQL Editor で実行してください
-- ============================================================

-- shop-images バケット作成（パブリック）
insert into storage.buckets (id, name, public)
values ('shop-images', 'shop-images', true)
on conflict (id) do update set public = true;

-- 誰でも読める（公開）
create policy "Public read shop-images"
  on storage.objects for select
  using (bucket_id = 'shop-images');

-- 認証済みユーザーのみアップロード可
create policy "Auth upload shop-images"
  on storage.objects for insert
  with check (bucket_id = 'shop-images' and auth.role() = 'authenticated');

-- 認証済みユーザーのみ削除可
create policy "Auth delete shop-images"
  on storage.objects for delete
  using (bucket_id = 'shop-images' and auth.role() = 'authenticated');
