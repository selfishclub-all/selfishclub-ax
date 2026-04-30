import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const itemId = request.nextUrl.searchParams.get("itemId");
  if (!itemId) {
    return NextResponse.json({ data: null, error: "itemId 필요" }, { status: 400 });
  }

  // item 테이블에서 정원(i_live_count_max) 조회
  const { data: item, error: itemError } = await supabase
    .from("item")
    .select("i_live_count_max")
    .eq("iid", itemId)
    .single();

  if (itemError) {
    return NextResponse.json({ data: null, error: itemError.message }, { status: 500 });
  }

  // 정원이 null이면 무제한
  if (item.i_live_count_max == null) {
    return NextResponse.json({ data: { soldOut: false }, error: null });
  }

  const { count, error } = await supabase
    .from("purchase")
    .select("*", { count: "exact", head: true })
    .eq("iid", itemId);

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }

  const sold = count ?? 0;

  return NextResponse.json({
    data: { soldOut: sold >= item.i_live_count_max },
    error: null,
  });
}
