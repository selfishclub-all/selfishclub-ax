import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";

// FAQ 풀 조회
export async function GET() {
  const { data, error } = await supabase
    .from("faq_pool")
    .select("*")
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error: null });
}

// FAQ 추가
export async function POST(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;
  const body = await request.json();

  const { data, error } = await supabase.from("faq_pool").insert({
    question: body.question,
    answer: body.answer,
    category: body.category || "custom",
    is_default: false,
  }).select().single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error: null });
}

// FAQ 수정
export async function PUT(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;
  const body = await request.json();

  const { data, error } = await supabase
    .from("faq_pool")
    .update({ question: body.question, answer: body.answer, category: body.category })
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, error: null });
}

// FAQ 삭제
export async function DELETE(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ data: null, error: "id가 필요합니다." }, { status: 400 });
  }

  const { error } = await supabase.from("faq_pool").delete().eq("id", Number(id));

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: { success: true }, error: null });
}
