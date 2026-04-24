import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { u_name, u_phone: rawPhone, u_email, slug, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = await request.json();

  // 전화번호 정규화: 대시/공백 제거 (010-1111-2222 → 01011112222)
  const u_phone = rawPhone?.replace(/[-\s]/g, "") || "";

  // 입력 검증
  if (!u_name || !u_phone || !u_email || !slug) {
    return NextResponse.json(
      { data: null, error: "이름, 전화번호, 이메일은 필수입니다" },
      { status: 400 }
    );
  }

  // 1. item 조회
  const { data: item, error: itemError } = await supabase
    .from("item")
    .select("iid, i_title, i_type, i_formid_webflow, i_title_userside, i_full_schedule")
    .eq("i_formid_webflow", slug)
    .order("ID", { ascending: false })
    .limit(1)
    .single();

  if (itemError || !item) {
    return NextResponse.json(
      { data: null, error: "프로그램을 찾을 수 없습니다" },
      { status: 400 }
    );
  }

  // 2. 신규/재방문 판별
  const { data: retentionData } = await supabase
    .from("event")
    .select("ID")
    .eq("u_phone", u_phone)
    .limit(1);

  const isNew = !retentionData || retentionData.length === 0 ? "new" : "retention";

  // 3. event 테이블에 INSERT
  const submittedAt = new Date(Date.now() + 9 * 60 * 60 * 1000)
    .toISOString()
    .replace("Z", "");

  const { error: insertError } = await supabase.from("event").insert({
    iid: item.iid,
    e_created_at: submittedAt,
    i_title: item.i_title,
    i_type: item.i_type,
    u_name,
    u_phone,
    u_email,
    e_marketingagree_tf: true,
    e_infoagree_tf: true,
    e_new_tf: isNew,
    utm_source: utm_source || null,
    utm_medium: utm_medium || null,
    utm_campaign: utm_campaign || null,
    utm_content: utm_content || null,
    utm_term: utm_term || null,
  });

  if (insertError) {
    return NextResponse.json(
      { data: null, error: "신청 저장 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }

  // 4. item.i_event_count 증가
  const { count: eventCount } = await supabase
    .from("event")
    .select("*", { count: "exact", head: true })
    .eq("iid", item.iid);

  const finalCount = eventCount ?? 0;

  await supabase
    .from("item")
    .update({ i_event_count: finalCount })
    .eq("iid", item.iid);

  // 5. membership 테이블에 자동 가입 (이미 회원이면 스킵)
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
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      utm_term: utm_term || null,
    });
  }

  // 6. n8n 웹훅 트리거 (알림만 — 실패해도 신청은 완료)
  const n8nWebhookUrl = process.env.N8N_SPONGE_WEBHOOK_URL;
  if (n8nWebhookUrl) {
    try {
      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          u_name,
          u_phone,
          u_email,
          item_title: item.i_title_userside || item.i_title,
          item_schedule: item.i_full_schedule,
          slug,
          event_count: finalCount,
          is_new: isNew,
          utm_source: utm_source || "",
          utm_medium: utm_medium || "",
          utm_campaign: utm_campaign || "",
          utm_content: utm_content || "",
          utm_term: utm_term || "",
        }),
      });
    } catch {
      // n8n 실패해도 신청은 이미 저장됨
    }
  }

  return NextResponse.json({
    data: { message: "신청 완료", eventCount: finalCount },
    error: null,
  });
}
