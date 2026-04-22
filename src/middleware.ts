import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 접근 허용 경로
const ALLOWED = [
  "/sharing/aaa",
  "/campaign",
  "/coming-soon",
  "/api/",
  "/_next/",
  "/fonts/",
  "/images/",
  "/favicon",
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 허용 경로는 통과
  if (ALLOWED.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 어드민/대시보드: 쿠키로 인증
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    const hasAuth = request.cookies.get("admin_auth")?.value === "true";
    if (hasAuth) return NextResponse.next();
    // 어드민은 레이아웃에서 비밀번호 입력 처리
    if (pathname.startsWith("/admin")) return NextResponse.next();
    // 대시보드는 어드민 로그인 후 접근 가능
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // ?access=secret 붙이면 통과
  if (searchParams.get("access") === "secret") {
    return NextResponse.next();
  }

  // 나머지는 커밍순으로 리다이렉트
  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
