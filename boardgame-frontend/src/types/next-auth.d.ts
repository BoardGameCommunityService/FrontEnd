import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// 카카오 프로필 타입 정의
interface KakaoAccount {
  email: string;
  profile?: {
    nickname?: string;
    profile_image_url?: string;
    thumbnail_image_url?: string;
  };
}

interface KakaoProfile {
  id: number;
  connected_at: string;
  kakao_account: KakaoAccount;
  properties?: {
    nickname?: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
}

declare module "next-auth" {
  /**
   * Session 타입 확장
   */
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name: string;
      accessToken: string;
      refreshToken: string;
      expireTime: number;
    } & DefaultSession["user"];
  }

  /**
   * User 타입 확장
   */
  interface User extends DefaultUser {
    role: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
  }

  /**
   * Profile 타입 확장 (카카오)
   */
  interface Profile extends KakaoProfile {}
}

declare module "next-auth/jwt" {
  /**
   * JWT 타입 확장
   */
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
