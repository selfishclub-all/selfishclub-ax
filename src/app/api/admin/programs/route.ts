import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";

// 프로그램 목록 조회
export async function GET() {
  const { data, error } = await supabase
    .from("item")
    .select("*")
    .order("ID", { ascending: false });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

// 프로그램 등록
export async function POST(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;
  const body = await request.json();

  // 다음 ID, iid 생성
  const { data: lastItem } = await supabase
    .from("item")
    .select("ID, iid")
    .order("ID", { ascending: false })
    .limit(1)
    .single();

  const lastId = lastItem?.ID ?? 0;
  const lastNum = lastItem?.iid ? parseInt(lastItem.iid.replace("iid_", "")) : 0;
  const newId = lastId + 1;
  const newIid = `iid_${lastNum + 1}`;

  const { data, error } = await supabase.from("item").insert({
    ID: newId,
    iid: newIid,
    i_title: body.i_title,
    i_title_userside: body.i_title_userside || null,
    i_type: body.i_type,
    i_form: "nextjs",
    i_formid_webflow: body.i_formid_webflow,
    i_paid_tf: body.i_paid_tf,
    i_price: body.i_paid_tf ? body.i_price : null,
    i_live_count_max: body.i_live_count_max || null,
    i_eventdate: body.i_eventdate || null,
    i_full_schedule: body.i_full_schedule || null,
    i_category: body.i_category || null,
    i_vodurl: body.i_vodurl || null,
    i_event_count: 0,
    i_total_revenue: 0,
    ...(body.i_content ? { i_content: body.i_content } : {}),
  }).select().single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

// 프로그램 수정 (상세 페이지 HTML, FAQ 등)
export async function PUT(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;
  const body = await request.json();

  if (!body.iid) {
    return NextResponse.json({ data: null, error: "iid가 필요합니다." }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  if (body.i_detail_html !== undefined) updateData.i_detail_html = body.i_detail_html;
  if (body.i_detail_faq !== undefined) updateData.i_detail_faq = body.i_detail_faq;
  if (body.i_detail_top_blocks !== undefined) updateData.i_detail_top_blocks = body.i_detail_top_blocks;
  if (body.i_title_userside !== undefined) updateData.i_title_userside = body.i_title_userside;
  if (body.i_formid_webflow !== undefined) updateData.i_formid_webflow = body.i_formid_webflow;
  if (body.is_visible !== undefined) updateData.is_visible = body.is_visible;

  const { data, error } = await supabase
    .from("item")
    .update(updateData)
    .eq("iid", body.iid)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}

// 프로그램 삭제
export async function DELETE(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;
  const body = await request.json();

  if (!body.iids || !Array.isArray(body.iids) || body.iids.length === 0) {
    return NextResponse.json({ data: null, error: "삭제할 iid 목록이 필요합니다." }, { status: 400 });
  }

  const { error } = await supabase
    .from("item")
    .delete()
    .in("iid", body.iids);

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: { deleted: body.iids.length }, error: null });
}
