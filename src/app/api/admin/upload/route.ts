import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";

export const config = {
  api: { bodyParser: false },
};

// 최대 50MB까지 허용
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;

  if (!file) {
    return NextResponse.json({ data: null, error: "파일이 없습니다." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const folder = slug || "general";
  const filename = `${folder}/${Date.now()}.${ext}`;

  // GIF의 content type이 잘못 감지되는 경우 보정
  const contentType = ext === "gif" ? "image/gif" : file.type;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("program-images")
    .upload(filename, buffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ data: null, error: `${error.message} (파일: ${file.name}, 크기: ${(file.size / 1024 / 1024).toFixed(1)}MB)` }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("program-images")
    .getPublicUrl(filename);

  return NextResponse.json({ data: { url: urlData.publicUrl }, error: null });
}
