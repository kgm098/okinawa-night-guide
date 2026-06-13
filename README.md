# 沖縄ナイトガイド 2.0

那覇・北谷を中心に、BAR・居酒屋・深夜営業店を探せるローカルナイトメディア。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4 |
| DB / BaaS | Supabase |
| ホスティング | Vercel |

---

## ローカル起動

```bash
# 1. 依存インストール
npm install

# 2. 環境変数を設定
cp .env.local.example .env.local
# .env.local を編集して Supabase の値を入力

# 3. 開発サーバー起動
npm run dev
# → http://localhost:3000
```

---

## 環境変数

`.env.local` に以下を設定してください。

| 変数名 | 取得場所 |
|--------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon public |

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## Supabase セットアップ

### 1. テーブル作成（schema.sql）

```
Supabase Dashboard → SQL Editor → 新規クエリ
↓
supabase/schema.sql の内容を貼り付けて実行
```

### 2. 初期データ投入（seed.sql）

```
Supabase Dashboard → SQL Editor → 新規クエリ
↓
supabase/seed.sql の内容を貼り付けて実行
```

### 3. Storage バケット作成

```
Supabase Dashboard → Storage → New bucket
  名前: shop-images
  Public: ON
```

---

## Vercel デプロイ

### 手順

```
1. GitHub にリポジトリを push
2. vercel.com → New Project → GitHub リポジトリを選択
3. Framework Preset: Next.js（自動検出）
4. 環境変数を設定（下記参照）
5. Deploy
```

### Vercel 環境変数の設定

Vercel Dashboard → Project → Settings → Environment Variables に以下を追加：

| 変数名 | 値 | 環境 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseのProject URL | Production / Preview / Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabaseのanon key | Production / Preview / Development |

> **注意**: `NEXT_PUBLIC_` プレフィックスがついている変数はブラウザにも公開されます。`anon key` は公開用の読み取り専用キーなので問題ありません。書き込みはRLS（Row Level Security）で保護されています。

---

## ページ一覧

| URL | 概要 |
|-----|------|
| `/` | トップページ（人気店舗・エリア・ジャンル） |
| `/shops` | 店舗一覧（エリア・ジャンルフィルター対応） |
| `/shops/[slug]` | 店舗詳細 |
| `/listing-info` | 掲載案内（店舗オーナー向け） |

---

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx          # 共通レイアウト（Header / Footer）
│   ├── page.tsx            # トップページ
│   ├── shops/
│   │   ├── page.tsx        # 店舗一覧・フィルター
│   │   └── [slug]/
│   │       └── page.tsx    # 店舗詳細
│   └── listing-info/
│       └── page.tsx        # 掲載案内
├── components/             # 共通コンポーネント
└── lib/
    ├── labels.ts           # エリア・ジャンルのラベル変換
    └── supabase/
        ├── client.ts       # ブラウザ用クライアント
        ├── server.ts       # サーバーコンポーネント用クライアント
        ├── static.ts       # ビルド時（generateStaticParams）用クライアント
        └── types.ts        # TypeScript型定義

supabase/
├── schema.sql              # テーブル・インデックス・RLS定義
└── seed.sql                # 初期店舗データ10件
```
