"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

interface MyPageData {
  user: { name: string; email: string; image: string | null };
  events: { iid: string; i_title: string; i_type: string; e_created_at: string; u_name: string }[];
  purchases: { iid: string; i_title: string; p_amount: number; p_created_at: string; u_name: string }[];
  vods: { iid: string; i_title: string; i_vodurl: string }[];
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

function formatPrice(amount: number) {
  if (!amount || amount === 0) return "무료";
  return `${amount.toLocaleString()}원`;
}

export default function MyPage() {
  const { data: session, isPending } = useSession();
  const [pageData, setPageData] = useState<MyPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/mypage")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) setPageData(result.data);
      })
      .finally(() => setLoading(false));
  }, [session]);

  if (isPending) {
    return (
      <>
        <Header />
        <main className="pt-14 min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <p className="text-white/40">로딩 중...</p>
        </main>
      </>
    );
  }

  if (!session?.user) {
    return (
      <>
        <Header />
        <main className="pt-14 min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-white mb-4">로그인이 필요합니다</p>
            <p className="text-white/40 mb-8">카카오 로그인 후 이용할 수 있어요.</p>
            <Link
              href="/login"
              className="inline-flex bg-[#E2E545] text-[#0A0A0A] font-bold text-sm px-6 py-3 rounded-full"
            >
              로그인하기
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen bg-[#0A0A0A]">
        {/* 프로필 */}
        <section className="border-b border-white/5">
          <div className="max-w-3xl mx-auto px-5 lg:px-10 py-12 lg:py-16">
            <div className="flex items-center gap-5">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="프로필"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-xl font-bold">
                  {session.user.name?.charAt(0) || "?"}
                </div>
              )}
              <div>
                <p className="text-xl font-bold text-white">{session.user.name}</p>
                <p className="text-sm text-white/40">{session.user.email}</p>
              </div>
              <button
                onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
                className="ml-auto text-xs text-white/30 border border-white/10 px-3 py-1.5 rounded hover:text-white/50 hover:border-white/20 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 lg:px-10 py-10 lg:py-14 space-y-14">
          {/* VOD */}
          {pageData?.vods && pageData.vods.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-xs text-[#E2E545] tracking-[0.2em] uppercase font-mono">VOD</p>
                <span className="text-xs text-white/20">{pageData.vods.length}개</span>
              </div>
              <div className="space-y-3">
                {pageData.vods.map((vod) => (
                  <a
                    key={vod.iid}
                    href={vod.i_vodurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg p-4 hover:border-[#E2E545]/30 transition-colors group"
                  >
                    <div>
                      <p className="text-base font-medium text-white group-hover:text-[#E2E545] transition-colors">
                        {vod.i_title}
                      </p>
                      <p className="text-xs text-white/30 mt-1">VOD 보러가기</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/20 group-hover:text-[#E2E545] transition-colors shrink-0">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 신청 내역 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-mono">신청 내역</p>
              <span className="text-xs text-white/20">{pageData?.events?.length ?? 0}개</span>
            </div>
            {loading ? (
              <p className="text-white/30 text-sm">불러오는 중...</p>
            ) : pageData?.events && pageData.events.length > 0 ? (
              <div className="space-y-2">
                {pageData.events.map((evt, i) => (
                  <div key={`${evt.iid}-${i}`} className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
                    <div>
                      <p className="text-sm font-medium text-white">{evt.i_title}</p>
                      <p className="text-xs text-white/30 mt-1">{formatDate(evt.e_created_at)}</p>
                    </div>
                    <span className="text-[10px] text-white/20 bg-white/5 px-2 py-1 rounded">
                      {evt.i_type === "sharing" ? "공유회" : evt.i_type === "challenge" ? "챌린지" : evt.i_type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                <p className="text-white/30 text-sm">아직 신청한 프로그램이 없어요</p>
              </div>
            )}
          </section>

          {/* 구매 내역 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-mono">구매 내역</p>
              <span className="text-xs text-white/20">{pageData?.purchases?.length ?? 0}개</span>
            </div>
            {loading ? (
              <p className="text-white/30 text-sm">불러오는 중...</p>
            ) : pageData?.purchases && pageData.purchases.length > 0 ? (
              <div className="space-y-2">
                {pageData.purchases.map((p, i) => (
                  <div key={`${p.iid}-${i}`} className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
                    <div>
                      <p className="text-sm font-medium text-white">{p.i_title}</p>
                      <p className="text-xs text-white/30 mt-1">{formatDate(p.p_created_at)}</p>
                    </div>
                    <span className="text-sm font-medium text-white">
                      {formatPrice(p.p_amount)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                <p className="text-white/30 text-sm">아직 구매한 프로그램이 없어요</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
