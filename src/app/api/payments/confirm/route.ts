import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { paymentId, itemId } = await request.json();

  // 0. 이미 처리된 결제인지 확인 (모바일 복귀 시 중복 호출 방지)
  const { data: existingPurchase } = await supabase
    .from("purchase")
    .select("ID")
    .ilike("p_custom_data", `%${paymentId}%`)
    .limit(1);

  if (existingPurchase && existingPurchase.length > 0) {
    return NextResponse.json({ data: { paymentId, status: "paid" }, error: null });
  }

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

  // 1-1. 재고 확인 (선착순 53명)
  const STOCK_LIMIT = 0;
  const { count: soldCount } = await supabase
    .from("purchase")
    .select("*", { count: "exact", head: true })
    .eq("iid", itemId);

  if ((soldCount ?? 0) >= STOCK_LIMIT) {
    // 이미 결제된 경우 자동 환불 처리
    const portoneSecret = process.env.PORTONE_API_SECRET!;
    try {
      await fetch(
        `https://api.portone.io/payments/${encodeURIComponent(paymentId)}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `PortOne ${portoneSecret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: "선착순 마감으로 인한 자동 환불" }),
        }
      );
    } catch {
      // 환불 실패 시에도 마감 메시지는 전달
    }

    return NextResponse.json(
      { data: null, error: "선착순 신청이 마감되어 자동 환불됩니다" },
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
    .select("i_event_count, i_total_revenue, i_type, i_title_userside, i_full_schedule")
    .eq("iid", item.iid)
    .single();

  await supabase
    .from("item")
    .update({
      i_event_count: (current?.i_event_count ?? 0) + 1,
      i_total_revenue: (current?.i_total_revenue ?? 0) + payment.amount.total,
    })
    .eq("iid", item.iid);

  const finalCount = (current?.i_event_count ?? 0) + 1;

  // 7. 신규/재방문 판별
  const u_name = payment.customer?.name || "";
  const u_phone = (payment.customer?.phoneNumber || "").replace(/[-\s]/g, "");
  const u_email = payment.customer?.email || "";

  const { data: retentionData } = await supabase
    .from("event")
    .select("ID")
    .eq("u_phone", u_phone)
    .limit(1);

  const isNew = !retentionData || retentionData.length === 0 ? "new" : "retention";

  // 8. event 테이블에 INSERT
  const submittedAt = new Date(Date.now() + 9 * 60 * 60 * 1000)
    .toISOString()
    .replace("Z", "");

  await supabase.from("event").insert({
    iid: item.iid,
    e_created_at: submittedAt,
    i_title: item.i_title,
    i_type: current?.i_type || null,
    u_name,
    u_phone,
    u_email,
    e_marketingagree_tf: true,
    e_infoagree_tf: true,
    e_new_tf: isNew,
  });

  // 9. 신규 유저일 경우 membership 테이블에 자동 가입
  if (isNew === "new") {
    const { data: existingMember } = await supabase
      .from("membership")
      .select("ID")
      .eq("u_phone", u_phone)
      .limit(1);

    if (!existingMember || existingMember.length === 0) {
      await supabase.from("membership").insert({
        signup_at: submittedAt,
        u_name,
        u_phone,
        u_email,
        u_membership_type: item.i_formid_webflow,
      });
    }
  }

  // 10. n8n 웹훅 트리거 (알림톡 + Slack — 실패해도 결제는 완료)
  const n8nWebhookUrl = process.env.N8N_PURCHASE_WEBHOOK_URL;
  if (n8nWebhookUrl) {
    try {
      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          u_name,
          u_phone,
          u_email,
          item_title: current?.i_title_userside || item.i_title,
          item_schedule: current?.i_full_schedule || "",
          slug: item.i_formid_webflow,
          event_count: finalCount,
          is_new: isNew,
          p_amount: payment.amount.total,
        }),
      });
    } catch {
      // n8n 실패해도 결제·저장은 이미 완료됨
    }
  }

  return NextResponse.json({ data: { paymentId, status: "paid" }, error: null });
}
