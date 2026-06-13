import Link from "next/link";
import {
  AREA_FILTER_LABEL,
  GENRE_FILTER_LABEL,
} from "@/lib/labels";

const AREA_CHIPS = [
  { label: "那覇（全域）", query: "naha" },
  { label: "松山",        query: "matsuyama" },
  { label: "久茂地",      query: "kumoji" },
  { label: "美栄橋",      query: "miebashi" },
  { label: "若狭",        query: "wakasa" },
  { label: "桜坂",        query: "sakurazaka" },
  { label: "北谷",        query: "chatan" },
] as const;

const GENRE_CHIPS = [
  { label: "BAR",          query: "bar" },
  { label: "居酒屋",       query: "izakaya" },
  { label: "ラウンジ",     query: "lounge" },
  { label: "一人飲み",     query: "solo" },
  { label: "デート",       query: "date" },
  { label: "深夜営業",     query: "latenight" },
  { label: "ウイスキーバー", query: "whisky" },
  { label: "カクテルバー",  query: "cocktail" },
] as const;

interface ShopFiltersProps {
  currentArea?: string;
  currentGenre?: string;
}

export default function ShopFilters({
  currentArea,
  currentGenre,
}: ShopFiltersProps) {
  const hasFilter = !!(currentArea || currentGenre);

  const areaLabel  = currentArea  ? AREA_FILTER_LABEL[currentArea]   : null;
  const genreLabel = currentGenre ? GENRE_FILTER_LABEL[currentGenre] : null;

  return (
    <div className="space-y-5">

      {/* アクティブ絞り込みバー */}
      {hasFilter && (
        <div
          className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <span
            className="text-xs tracking-widest"
            style={{ color: "var(--color-night-gold)" }}
          >
            絞り込み中：
          </span>

          {areaLabel && (
            <ActiveBadge label={`エリア：${areaLabel}`} removeHref={currentGenre ? `/shops?genre=${currentGenre}` : "/shops"} />
          )}
          {genreLabel && (
            <ActiveBadge label={`ジャンル：${genreLabel}`} removeHref={currentArea ? `/shops?area=${currentArea}` : "/shops"} />
          )}

          <Link
            href="/shops"
            className="ml-auto text-[11px] tracking-widest transition-colors hover:text-[var(--color-night-gold)]"
            style={{ color: "var(--color-night-muted)" }}
          >
            すべて解除 ×
          </Link>
        </div>
      )}

      {/* エリアチップ */}
      <div>
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-2.5"
          style={{ color: "var(--color-night-muted)" }}
        >
          Area
        </p>
        <div className="flex flex-wrap gap-2">
          {AREA_CHIPS.map(({ label, query }) => {
            const isActive = currentArea === query;
            const href = isActive
              ? currentGenre ? `/shops?genre=${currentGenre}` : "/shops"
              : currentGenre
                ? `/shops?area=${query}&genre=${currentGenre}`
                : `/shops?area=${query}`;
            return (
              <FilterChip
                key={query}
                label={label}
                href={href}
                active={isActive}
              />
            );
          })}
        </div>
      </div>

      {/* ジャンルチップ */}
      <div>
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-2.5"
          style={{ color: "var(--color-night-muted)" }}
        >
          Genre
        </p>
        <div className="flex flex-wrap gap-2">
          {GENRE_CHIPS.map(({ label, query }) => {
            const isActive = currentGenre === query;
            const href = isActive
              ? currentArea ? `/shops?area=${currentArea}` : "/shops"
              : currentArea
                ? `/shops?area=${currentArea}&genre=${query}`
                : `/shops?genre=${query}`;
            return (
              <FilterChip
                key={query}
                label={label}
                href={href}
                active={isActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 小コンポーネント ─────────────────────────────────────────────

function FilterChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-150 hover:-translate-y-px"
      style={
        active
          ? {
              background: "var(--color-night-gold)",
              color: "#0a0c14",
              border: "1px solid var(--color-night-gold)",
            }
          : {
              background: "var(--color-night-card)",
              color: "var(--color-night-muted)",
              border: "1px solid var(--color-night-border)",
            }
      }
    >
      {active && <span className="text-[10px]">✓</span>}
      {label}
    </Link>
  );
}

function ActiveBadge({
  label,
  removeHref,
}: {
  label: string;
  removeHref: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full text-xs"
      style={{
        background: "var(--color-night-navy)",
        color: "var(--color-night-gold-light)",
        border: "1px solid var(--color-night-gold)",
      }}
    >
      {label}
      <Link
        href={removeHref}
        aria-label={`${label}を解除`}
        className="w-4 h-4 flex items-center justify-center rounded-full text-[10px] transition-colors hover:bg-white/10"
        style={{ color: "var(--color-night-gold)" }}
      >
        ×
      </Link>
    </span>
  );
}
