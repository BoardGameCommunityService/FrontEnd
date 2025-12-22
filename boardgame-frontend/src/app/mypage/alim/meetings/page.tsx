import NavigationBar from "@/components/common/NavigationBar";
import React from "react";
import RegionMeetingsList from "@/components/board/alim/RegionMeetingsList";
import { serverAuthFetch } from "@/util/serverAuthFetch";
import { Post } from "@/types/post";

export default async function Page() {
  const { data, error } = await serverAuthFetch<Post[]>(
    `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/notifications/region/meetings`
  );

  const results = data || [];

  return (
    <>
      <NavigationBar href="/mypage/alim" />
      <main>
        <RegionMeetingsList results={results} error={error} />
      </main>
    </>
  );
}
