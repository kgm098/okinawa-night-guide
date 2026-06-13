"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "店舗一覧",       href: "/shops" },
  { label: "エリアから探す", href: "/shops" },
  { label: "ジャンルから探す", href: "/shops" },
  { label: "掲載について",   href: "/listing-info" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // スクロールで背景を不透明に切り替え
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ルート変更でメニューを閉じる
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10,12,20,0.95)"
            : "rgba(10,12,20,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid var(--color-night-border)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

          {/* ロゴ */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
          >
            <span
              className="text-[9px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: "var(--color-night-gold)" }}
            >
              Okinawa
            </span>
            <span
              className="text-sm font-bold tracking-widest transition-colors group-hover:text-[var(--color-night-gold-light)]"
              style={{ color: "var(--color-night-text)" }}
            >
              ナイトガイド
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs tracking-widest transition-colors hover:text-[var(--color-night-gold-light)]"
                style={{
                  color:
                    pathname === href
                      ? "var(--color-night-gold)"
                      : "var(--color-night-muted)",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* モバイル：ハンバーガー */}
          <button
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition-colors"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--color-night-border)",
            }}
          >
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: "var(--color-night-text)",
                transform: menuOpen
                  ? "translateY(4px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "var(--color-night-text)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300 origin-center"
              style={{
                background: "var(--color-night-text)",
                transform: menuOpen
                  ? "translateY(-4px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* モバイルドロワー */}
      <div
        className="fixed inset-0 z-40 md:hidden pointer-events-none"
        aria-hidden={!menuOpen}
      >
        {/* オーバーレイ */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "rgba(0,0,0,0.6)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* パネル */}
        <nav
          className="absolute top-14 left-0 w-full transition-all duration-300"
          style={{
            background: "rgba(17,20,32,0.98)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--color-night-border)",
            pointerEvents: menuOpen ? "auto" : "none",
            transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <ul className="flex flex-col px-4 py-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-3 py-3.5 border-b text-sm tracking-widest transition-colors hover:text-[var(--color-night-gold-light)]"
                  style={{
                    borderColor: "var(--color-night-border)",
                    color:
                      pathname === href
                        ? "var(--color-night-gold)"
                        : "var(--color-night-text)",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: "var(--color-night-gold)" }}
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {/* モバイルCTA */}
          <div className="px-4 py-4">
            <Link
              href="/shops"
              className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold tracking-widest transition-all hover:brightness-110"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-night-gold), #a8832a)",
                color: "#0a0c14",
              }}
            >
              今すぐ店舗を探す
            </Link>
          </div>
        </nav>
      </div>

      {/* ヘッダー分の余白 */}
      <div className="h-14" aria-hidden />
    </>
  );
}
