"use client";

import backIco from "../../../../public/icons/ic_back.svg";
import { EmptyState } from "@/components/search";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import CardList from "@/components/common/CardList";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";

export default function ParticipatedPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const token = session?.user.accessToken as string | undefined;

  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 쿼리에서 읽기
  const raw = searchParams?.get("endPoint") ?? "approved";
  const endPoint = raw === "pending" ? "pending" : raw === "host" ? "host" : "approved";
  const cardLength = Number(searchParams?.get("length")) || 3;

  const [page, setPage] = useState<number>(0);
  const size = 10;

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

  useEffect(() => {
    if (!token) return;

    let mounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}${url}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: abortController.signal,
        });

        if (!res.ok) throw new Error("통신 요청 실패");

        const data = await res.json();

        const normalize = (d: any) => {
          if (Array.isArray(d)) return d;
          if (!d) return [];
          if (Array.isArray(d.content)) return d.content;
          return [];
        };

        if (mounted) {
          setResults(normalize(data));
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
  }, [token, url]);

  const [upcoming, finished] = useMemo(() => {
    if (!results) return [[], []];

    const now = Date.now();
    const u: any[] = [];
    const f: any[] = [];

    results.forEach((item: any) => {
      const t = item?.meetingAt ? new Date(item.meetingAt).getTime() : NaN;
      if (Number.isNaN(t)) {
        u.push(item);
      } else if (t > now) {
        u.push(item);
      } else {
        f.push(item);
      }
    });

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
              <CardList results={upcoming} />
            </div>
            <div className="flex flex-col pt-2 px-5 gap-2.5">
              <h2 className="font-medium text-sm text-[#767676]">참여 완료</h2>
              <CardList results={finished} />
            </div>
          </>
        ) : (
          <div className="flex flex-col pt-2 px-5 gap-2.5">
            <CardList results={results ?? []} />
          </div>
        )}
      </main>
    </div>
  );
}
