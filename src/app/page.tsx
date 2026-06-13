import type { Metadata } from "next";
import type { Shop } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/server";
import HomeHero from "@/components/HomeHero";
import AreaSection from "@/components/AreaSection";
import GenreSection from "@/components/GenreSection";
import HomeShopSection from "@/components/HomeShopSection";
import ListingCta from "@/components/ListingCta";

export const metadata: Metadata = {
  title: "沖縄ナイトガイド | 沖縄の夜を深く探す",
  description:
    "那覇・松山を中心に、地元が通うバーや隠れ家を厳選紹介。あなたの「今夜の一軒」が見つかります。",
};

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: popularRaw }, { data: featuredRaw }] = await Promise.all([
    supabase
      .from("shops")
      .select("*")
      .eq("is_popular", true)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("shops")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const popular: Shop[]  = popularRaw  ?? [];
  const featured: Shop[] = featuredRaw ?? [];

  return (
    <main style={{ background: "var(--color-night-bg)" }}>
      <HomeHero />
      <AreaSection />
      <GenreSection />
      <HomeShopSection
        id="popular"
        labelEn="Popular Shops"
        labelJa="人気店舗"
        shops={popular}
        bgSurface
      />
      <HomeShopSection
        id="featured"
        labelEn="Editor's Choice"
        labelJa="編集部おすすめ"
        shops={featured}
      />
      <ListingCta />
    </main>
  );
}
