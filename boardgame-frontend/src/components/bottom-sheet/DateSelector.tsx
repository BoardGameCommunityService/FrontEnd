"use client";
import Button from "../common/Button";
import iconClose from "../../../public/icons/ic_close_gray.svg";
import leftIcon from "../../../public/icons/ic_back.svg";
import rightButton from "../../../public/icons/ic_right.svg";
import { useState } from "react";

import Image from "next/image";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import useDateStore from "@/stores/post/useDateStore";

export default function DateSelector() {
  const { setClose } = useBottomSheetStore();
  const { setSelectedDate: saveSelectedDate } = useDateStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 이번 달인지 확인 (이전 달 버튼 비활성화용)
  const isCurrentMonthView = year === today.getFullYear() && month === today.getMonth();

  // 3개월 후 날짜 계산 (다음 달 버튼 비활성화용)
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 1);
  const isMaxMonth = year === maxDate.getFullYear() && month === maxDate.getMonth();

  // 현재 달의 첫 날
  const firstDayOfMonth = new Date(year, month, 1);
  // 달력 시작 날짜를 현재 달의 첫 날의 주의 일요일로 설정
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  // 현재 달의 마지막 날
  const lastDayOfMonth = new Date(year, month + 1, 0);
  // 달력 끝 날짜를 현재 달의 마지막 날의 주의 토요일로 설정
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  /** startDay부터 endDay까지의 날짜를 주 단위로 그룹화하는 함수 */
  const groupDatesByWeek = (startDay: Date, endDay: Date) => {
    const weeks = []; // 최종적으로 주 단위로 그룹화된 날짜 배열들을 저장할 배열
    let currentWeek = []; // 현재 처리 중인 주를 나타내는 배열
    const currentDate = new Date(startDay); // 반복 처리를 위한 현재 날짜 변수, 시작 날짜로 초기화

    // 시작 날짜부터 끝 날짜까지 반복
    while (currentDate <= endDay) {
      currentWeek.push(new Date(currentDate)); // 현재 날짜를 현재 주에 추가
      // 현재 주가 7일을 모두 채웠거나 현재 날짜가 토요일인 경우
      if (currentWeek.length === 7 || currentDate.getDay() === 6) {
        weeks.push(currentWeek); // 완성된 주를 weeks 배열에 추가
        currentWeek = []; // 새로운 주를 시작하기 위해 currentWeek을 재초기화
      }
      currentDate.setDate(currentDate.getDate() + 1); // 현재 날짜를 다음 날로 변경
    }

    // 마지막 주 처리 (만약 남아있다면)
    if (currentWeek.length > 0) {
      weeks.push(currentWeek); // 남아 있는 날짜가 있다면 마지막 주로 weeks에 추가
    }

    return weeks; // 주 단위로 그룹화된 날짜 배열들을 반환
  };

  const weeks = groupDatesByWeek(startDay, endDay);

  // 날짜 비교 함수들
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month;
  };

  const isPastDate = (date: Date) => {
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const handlePrevMonth = () => {
    if (isCurrentMonthView) return;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    if (isMaxMonth) return;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* 제목 닫기버튼 */}
        <header className="flex justify-between">
          <h2 className="font-semibold text-lg text-[#161616]">날짜 선택</h2>
          <button type="button" onClick={setClose}>
            <Image src={iconClose} alt="닫기" width={24} height={24} />
          </button>
        </header>
        <section>
          {/* 월 */}
          <div className="mb-2 h-[26px] flex justify-between">
            <button
              type="button"
              disabled={isCurrentMonthView}
              className={`${isCurrentMonthView ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={handlePrevMonth}
            >
              <Image src={leftIcon} alt="이전 달" width={24} height={24} />
            </button>
            <span className="font-semibold text-lg text-[#161616]">
              {year}.{String(month + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              disabled={isMaxMonth}
              className={`${isMaxMonth ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={handleNextMonth}
            >
              <Image src={rightButton} alt="다음 달" width={24} height={24} />
            </button>
          </div>
          {/* 일 */}
          <div>
            <div className="grid grid-cols-7 justify-items-center gap-x-2 font-normal text-[13px] text-[#767676]">
              {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
                <div key={i} className="w-9 h-9 flex justify-center items-center">
                  {d}
                </div>
              ))}
            </div>

            {/* 날짜 테이블 */}
            <div className="flex flex-col gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 justify-items-center gap-x-2">
                  {week.map((date, dateIndex) => {
                    const isSelected = selectedDate && isSameDate(date, selectedDate);
                    const isToday = isSameDate(date, today);
                    const isOtherMonth = !isCurrentMonth(date);
                    const isPast = isPastDate(date);
                    const isSunday = date.getDay() === 0;

                    return (
                      <button
                        key={dateIndex}
                        type="button"
                        disabled={isPast || isOtherMonth}
                        onClick={() => setSelectedDate(date)}
                        className={`w-9 h-9 flex justify-center items-center rounded-full text-sm
                          ${isSelected ? " font-semibold text-[white] bg-[#161616]" : ""}
                          ${isToday && !isSelected ? "border border-[#F1F1F4]" : ""}
                          ${isOtherMonth ? "text-[#CECECE]" : ""}
                          ${isPast && !isOtherMonth ? "text-[#CECECE] cursor-not-allowed" : ""}
                          ${!isSelected && !isOtherMonth && !isPast && !isSunday ? "text-[#161616]" : ""}
                        `}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 확인버튼 */}
        <div>
          <Button
            type="button"
            text="확인"
            btnSize="medium"
            bgColor={selectedDate ? "bg-[#06E393]" : "bg-[#E5E5E5]"}
            textColor={selectedDate ? "text-[#161616]" : "text-[#999999]"}
            disabled={!selectedDate}
            onClick={() => {
              if (selectedDate) {
                saveSelectedDate(selectedDate);
                setClose();
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
