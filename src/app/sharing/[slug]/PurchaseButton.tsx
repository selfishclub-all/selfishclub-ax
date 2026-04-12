"use client";

import * as PortOne from "@portone/browser-sdk/v2";

interface Props {
  itemId: string;
  slug: string;
  title: string;
  price: number;
  isPaid: boolean;
}

const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID!;
const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!;

export function PurchaseButton({ itemId, slug, title, price, isPaid }: Props) {
  async function handlePurchase() {
    if (!isPaid) {
      alert("무료 신청 기능은 준비 중입니다");
      return;
    }

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
    });

    if (!response || response.code) {
      if (response?.code === "FAILURE_TYPE_PG") {
        alert("결제가 취소되었습니다");
      }
      return;
    }

    // 결제 성공 → 서버에서 검증
    const res = await fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId: response.paymentId,
        itemId,
      }),
    });

    const result = await res.json();

    if (result.error) {
      alert(`결제 확인 실패: ${result.error}`);
      return;
    }

    window.location.href = `/payments/success?orderId=${orderId}&slug=${slug}`;
  }

  return (
    <button
      onClick={handlePurchase}
      className="bg-[#0A0A0A] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#222] transition-colors"
    >
      {isPaid ? "신청하기" : "무료 신청"}
    </button>
  );
}
