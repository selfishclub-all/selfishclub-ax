"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const slug = searchParams.get("slug");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 max-w-sm text-center">
        <p className="text-3xl mb-4">🎉</p>
        <h1 className="text-xl font-bold mb-2">신청 완료!</h1>
        <p className="text-sm text-[#888888] mb-6">
          결제가 완료되었습니다. 마이페이지에서 확인할 수 있어요.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-[#0A0A0A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#222] transition-colors"
          >
            홈으로
          </Link>
          {slug && (
            <Link
              href={`/sharing/${slug}`}
              className="inline-block border border-[#E5E5E5] px-6 py-3 rounded-lg font-semibold hover:bg-[#F5F5F0] transition-colors"
            >
              돌아가기
            </Link>
          )}
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
