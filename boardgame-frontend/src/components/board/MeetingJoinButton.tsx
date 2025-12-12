"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import useModalStore from "@/stores/useModalStore";

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

  const { setModal, setClose } = useModalStore();

  //참가신청 취소 페치함수
  async function fetchJoin() {
    if (!session?.user.accessToken) {
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/${id}/participants`, {
        method: isJoined ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("참가 신청 실패");
      }

      window.location.reload();
    } catch (error: any) {
      console.error("통신 에러", error);
    } finally {
      setIsLoading(false);
      router.push(`/board/${id}`);
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
    <div className="mb-1.5 fixed bottom-0 right-0 left-1/2 -translate-x-1/2 w-full max-w-[335px]">
      <button
        className={`w-full ${buttonColor || !isLoading ? "bg-[#06E393]" : "bg-[#EEF0F7]"} text-sm leading-[22px] text-[#161616] font-semibold py-[11px] rounded-[10px] cursor-pointer`}
        type="button"
        onClick={handleConfirmClick}
        disabled={isLoading || isDisabled}
      >
        {isLoading ? "로딩 중..." : buttonText}
      </button>
    </div>
  );
}
