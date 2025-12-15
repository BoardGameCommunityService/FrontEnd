"use client";

import Image from "next/image";
import { Notification, NotificationItem } from "@/types/Notification";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Notifications({ initialData, size }: { initialData: Notification; size: number }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialData.items);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView && hasMore && !isLoading && notifications.length < initialData.total) {
        await loadMore();
      }
    },
  });

  async function loadMore() {
    if (status === "loading") return;

    try {
      const nextPage = page + 1;

      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications?page=${nextPage}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      const result: Notification = await res.json();

      const newNotifications = [...notifications, ...result.items];

      setNotifications(newNotifications);
      setPage((prev) => prev + 1);

      if (initialData.total <= newNotifications.length) {
        setHasMore(false);
      }

      return result ?? [];
    } catch (error) {
      console.error("알림 목록조회 api 에러(클라이언트 컴포넌트): ", error);
      setHasMore(false);
      return { items: [], total: 0 };
    } finally {
      setIsLoading(false);
    }
  }

  const handleEvent = (
    type: "REGION_MEETING" | "MEETING_APPLICATION" | "APPLICATION_APPROVED" | "APPLICATION_DENIED"
  ) => {
    switch (type) {
      case "REGION_MEETING":
        router.push("/mypage/alim/meetings");
        break;
      case "MEETING_APPLICATION":
        break;
      case "APPLICATION_APPROVED":
        break;
      case "APPLICATION_DENIED":
        break;
    }
  };

  return (
    <>
      <ul className="px-5 flex flex-col gap-1">
        {notifications.map((data, index) => (
          <li key={`${data.id}_${data.resourceId}_${index}`} className="bg-white rounded-xl">
            <button
              className="w-full p-4 flex gap-3 cursor-pointer"
              type="button"
              onClick={() => handleEvent(data.type)}
            >
              <Image
                src={`${data.type === "REGION_MEETING" ? "/icons/ic_logo_black.svg" : "/icons/ic_logo_green.svg"}`}
                alt=""
                width={36}
                height={36}
              />
              <div className="text-[14px] leading-[22px]">
                <h3 className="font-semibold text-[#363636]">{data.title}</h3>
                <p>{data.message}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div ref={ref}></div>
    </>
  );
}
