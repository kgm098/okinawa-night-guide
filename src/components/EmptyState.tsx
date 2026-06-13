import Link from "next/link";

interface EmptyStateProps {
  filtered?: boolean;
}

export default function EmptyState({ filtered = false }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-5 rounded-2xl"
      style={{
        background: "var(--color-night-surface)",
        border: "1px solid var(--color-night-border)",
      }}
    >
      <span className="text-5xl opacity-25">🍸</span>
      <div className="text-center space-y-1.5">
        <p
          className="text-sm font-medium tracking-widest"
          style={{ color: "var(--color-night-text)" }}
        >
          {filtered ? "該当する店舗が見つかりません" : "店舗データがありません"}
        </p>
        <p className="text-xs" style={{ color: "var(--color-night-muted)" }}>
          {filtered
            ? "条件を変えて再度お試しください"
            : "Supabase に seed.sql を実行してください"}
        </p>
      </div>
      {filtered && (
        <Link
          href="/shops"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-widest transition-all hover:brightness-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, var(--color-night-gold), #a8832a)",
            color: "#0a0c14",
          }}
        >
          絞り込みを解除
        </Link>
      )}
    </div>
  );
}
