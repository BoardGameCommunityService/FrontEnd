"use client";

import Link from "next/link";

import nextIcon from "../../../../public/icons/ic_chevron_right_icon.svg";
import calendarIcon from "../../../../public/icons/ic_calendor.svg";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import PeopleSelector from "@/components/common/PeopleSelector";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import GameSelect from "@/components/bottom-sheet/GameSelect";
import DateTimeSelector from "@/components/bottom-sheet/TimeSelect";
import useDateStore from "@/stores/post/useDateStore";
import useGameStore from "@/stores/post/useGameStore";
import { formatDateTime } from "@/util/dateFormatter";

export default function New() {
  // textarea 글자수 카운터
  const [inputCount, setInputCount] = useState(0);
  //인원수
  const [people, setPeople] = useState<number | "무제한">(2);

  const { setOpen } = useBottomSheetStore();
  const { selectedDate } = useDateStore();
  const { games, setGames } = useGameStore();

  const handleInputCount = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  const handleGameSelect = () => {
    setOpen(<GameSelect />, "fixed");
  };

  const handleDateSelect = () => {
    setOpen(<DateTimeSelector />, "auto");
  };

  const handleGameDelete = (game: string) => {
    setGames(games.filter((g) => g !== game));
  };

  return (
    <div id="page-container" className="flex justify-center relative">
      <div className="w-[335px] flex flex-col">
        <header className="h-[52px] py-3 flex gap-0.5 items-center">
          <Link href="/login">
            <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
          </Link>
          <h1 className="font-semibold text-[20px] text-[#161616]">모임 만들기</h1>
        </header>
        <section className="py-2">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="w-full h-12 rounded-xl px-3 border border-[#DEE1E6] text-sm text-[#161616] placeholder:text-[#767676]"
          />
          <div className="flex flex-col gap-1">
            <textarea
              placeholder="모임 소개글을 입력해주세요.(최대 300자)"
              maxLength={300}
              onChange={handleInputCount}
              className="mt-3 resize-none min-w-[335px] min-h-60 px-3 py-3 bg-white rounded-xl border border-[#DEE1E6] text-sm text-[#161616] placeholder:text-[#767676] field-sizing-content leading-[22px]"
            />
            <div className="flex gap-0.5">
              <span className="font-normal text-sm text-[#161616]">{inputCount}</span>
              <span className="font-normal text-sm text-[#767676]">/300</span>
            </div>
          </div>

          {/* 게임 지정 */}
          <div className="mt-8 flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-0.5 items-center">
                <h3 className="font-medium text-[14px] leading-[22px] text-[#363636]">게임</h3>
                <span className="font-normal text-[12px] text-[#999999]">(선택)</span>
              </div>
              {games.length > 0 && (
                <button
                  className="text-[13px] text-[#767676] leading-5 underline underline-offset-[2px] font-normal cursor-pointer"
                  onClick={handleGameSelect}
                >
                  변경하기
                </button>
              )}
            </div>

            {games.length ? (
              <ul className="flex flex-wrap gap-2">
                {games.map((game: string) => (
                  <li
                    key={game}
                    className="text-[13px] text-[#161616] font-semibold border border-[#161616] rounded-[34px] leading-[18px] px-2.5 py-2"
                  >
                    <button className="flex gap-1 cursor-pointer" onClick={() => handleGameDelete(game)}>
                      {game}
                      <Image className="w-4 h-4" src="/icons/ic_close.svg" alt="삭제" width={16} height={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <button
                className="min-w-[335px] h-10 rounded-lg border border-[#DEE1E6] p-3 flex justify-between items-center cursor-pointer"
                type="button"
                onClick={handleGameSelect}
              >
                <span className="font-normal text-sm text-[#767676]">원하는 게임을 지정해주세요(최대 3개)</span>
                <Image src={nextIcon} alt="" width={20} height={20} />
              </button>
            )}
          </div>

          {/* 장소 지정 */}
          <div className="mt-8 flex flex-col gap-2">
            <h3 className="font-medium text-[14px] text-[#363636]">장소</h3>

            <div className="min-w-[335px] h-10 rounded-lg border border-[#DEE1E6] p-3 flex justify-between items-center">
              <span className="font-normal text-sm text-[#767676]">모임 장소를 정해주세요.</span>
              <Image src={nextIcon} alt="" width={20} height={20} />
            </div>
          </div>

          {/* 날짜 지정 */}
          <div className="mt-8 flex flex-col gap-2">
            <h3 className="font-medium text-[14px] text-[#363636]">날짜</h3>

            <button
              className="min-w-[335px] h-10 rounded-lg border border-[#DEE1E6] p-3 flex justify-between items-center"
              type="button"
              onClick={handleDateSelect}
            >
              <span className={`font-normal text-sm ${selectedDate ? "text-[#161616]" : "text-[#767676]"}`}>
                {selectedDate ? formatDateTime(selectedDate) : "날짜를 선택해주세요."}
              </span>
              <Image src={calendarIcon} alt="" width={20} height={20} />
            </button>
          </div>

          {/* 인원 지정 */}
          <div className="mt-8 mb-[17px] flex flex-col gap-2">
            <h3 className="font-medium text-[14px] text-[#363636]">인원</h3>

            <PeopleSelector value={people} onChange={(v) => setPeople(v)} />
          </div>
        </section>
        <button
          type="button"
          className="mt-4 mb-10 h-11 rounded-[10px] bg-[#06E393] font-semibold text-sm text-[#161616]"
        >
          만들기
        </button>
      </div>
    </div>
  );
}
