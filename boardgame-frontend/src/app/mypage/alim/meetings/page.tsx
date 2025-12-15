import NavigationBar from "@/components/common/NavigationBar";
import React from "react";
import CardList from "@/components/common/CardList";
import { auth } from "@/auth";

const getData = async () => {
  const session = await auth();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications/region/meetings`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    if (!res.ok) throw new Error("새로운 모임 개설 목록 조회를 실패하였습니다.");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Page() {
  const results = await getData();

  return (
    <>
      <NavigationBar href="/mypage/alim" />
      <main>
        <CardList results={results} />
      </main>
    </>
  );
}
