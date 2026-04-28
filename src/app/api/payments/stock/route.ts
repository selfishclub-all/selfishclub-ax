import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const STOCK_LIMIT = 53;

export async function GET(request: NextRequest) {
  const itemId = request.nextUrl.searchParams.get("itemId");
  if (!itemId) {
    return NextResponse.json({ data: null, error: "itemId 필요" }, { status: 400 });
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
    data: { soldOut: sold >= STOCK_LIMIT },
    error: null,
  });
}
