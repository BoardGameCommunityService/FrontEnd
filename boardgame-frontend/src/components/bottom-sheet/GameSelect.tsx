"use client";

import Image from "next/image";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import { BoardGames } from "@/content/games/games";
import Button from "@/components/common/Button";
import { useRef, useState } from "react";
import useGameStore from "@/stores/post/useGameStore";
import React from "react";

export default function GameSelect() {
  const { setClose } = useBottomSheetStore();
  const { setGames, games } = useGameStore();

  const [selectGames, setSelectGames] = useState<Set<string>>(new Set(games));
  const [search, setSearch] = useState("");
  const indexRefs = useRef<Map<string, HTMLElement>>(new Map());

  const handleSelect = (game: string) => {
    setSelectGames((prev) => {
      const gameSet = new Set(prev);
      if (gameSet.has(game)) {
        gameSet.delete(game);
      } else {
        if (gameSet.size < 3) gameSet.add(game);
      }
      return gameSet;
    });
  };

  const handleSelectGames = () => {
    setGames([...selectGames]);
    setClose();
  };

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
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <button className="cursor-pointer" aria-label="닫기" onClick={setClose}>
          <Image src="/icons/ic_close_gray.svg" alt="" width={24} height={24} />
        </button>
      </div>

      {/* 중간 스크롤: 게임 리스트 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <ul
          className={`${search ? "flex flex-wrap gap-2 text-[#767676] text-[13px] leading-[18px] font-medium" : "flex flex-col gap-3"}`}
        >
          {BoardGames.map((k: { initial: string; games: Array<string> }) => (
            <React.Fragment key={k.initial}>
              {/* 검색한 게임 목록 */}
              {search ? (
                k.games
                  .filter((game: string) => game.includes(search))
                  .map((game) => (
                    <li
                      key={game}
                      className={`border ${selectGames.has(game) ? "border-[#161616] text-[#161616] font-semibold" : "border-[#DEE1E6]"} rounded-[34px]`}
                    >
                      <button className="py-2 px-2.5 w-full cursor-pointer" onClick={() => handleSelect(game)}>
                        {game}
                      </button>
                    </li>
                  ))
              ) : (
                <li key={k.initial} className="text-[#767676] text-[13px] leading-5">
                  {/* 전체 게임 목록 */}
                  <p
                    className="pb-1 border-b border-[#F1F1F4]"
                    ref={(el: HTMLElement | null) => {
                      if (el) indexRefs.current.set(k.initial, el);
                    }}
                  >
                    {k.initial}
                  </p>
                  <ul className="mt-3 flex gap-2 flex-wrap">
                    {k.games.map((game) => (
                      <li
                        key={game}
                        className={`border ${selectGames.has(game) ? "border-[#161616] text-[#161616] font-semibold" : "font-medium border-[#DEE1E6]"} rounded-[34px]`}
                      >
                        <button className="py-2 px-2.5 w-full cursor-pointer" onClick={() => handleSelect(game)}>
                          {game}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* 하단 고정: 버튼 */}
      <div className="flex flex-col gap-4 mt-3 pt-4 border-t border-[#F1F1F4] bg-white">
        <ul className="flex flex-wrap gap-2">
          {[...selectGames].map((game: string) => (
            <li
              key={game}
              className="text-[13px] text-[#161616] font-semibold border border-[#161616] rounded-[34px] leading-[18px] px-2.5 py-2"
            >
              <button className="flex gap-1 cursor-pointer" onClick={() => handleSelect(game)}>
                {game}
                <Image className="w-4 h-4" src="/icons/ic_close.svg" alt="삭제" width={16} height={16} />
              </button>
            </li>
          ))}
        </ul>

        <Button
          type="button"
          text="선택 완료"
          btnSize="medium"
          bgColor={selectGames.size ? "bg-[#06E393]" : "bg-[#EEF0F7]"}
          textColor={selectGames.size ? "text-[#161616]" : "text-[#767676]"}
          disabled={!selectGames.size}
          onClick={handleSelectGames}
        />
      </div>

      {/* 인덱스 */}
      {!search && (
        <ul className="flex flex-col justify-between items-center fixed right-2 top-[76px] bg-[#F5F6FA] p-1 w-5 max-h-[465px] h-full rounded-[1000000000px]">
          {BoardGames.map((k) => (
            <li key={k.initial} className="text-[13px] leading-5 text-[#767676]">
              <button
                className="cursor-pointer"
                onClick={() => indexRefs.current.get(k.initial)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                {k.initial}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
