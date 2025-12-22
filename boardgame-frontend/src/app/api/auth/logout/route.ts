import { NextResponse } from "next/server";
import { serverAuthFetch } from "@/util/serverAuthFetch";

export async function POST() {
  await serverAuthFetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/auth/logout`, {
    method: "POST",
  });

  const redirectURL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.NEXTAUTH_URL}`;

  return NextResponse.json({ redirectURL });
}
