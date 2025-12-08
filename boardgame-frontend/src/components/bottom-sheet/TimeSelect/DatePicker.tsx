"use client";
import Image from "next/image";
import iconClose from "../../../../public/icons/ic_close_gray.svg";
import leftIcon from "../../../../public/icons/ic_back.svg";
import rightIcon from "../../../../public/icons/ic_right.svg";

interface DatePickerProps {
  year: number;
  month: number;
  weeks: Date[][];
  selectedDate: Date | null;
  today: Date;
  isCurrentMonthView: boolean;
  isMaxMonth: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export default function DatePicker({
  year,
  month,
  weeks,
  selectedDate,
  today,
  isCurrentMonthView,
  isMaxMonth,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onClose,
}: DatePickerProps) {
  return (
    <>
      <Header title="날짜 선택" onClose={onClose} />
      <Calendar
        year={year}
        month={month}
        weeks={weeks}
        selectedDate={selectedDate}
        today={today}
        isCurrentMonthView={isCurrentMonthView}
        isMaxMonth={isMaxMonth}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onSelectDate={onSelectDate}
      />
    </>
  );
}

function Header({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <header className="flex justify-between items-center">
      <h2 className="font-semibold text-lg text-[#161616]">{title}</h2>
      <button type="button" onClick={onClose}>
        <Image src={iconClose} alt="닫기" width={24} height={24} />
      </button>
    </header>
  );
}

interface CalendarProps {
  year: number;
  month: number;
  weeks: Date[][];
  selectedDate: Date | null;
  today: Date;
  isCurrentMonthView: boolean;
  isMaxMonth: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
}

function Calendar({
  year,
  month,
  weeks,
  selectedDate,
  today,
  isCurrentMonthView,
  isMaxMonth,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
}: CalendarProps) {
  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <section>
      {/* 월 네비게이션 */}
      <div className="mb-2 h-[26px] flex justify-between">
        <button
          type="button"
          disabled={isCurrentMonthView}
          className={isCurrentMonthView ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
          onClick={onPrevMonth}
        >
          <Image src={leftIcon} alt="이전 달" width={24} height={24} />
        </button>
        <span className="font-semibold text-lg text-[#161616]">
          {year}.{String(month + 1).padStart(2, "0")}
        </span>
        <button
          type="button"
          disabled={isMaxMonth}
          className={isMaxMonth ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
          onClick={onNextMonth}
        >
          <Image src={rightIcon} alt="다음 달" width={24} height={24} />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 justify-items-center gap-x-2 font-normal text-[13px] text-[#767676]">
        {WEEKDAYS.map((day, i) => (
          <div key={i} className="w-9 h-9 flex justify-center items-center">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="flex flex-col gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 justify-items-center gap-x-2">
            {week.map((date, dateIndex) => (
              <DateCell
                key={dateIndex}
                date={date}
                selectedDate={selectedDate}
                today={today}
                currentMonth={month}
                onSelect={onSelectDate}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

interface DateCellProps {
  date: Date;
  selectedDate: Date | null;
  today: Date;
  currentMonth: number;
  onSelect: (date: Date) => void;
}

function DateCell({ date, selectedDate, today, currentMonth, onSelect }: DateCellProps) {
  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  const isPastDate = (d: Date) => {
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayStart;
  };

  const isSelected = selectedDate && isSameDate(date, selectedDate);
  const isToday = isSameDate(date, today);
  const isOtherMonth = date.getMonth() !== currentMonth;
  const isPast = isPastDate(date);
  const isSunday = date.getDay() === 0;
  const isDisabled = isPast || isOtherMonth;

  const cellClassName = `
    w-9 h-9 flex justify-center items-center rounded-full text-sm
    ${isSelected ? "font-semibold text-white bg-[#161616]" : ""}
    ${isToday && !isSelected ? "border border-[#F1F1F4]" : ""}
    ${isOtherMonth ? "text-[#CECECE]" : ""}
    ${isPast && !isOtherMonth ? "text-[#CECECE] cursor-not-allowed" : ""}
    ${!isSelected && !isOtherMonth && !isPast && !isSunday ? "text-[#161616]" : ""}
  `;

  return (
    <button type="button" disabled={isDisabled} onClick={() => onSelect(date)} className={cellClassName}>
      {date.getDate()}
    </button>
  );
}
