"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] px-5">
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 max-w-md w-full text-center">
        <p className="text-4xl mb-4">🎉</p>
        <p className="text-xl font-bold text-[#0A0A0A] mb-2">신청 완료!</p>
        <p className="text-sm text-[#0A0A0A]/50 leading-relaxed mb-6">행사 당일, 알림톡과 이메일로 라이브 링크를 보내드려요.</p>

        <div className="space-y-3 text-left mb-6">
          <div className="flex items-start gap-3 bg-[#0A0A0A]/5 rounded-lg px-4 py-3">
            <span className="text-base mt-0.5">💬</span>
            <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">당일 <strong className="text-[#0A0A0A]">카카오톡 셀피쉬클럽 알림톡</strong> 채팅창을 꼭 확인해주세요!</p>
          </div>
          <div className="flex items-start gap-3 bg-[#0A0A0A]/5 rounded-lg px-4 py-3">
            <span className="text-base mt-0.5">🔧</span>
            <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">홈페이지 리뉴얼 중이라 기존 마이페이지에 신청내역이 안 보일 수 있어요. 신청은 정상 접수됐으니 걱정 마세요!</p>
          </div>
        </div>

        <div className="flex gap-3">
          {slug && (
            <a
              href={`/sharing/${slug}`}
              className="flex-1 inline-block border border-[#E5E5E5] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#F5F5F0] transition-colors"
            >
              돌아가기
            </a>
          )}
          <a
            href="http://pf.kakao.com/_dxmxixhG/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-block bg-[#0A0A0A] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#222] transition-colors"
          >
            카카오 채널 문의
          </a>
        </div>

      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
          <p className="text-lg font-semibold">로딩 중...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
