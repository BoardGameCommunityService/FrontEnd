"use client";

import MeetingSkeleton from "@/components/loading/MeetingSkeleton";
import Image from "next/image";

import Badge from "@/components/common/Badge";
import dateFormatter from "@/util/dateFormatter";

import useMeetingDetail from "@/hooks/useMeetingDetail";
import { useParams } from "next/navigation";

//컴포넌트
import Header from "@/components/board/Hearder";
import MeetingJoinButton from "@/components/board/MeetingJoinButton";
import MemberList from "@/components/board/MemberList";
import PlaceSection from "@/components/board/PlaceSection";
import { useSession } from "next-auth/react";

export default function Page() {
  const params = useParams();
  const id = Number(params.id);

  const { data, loading } = useMeetingDetail(id);
  const { data: session } = useSession();

  if (loading || !data) return <MeetingSkeleton />;

  const {
    title,
    content,
    meetingPlace,
    meetingAddress,
    meetingAt,
    maxParticipants,
    currentParticipants,
    participants,
    gameNamesJson,
    host,
  } = data;

  const amIHost = Boolean(host.userId === Number(session?.user.id));

  //날짜 계산 함수
  const { year, month, day, hours, minutes } = dateFormatter(meetingAt);
  const displayDateTime = `${year}.${month}.${day} ${
    Number(hours) >= 12 ? "오후" : "오전"
  } ${Number(hours) > 12 ? Number(hours) - 12 : hours}:${minutes}`;

  //게임 뱃지 배열 생성 함수
  const gameListMaker = (gameNamesJson: string) => {
    const games = JSON.parse(gameNamesJson);
    if (games === null) return;
    if (games.length === 0) return;
    return games;
  };
  const gameList = gameListMaker(gameNamesJson);

  return (
    <>
      {/* 헤더 */}
      <Header host={amIHost} id={id} />
      {/* 메인 */}
      <main className="pb-[60px]">
        <section className="px-5 mt-2.5">
          {/* 제목 */}
          <h1 className="text-[20px] leading-7 font-bold">{title}</h1>
          {/* 태그 리스트 */}
          <ul className="flex gap-1 text-[13px] text-[#767676] font-medium leading-5 mt-3">
            <Badge>{`${currentParticipants}/${maxParticipants} 명`}</Badge>
            {gameList ? <Badge>{gameList}</Badge> : ""}
          </ul>
          {/* 게시글 내용 */}
          <p className="whitespace-pre-line mt-4 bg-[#F5F6FA] rounded-xl p-3 text-sm text-[#161616] leading-[22px]">
            {content}
          </p>
        </section>
        {/* 모임 날짜 */}
        <section className="px-5 mt-6">
          <h2 className="text-sm text-[#363636] font-semibold leading-[22px]">날짜</h2>
          <div className="flex items-center gap-2 mt-2 border border-[#DEE1E6] rounded-lg py-[9px]">
            <Image className="ml-3 w-4 h-4" src="/icons/ic_calendar.svg" alt="" width={16} height={16} />
            <time className="text-sm leading-[22px] font-semibold" dateTime={meetingAt}>
              {displayDateTime}
            </time>
          </div>
        </section>

        {/* 모임 장소 */}
        <PlaceSection meetingPlace={meetingPlace} meetingAddress={meetingAddress} />
        <div className="h-2.5 bg-[#F5F6FA] mt-5" role="separator" aria-hidden="true"></div>
        {/* 참여 인원 */}
        <MemberList participants={participants} host={host} />

        {/* 참가신청 버튼 */}
        {!amIHost && <MeetingJoinButton id={id} participants={participants} maxParticipants={maxParticipants} />}
      </main>
    </>
  );
}
