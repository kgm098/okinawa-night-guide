import Link from "next/link";

export default function HomeHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[92svh] px-5 text-center overflow-hidden"
      style={{ background: "var(--color-night-bg)" }}
    >
      {/* 背景装飾 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-night-gold), transparent)",
        }}
      />

      {/* ラベル */}
      <p
        className="text-[10px] tracking-[0.4em] uppercase mb-6"
        style={{ color: "var(--color-night-gold)" }}
      >
        Okinawa Night Guide 2.0
      </p>

      {/* メインコピー */}
      <h1
        className="text-4xl sm:text-5xl font-bold tracking-wide leading-tight mb-5"
        style={{ color: "var(--color-night-text)" }}
      >
        沖縄の夜を、<br />
        もっと深く探す。
      </h1>

      {/* サブコピー */}
      <p
        className="text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm mb-10"
        style={{ color: "var(--color-night-muted)" }}
      >
        那覇・松山を中心に、地元が通うバーや隠れ家を厳選紹介。
        <br className="hidden sm:block" />
        あなたの「今夜の一軒」が見つかります。
      </p>

      {/* CTAボタン群 */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md">
        <Link
          href="/shops"
          className="flex items-center justify-center flex-1 py-3.5 rounded-xl font-semibold tracking-widest text-sm transition-all hover:brightness-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, var(--color-night-gold), #a8832a)",
            color: "#0a0c14",
          }}
        >
          店舗一覧を見る
        </Link>
        <Link
          href="#area"
          className="flex items-center justify-center flex-1 py-3.5 rounded-xl font-semibold tracking-widest text-sm transition-all hover:brightness-110 active:scale-95"
          style={{
            background: "var(--color-night-surface)",
            color: "var(--color-night-text)",
            border: "1px solid var(--color-night-border)",
          }}
        >
          エリアから探す
        </Link>
        <Link
          href="#genre"
          className="flex items-center justify-center flex-1 py-3.5 rounded-xl font-semibold tracking-widest text-sm transition-all hover:brightness-110 active:scale-95"
          style={{
            background: "var(--color-night-surface)",
            color: "var(--color-night-text)",
            border: "1px solid var(--color-night-border)",
          }}
        >
          ジャンルから探す
        </Link>
      </div>

      {/* スクロール示唆 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <span className="text-[10px] tracking-widest" style={{ color: "var(--color-night-muted)" }}>
          SCROLL
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
          style={{ color: "var(--color-night-muted)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
