import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      // 세션 업데이트 시 (회원가입 완료 후 등)
      if (trigger === "update" && session) {
        if (session.profileCompleted !== undefined) {
          token.profileCompleted = session.profileCompleted;
        }
        return token;
      }

      if (account?.provider === "kakao" && profile) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/auth/sync-from-nextauth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          body: JSON.stringify({
            provider: "kakao",
            socialId: String(profile.id),
            email: profile.kakao_account.email,
            nickname: profile.kakao_account.profile?.nickname ?? "",
            profileImageUrl: profile.kakao_account.profile?.profile_image_url ?? "",
          }),
        });

        const result = (await res.json()) as {
          userId: number;
          email: string;
          nickname: string;
          role: string;
          profileCompleted: boolean;
          accessToken: string;
          accessTokenExpiresAt: number;
        };

        token.id = result.userId;
        token.email = result.email;
        token.name = result.nickname;
        token.role = result.role;
        token.profileCompleted = result.profileCompleted;
        token.accessToken = result.accessToken;
        token.accessTokenExpiresAt = result.accessTokenExpiresAt;
        const setCookie = res.headers.get("set-cookie");
        token.refreshToken = setCookie?.match(/refreshToken=([^;]+)/)?.[1];
      }

      if (account?.provider === "google" && profile) {
        const socialId = String(profile.sub ?? profile.id ?? "");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/auth/sync-from-nextauth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          body: JSON.stringify({
            provider: "google",
            socialId,
            email: profile.email,
            emailVerified: profile.email_verified ?? false,
            nickname: profile.name ?? "",
            profileImageUrl: profile.picture ?? "",
          }),
        });

        const result = (await res.json()) as {
          userId: number;
          email: string;
          nickname: string;
          role: string;
          profileCompleted: boolean;
          accessToken: string;
          accessTokenExpiresAt: number;
        };

        token.id = result.userId;
        token.email = result.email;
        token.name = result.nickname;
        token.role = result.role;
        token.profileCompleted = result.profileCompleted;
        token.accessToken = result.accessToken;
        token.accessTokenExpiresAt = result.accessTokenExpiresAt;
        const setCookie = res.headers.get("set-cookie");
        token.refreshToken = setCookie?.match(/refreshToken=([^;]+)/)?.[1];
      }

      if (token.accessTokenExpiresAt && Date.now() < token.accessTokenExpiresAt) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.id = String(token.id);
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.profileCompleted = token.profileCompleted;
      session.user.accessToken = token.accessToken;
      session.user.accessTokenExpiresAt = token.accessTokenExpiresAt;
      if (token.error) {
        session.error = token.error;
      } else {
        if (session.error) delete session.error;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    // signOut: "/signout",
  },
});

async function refreshAccessToken(token: JWT) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${token.refreshToken}`,
    },
  });

  const result = (await res.json()) as {
    errorCode?: "INVALID_REFRESH_TOKEN" | "REFRESH_TOKEN_NOT_FOUND";
    accessToken: string;
    accessTokenExpiresAt: number;
  };

  if (!res.ok || result.errorCode) {
    return { ...token, error: "RefreshTokenExpired" };
  }

  token.accessToken = result.accessToken;
  token.accessTokenExpiresAt = result.accessTokenExpiresAt;

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    const newRefreshToken = setCookie?.match(/refreshToken=([^;]+)/)?.[1];
    if (newRefreshToken) {
      token.refreshToken = newRefreshToken;
      console.log("refreshToken 갱신됨");
    } else {
      console.log("refreshToken 파싱 실패");
    }
  } else {
    console.log("Set-Cookie 헤더 없음 - 이전 refreshToken 유지");
  }

  if (token.error) delete token.error;

  return token;
}
