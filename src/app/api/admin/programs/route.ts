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
  }).select().single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}
