"use client";

import backIco from "../../../../public/icons/ic_back.svg";
import { EmptyState } from "@/components/search";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import CardList from "@/components/common/CardList";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const token = session?.user.accessToken as string | undefined;
  //배열없음으로하면 결과없음 화면 나오므로 null로 기본값 설정
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  // 쿼리에서 읽기
  const raw = searchParams?.get("endPoint") ?? "approved";
  const endPoint = raw === "pending" ? "pending" : raw === "host" ? "host" : "approved";
  const cardLength = Number(searchParams?.get("length"));

  //무한 스크롤...
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);

  const meetingEndpointUrl = {
    PENDING: `/api/my/participations/pending`,
    APPROVED: "/api/my/participations/approved",
    HOST: (page = 0, size = 5) => `/api/my/participations/host/meetings?page=${page}&size=${size}`,
  };

  let url = "";
  if (endPoint === "pending") url = meetingEndpointUrl.PENDING;
  else if (endPoint === "approved") url = meetingEndpointUrl.APPROVED;
  else if (endPoint === "host") url = meetingEndpointUrl.HOST(page, size);

  let title = "";
  if (endPoint === "pending") title = "신청 대기중";
  else if (endPoint === "approved") title = "참여한 모임";
  else if (endPoint === "host") title = "만든 모임";

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}${url}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("통신 요청 실패");
        const data = await res.json();
        // 응답을 항상 배열로 정규화
        const normalize = (d: any) => {
          if (Array.isArray(d)) return d;
          if (!d) return [];
          if (Array.isArray(d.content)) return d.content;
          return [];
        };
        if (mounted) setResults(normalize(data));
      } catch (error: any) {
        console.error("네트워크 에러", error);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [token, url, page, size]);

  console.log("페치결과", results);

  //참여모임은 다가오는 모임을 분류
  const [upcoming, finished] = useMemo(() => {
    const now = Date.now();
    const u: any[] = [];
    const f: any[] = [];
    (results || []).forEach((item: any) => {
      const t = item?.meetingAt ? new Date(item.meetingAt).getTime() : NaN;
      if (Number.isNaN(t)) {
        // meetingAt 없거나 파싱 실패 시는 upcoming에 두거나 로직에 맞게 처리
        u.push(item);
      } else if (t > now) {
        u.push(item);
      } else {
        f.push(item);
      }
    });
    // 정렬: 다가오는 건 오름차순, 완료는 내림차순
    u.sort((a, b) => new Date(a.meetingAt).getTime() - new Date(b.meetingAt).getTime());
    f.sort((a, b) => new Date(b.meetingAt).getTime() - new Date(a.meetingAt).getTime());
    return [u, f];
  }, [results]);

  return (
    <div className="pt-11 px-5 max-w-[375px] h-screen flex flex-col overflow-y-scroll scrollbar-hide">
      <header className="h-[60px] flex items-center gap-3">
        <button type="button" onClick={() => router.back()}>
          <Image src={backIco} alt="뒤로가기" width={24} height={24} />
        </button>
        <h1 className="font-bold text-xl text-[#161616]">{title}</h1>
      </header>
      <main className="py-2 flex-1">
        {/* 결과가 없으면 */}
        {loading ? (
          <div className="flex flex-col gap-2 items-center">
            {Array.from({ length: cardLength }).map((_, i) => (
              <div key={i} className="w-[335px] h-[116px] rounded-2xl p-4 bg-white animate-pulse" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <EmptyState />
          </div>
        ) : endPoint === "approved" ? (
          // 참가 승인 모집
          <>
            <div className="flex flex-col pt-2 px-5 gap-2.5">
              <h2 className=" font-medium text-sm text-[#767676]">다가오는 모임</h2>
              <CardList results={upcoming} />
            </div>
            <div className="flex flex-col pt-2 px-5 gap-2.5">
              <h2 className=" font-medium text-sm text-[#767676]">참여 완료</h2>
              <CardList results={finished} />
            </div>
          </>
        ) : (
          // 승인 대기중 모집
          <div className="flex flex-col pt-2 px-5 gap-2.5">
            <CardList results={results} />
          </div>
        )}
      </main>
    </div>
  );
}
