"use client";

import Link from "next/link";
import Image from "next/image";
import NavigationBar from "@/components/common/NavigationBar";
import React, { useEffect, useState } from "react";
import Menu from "@/components/mypage/Menu";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const token = session?.user.accessToken as string | undefined;
  const [myPartData, setMyPartData] = useState<any | null>(null);

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/my/participations/summary`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("통신 요청 실패");
        const data = await res.json();
        if (mounted) setMyPartData(data);
      } catch (error: any) {
        console.error("네트워크 에러", error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [token]);

  const { hostCount, approvedCount, pendingCount } = myPartData;

  return (
    <>
      <NavigationBar
        href="/"
        title="마이페이지"
        elements={
          <button className="cursor-pointer relative">
            <Image src="/icons/ic_alim.svg" alt="공유하기 버튼" width={36} height={36} />
            <span className="rounded-[50%] bg-[#FC3B45] w-1.5 h-1.5 inline-block absolute top-1.5 right-1.5"></span>
          </button>
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
              <Link
                className="flex flex-col items-center"
                href={`/mypage/participated?endPoint=host&length=${hostCount}`}
              >
                <span className="text-[#767676] text-xs leading-[18px]">만든모임</span>
                <span className="text-[#121212] text-xl leading-7 font-medium">{hostCount || "0"}</span>
              </Link>
            </li>
            <li className="flex-1 py-3">
              <Link
                className="flex flex-col items-center"
                href={`/mypage/participated?endPoint=approved&length=${approvedCount}`}
              >
                <span className="text-[#767676] text-xs leading-[18px]">참여한모임</span>
                <span className="text-[#121212] text-xl leading-7 font-medium">{approvedCount || "0"}</span>
              </Link>
            </li>
            <li className="flex-1 py-3">
              <Link
                className="flex flex-col items-center"
                href={`/mypage/participated?endPoint=pending&length=${pendingCount}`}
              >
                <span className="text-[#767676] text-xs leading-[18px]">신청 대기중</span>
                <span className="text-[#121212] text-xl leading-7 font-medium">{pendingCount || "0"}</span>
              </Link>
            </li>
          </ul>
        </section>
        <section className="mt-3">
          <h2 className="sr-only">마이페이지 메뉴 목록</h2>
          <ul className="flex flex-col gap-[1px]">
            <Menu
              title="알림 설정"
              isTop={true}
              elements={
                <button
                  className="flex items-center justify-end w-[38px] h-5 p-[2px] bg-[#06E393] rounded-[1000000000px]"
                  aria-label="알림설정 ON/OFF 버튼"
                >
                  <span className="inline-block w-4 h-4 rounded-[50%] bg-white"></span>
                </button>
              }
            />
            <Menu title="서비스 이용 약관" />
            <Menu title="개인정보 처리 약관" />
            <Menu title="위치 정보 이용 약관" />
            <Menu title="1:1 문의" isBottom={true} />
          </ul>
        </section>
      </main>
    </>
  );
}
