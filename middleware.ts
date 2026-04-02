import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isAppLocale } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/images")) {
    return NextResponse.next();
  }

  if (pathname === "/icon" || pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return NextResponse.next();
  }

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (first && isAppLocale(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const rest = pathname === "/" ? "" : pathname;
  url.pathname = `/${defaultLocale}${rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon).*)"],
};
