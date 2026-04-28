"use client";

import { motion } from "motion/react";
import { useRef, useEffect } from "react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function SuccessPreviewPage() {
  /* 모바일 결제 복귀 시 서버 검증 (백그라운드) */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("paymentId") || params.get("payment_id");
    if (!paymentId) return;

    async function confirmInBackground(retries = 3, delay = 2000) {
      for (let attempt = 0; attempt < retries; attempt++) {
        if (attempt > 0) await new Promise((r) => setTimeout(r, delay));
        try {
          const res = await fetch("/api/payments/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, itemId: params.get("itemId") || "" }),
          });
          const result = await res.json();
          if (!result.error || result.error.includes("이미") || result.error.includes("저장 실패")) return;
          if (result.error.includes("완료되지 않") && attempt < retries - 1) continue;
        } catch {
          // 실패해도 결제 자체는 이미 완료됨
        }
      }
    }

    confirmInBackground();
  }, []);

  return (
    <div className="min-h-screen font-[Pretendard]" style={{ backgroundColor: "#D4E600", color: "#2D2D2D" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <FadeUp>
          <div className="text-center mb-10">
            <p className="text-6xl mb-6">🎉</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4">결제 완료!</h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">
              스폰지클럽 1기 크루가 되신 것을 환영합니다
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 text-left" style={{ color: "#1a1a1a" }}>
            <div className="flex items-start gap-3 mb-5">
              <span className="text-2xl mt-0.5">💬</span>
              <div>
                <p className="text-base sm:text-lg font-bold mb-1">카카오톡으로 상세 안내를 보내드려요</p>
                <p className="text-sm sm:text-base opacity-70">참여 방법, 슬랙 초대, 사전 준비사항 등을 안내해 드립니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-5">
              <span className="text-2xl mt-0.5">⚠️</span>
              <div>
                <p className="text-base sm:text-lg font-bold mb-1">카카오톡 채널 추가는 필수입니다</p>
                <p className="text-sm sm:text-base opacity-70">채널이 추가되어 있지 않으면 안내 알림톡을 받을 수 없어요.</p>
              </div>
            </div>
            <a
              href="http://pf.kakao.com/_dxmxixhG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-bold transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "#FEE500", color: "#1a1a1a" }}
            >
              카카오톡 채널 추가하기
            </a>
          </div>

          <div className="text-center space-y-3">
            <p className="text-base sm:text-lg font-bold">
              딸깍, 한 번에 못 가는 그곳까지 — 이제 함께 갑니다.
            </p>
            <p className="text-sm sm:text-base opacity-70">
              궁금한 점은 카카오 채널로 문의해주세요.
            </p>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
