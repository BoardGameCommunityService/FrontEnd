import { auth } from "@/auth";

interface ServerAuthFetchResult<T> {
  data: T | null;
  error?: "NO_AUTH" | "TOKEN_EXPIRED" | "FETCH_ERROR";
}

/**
 * 서버 컴포넌트에서 인증이 필요한 API를 호출하는 유틸 함수
 * useAuthFetch와 유사하지만 서버 사이드에서 사용
 *
 * @param url - API 엔드포인트 URL
 * @param options - fetch 옵션
 * @returns { data, error } - 데이터와 에러 상태
 *
 * @example
 * const { data, error } = await serverAuthFetch<Inquiry[]>(
 *   `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/inquiries/my`
 * );
 */
export async function serverAuthFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ServerAuthFetchResult<T>> {
  const session = await auth();

  // 세션이 없으면 NO_AUTH 에러
  if (!session?.user?.accessToken) {
    return { data: null, error: "NO_AUTH" };
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    // 401 에러면 TOKEN_EXPIRED (클라이언트에서 재시도하도록)
    if (res.status === 401) {
      return { data: null, error: "TOKEN_EXPIRED" };
    }

    // 기타 HTTP 에러
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return { data, error: undefined };
  } catch (error) {
    console.error("Server auth fetch error:", error);
    return { data: null, error: "FETCH_ERROR" };
  }
}
