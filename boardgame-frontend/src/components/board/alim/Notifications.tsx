"use client";

import Image from "next/image";
import { Notification, NotificationItem } from "@/types/Notification";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useModalStore from "@/stores/useModalStore";
import useToastMessage from "@/stores/useToastMessage";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function Notifications({
  initialData,
  size,
}: {
  initialData: Notification & { error?: string };
  size: number;
}) {
  const router = useRouter();
  const { setModal, setClose } = useModalStore();
  const { setToastMessage } = useToastMessage();
  const { authFetch } = useAuthFetch();

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialData.items || []);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 서버에서 토큰 만료로 실패했으면 클라이언트에서 재시도
  useEffect(() => {
    if (initialData.error === "TOKEN_EXPIRED") {
      const retry = async () => {
        try {
          const res = await authFetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications?page=0&size=${size}`
          );
          if (res.ok) {
            const result: Notification = await res.json();
            setNotifications(result.items);
          }
        } catch (error) {
          console.error("재시도 실패:", error);
        }
      };
      retry();
    }
  }, [initialData.error, authFetch, size]);

  const { ref } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView && hasMore && !isLoading && notifications.length < (initialData.total || 0)) {
        await loadMore();
      }
    },
  });

  async function loadMore() {
    try {
      const nextPage = page + 1;

      setIsLoading(true);
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications?page=${nextPage}&size=${size}`
      );

      if (!res.ok) throw new Error("알림 목록 조회중 에러 발생");

      const result: Notification = await res.json();

      const newNotifications = [...notifications, ...result.items];

      setNotifications(newNotifications);
      setPage((prev) => prev + 1);

      if ((initialData.total || 0) <= newNotifications.length) {
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

  const handleApprove = async (resourceId: number, relatedUserId: number) => {
    try {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/${resourceId}/participants/${relatedUserId}/approve`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) throw new Error("참가 신청 수락 중 오류가 발생하였습니다.");

      setToastMessage("success", "수락을 완료하였습니다.");
    } catch (error) {
      setToastMessage("failure", "오류가 발생하였습니다.");
      console.error(error);
    } finally {
      setClose();
    }
  };

  const handleReject = async (resourceId: number, relatedUserId: number) => {
    try {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/${resourceId}/participants/${relatedUserId}/deny`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) throw new Error("참가 신청 거절 중 오류가 발생하였습니다.");

      setToastMessage("success", "거절을 완료하였습니다.");
    } catch (error) {
      setToastMessage("failure", "오류가 발생하였습니다.");
      console.error(error);
    } finally {
      setClose();
    }
  };

  const handleEvent = (
    type: "REGION_MEETING" | "MEETING_APPLICATION" | "APPLICATION_APPROVED" | "APPLICATION_DENIED",
    resourceId: number,
    relatedUserId: number
  ) => {
    console.log("handleEvent:", type, resourceId, relatedUserId);
    switch (type) {
      case "REGION_MEETING":
        router.push("/mypage/alim/meetings");
        break;
      case "MEETING_APPLICATION":
        setModal(
          "참가 신청을 수락할까요?",
          "수락",
          () => handleApprove(resourceId, relatedUserId),
          "거절",
          () => handleReject(resourceId, relatedUserId)
        );
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
              onClick={() => handleEvent(data.type, data.resourceId, data.relatedUserId)}
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
