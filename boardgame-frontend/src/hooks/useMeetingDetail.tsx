import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";

export default function useMeetingDetail(id: string) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/proxy/meetings/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
  }, [id]);

  useEffect(() => {
    if (status === "loading") return;
    fetchData();
  }, [fetchData, status]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
