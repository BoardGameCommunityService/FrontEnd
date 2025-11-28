import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (session?.user && session.user.profileCompleted === false && !pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  const publicPaths = ["/login"];
  const isBoardDetailPage = /^\/board\/\d+$/.test(pathname);
  const isPublicPath = pathname === "/" || isBoardDetailPage || publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 경로에 적용:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public 폴더의 파일들 (*.svg, *.png 등)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
