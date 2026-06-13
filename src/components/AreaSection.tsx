import Link from "next/link";

const AREAS = [
  { label: "那覇",   query: "naha",   sub: "中心街" },
  { label: "松山",   query: "naha",   sub: "那覇／ナイトスポット" },
  { label: "久茂地", query: "naha",   sub: "那覇／オフィス街" },
  { label: "美栄橋", query: "naha",   sub: "那覇／国際通り周辺" },
  { label: "若狭",   query: "naha",   sub: "那覇／海沿い" },
  { label: "桜坂",   query: "naha",   sub: "那覇／文化エリア" },
  { label: "北谷",   query: "chatan", sub: "アメリカンビレッジ" },
] as const;

export default function AreaSection() {
  return (
    <section
      id="area"
      className="py-16 px-4 sm:px-6"
      style={{ background: "var(--color-night-surface)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{ color: "var(--color-night-gold)" }}
            >
              Find by Area
            </p>
            <h2
              className="text-xl font-bold tracking-wide"
              style={{ color: "var(--color-night-text)" }}
            >
              エリアから探す
            </h2>
          </div>
          <div className="flex-1 h-px" style={{ background: "var(--color-night-border)" }} />
        </div>

        {/* エリアグリッド */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {AREAS.map(({ label, query, sub }) => (
            <li key={label}>
              <Link
                href={`/shops?area=${query}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(201,168,76,0.12)]"
                style={{
                  background: "var(--color-night-card)",
                  borderColor: "var(--color-night-border)",
                }}
              >
                <span
                  className="text-base font-bold tracking-wide transition-colors group-hover:text-[var(--color-night-gold)]"
                  style={{ color: "var(--color-night-text)" }}
                >
                  {label}
                </span>
                <span
                  className="text-[11px] leading-snug"
                  style={{ color: "var(--color-night-muted)" }}
                >
                  {sub}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
