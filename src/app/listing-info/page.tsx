import type { Metadata } from "next";
import Link from "next/link";
import ListingInfoHero from "@/components/ListingInfoHero";
import ListingBenefitCard from "@/components/ListingBenefitCard";

export const metadata: Metadata = {
  title: "掲載について | 沖縄ナイトガイド",
  description:
    "沖縄ナイトガイドへの店舗掲載について。那覇・北谷を中心としたローカルナイトメディアに、あなたのお店を掲載しませんか。",
};

// ----------------------------------------------------------------
// データ定義
// ----------------------------------------------------------------
const SHOP_TYPES = [
  { emoji: "🍸", label: "BAR" },
  { emoji: "🍺", label: "居酒屋" },
  { emoji: "🍹", label: "カクテルバー" },
  { emoji: "🥃", label: "ウイスキーバー" },
  { emoji: "💨", label: "シーシャ" },
  { emoji: "🛋️", label: "ラウンジ" },
  { emoji: "☕", label: "夜カフェ" },
  { emoji: "🥩", label: "焼肉" },
  { emoji: "🌺", label: "沖縄料理" },
];

const BENEFITS = [
  {
    number: "01",
    title: "写真と紹介文で雰囲気を伝えられる",
    description:
      "Google検索だけでは伝わりにくいお店の空気感・こだわりを、写真と編集部の紹介文で丁寧に届けます。",
  },
  {
    number: "02",
    title: "観光客・出張客・一人飲み・デート利用に届く",
    description:
      "「那覇で今夜飲める店を探している」ユーザーにピンポイントで届きます。Googleマップには載りにくい夜の需要を取り込めます。",
  },
  {
    number: "03",
    title: "各種外部リンクへの導線を作れる",
    description:
      "Google Map、Instagram、公式サイトへのリンクを掲載ページに設置。お店のSNSやWeb資産と連携して集客を強化できます。",
  },
  {
    number: "04",
    title: "夜のお店専門の文脈で紹介される",
    description:
      "総合グルメサイトとは違い、夜のお店だけを集めたメディアに掲載されます。目的が明確なユーザーに刺さりやすい環境です。",
  },
];

const PAGE_CONTENTS = [
  "店舗写真（メイン＋ギャラリー）",
  "店名・エリア・サブエリア",
  "ジャンル（BAR / 居酒屋 など）",
  "雰囲気タグ（一人飲み・カップル向け など）",
  "編集部による紹介文",
  "営業時間・定休日・住所",
  "予算の目安",
  "Google Map リンク",
  "Instagram リンク",
  "公式サイトリンク",
];

const STEPS = [
  { step: "01", label: "相談",       note: "フォームまたはSNSからご連絡ください" },
  { step: "02", label: "店舗情報確認", note: "写真・紹介文などをヒアリングします" },
  { step: "03", label: "ページ作成",  note: "編集部がページを制作します" },
  { step: "04", label: "公開",        note: "サイトに掲載・SNSでも告知します" },
  { step: "05", label: "修正対応",    note: "公開後も情報変更に対応します" },
];

// ----------------------------------------------------------------
// ページ
// ----------------------------------------------------------------
export default function ListingInfoPage() {
  return (
    <main style={{ background: "var(--color-night-bg)" }}>

      {/* ① ファーストビュー */}
      <ListingInfoHero />

      {/* ② 掲載できる店舗 */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-night-bg)" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader en="Shop Types" ja="掲載できる店舗" />
          <ul className="flex flex-wrap gap-3 mt-8">
            {SHOP_TYPES.map(({ emoji, label }) => (
              <li key={label}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
                  style={{
                    background: "var(--color-night-card)",
                    color: "var(--color-night-text)",
                    border: "1px solid var(--color-night-border)",
                  }}
                >
                  <span className="text-base">{emoji}</span>
                  {label}
                </span>
              </li>
            ))}
          </ul>
          <p
            className="mt-5 text-xs"
            style={{ color: "var(--color-night-muted)" }}
          >
            ※ 上記以外のジャンルもご相談ください。
          </p>
        </div>
      </section>

      {/* ③ 掲載のメリット */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ background: "var(--color-night-surface)" }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionHeader en="Benefits" ja="掲載のメリット" />
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <li key={b.number}>
                <ListingBenefitCard {...b} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ④ 掲載ページに載せる内容 */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-night-bg)" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader en="Page Contents" ja="掲載ページに載せる内容" />
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PAGE_CONTENTS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: "var(--color-night-card)",
                  border: "1px solid var(--color-night-border)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--color-night-gold)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-night-text)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ⑤ 掲載までの流れ */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ background: "var(--color-night-surface)" }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionHeader en="How It Works" ja="掲載までの流れ" />
          <ol className="mt-8 space-y-0">
            {STEPS.map(({ step, label, note }, i) => (
              <li key={step} className="flex gap-4">
                {/* 左：ステップ番号 + コネクター線 */}
                <div className="flex flex-col items-center gap-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      background: "var(--color-night-gold)",
                      color: "#0a0c14",
                    }}
                  >
                    {step}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{
                        background: "var(--color-night-border)",
                        minHeight: "2rem",
                      }}
                    />
                  )}
                </div>
                {/* 右：テキスト */}
                <div className="pb-8">
                  <p
                    className="text-sm font-semibold tracking-wide leading-none mb-1"
                    style={{ color: "var(--color-night-text)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-night-muted)" }}
                  >
                    {note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ⑥ CTA + 連絡先 */}
      <section
        id="contact"
        className="relative py-20 px-5 text-center overflow-hidden"
        style={{ background: "var(--color-night-navy)" }}
      >
        {/* 上下ゴールドライン */}
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
        {/* グロー */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-md mx-auto space-y-6">
          <p
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--color-night-gold)" }}
          >
            Contact
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wide"
            style={{ color: "var(--color-night-text)" }}
          >
            まずはお気軽に
            <br />
            ご相談ください。
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-night-muted)" }}
          >
            掲載費用・掲載方法・エリア対象など、
            <br />
            どんなことでもお気軽にお問い合わせください。
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold tracking-widest text-sm transition-all hover:brightness-110 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-night-gold), #a8832a)",
                color: "#0a0c14",
              }}
            >
              掲載について相談する
            </Link>
          </div>

          {/* 仮の連絡先テキスト */}
          <div
            className="mt-2 py-4 px-5 rounded-xl text-left space-y-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--color-night-border)",
            }}
          >
            <p
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "var(--color-night-muted)" }}
            >
              Contact Info
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--color-night-muted)" }}
            >
              📧 お問い合わせ先：<span style={{ color: "var(--color-night-gold-light)" }}>contact@okinawa-nightguide.jp（仮）</span>
              <br />
              📱 Instagram DM：<span style={{ color: "var(--color-night-gold-light)" }}>@okinawa_nightguide（仮）</span>
              <br />
              <span className="opacity-60">※ 問い合わせフォームは近日公開予定です。</span>
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

// ----------------------------------------------------------------
// 小コンポーネント
// ----------------------------------------------------------------
function SectionHeader({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="shrink-0">
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{ color: "var(--color-night-gold)" }}
        >
          {en}
        </p>
        <h2
          className="text-xl font-bold tracking-wide"
          style={{ color: "var(--color-night-text)" }}
        >
          {ja}
        </h2>
      </div>
      <div className="flex-1 h-px" style={{ background: "var(--color-night-border)" }} />
    </div>
  );
}
