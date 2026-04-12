import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { paymentId, itemId } = await request.json();

  // 1. item 테이블에서 실제 가격 조회
  const { data: item, error: itemError } = await supabase
    .from("item")
    .select("iid, i_title, i_formid_webflow, i_price, i_paid_tf")
    .eq("iid", itemId)
    .single();

  if (itemError || !item) {
    return NextResponse.json(
      { data: null, error: "프로그램을 찾을 수 없습니다" },
      { status: 400 }
    );
  }

  // 2. 포트원 API로 결제 내역 조회 + 검증
  const portoneSecret = process.env.PORTONE_API_SECRET!;

  const portoneRes = await fetch(
    `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: {
        Authorization: `PortOne ${portoneSecret}`,
        "Content-Type": "application/json",
      },
    }
  );

  const payment = await portoneRes.json();

  if (!portoneRes.ok) {
    return NextResponse.json(
      { data: null, error: payment.message || "결제 조회 실패" },
      { status: 400 }
    );
  }

  // 3. 결제 상태 확인
  if (payment.status !== "PAID") {
    return NextResponse.json(
      { data: null, error: `결제가 완료되지 않았습니다 (상태: ${payment.status})` },
      { status: 400 }
    );
  }

  // 4. 서버 사이드 금액 검증 (위변조 방지)
  if (payment.amount.total !== item.i_price) {
    return NextResponse.json(
      { data: null, error: "결제 금액이 일치하지 않습니다" },
      { status: 400 }
    );
  }

  // 5. purchase 테이블에 저장
  const { data: lastPurchase } = await supabase
    .from("purchase")
    .select("ID")
    .order("ID", { ascending: false })
    .limit(1)
    .single();

  const newId = (lastPurchase?.ID ?? 0) + 1;

  const { error: purchaseError } = await supabase.from("purchase").insert({
    ID: newId,
    p_created_at: new Date().toISOString(),
    u_name: payment.customer?.name || "",
    u_phone: payment.customer?.phoneNumber || "",
    u_email: payment.customer?.email || "",
    iid: item.iid,
    i_title: item.i_title,
    i_formid_webflow: item.i_formid_webflow,
    p_amount: payment.amount.total,
    p_cancel_amount: 0,
    p_custom_data: JSON.stringify({
      paymentId,
      method: payment.method?.type,
      portone: true,
    }),
    p_new_tf: "new",
  });

  if (purchaseError) {
    return NextResponse.json(
      { data: null, error: "결제는 완료되었으나 저장 실패: " + purchaseError.message },
      { status: 500 }
    );
  }

  // 6. item 테이블 신청자 수 + 매출 업데이트
  const { data: current } = await supabase
    .from("item")
    .select("i_event_count, i_total_revenue")
    .eq("iid", item.iid)
    .single();

  await supabase
    .from("item")
    .update({
      i_event_count: (current?.i_event_count ?? 0) + 1,
      i_total_revenue: (current?.i_total_revenue ?? 0) + payment.amount.total,
    })
    .eq("iid", item.iid);

  return NextResponse.json({ data: { paymentId, status: "paid" }, error: null });
}
