import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const types = searchParams.get("types")?.split(",") ?? [];

  let query = supabase
    .from("item")
    .select("ID, iid, i_title, i_title_userside, i_type, i_formid_webflow, i_paid_tf, i_price, i_eventdate, i_event_count, i_category, i_vodurl, i_full_schedule")
    .not("i_formid_webflow", "is", null);

  if (types.length > 0) {
    query = query.in("i_type", types);
  }

  const { data, error } = await query.order("ID", { ascending: false });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, error: null });
}
