import NavigationBar from "@/components/common/NavigationBar";
import React from "react";
import Image from "next/image";

export default function Page() {
  const dummy = [
    { id: 1, type: "system", title: "강남구에 새로운 모임이 개설되었어요!", content: "개설된 모임을 확인해보세요" },
    { id: 2, type: "system", title: "문의한 글에 답변이 도착했어요.", content: "답변을 확인해보세요." },
    {
      id: 3,
      type: "invite",
      title: "‘한판만'님이 모임 참가 신청을 보냈어요.",
      content: "보드메이트와 함께 게임을 즐겨보세요.",
    },
    { id: 4, type: "invite", title: "모임 신청이 반려되었어요.", content: "아쉽지만 다른 모임에 참가해보세요." },
  ];

  return (
    <>
      <NavigationBar href="/mypage" title="알림" />
      <main>
        <section className="mt-2">
          <h2 className="sr-only">알림 목록</h2>
          <ul className="px-5 flex flex-col gap-1">
            {dummy.map((data) => (
              <li key={data.id} className="flex gap-3 p-4 bg-white rounded-xl cursor-pointer">
                <Image
                  src={`${data.type === "system" ? "/icons/ic_logo_black.svg" : "/icons/ic_logo_green.svg"}`}
                  alt=""
                  width={36}
                  height={36}
                />
                <div className="text-[14px] leading-[22px]">
                  <h3 className="font-semibold text-[#363636]">{data.title}</h3>
                  <p>{data.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
