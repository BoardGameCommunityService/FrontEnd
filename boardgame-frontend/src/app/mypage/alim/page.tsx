import NavigationBar from "@/components/common/NavigationBar";
import React from "react";
import { auth } from "@/auth";
import Notifications from "@/components/board/alim/Notifications";
import { Notification } from "@/types/Notification";

const getData = async () => {
  const session = await auth();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications?page=0&size=20`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (!res.ok) throw new Error();

    const result: Notification = await res.json();
    return result ?? [];
  } catch (error) {
    console.error("알림 목록조회 api 에러(서버 컴포넌트): ", error);
    return { items: [], total: 0 };
  }
};

export default async function Page() {
  const initialData: Notification = await getData();

  return (
    <>
      <NavigationBar href="/mypage" title="알림" />
      <main>
        <section className="mt-2">
          <h2 className="sr-only">알림 목록</h2>
          <Notifications initialData={initialData} size={20} />
        </section>
      </main>
    </>
  );
}
