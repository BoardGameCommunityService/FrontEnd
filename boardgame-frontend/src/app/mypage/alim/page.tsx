import NavigationBar from "@/components/common/NavigationBar";
import React from "react";
import Notifications from "@/components/board/alim/Notifications";
import { Notification } from "@/types/Notification";
import { serverAuthFetch } from "@/util/serverAuthFetch";

export default async function Page() {
  const { data, error } = await serverAuthFetch<Notification>(
    `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications?page=0&size=20`
  );

  const initialData: Notification & { error?: string } = {
    items: data?.items || [],
    total: data?.total || 0,
    error,
  };

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
