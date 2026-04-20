import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ data: null, error: "URL이 필요합니다" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; bot)" },
    });
    const html = await res.text();

    // OG 태그 파싱
    const getOg = (property: string) => {
      const match = html.match(
        new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']+)["']`, "i")
      ) || html.match(
        new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:${property}["']`, "i")
      );
      return match?.[1] || "";
    };

    // title 태그 폴백
    const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || "";

    // favicon/로고
    const iconMatch = html.match(
      /<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/i
    );
    let iconUrl = iconMatch?.[1] || "";
    if (iconUrl && !iconUrl.startsWith("http")) {
      const base = new URL(url);
      iconUrl = iconUrl.startsWith("/")
        ? `${base.protocol}//${base.host}${iconUrl}`
        : `${base.protocol}//${base.host}/${iconUrl}`;
    }

    const ogImage = getOg("image");
    const ogTitle = getOg("title") || getOg("site_name") || titleTag;
    const ogDescription = getOg("description") ||
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1] || "";

    return NextResponse.json({
      data: {
        title: ogTitle.trim(),
        description: ogDescription.trim(),
        image: ogImage || iconUrl,
        icon: iconUrl,
      },
      error: null,
    });
  } catch {
    return NextResponse.json({ data: null, error: "URL을 가져올 수 없습니다" }, { status: 400 });
  }
}
