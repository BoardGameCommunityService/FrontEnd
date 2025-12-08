"use client";
import Image from "next/image";
import iconClose from "../../../../public/icons/ic_close_gray.svg";
import ScrollPicker from "./ScrollPicker";

const PERIODS = ["오전", "오후"] as const;
//이렇게하면 쉽게 12까지 생성가능
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
//이렇게하면 5분단위 쉽게 생성 가능
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

type Period = (typeof PERIODS)[number];

// 시간 선택 관련 props (공통)
interface TimePickerBodyProps {
  /** 오전/오후 */
  period: Period;
  /** 시간 */
  hour: number;
  /** 분 */
  minute: number;
  /** 오전/오후 변경 시 호출 */
  onPeriodChange: (p: Period) => void;
  /** 시간 변경 시 호출 */
  onHourChange: (h: number) => void;
  /** 분 변경 시 호출 */
  onMinuteChange: (m: number) => void;
}

// TimePicker는 닫기 버튼이 추가됨
interface TimePickerProps extends TimePickerBodyProps {
  /** 닫기 버튼 클릭 시 호출 */
  onClose: () => void;
}

// 시간 선택 컴포넌트
export default function TimePicker({
  period,
  hour,
  minute,
  onPeriodChange,
  onHourChange,
  onMinuteChange,
  onClose,
}: TimePickerProps) {
  return (
    <>
      <Header onClose={onClose} />
      <TimePickerBody
        period={period}
        hour={hour}
        minute={minute}
        onPeriodChange={onPeriodChange}
        onHourChange={onHourChange}
        onMinuteChange={onMinuteChange}
      />
    </>
  );
}

// 분리된 모듈

//헤더 (닫힘 버튼만)
function Header({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex justify-end items-center">
      <button type="button" onClick={onClose}>
        <Image src={iconClose} alt="닫기" width={24} height={24} />
      </button>
    </header>
  );
}

// 시간 선택 휠
function TimePickerBody({ period, hour, minute, onPeriodChange, onHourChange, onMinuteChange }: TimePickerBodyProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-center items-center gap-2">
        <ScrollPicker
          items={PERIODS}
          value={period}
          onChange={(v) => onPeriodChange(v as Period)}
          formatItem={(v) => v}
        />
        <ScrollPicker
          items={HOURS}
          value={hour}
          onChange={(v) => onHourChange(v as number)}
          formatItem={(v) => String(v)}
          infinite
        />
        <ScrollPicker
          items={MINUTES}
          value={minute}
          onChange={(v) => onMinuteChange(v as number)}
          formatItem={(v) => String(v).padStart(2, "0")}
          infinite
        />
      </div>
    </section>
  );
}

export type { Period };
