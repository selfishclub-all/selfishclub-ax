import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("aitools")
    .select("*")
    .order("id", { ascending: false });

  return NextResponse.json({ data: data ?? [], error: error?.message ?? null });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("aitools")
    .insert({
      name: body.name,
      description: body.description || null,
      logo_url: body.logo_url || null,
      referral_url: body.referral_url || null,
      benefit: body.benefit || null,
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
    .from("aitools")
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

  const { error } = await supabase.from("aitools").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data: { deleted: true }, error: null });
}
