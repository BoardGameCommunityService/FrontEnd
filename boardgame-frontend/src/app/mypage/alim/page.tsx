import NavigationBar from "@/components/common/NavigationBar";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

interface NotificationItem {
  createdAt: string;
  id: number;
  isRead: boolean;
  message: string;
  readAt: string | null;
  resourceId: number;
  title: string;
  type: "REGION_MEETING" | "MEETING_APPLICATION" | "APPLICATION_APPROVED" | "APPLICATION_DENIED";
}

interface Notification {
  items: Array<NotificationItem>;
  total: number;
}

const getData = async () => {
  const session = await auth();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications?page=0&size=15`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (!res.ok) throw new Error();

    const result: Notification = await res.json();
    return result ?? [];
  } catch (error) {
    console.error("알림 목록조회 api 호출: ", error);
    return { items: [], total: 0 };
  }
};

export default async function Page() {
  const { items: notifications, total } = await getData();

  return (
    <>
      <NavigationBar href="/mypage" title="알림" />
      <main>
        <section className="mt-2">
          <h2 className="sr-only">알림 목록</h2>
          <ul className="px-5 flex flex-col gap-1">
            {notifications.map((data) => (
              <li key={data.id} className="bg-white rounded-xl p-4 cursor-pointer">
                <Link href="#" className="flex gap-3">
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
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
