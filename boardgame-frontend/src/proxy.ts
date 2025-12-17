import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  //api는 일단 다 열고
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  //인증 상태
  if (session?.user) {
    //토큰 만료시
    if (session.error === "RefreshTokenExpired") {
      // 추가정보 입력을 완료한 사용자인 경우
      if (session.user.profileCompleted === true) {
        // 로그인 페이지로
        if (!pathname.startsWith("/login")) {
          return NextResponse.redirect(new URL("/login", req.url));
        } else {
          return NextResponse.next();
        }
      } else {
        // 회원 추가정보 입력이 안끝났으면 home, login, signup, agreement만 허용
        if (
          pathname === "/" ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/signup") ||
          pathname.startsWith("/agreement")
        ) {
          return NextResponse.next();
        } else {
          // 그외는 로그인 페이지로
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    } else {
      // 토큰이 살아있는 경우
      // 추가정보 입력이 완료된 경우
      if (session.user.profileCompleted === true) {
        // login, signup, agreement 제외하고 모두 허용
        if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/agreement")) {
          return NextResponse.redirect(new URL("/", req.url));
        } else {
          return NextResponse.next();
        }
      } else {
        if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/agreement")) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/signup", req.url));
        }
      }
    }
  } else {
    // 미인증 상태
    if (
      pathname === "/" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/agreement")
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
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
