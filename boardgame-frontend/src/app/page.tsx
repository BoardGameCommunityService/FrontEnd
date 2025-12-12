"use client";

import Banner from "@/components/common/Banner";
import Calendar from "@/components/common/Calendar";
import CardList from "@/components/common/CardList";
import Header from "@/components/common/Header";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Post } from "@/types/post";
import dateFormatter from "@/util/dateFormatter";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import bottomLogo from "../../public/bottomLogo.svg";
import plusIcon from "../../public/icons/ic_plus.svg";

export default function Home() {
  const { ref, inView } = useInView({ threshold: 0 });
  const { data: session, status } = useSession();
  const [postings, setPostings] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [region, setRegion] = useState<string>("서울");

  async function getRegion() {
    if (status === "loading" || !session?.user?.accessToken) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });
      if (!res.ok) throw new Error("지역 정보 fetch 에러");

      const data = await res.json();
      setRegion(data.region);
      console.log("data: ", data.region);
    } catch (error: any) {
      console.error("통신 에러", error);
    }
  }

  useEffect(() => {
    (async () => {
      await getRegion();
    })();
  }, [region]);

  async function getData(pageNum: number) {
    try {
      setIsLoading(true);
      const { year, month, day } = dateFormatter(selectedDate.toISOString());
      const date = `${year}${month}${day}`;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings?page=${pageNum}&size=15&date=${date}`
      );
      if (!res.ok) throw new Error("데이터 fetch 에러");

      const { content } = await res.json();
      console.log("content: ", content);
      if (content.length === 0) {
        setHasMore(false);
      } else {
        if (pageNum === 0) {
          setPostings(content);
        } else {
          setPostings((prev) => [...prev, ...content]);
        }
        setPage(pageNum + 1);
      }
    } catch (error: any) {
      console.error("통신 에러", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setPostings([]);
    setPage(0);
    setHasMore(true);

    (async () => {
      await getData(0);
    })();
  }, [selectedDate]);

  useEffect(() => {
    (async () => {
      if (inView && !isLoading && hasMore && page > 0) {
        await getData(page);
      }
    })();
  }, [inView]);

  return (
    <div className="flex justify-center">
      <div className="w-full min-h-screen flex flex-col items-center bg-[#F5F6FA] relative">
        <Header region={region} changeRegion={(region: string) => setRegion(region)} />
        <main>
          <section className="w-full flex flex-col items-center">
            <Banner />
          </section>
          <section className="my-4">
            <Calendar today={today} selectedDate={selectedDate} changeDate={(date: Date) => setSelectedDate(date)} />
          </section>
          <section>
            <CardList results={postings} />
            <div ref={ref}></div>
          </section>
          <div className="flex justify-center mt-6 mb-[60px]">
            <Image
              src={bottomLogo}
              alt="함께하면 더 즐거운 보드게임 라이프!"
              width={120}
              height={110}
              className="mt-6 mb-[60px]"
            />
          </div>
        </main>
        <Link href="/board/new">
          <div className="fixed bottom-10 right-[max(20px,calc(50%-167.5px))] w-[123px] h-12 rounded-[40px] py-3 pl-3 pr-4 bg-[#06E393] shadow-[0px_4px_16px_0px_#00000040]">
            <div className="flex gap-1 items-center">
              <Image src={plusIcon} alt="" width={18} height={18} />
              <span className="font-semibold text-[16px] text-[#161616]">모임만들기</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
