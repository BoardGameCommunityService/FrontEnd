"use client";

import Image from "next/image";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import { BoardGames } from "@/content/games/games";
import Button from "@/components/common/Button";

export default function GameSelect() {
  const { setClose } = useBottomSheetStore();

  return (
    <div className="flex flex-col h-full relative">
      {/* 상단 고정: 검색 */}
      <div className="flex gap-3 pb-4">
        <div className="flex w-full relative">
          <Image
            className="absolute left-3 top-1/2 -translate-y-1/2"
            src="/icons/ic_search_gray.svg"
            alt=""
            width={16}
            height={16}
          />
          <label htmlFor="search" className="sr-only">
            검색
          </label>
          <input
            className="w-full bg-[#F5F6FA] h-10 rounded-xl pl-[34px] placeholder:text-[#767676] text-sm text-[#161616] font-normal"
            type="text"
            id="search"
            placeholder="게임을 검색해주세요."
          />
        </div>
        <button className="cursor-pointer" aria-label="닫기" onClick={setClose}>
          <Image src="/icons/ic_close_gray.svg" alt="" width={24} height={24} />
        </button>
      </div>

      {/* 중간 스크롤: 게임 리스트 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <ul className="flex flex-col gap-3 ">
          {BoardGames.map((k: { initial: string; games: Array<string> }) => (
            <li key={k.initial} className="text-[#767676] text-[13px] leading-5">
              <p className="pb-1 border-b border-[#F1F1F4]">{k.initial}</p>
              <ul className="mt-3 flex gap-2 flex-wrap">
                {k.games.map((game) => (
                  <li key={k.initial + game} className="border border-[#DEE1E6] rounded-[34px]">
                    <button className="py-2 px-2.5 w-full cursor-pointer">{game}</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 고정: 버튼 */}
      <div className="mt-3 pt-4 border-t border-[#F1F1F4] bg-white">
        <Button type="button" text="선택 완료" btnSize="medium" />
      </div>

      <ul className="flex flex-col justify-between items-center fixed right-2 top-[76px] bg-[#F5F6FA] p-1 w-5 max-h-[465px] h-full rounded-[1000000000px]">
        {BoardGames.map((k) => (
          <li key={k.initial} className="text-[13px] leading-5 text-[#767676] rounde">
            <button className="cursor-pointer">{k.initial}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
