import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
