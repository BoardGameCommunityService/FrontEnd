"use client";

import backIco from "../../../../public/icons/ic_back.svg";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import CardList from "@/components/common/CardList";
import { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useParticipatedStore } from "@/stores/mypage/useParticipatedStore";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function ParticipatedPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //토큰
  const { authFetch, isReady } = useAuthFetch();

  // 페치 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //페치결과 전역 관리
  const { results, setResults, appendResults, approvedResult, setApprovedResult, isFetched } = useParticipatedStore();

  // 쿼리에서 읽기
  const raw = searchParams?.get("endPoint") ?? "approved";
  const endPoint = raw === "pending" ? "pending" : raw === "host" ? "host" : "approved";
  const cardLength = Number(searchParams?.get("length")) || 3;

  //무한 스크롤 / react-intersection-observer 라이브러리
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(0);
  const size = 10;

  // 무한스크롤 여부 관리
  const [hasMore, setHasMore] = useState<boolean>(true);

  //엔드포인트 관리
  const meetingEndpointUrl = useMemo(
    () => ({
      PENDING: `/api/my/participations/pending`,
      APPROVED: "/api/my/participations/approved",
      HOST: (p: number, s: number) => `/api/my/participations/host/meetings?page=${p}&size=${s}`,
    }),
    []
  );

  const url = useMemo(() => {
    if (endPoint === "pending") return meetingEndpointUrl.PENDING;
    if (endPoint === "approved") return meetingEndpointUrl.APPROVED;
    return meetingEndpointUrl.HOST(page, size);
  }, [endPoint, page, size, meetingEndpointUrl]);

  const title = useMemo(() => {
    if (endPoint === "pending") return "신청 대기중";
    if (endPoint === "approved") return "참여한 모임";
    return "만든 모임";
  }, [endPoint]);

  // 엔드포인트 바뀌면 결과/페이지/hasMore 초기화
  useEffect(() => {
    setResults([]);
    setPage(0);
    setHasMore(true);
  }, [endPoint, setResults]);

  useEffect(() => {
    if (!isReady) return;
    if (isFetched) return;
    if (!hasMore) return;

    let mounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await authFetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}${url}`, {
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });

        if (!res.ok) throw new Error("통신 요청 실패");

        const data = await res.json();
        const payload = Array.isArray(data?.content) ? data.content : Array.isArray(data) ? data : [];

        if (endPoint === "host") {
          if (page === 0) setResults(payload);
          else appendResults(payload);
          // host 페이징: 받아온 항목이 size보다 작으면 더 이상 없음
          setHasMore(Array.isArray(payload) ? payload.length >= size : false);
        } else if (endPoint === "approved") {
          setApprovedResult(data);
          // approved는 서버가 한 번에 전체를 내려주는 경우가 많으므로 더이상 페치 없음
          setHasMore(false);
        } else {
          setResults(payload);
          setHasMore(false);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;

        if (mounted) {
          console.error("네트워크 에러", error);
          setError("데이터를 불러오는데 실패했습니다.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      abortController.abort();
    };
  }, [isReady, url, endPoint, isFetched, appendResults, setApprovedResult, setResults, page, hasMore, authFetch]);

  // 무한 스크롤
  useEffect(() => {
    if (inView) {
      if (loading) return;
      if (!hasMore) return;
      if (page * size < cardLength) setPage((prev) => prev + 1);
    }
  }, [inView, loading, page, size, cardLength, hasMore]);

  return (
    <div className="pt-11 px-5 max-w-[375px] h-screen flex flex-col overflow-y-scroll scrollbar-hide">
      <header className="h-[60px] flex items-center gap-3">
        <button type="button" onClick={() => router.back()}>
          <Image src={backIco} alt="뒤로가기" width={24} height={24} />
        </button>
        <h1 className="font-bold text-xl text-[#161616]">{title}</h1>
      </header>
      <main className="py-2 flex-1">
        {loading ? (
          <div className="flex flex-col gap-2 items-center">
            {Array.from({ length: cardLength }).map((_, i) => (
              <div key={i} className="w-[335px] h-[116px] rounded-2xl p-4 bg-white animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : endPoint === "approved" ? (
          <>
            <div className="flex flex-col pt-2 px-5 gap-2.5">
              <h2 className="font-medium text-sm text-[#767676]">다가오는 모임</h2>
              <CardList results={approvedResult?.upcoming ?? []} />
            </div>
            <div className="flex flex-col pt-2 px-5 gap-2.5">
              <h2 className="font-medium text-sm text-[#767676]">참여 완료</h2>
              <CardList results={approvedResult?.finished ?? []} />
            </div>
          </>
        ) : (
          <div className="flex flex-col pt-2 px-5 gap-2.5">
            <CardList results={results ?? []} />
          </div>
        )}
      </main>
      <div ref={ref} />
    </div>
  );
}
