import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 접근 허용 경로 (이 외에는 coming-soon으로 리다이렉트)
const ALLOWED_PATHS = [
  "/sharing/ax-project",
  "/coming-soon",
  "/admin",
  "/dashboard",
  "/api",
  "/login",
  "/payments",
  "/spongeclub",
  "/sharing/aaa",
  "/campaign",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 어드민/대시보드: 쿠키로 인증
  if (pathname.startsWith("/dashboard")) {
    const hasAuth = request.cookies.get("admin_auth")?.value === "true";
    if (hasAuth) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // 허용 경로는 통과
  if (ALLOWED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // 홈(/)도 coming-soon으로
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.redirect(url);
  }

  // 그 외 모든 경로 → coming-soon
  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
