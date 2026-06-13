import Link from "next/link";

const GENRES = [
  { label: "BAR",        query: "bar",      emoji: "🍸" },
  { label: "居酒屋",     query: "izakaya",  emoji: "🍺" },
  { label: "一人飲み",   query: "solo",     emoji: "🥃" },
  { label: "デート",     query: "date",     emoji: "🕯️" },
  { label: "深夜営業",   query: "latenight",emoji: "🌙" },
  { label: "ウイスキーバー", query: "whisky", emoji: "🪨" },
  { label: "カクテルバー",   query: "cocktail", emoji: "🍹" },
] as const;

export default function GenreSection() {
  return (
    <section
      id="genre"
      className="py-16 px-4 sm:px-6"
      style={{ background: "var(--color-night-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{ color: "var(--color-night-gold)" }}
            >
              Find by Genre
            </p>
            <h2
              className="text-xl font-bold tracking-wide"
              style={{ color: "var(--color-night-text)" }}
            >
              ジャンルから探す
            </h2>
          </div>
          <div className="flex-1 h-px" style={{ background: "var(--color-night-border)" }} />
        </div>

        {/* ジャンルチップ */}
        <ul className="flex flex-wrap gap-3">
          {GENRES.map(({ label, query, emoji }) => (
            <li key={label}>
              <Link
                href={`/shops?genre=${query}`}
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_14px_rgba(201,168,76,0.15)]"
                style={{
                  background: "var(--color-night-card)",
                  borderColor: "var(--color-night-border)",
                  color: "var(--color-night-muted)",
                }}
              >
                <span className="text-base leading-none">{emoji}</span>
                <span
                  className="text-sm font-medium tracking-wide transition-colors group-hover:text-[var(--color-night-gold-light)]"
                  style={{ color: "var(--color-night-text)" }}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
