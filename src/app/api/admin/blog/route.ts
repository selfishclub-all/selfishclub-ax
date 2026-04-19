import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ data: data ?? [], error: error?.message ?? null });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("blog")
    .insert({
      title: body.title,
      slug: body.slug,
      author: body.author || null,
      content: body.content || null,
      thumbnail: body.thumbnail || null,
      description: body.description || null,
      is_visible: body.is_visible ?? true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data, error: null });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from("blog")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data, error: null });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const { error } = await supabase.from("blog").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data: { deleted: true }, error: null });
}
