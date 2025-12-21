"use client";

import NavigationBar from "@/components/common/NavigationBar";
import Menu from "@/components/mypage/Menu";
import { useMyPageStore } from "@/stores/mypage/useMyPageStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function Page() {
  const { data: session } = useSession();
  const { authFetch, isReady } = useAuthFetch();

  const { myPartData, setMyPartData, isFetched, setIsFetched } = useMyPageStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;

    if (isFetched) return;

    let mounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await authFetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/my/participations/summary`, {
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });

        if (!res.ok) throw new Error("통신 요청 실패");

        const data = await res.json();

        if (mounted) {
          setMyPartData(data);
          setIsFetched(true);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;

        if (mounted) {
          console.error("네트워크 에러", error);
          setError("데이터를 불러오는데 실패했습니다.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      abortController.abort();
    };
  }, [isReady, isFetched, authFetch]);

  const { hostCount, approvedCount, pendingCount } = myPartData;

  return (
    <>
      <NavigationBar
        href="/"
        title="마이페이지"
        elements={
          <Link href="/mypage/alim" className="cursor-pointer relative">
            <Image src="/icons/ic_alim.svg" alt="알림 버튼" width={36} height={36} />
            <span className="rounded-[50%] bg-[#FC3B45] w-1.5 h-1.5 inline-block absolute top-1.5 right-1.5"></span>
          </Link>
        }
      />

      <main className="px-5">
        <section className="bg-[#FFFFFF] rounded-2xl p-5">
          <h2 className="sr-only">프로필</h2>
          <Link className="flex justify-between items-center cursor-pointer" href="/mypage/profile">
            <div className="flex items-center gap-3 text-lg leading-[26px] font-bold">
              <Image
                className={"w-12 h-12 rounded-full"}
                src={session?.user.image || "/temp_profile.svg"}
                alt="프로필 이미지"
                width={48}
                height={48}
                loading="eager"
              />
              <span>{session?.user.name}</span>
            </div>
            <button>
              <Image className="w-5 h-5" src="/icons/ic_right20.svg" alt="" width={20} height={20} />
            </button>
          </Link>
          <ul className="mt-4 flex w-full bg-[#F5F6FA] rounded-xl">
            <li className="flex-1 py-3">
              {hostCount > 0 ? (
                <Link
                  className="flex flex-col items-center"
                  href={`/mypage/participated?endPoint=host&length=${hostCount}`}
                >
                  <span className="text-[#767676] text-xs leading-[18px]">만든모임</span>
                  <span className="text-[#121212] text-xl leading-7 font-medium">{isLoading ? "-" : hostCount}</span>
                </Link>
              ) : (
                <div className="flex flex-col items-center opacity-50 cursor-not-allowed">
                  <span className="text-[#767676] text-xs leading-[18px]">만든모임</span>
                  <span className="text-[#121212] text-xl leading-7 font-medium">{isLoading ? "-" : hostCount}</span>
                </div>
              )}
            </li>
            <li className="flex-1 py-3">
              {approvedCount > 0 ? (
                <Link
                  className="flex flex-col items-center"
                  href={`/mypage/participated?endPoint=approved&length=${approvedCount}`}
                >
                  <span className="text-[#767676] text-xs leading-[18px]">참여한모임</span>
                  <span className="text-[#121212] text-xl leading-7 font-medium">
                    {isLoading ? "-" : approvedCount}
                  </span>
                </Link>
              ) : (
                <div className="flex flex-col items-center opacity-50 cursor-not-allowed">
                  <span className="text-[#767676] text-xs leading-[18px]">참여한모임</span>
                  <span className="text-[#121212] text-xl leading-7 font-medium">
                    {isLoading ? "-" : approvedCount}
                  </span>
                </div>
              )}
            </li>
            <li className="flex-1 py-3">
              {pendingCount > 0 ? (
                <Link
                  className="flex flex-col items-center"
                  href={`/mypage/participated?endPoint=pending&length=${pendingCount}`}
                >
                  <span className="text-[#767676] text-xs leading-[18px]">신청 대기중</span>
                  <span className="text-[#121212] text-xl leading-7 font-medium">{isLoading ? "-" : pendingCount}</span>
                </Link>
              ) : (
                <div className="flex flex-col items-center opacity-50 cursor-not-allowed">
                  <span className="text-[#767676] text-xs leading-[18px]">신청 대기중</span>
                  <span className="text-[#121212] text-xl leading-7 font-medium">{isLoading ? "-" : pendingCount}</span>
                </div>
              )}
            </li>
          </ul>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </section>
        <section className="mt-3">
          <h2 className="sr-only">마이페이지 메뉴 목록</h2>
          <ul className="flex flex-col gap-[1px]">
            <Menu title="서비스 이용 약관" isTop={true} />
            <Menu title="개인정보 처리 약관" />
            <Menu title="위치 정보 이용 약관" />
            <Menu
              title="1:1 문의"
              isBottom={true}
              elements={
                <Link href="/mypage/inquiries/list">
                  <Image src="/icons/ic_right20.svg" alt="이동하기" width={20} height={20} />
                </Link>
              }
            />
          </ul>
        </section>
      </main>
    </>
  );
}
