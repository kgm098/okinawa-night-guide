import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Shop } from "@/lib/supabase/types";
import {
  AREA_FILTER_LABEL,
  GENRE_FILTER_LABEL,
  SUB_AREA_MAP,
  isShopArea,
  isShopGenre,
} from "@/lib/labels";
import ShopCard from "@/components/ShopCard";
import ShopFilters from "@/components/ShopFilters";
import EmptyState from "@/components/EmptyState";

// ----------------------------------------------------------------
// Metadata（動的）
// ----------------------------------------------------------------
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ area?: string; genre?: string }>;
}): Promise<Metadata> {
  const { area, genre } = await searchParams;
  const areaLabel  = area  ? AREA_FILTER_LABEL[area]   : null;
  const genreLabel = genre ? GENRE_FILTER_LABEL[genre] : null;

  const suffix = [areaLabel, genreLabel].filter(Boolean).join(" × ");
  return {
    title: suffix
      ? `${suffix}の店舗一覧 | 沖縄ナイトガイド`
      : "店舗一覧 | 沖縄ナイトガイド",
    description: "沖縄の夜を彩るバー・クラブ・ラウンジを探そう。",
  };
}

export const revalidate = 60;

// ----------------------------------------------------------------
// タグ検索系 genre クエリ → Supabase tags の検索キーワード
// ----------------------------------------------------------------
const GENRE_TO_TAG: Record<string, string> = {
  solo:       "一人飲み",
  date:       "デート",
  latenight:  "深夜営業",
  whisky:     "ウイスキー",
  cocktail:   "カクテル",
};

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------
export default async function ShopsPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string; genre?: string }>;
}) {
  const { area, genre } = await searchParams;

  const supabase = await createClient();
  let query = supabase
    .from("shops")
    .select("*")
    .order("is_popular",  { ascending: false })
    .order("created_at",  { ascending: false });

  // ── エリア絞り込み ──────────────────────────────────────────
  if (area) {
    if (SUB_AREA_MAP[area]) {
      // 松山・久茂地などは sub_area で ILIKE 検索
      query = query.ilike("sub_area", `%${SUB_AREA_MAP[area]}%`);
    } else if (isShopArea(area)) {
      // naha / chatan など enum 値はそのまま
      query = query.eq("area", area);
    }
  }

  // ── ジャンル絞り込み ────────────────────────────────────────
  if (genre) {
    if (isShopGenre(genre)) {
      // genres 配列に含まれる
      query = query.contains("genres", [genre]);
    } else if (GENRE_TO_TAG[genre]) {
      // tags 配列に含まれる
      query = query.contains("tags", [GENRE_TO_TAG[genre]]);
    }
  }

  const { data, error } = await query;

  if (error) console.error("shops fetch error:", error.message);

  const list: Shop[] = data ?? [];
  const hasFilter = !!(area || genre);

  const areaLabel  = area  ? AREA_FILTER_LABEL[area]   : null;
  const genreLabel = genre ? GENRE_FILTER_LABEL[genre] : null;
  const filterLabel = [areaLabel, genreLabel].filter(Boolean).join(" × ");

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--color-night-bg)" }}
    >
      {/* ── ヘッダーバナー ── */}
      <section
        className="relative px-4 pt-12 pb-10 text-center overflow-hidden"
        style={{ background: "var(--color-night-surface)" }}
      >
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--color-night-gold), transparent)",
          }}
        />
        <p
          className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: "var(--color-night-gold)" }}
        >
          {hasFilter ? "Search Results" : "Okinawa Night Guide"}
        </p>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-wider mb-2"
          style={{ color: "var(--color-night-text)" }}
        >
          {hasFilter ? filterLabel : "店舗一覧"}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-night-muted)" }}>
          {hasFilter
            ? `${list.length} 件の店舗が見つかりました`
            : "沖縄の夜を彩るバー・クラブ・ラウンジを紹介します。"}
        </p>
      </section>

      {/* ── フィルター + グリッド ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* フィルターパネル */}
        <ShopFilters currentArea={area} currentGenre={genre} />

        {/* 件数バー */}
        <div className="flex items-center gap-4">
          <p className="text-sm shrink-0" style={{ color: "var(--color-night-muted)" }}>
            <span
              className="font-bold text-base"
              style={{ color: "var(--color-night-gold-light)" }}
            >
              {list.length}
            </span>
            &nbsp;件
          </p>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--color-night-border)" }}
          />
        </div>

        {/* グリッド or 空表示 */}
        {list.length === 0 ? (
          <EmptyState filtered={hasFilter} />
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((shop) => (
              <li key={shop.id}>
                <ShopCard shop={shop} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
