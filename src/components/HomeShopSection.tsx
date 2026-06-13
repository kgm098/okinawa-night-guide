import Link from "next/link";
import type { Shop } from "@/lib/supabase/types";
import ShopCard from "@/components/ShopCard";

interface HomeShopSectionProps {
  id?: string;
  labelEn: string;
  labelJa: string;
  shops: Shop[];
  bgSurface?: boolean;
}

export default function HomeShopSection({
  id,
  labelEn,
  labelJa,
  shops,
  bgSurface = false,
}: HomeShopSectionProps) {
  if (shops.length === 0) return null;

  return (
    <section
      id={id}
      className="py-16 px-4 sm:px-6"
      style={{
        background: bgSurface
          ? "var(--color-night-surface)"
          : "var(--color-night-bg)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="shrink-0">
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{ color: "var(--color-night-gold)" }}
            >
              {labelEn}
            </p>
            <h2
              className="text-xl font-bold tracking-wide"
              style={{ color: "var(--color-night-text)" }}
            >
              {labelJa}
            </h2>
          </div>
          <div className="flex-1 h-px" style={{ background: "var(--color-night-border)" }} />
          <Link
            href="/shops"
            className="shrink-0 text-xs tracking-widest transition-colors hover:underline"
            style={{ color: "var(--color-night-muted)" }}
          >
            すべて見る →
          </Link>
        </div>

        {/* グリッド */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shops.map((shop) => (
            <li key={shop.id}>
              <ShopCard shop={shop} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
