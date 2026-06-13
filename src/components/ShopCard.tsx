import Link from "next/link";
import Image from "next/image";
import type { Shop } from "@/lib/supabase/types";
import { AREA_LABEL, GENRE_LABEL } from "@/lib/labels";

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const imageUrl = shop.main_image
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop-images/${shop.main_image}`
    : null;

  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(201,168,76,0.18)]"
      style={{
        background: "var(--color-night-card)",
        borderColor: "var(--color-night-border)",
      }}
    >
      {/* 画像エリア */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={shop.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: "var(--color-night-navy)" }}
          >
            <span className="text-4xl opacity-30">🥃</span>
            <span className="text-xs tracking-widest opacity-30" style={{ color: "var(--color-night-muted)" }}>
              NO IMAGE
            </span>
          </div>
        )}

        {/* バッジ群 */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {shop.is_featured && (
            <span
              className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: "var(--color-night-gold)", color: "#0a0c14" }}
            >
              FEATURED
            </span>
          )}
          {shop.is_popular && (
            <span
              className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: "#1a2040", color: "var(--color-night-gold-light)", border: "1px solid var(--color-night-gold)" }}
            >
              POPULAR
            </span>
          )}
        </div>
      </div>

      {/* 本文エリア */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* エリア & サブエリア */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-night-muted)" }}>
          <span>{AREA_LABEL[shop.area]}</span>
          {shop.sub_area && (
            <>
              <span className="opacity-40">/</span>
              <span>{shop.sub_area}</span>
            </>
          )}
        </div>

        {/* 店名 */}
        <h2
          className="text-lg font-bold leading-snug tracking-wide"
          style={{ color: "var(--color-night-text)" }}
        >
          {shop.name}
        </h2>

        {/* キャッチコピー */}
        {shop.catch_copy && (
          <p className="text-xs italic leading-relaxed line-clamp-2" style={{ color: "var(--color-night-gold-light)" }}>
            {shop.catch_copy}
          </p>
        )}

        {/* ジャンル */}
        {shop.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {shop.genres.map((g) => (
              <span
                key={g}
                className="text-[11px] px-2 py-0.5 rounded"
                style={{
                  background: "var(--color-night-navy)",
                  color: "var(--color-night-gold-light)",
                  border: "1px solid var(--color-night-border)",
                }}
              >
                {GENRE_LABEL[g]}
              </span>
            ))}
          </div>
        )}

        {/* タグ */}
        {shop.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {shop.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--color-night-muted)",
                  border: "1px solid var(--color-night-border)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 区切り線 */}
        <div className="border-t" style={{ borderColor: "var(--color-night-border)" }} />

        {/* 営業時間 */}
        {shop.business_hours && (
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-night-muted)" }}>
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            <span>{shop.business_hours}</span>
          </div>
        )}

        {/* 詳細ボタン */}
        <div className="mt-auto pt-1">
          <Link
            href={`/shops/${shop.slug}`}
            className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold tracking-widest transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, var(--color-night-gold), #a8832a)",
              color: "#0a0c14",
            }}
          >
            詳細を見る
          </Link>
        </div>
      </div>
    </article>
  );
}
