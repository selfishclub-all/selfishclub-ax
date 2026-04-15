import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 접근 허용 경로
const ALLOWED = [
  "/sharing/sponge-club",
  "/coming-soon",
  "/api/",
  "/_next/",
  "/fonts/",
  "/images/",
  "/favicon",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 허용 경로는 통과
  if (ALLOWED.some((path) => pathname.startsWith(path))) {
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
