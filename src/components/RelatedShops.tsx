import type { Shop } from "@/lib/supabase/types";
import ShopCard from "@/components/ShopCard";

interface RelatedShopsProps {
  shops: Shop[];
}

export default function RelatedShops({ shops }: RelatedShopsProps) {
  if (shops.length === 0) return null;

  return (
    <section className="mt-16">
      {/* セクションヘッダー */}
      <div className="flex items-center gap-4 mb-6">
        <h2
          className="text-sm font-bold tracking-[0.2em] uppercase"
          style={{ color: "var(--color-night-gold)" }}
        >
          Related Shops
        </h2>
        <div className="flex-1 h-px" style={{ background: "var(--color-night-border)" }} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shops.map((shop) => (
          <li key={shop.id}>
            <ShopCard shop={shop} />
          </li>
        ))}
      </ul>
    </section>
  );
}
