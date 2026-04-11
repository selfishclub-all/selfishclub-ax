"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "공유회", href: "/sharing" },
  { label: "챌린지/워크숍", href: "/challenge" },
  { label: "커뮤니티 행사", href: "/community" },
  { label: "멤버십", href: "/membership" },
  { label: "블로그", href: "/blog" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between px-5 lg:px-10">
        <Link href="/" className="text-base font-bold tracking-[0.2em] text-white uppercase">
          Selfish Club
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-white/50 hover:text-white tracking-wide transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-[13px] text-white/50 hover:text-white tracking-wide transition-colors duration-300"
          >
            로그인
          </Link>
          <Link
            href="/membership"
            className="hidden sm:inline-flex text-[13px] text-[#0A0A0A] bg-[#FFD700] font-semibold px-4 py-1.5 rounded tracking-wide hover:bg-[#E5C200] transition-colors duration-300"
          >
            시작하기
          </Link>
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            aria-label="메뉴"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-t border-white/5 px-5 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/5 pt-4 mt-2 flex flex-col gap-3">
              <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">
                로그인
              </Link>
              <Link
                href="/membership"
                className="text-sm text-[#0A0A0A] bg-[#FFD700] font-semibold px-4 py-2 rounded text-center hover:bg-[#E5C200] transition-colors"
              >
                시작하기
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
