"use client";

import { useState } from "react";
import DateItem from "./DateItem";

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // 오늘부터 30일간의 날짜 배열 생성
  const getDatesForMonth = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = getDatesForMonth();

  // 날짜 비교 함수 (년-월-일만 비교)
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <ul className="w-[375px] overflow-x-scroll [&::-webkit-scrollbar]:hidden flex self-start pl-5">
      {dates.map((date, index) => (
        <DateItem
          key={index}
          date={date}
          isSelected={isSameDate(date, selectedDate)}
          onClick={() => setSelectedDate(date)}
        />
      ))}
    </ul>
  );
}
