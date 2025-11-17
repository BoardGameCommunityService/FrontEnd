import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "kakao" && profile) {
        //TODO: API 경로 수정 필요
        const res = await fetch(`${process.env.API_SERVER_HOST}/api/accounts/social`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-store",
          },
          body: new URLSearchParams({ email: profile.kakao_account.email }),
        });

        const result = (await res.json()) as {
          email: string;
          role: string;
          nickname: string;
          accessToken: string;
          refreshToken: string;
        };

        token.id = result.email;
        token.role = result.role;
        token.email = result.email;
        token.name = result.nickname;

        token.accessToken = result.accessToken;
        token.refreshToken = result.refreshToken;
        token.accessTokenExpires = Date.now() + 1000 * 60 * 60; //1h
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.expireTime = Date.now() + 1000 * 60 * 60; //1h
      return session;
    },
  },
  pages: {
    // signIn: "/signin",
    // signOut: "/signout",
  },
});
