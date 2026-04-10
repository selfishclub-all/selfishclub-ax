"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const itemId = searchParams.get("itemId");
  const slug = searchParams.get("slug");

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setErrorMsg("결제 정보가 올바르지 않습니다");
      return;
    }

    fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount),
        itemId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setStatus("error");
          setErrorMsg(json.error);
        } else {
          setStatus("success");
        }
      })
      .catch(() => {
        setStatus("error");
        setErrorMsg("결제 확인 중 오류가 발생했습니다");
      });
  }, [paymentKey, orderId, amount, itemId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">결제 확인 중...</p>
          <p className="text-sm text-[#888888]">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 max-w-sm text-center">
          <p className="text-3xl mb-4">😢</p>
          <h1 className="text-xl font-bold mb-2">결제 실패</h1>
          <p className="text-sm text-[#888888] mb-6">{errorMsg}</p>
          {slug && (
            <Link
              href={`/sharing/${slug}`}
              className="inline-block bg-[#0A0A0A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#222] transition-colors"
            >
              돌아가기
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 max-w-sm text-center">
        <p className="text-3xl mb-4">🎉</p>
        <h1 className="text-xl font-bold mb-2">신청 완료!</h1>
        <p className="text-sm text-[#888888] mb-6">
          결제가 완료되었습니다. 마이페이지에서 확인할 수 있어요.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/mypage"
            className="inline-block bg-[#0A0A0A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#222] transition-colors"
          >
            마이페이지
          </Link>
          <Link
            href="/"
            className="inline-block border border-[#E5E5E5] px-6 py-3 rounded-lg font-semibold hover:bg-[#F5F5F0] transition-colors"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
          <p className="text-lg font-semibold">로딩 중...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
