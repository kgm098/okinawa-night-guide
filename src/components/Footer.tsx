import Link from "next/link";

const FOOTER_LINKS = [
  { label: "店舗一覧",           href: "/shops" },
  { label: "掲載について",       href: "/listing-info" },
  { label: "お問い合わせ",       href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy" },
] as const;

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: "var(--color-night-surface)",
        borderTop: "1px solid var(--color-night-border)",
      }}
    >
      {/* 上部ゴールドライン */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-night-gold), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        {/* 上段：ブランド + ナビ */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 mb-10">

          {/* ブランド */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-3 group">
              <span
                className="block text-[9px] tracking-[0.3em] uppercase mb-0.5"
                style={{ color: "var(--color-night-gold)" }}
              >
                Okinawa
              </span>
              <span
                className="block text-base font-bold tracking-widest transition-colors group-hover:text-[var(--color-night-gold-light)]"
                style={{ color: "var(--color-night-text)" }}
              >
                ナイトガイド
              </span>
            </Link>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--color-night-muted)" }}
            >
              那覇・松山を中心に、地元が通うバーや隠れ家を厳選紹介。
              沖縄の夜の「今夜の一軒」を見つけるガイドです。
            </p>
          </div>

          {/* ナビリンク */}
          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-1">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs tracking-widest transition-colors hover:text-[var(--color-night-gold-light)]"
                    style={{ color: "var(--color-night-muted)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 区切り線 */}
        <div
          className="w-full h-px mb-6"
          style={{ background: "var(--color-night-border)" }}
        />

        {/* 下段：コピーライト */}
        <p
          className="text-[11px] tracking-widest text-center"
          style={{ color: "var(--color-night-muted)" }}
        >
          © {new Date().getFullYear()} 沖縄ナイトガイド. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
