"use client";

import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

interface Props {
  itemId: string;
  slug: string;
  title: string;
  price: number;
  isPaid: boolean;
}

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export function PurchaseButton({ itemId, slug, title, price, isPaid }: Props) {
  async function handlePurchase() {
    if (!isPaid) {
      alert("무료 신청 기능은 준비 중입니다");
      return;
    }

    const orderId = `${itemId}_${Date.now()}`;

    const tossPayments = await loadTossPayments(clientKey);
    const payment = tossPayments.payment({ customerKey: "ANONYMOUS" });

    await payment.requestPayment({
      method: "CARD",
      amount: { currency: "KRW", value: price },
      orderId,
      orderName: title,
      successUrl: `${window.location.origin}/payments/success?itemId=${itemId}&slug=${slug}`,
      failUrl: `${window.location.origin}/sharing/${slug}?payment=fail`,
    });
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
