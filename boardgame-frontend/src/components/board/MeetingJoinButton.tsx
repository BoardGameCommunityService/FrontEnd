"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import useModalStore from "@/stores/useModalStore";
import { useMyPageStore } from "@/stores/mypage/useMyPageStore";
import { useParticipatedStore } from "@/stores/mypage/useParticipatedStore";
import { useAuthFetch } from "@/hooks/useAuthFetch";

interface Props extends Pick<Post, "participants" | "maxParticipants"> {
  id: number;
}

// 구조분해할당으로 바로 사용
export default function MeetingJoinButton({ id, participants, maxParticipants }: Props) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState(false);
  const { authFetch } = useAuthFetch();

  const { setModal, setClose } = useModalStore();

  //참가 신청 상태 전역 관리
  const { setIsFetched: setMyPageFetched } = useMyPageStore();
  const { setIsFetched: setParticipatedFetched } = useParticipatedStore();

  //참가신청 취소 페치함수
  async function fetchJoin() {
    if (!session?.user.accessToken) {
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/${id}/participants`, {
        method: isJoined ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("참가 신청 실패");
      }

      //참여 요약 리페치 트리거
      setMyPageFetched(false); // 요약 데이터 refetch 트리거
      setParticipatedFetched(false); // 리스트 데이터 refetch 트리거
    } catch (error: any) {
      console.error("통신 에러", error);
    } finally {
      setIsLoading(false);
      router.back();
    }
  }

  // 신청 확인 모달
  function handleConfirmClick() {
    if (isJoined) {
      setModal(
        "참가 신청을 취소하시겠습니까?",
        "확인",
        async () => {
          setClose();
          await fetchJoin();
        },
        "취소",
        () => {
          setClose();
        }
      );
    } else {
      setModal(
        "모임 참가 신청을 하시겠습니까?",
        "신청",
        async () => {
          setClose();
          await fetchJoin();
        },
        "취소",
        () => {
          setClose();
        }
      );
    }
  }

  useEffect(() => {
    if (status === "loading" || !session?.user?.accessToken) return;
    const amIParticipant = (participants ?? []).some((p) => p.nickname === session?.user?.name);

    if (participants.length === maxParticipants) {
      setButtonColor(false);
      setIsDisabled(true);
      setButtonText("모집 마감");
    } else if (amIParticipant) {
      setButtonColor(false);
      setIsDisabled(false);
      setIsJoined(true);
      setButtonText("신청 취소");
    } else {
      setButtonColor(true);
      setButtonText("참가 신청");
      setIsDisabled(false);
      setIsJoined(false);
    }
  }, [participants, maxParticipants, session?.user?.name]);

  return (
    <div className="mb-1.5 w-full max-w-[335px]">
      <button
        className={`w-full ${buttonColor || !isLoading ? "bg-[#06E393]" : "bg-[#EEF0F7]"} text-sm leading-[22px] text-[#161616] font-semibold py-[11px] rounded-[10px] cursor-pointer`}
        type="button"
        onClick={handleConfirmClick}
        disabled={isLoading || isDisabled}
      >
        {isLoading ? "로딩 중" : buttonText}
      </button>
    </div>
  );
}
