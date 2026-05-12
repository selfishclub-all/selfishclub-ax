"use client";

import { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";

interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

interface Props {
  itemId: string;
  slug: string;
  title: string;
  price: number;
  isPaid: boolean;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  utm?: UtmParams;
}

const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID!;
const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!;

export function PurchaseButton({ itemId, slug, title, price, isPaid, customerName, customerPhone, customerEmail, utm }: Props) {
  const [status, setStatus] = useState<"idle" | "opening" | "confirming">("idle");

  async function handlePurchase() {
    if (!isPaid) {
      alert("무료 신청 기능은 준비 중입니다");
      return;
    }

    if (!customerName || !customerPhone || !customerEmail) {
      alert("이름, 전화번호, 이메일을 모두 입력해주세요.");
      return;
    }

    setStatus("opening");
    const orderId = `${itemId}_${Date.now()}`;

    const response = await PortOne.requestPayment({
      storeId,
      channelKey,
      paymentId: orderId,
      orderName: title,
      totalAmount: price,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      redirectUrl: `${window.location.origin}/payments/success?itemId=${itemId}&slug=${slug}`,
      customer: {
        fullName: customerName,
        phoneNumber: customerPhone,
        email: customerEmail,
      },
    });

    if (!response || response.code) {
      setStatus("idle");
      if (response?.code === "FAILURE_TYPE_PG") {
        alert("결제가 취소되었습니다");
      }
      return;
    }

    // 결제 성공 → 서버에서 검증
    setStatus("confirming");
    const res = await fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId: response.paymentId,
        itemId,
        u_name: customerName,
        u_phone: customerPhone,
        u_email: customerEmail,
        ...(utm || {}),
      }),
    });

    const result = await res.json();

    if (result.error) {
      setStatus("idle");
      alert(`결제 확인 실패: ${result.error}`);
      return;
    }

    window.location.href = `/payments/success?orderId=${orderId}&slug=${slug}`;
  }

  const label = status === "opening" ? "결제창 여는 중..." : status === "confirming" ? "결제 확인 중..." : "마감되기 전에 신청하기";

  return (
    <>
    <button
      type="button"
      onClick={handlePurchase}
      disabled={status !== "idle"}
      style={{ width: "100%", height: 52, background: status !== "idle" ? "#666" : "#0A0A0A", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, color: "#fff", cursor: status !== "idle" ? "not-allowed" : "pointer" }}
    >
      {label}
    </button>

    {status === "confirming" && (
      <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.2)", borderTop: "3px solid #E2E545", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginTop: 16 }}>결제 확인 중...</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4 }}>잠시만 기다려주세요</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )}
    </>
  );
}
