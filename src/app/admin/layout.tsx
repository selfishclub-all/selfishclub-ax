"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const sidebarItems = [
  { label: "대시보드", href: "/admin", icon: "📊" },
  { label: "프로그램 관리", href: "/admin/programs", icon: "📋" },
  { label: "블로그", href: "/admin/blog", icon: "✏️" },
  { label: "AI 툴", href: "/admin/aitools", icon: "🤖" },
  { label: "회원 관리", href: "/admin/members", icon: "👥" },
  { label: "결제 내역", href: "/admin/payments", icon: "💳" },
  { label: "알림톡", href: "/admin/notifications", icon: "📱" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 쿠키 확인 — 서버에서 체크하므로 페이지가 렌더되면 인증된 것
    const hasAuth = document.cookie.includes("admin_auth=true");
    if (hasAuth) {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const result = await res.json();
    if (result.data?.success) {
      setAuthed(true);
    } else {
      setError(result.error || "비밀번호가 틀렸습니다");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white/40">확인 중...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">SC Admin</h1>
          <p className="text-sm text-white/40 mb-8 text-center">관리자 비밀번호를 입력하세요</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded text-base text-white placeholder:text-white/30 focus:outline-none focus:border-[#E2E545]/50 mb-3"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-[#E2E545] text-[#0A0A0A] font-bold text-sm py-3.5 rounded">
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-[#0A0A0A] text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-[#222]">
          <Link href="/admin" className="text-lg font-bold">
            SC Admin
          </Link>
          <p className="text-xs text-[#888888] mt-1">셀피쉬클럽 관리자</p>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#222] transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-5 border-t border-[#222]">
          <Link href="/" className="text-xs text-[#888888] hover:text-white transition-colors">
            ← 홈페이지로
          </Link>
        </div>
      </aside>
      <main className="flex-1 bg-[#F5F5F0] p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
