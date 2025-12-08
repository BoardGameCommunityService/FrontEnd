"use client";
import { useState } from "react";
import Button from "../../common/Button";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import useDateStore from "@/stores/post/useDateStore";
import DatePicker from "./DatePicker";
import TimePicker, { type Period } from "./TimePicker";

export default function DateTimeSelector() {
  const { setClose } = useBottomSheetStore();
  const { setSelectedDate: saveSelectedDateTime } = useDateStore();

  // 날짜/시간 단계 전환
  const [showTimePicker, setShowTimePicker] = useState(false);

  // 날짜 상태
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 시간 상태
  const [period, setPeriod] = useState<Period>("오전");
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);

  // 달력 계산
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isCurrentMonthView = year === today.getFullYear() && month === today.getMonth();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 1);
  const isMaxMonth = year === maxDate.getFullYear() && month === maxDate.getMonth();

  const weeks = useCalendarWeeks(year, month);

  // 날짜 확인 → 시간 선택으로 이동
  const handleDateConfirm = () => {
    if (!selectedDate) return;
    setShowTimePicker(true);
  };

  // 시간 확인 → 최종 저장
  const handleTimeConfirm = () => {
    if (!selectedDate) return;

    const finalDateTime = new Date(selectedDate);
    const actualHour = convertTo24Hour(period, hour);
    finalDateTime.setHours(actualHour, minute, 0, 0);

    saveSelectedDateTime(finalDateTime);
    setClose();
  };

  const handlePrevMonth = () => {
    if (isCurrentMonthView) return;
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    if (isMaxMonth) return;
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="overflow-hidden">
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex"
        style={{
          width: "200%",
          transform: showTimePicker ? "translateX(-50%)" : "translateX(0)",
        }}
      >
        {/* 날짜 선택 패널 */}
        <div className="w-1/2 flex flex-col gap-5">
          <DatePicker
            year={year}
            month={month}
            weeks={weeks}
            selectedDate={selectedDate}
            today={today}
            isCurrentMonthView={isCurrentMonthView}
            isMaxMonth={isMaxMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onSelectDate={setSelectedDate}
            onClose={setClose}
          />
          <Button
            type="button"
            text="확인"
            btnSize="medium"
            bgColor={selectedDate ? "bg-[#06E393]" : "bg-[#E5E5E5]"}
            textColor={selectedDate ? "text-[#161616]" : "text-[#999999]"}
            disabled={!selectedDate}
            onClick={handleDateConfirm}
          />
        </div>

        {/* 시간 선택 패널 */}
        <div className="w-1/2 flex flex-col gap-5">
          <TimePicker
            period={period}
            hour={hour}
            minute={minute}
            onPeriodChange={setPeriod}
            onHourChange={setHour}
            onMinuteChange={setMinute}
            onClose={setClose}
          />
          <Button
            type="button"
            text="확인"
            btnSize="medium"
            bgColor="bg-[#06E393]"
            textColor="text-[#161616]"
            onClick={handleTimeConfirm}
          />
        </div>
      </div>
    </div>
  );
}

// 12시간제 → 24시간제 변환
function convertTo24Hour(period: Period, hour: number): number {
  if (period === "오후" && hour !== 12) return hour + 12;
  if (period === "오전" && hour === 12) return 0;
  return hour;
}

// 달력 주 계산 훅
function useCalendarWeeks(year: number, month: number): Date[][] {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  const currentDate = new Date(startDay);

  while (currentDate <= endDay) {
    currentWeek.push(new Date(currentDate));
    if (currentWeek.length === 7 || currentDate.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}
