import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";

export const config = {
  api: { bodyParser: false },
};

// 최대 50MB까지 허용
export const maxDuration = 30;

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;

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
  const key = `${folder}/${Date.now()}.${ext}`;

  // GIF의 content type이 잘못 감지되는 경우 보정
  const contentType = ext === "gif" ? "image/gif" : file.type;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await r2.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );
  } catch (err) {
    console.error("R2 upload error:", err);
    return NextResponse.json(
      { data: null, error: `업로드 실패 (파일: ${file.name}, 크기: ${(file.size / 1024 / 1024).toFixed(1)}MB)` },
      { status: 500 }
    );
  }

  const publicUrl = `${PUBLIC_URL}/${key}`;

  return NextResponse.json({ data: { url: publicUrl }, error: null });
}
