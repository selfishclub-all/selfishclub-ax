import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ data: null, error: "로그인이 필요합니다" }, { status: 401 });
  }

  const email = session.user.email;

  // 신청 내역 (event 테이블)
  const { data: events } = await supabase
    .from("event")
    .select("iid, i_title, i_type, e_created_at, u_name")
    .eq("u_email", email)
    .order("e_created_at", { ascending: false });

  // 구매 내역 (purchase 테이블)
  const { data: purchases } = await supabase
    .from("purchase")
    .select("iid, i_title, p_amount, p_created_at, u_name")
    .eq("u_email", email)
    .order("p_created_at", { ascending: false });

  // 신청/구매한 프로그램의 VOD 정보
  const allIids = [
    ...new Set([
      ...(events?.map((e) => e.iid) ?? []),
      ...(purchases?.map((p) => p.iid) ?? []),
    ]),
  ];

  let vods: { iid: string; i_title: string; i_vodurl: string }[] = [];
  if (allIids.length > 0) {
    const { data: vodData } = await supabase
      .from("item")
      .select("iid, i_title, i_title_userside, i_vodurl")
      .in("iid", allIids)
      .not("i_vodurl", "is", null);

    vods = (vodData ?? [])
      .filter((v) => v.i_vodurl)
      .map((v) => ({
        iid: v.iid,
        i_title: v.i_title_userside || v.i_title,
        i_vodurl: v.i_vodurl,
      }));
  }

  return NextResponse.json({
    data: {
      user: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
      events: events ?? [],
      purchases: purchases ?? [],
      vods,
    },
    error: null,
  });
}
