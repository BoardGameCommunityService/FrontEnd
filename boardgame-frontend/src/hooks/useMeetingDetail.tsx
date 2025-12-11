import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";

export default function useMeetingDetail(id: string) {
  const { data: session, status } = useSession();
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = session?.user?.accessToken as string | undefined;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  }, [id, session]);

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
