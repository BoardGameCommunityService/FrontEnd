import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Google from "next-auth/providers/google";

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
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "kakao" && profile) {
        const res = await fetch(`${process.env.API_SERVER_HOST}/api/auth/sync-from-nextauth`, {
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
          refreshToken: string;
          accessTokenExpiresAt: number;
        };

        token.id = result.email;
        token.email = result.email;
        token.name = result.nickname;
        token.role = result.role;
        token.profileCompleted = result.profileCompleted;
        token.accessToken = result.accessToken;
        token.refreshToken = result.refreshToken;
        token.accessTokenExpires = result.accessTokenExpiresAt;
      }

      if (account?.provider === "google" && profile) {
        const socialId = String(profile.sub ?? profile.id ?? "");
        const res = await fetch(`${process.env.API_SERVER_HOST}/api/auth/sync-from-nextauth`, {
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
          refreshToken: string;
          accessTokenExpiresAt: number;
        };

        token.id = result.email;
        token.email = result.email;
        token.name = result.nickname;
        token.role = result.role;
        token.profileCompleted = result.profileCompleted;
        token.accessToken = result.accessToken;
        token.refreshToken = result.refreshToken;
        token.accessTokenExpires = result.accessTokenExpiresAt;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.profileCompleted = token.profileCompleted;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.expireTime = token.accessTokenExpires;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // signOut: "/signout",
  },
});
