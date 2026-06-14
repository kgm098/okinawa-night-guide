import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { AREA_LABEL, GENRE_LABEL } from "@/lib/labels";
import type { Shop } from "@/lib/supabase/types";
import { getStorageUrl, getGalleryUrls } from "@/lib/storage";
import ShopInfoRow from "@/components/ShopInfoRow";
import RelatedShops from "@/components/RelatedShops";

// ----------------------------------------------------------------
// Static params（cookies() が使えないのでstaticクライアントを使用）
// Supabase未接続時は空配列を返してISRにフォールバック
// ----------------------------------------------------------------
export async function generateStaticParams() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!url.startsWith("http")) return [];
  try {
    const supabase = createStaticClient();
    const { data } = await supabase.from("shops").select("slug");
    const rows = (data ?? []) as { slug: string }[];
    return rows.map((row) => ({ slug: row.slug }));
  } catch {
    return [];
  }
}

// ----------------------------------------------------------------
// Metadata
// ----------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("shops")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "店舗が見つかりません | 沖縄ナイトガイド" };

  const shop = data as Shop;
  const areaLabel = AREA_LABEL[shop.area];
  const location = shop.sub_area ? `${areaLabel}・${shop.sub_area}` : areaLabel;

  return {
    title: `${shop.name} | 沖縄ナイトガイド`,
    description:
      shop.catch_copy ??
      `${shop.name}（${location}）の店舗詳細ページです。`,
  };
}

// ----------------------------------------------------------------
// Icons (inline SVG snippets)
// ----------------------------------------------------------------
const IconClock = (
  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
  </svg>
);
const IconMap = (
  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
const IconInstagram = (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.226 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-1.617.074-3.057.4-4.19 1.534C1.729 2.74 1.403 4.18 1.329 5.797.986 7.277.972 7.741.972 12s.014 4.723.072 4.947c.074 1.617.4 3.057 1.534 4.19 1.133 1.134 2.573 1.46 4.19 1.534C7.333 23.986 7.741 24 12 24s4.667-.014 4.947-.072c1.617-.074 3.057-.4 4.19-1.534 1.134-1.133 1.46-2.573 1.534-4.19.058-1.28.072-1.688.072-4.947s-.014-4.667-.072-4.947c-.074-1.617-.4-3.057-1.534-4.19C20.004.472 18.564.146 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const IconWeb = (
  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.96 8.96 0 00.284 2.253" />
  </svg>
);
const IconYen = (
  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7l3 5m0 0l3-5m-3 5v4m-3-1h6m-6 3h6M5 7h14" />
  </svg>
);
const IconCalendar = (
  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------
export const revalidate = 60;

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // メイン店舗取得
  const { data: shop } = await supabase
    .from("shops")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!shop) notFound();

  const typedShop = shop as Shop;

  const mainImageUrl = getStorageUrl(typedShop.main_image);
  const galleryUrls = getGalleryUrls(typedShop.gallery_images);

  // 関連店舗：同エリア・別slug・最大3件
  const { data: relatedRaw } = await supabase
    .from("shops")
    .select("*")
    .eq("area", typedShop.area)
    .neq("slug", slug)
    .limit(3);

  const related: Shop[] = relatedRaw ?? [];

  return (
    <main className="min-h-screen" style={{ background: "var(--color-night-bg)" }}>

      {/* ── ヒーロー画像 ── */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt={typedShop.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: "var(--color-night-navy)" }}
          >
            <span className="text-6xl opacity-20">🥃</span>
            <span className="text-xs tracking-widest opacity-30" style={{ color: "var(--color-night-muted)" }}>
              NO IMAGE
            </span>
          </div>
        )}

        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-[#0a0c14]/40 to-transparent" />

        {/* 戻るリンク */}
        <div className="absolute top-4 left-4">
          <Link
            href="/shops"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors hover:brightness-125"
            style={{
              background: "rgba(10,12,20,0.6)",
              color: "var(--color-night-muted)",
              border: "1px solid var(--color-night-border)",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            店舗一覧
          </Link>
        </div>

        {/* バッジ */}
        <div className="absolute top-4 right-4 flex gap-2">
          {typedShop.is_featured && (
            <span
              className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: "var(--color-night-gold)", color: "#0a0c14" }}
            >
              FEATURED
            </span>
          )}
          {typedShop.is_popular && (
            <span
              className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{
                background: "rgba(26,32,64,0.8)",
                color: "var(--color-night-gold-light)",
                border: "1px solid var(--color-night-gold)",
              }}
            >
              POPULAR
            </span>
          )}
        </div>

        {/* ヒーロー下部：店名・エリア */}
        <div className="absolute bottom-0 left-0 w-full px-4 sm:px-8 pb-6">
          <p className="text-xs tracking-widest mb-1" style={{ color: "var(--color-night-gold)" }}>
            {AREA_LABEL[typedShop.area]}
            {typedShop.sub_area && ` / ${typedShop.sub_area}`}
          </p>
          <h1
            className="text-2xl sm:text-4xl font-bold tracking-wide leading-tight"
            style={{ color: "var(--color-night-text)" }}
          >
            {typedShop.name}
          </h1>
          {typedShop.catch_copy && (
            <p
              className="mt-1.5 text-sm italic"
              style={{ color: "var(--color-night-gold-light)" }}
            >
              {typedShop.catch_copy}
            </p>
          )}
        </div>
      </div>

      {/* ── コンテンツ ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* ジャンル & タグ */}
        <section className="flex flex-wrap gap-2">
          {typedShop.genres.map((g) => (
            <span
              key={g}
              className="text-xs font-semibold px-3 py-1 rounded"
              style={{
                background: "var(--color-night-navy)",
                color: "var(--color-night-gold-light)",
                border: "1px solid var(--color-night-border)",
              }}
            >
              {GENRE_LABEL[g]}
            </span>
          ))}
          {typedShop.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "var(--color-night-muted)",
                border: "1px solid var(--color-night-border)",
              }}
            >
              #{tag}
            </span>
          ))}
        </section>

        {/* 店舗紹介 */}
        {typedShop.description && (
          <section>
            <SectionTitle>店舗紹介</SectionTitle>
            <p
              className="text-sm leading-[1.9] whitespace-pre-wrap"
              style={{ color: "var(--color-night-text)" }}
            >
              {typedShop.description}
            </p>
          </section>
        )}

        {/* 基本情報 */}
        <section>
          <SectionTitle>基本情報</SectionTitle>
          <dl>
            <ShopInfoRow label="営業時間" value={typedShop.business_hours} icon={IconClock} />
            <ShopInfoRow label="定休日"   value={typedShop.closed_days}    icon={IconCalendar} />
            <ShopInfoRow label="予算"     value={typedShop.budget}         icon={IconYen} />
            <ShopInfoRow label="住所"     value={typedShop.address}        icon={IconMap} />
          </dl>
        </section>

        {/* リンク */}
        {(typedShop.google_map_url || typedShop.instagram_url || typedShop.website_url) && (
          <section>
            <SectionTitle>リンク</SectionTitle>
            <dl>
              <ShopInfoRow
                label="Google Map"
                value={typedShop.google_map_url ? "地図を開く" : null}
                href={typedShop.google_map_url ?? undefined}
                icon={IconMap}
                external
              />
              <ShopInfoRow
                label="Instagram"
                value={typedShop.instagram_url ? "@instagram" : null}
                href={typedShop.instagram_url ?? undefined}
                icon={IconInstagram}
                external
              />
              <ShopInfoRow
                label="公式サイト"
                value={typedShop.website_url ? "サイトを開く" : null}
                href={typedShop.website_url ?? undefined}
                icon={IconWeb}
                external
              />
            </dl>
          </section>
        )}

        {/* ギャラリー */}
        {galleryUrls.length > 0 && (
          <section>
            <SectionTitle>ギャラリー</SectionTitle>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {galleryUrls.map((url, i) => (
                <li key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={url}
                    alt={`${typedShop.name} gallery ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 関連店舗 */}
        <RelatedShops shops={related} />

      </div>
    </main>
  );
}

// ----------------------------------------------------------------
// 小コンポーネント
// ----------------------------------------------------------------
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2
        className="text-xs font-bold tracking-[0.2em] uppercase"
        style={{ color: "var(--color-night-gold)" }}
      >
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: "var(--color-night-border)" }} />
    </div>
  );
}
