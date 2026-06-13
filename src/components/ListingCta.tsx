import Link from "next/link";

export default function ListingCta() {
  return (
    <section
      className="relative py-20 px-5 text-center overflow-hidden"
      style={{ background: "var(--color-night-navy)" }}
    >
      {/* 背景グロー */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.09) 0%, transparent 70%)",
        }}
      />
      {/* 上下ライン */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-night-gold), transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-night-gold), transparent)",
        }}
      />

      <div className="relative max-w-md mx-auto">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--color-night-gold)" }}
        >
          For Shop Owners
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-wide mb-4"
          style={{ color: "var(--color-night-text)" }}
        >
          あなたのお店を、
          <br />
          夜の沖縄に届けよう。
        </h2>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "var(--color-night-muted)" }}
        >
          沖縄ナイトガイドでは、バー・居酒屋・ラウンジなどの
          <br className="hidden sm:block" />
          店舗掲載を受け付けています。
          <br />
          まずはお気軽にご相談ください。
        </p>
        <Link
          href="/listing-info"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold tracking-widest text-sm transition-all hover:brightness-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, var(--color-night-gold), #a8832a)",
            color: "#0a0c14",
          }}
        >
          掲載について相談する
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
