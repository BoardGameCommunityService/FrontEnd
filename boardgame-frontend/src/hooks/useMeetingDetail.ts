import { useCallback, useEffect, useState } from "react";

import { Post } from "@/types/post";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function useMeetingDetail(id: number) {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { authFetch, isReady } = useAuthFetch();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`상세 데이터 fetch 실패: ${res.status}`);
      const result = await res.json();
      setData(result);
    } catch (e) {
      setError(e);
      console.error("fetchData error", e);
    } finally {
      setLoading(false);
    }
  }, [id, authFetch]);

  useEffect(() => {
    if (!isReady) return;
    if (id) fetchData();
  }, [fetchData, isReady, id]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
