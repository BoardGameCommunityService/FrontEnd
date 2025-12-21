"use client";
import { useSession } from "next-auth/react";

export function useAuthFetch() {
  const { data: session, status, update } = useSession();

  // authFetch 호출이 안전한지 여부
  const isReady = status !== "loading" && !!session?.user?.accessToken;

  const authFetch = async (url: string, options: RequestInit = {}) => {
    // 세션 로딩 중이면 에러
    if (status === "loading") {
      throw new Error("Session is still loading");
    }

    // 세션이 없으면 에러
    if (!session?.user?.accessToken) {
      throw new Error("No active session");
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    if (res.status === 401) {
      // 토큰 만료 - 세션 갱신
      await update();

      // update() 후 useSession의 session이 자동으로 갱신됨
      // 재시도
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });
    }

    return res;
  };

  return { authFetch, isReady };
}
