"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const paymentId = searchParams.get("paymentId");
  const itemId = searchParams.get("itemId");
  const errorCode = searchParams.get("code");

  // 결제 실패로 리다이렉트된 경우 (PortOne이 code 파라미터를 붙임)
  const isFailed = !!errorCode;
  const [status, setStatus] = useState<"confirming" | "done" | "error">(
    isFailed ? "error" : paymentId ? "confirming" : "done"
  );
  const [errorMsg, setErrorMsg] = useState(
    isFailed ? "결제가 완료되지 않았습니다. 다시 시도해주세요." : ""
  );

  useEffect(() => {
    if (!paymentId || !itemId) return;

    // 모바일 리다이렉트 후 결제 검증 — UTM + 고객정보를 URL에서 복원
    const confirm = async () => {
      try {
        const res = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId,
            itemId,
            u_name: searchParams.get("u_name") || "",
            u_phone: searchParams.get("u_phone") || "",
            u_email: searchParams.get("u_email") || "",
            utm_source: searchParams.get("utm_source") || "",
            utm_medium: searchParams.get("utm_medium") || "",
            utm_campaign: searchParams.get("utm_campaign") || "",
            utm_content: searchParams.get("utm_content") || "",
            utm_term: searchParams.get("utm_term") || "",
          }),
        });
        const result = await res.json();
        if (result.error) {
          setErrorMsg(result.error);
          setStatus("error");
        } else {
          setStatus("done");
        }
      } catch {
        setErrorMsg("결제 확인 중 네트워크 오류가 발생했습니다.");
        setStatus("error");
      }
    };

    confirm();
  }, [paymentId, itemId, searchParams]);

  if (status === "confirming") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF8] px-5">
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(0,0,0,0.1)",
            borderTop: "3px solid #0A0A0A",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p className="text-lg font-semibold mt-4">결제 확인 중...</p>
        <p className="text-sm text-[#0A0A0A]/50 mt-1">잠시만 기다려주세요</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] px-5">
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 max-w-md w-full text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-xl font-bold text-[#0A0A0A] mb-2">결제 확인 실패</p>
          <p className="text-sm text-[#0A0A0A]/50 leading-relaxed mb-6">
            {errorMsg || "결제 확인 중 문제가 발생했습니다."}
            <br />
            카카오 채널로 문의해주세요.
          </p>
          <a
            href="http://pf.kakao.com/_dxmxixhG/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0A0A0A] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#222] transition-colors"
          >
            카카오 채널 문의
          </a>
        </div>
      </div>
    );
  }

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
