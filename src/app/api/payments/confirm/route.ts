import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { paymentKey, orderId, amount, itemId } = await request.json();

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

  // 2. 서버 사이드 금액 검증 (위변조 방지)
  if (item.i_price !== amount) {
    return NextResponse.json(
      { data: null, error: "결제 금액이 일치하지 않습니다" },
      { status: 400 }
    );
  }

  // 3. 토스페이먼츠 결제 승인 요청
  const secretKey = process.env.TOSS_SECRET_KEY!;
  const basicToken = Buffer.from(`${secretKey}:`).toString("base64");

  const tossRes = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    }
  );

  const tossData = await tossRes.json();

  if (!tossRes.ok) {
    return NextResponse.json(
      { data: null, error: tossData.message || "결제 승인 실패" },
      { status: 400 }
    );
  }

  // 4. purchase 테이블에 저장
  // 다음 ID 생성
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
    u_name: tossData.card?.ownerType === "개인" ? "" : "",
    u_phone: "",
    u_email: "",
    iid: item.iid,
    i_title: item.i_title,
    i_formid_webflow: item.i_formid_webflow,
    p_amount: amount,
    p_cancel_amount: 0,
    p_custom_data: JSON.stringify({
      paymentKey,
      orderId,
      method: tossData.method,
    }),
    p_new_tf: "new",
  });

  if (purchaseError) {
    return NextResponse.json(
      { data: null, error: "결제는 완료되었으나 저장 실패: " + purchaseError.message },
      { status: 500 }
    );
  }

  // 5. item 테이블 신청자 수 + 매출 업데이트
  await supabase.rpc("increment_item_stats", {
    target_iid: item.iid,
    add_count: 1,
    add_revenue: amount,
  }).then(async (res) => {
    // rpc 없으면 직접 업데이트
    if (res.error) {
      const { data: current } = await supabase
        .from("item")
        .select("i_event_count, i_total_revenue")
        .eq("iid", item.iid)
        .single();

      await supabase
        .from("item")
        .update({
          i_event_count: (current?.i_event_count ?? 0) + 1,
          i_total_revenue: (current?.i_total_revenue ?? 0) + amount,
        })
        .eq("iid", item.iid);
    }
  });

  return NextResponse.json({ data: { orderId, status: "paid" }, error: null });
}
