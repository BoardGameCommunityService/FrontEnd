"use client";

import CardList from "@/components/common/CardList";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { Post } from "@/types/post";
import { useState, useEffect } from "react";

interface RegionMeetingsListProps {
  results: Post[];
  error?: string;
}

export default function RegionMeetingsList({ results: initialResults, error }: RegionMeetingsListProps) {
  const { authFetch } = useAuthFetch();
  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    // 서버에서 토큰 만료로 실패했으면 클라이언트에서 재시도
    if (error === "TOKEN_EXPIRED") {
      const retry = async () => {
        try {
          const res = await authFetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications/region/meetings`
          );
          if (res.ok) {
            const data = await res.json();
            setResults(data);
          }
        } catch (error) {
          console.error("재시도 실패:", error);
        }
      };
      retry();
    }
  }, [error, authFetch]);

  return <CardList results={results} />;
}