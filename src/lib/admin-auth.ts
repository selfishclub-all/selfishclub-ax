import { NextRequest, NextResponse } from "next/server";

export function checkAdminAuth(request: NextRequest) {
  const hasAuth = request.cookies.get("admin_auth")?.value === "true";
  if (!hasAuth) {
    return NextResponse.json({ data: null, error: "인증이 필요합니다" }, { status: 401 });
  }
  return null; // 인증 통과
}
