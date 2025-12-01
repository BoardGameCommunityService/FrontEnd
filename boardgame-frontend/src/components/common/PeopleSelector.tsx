import React from "react";

type Option = number | "무제한";

interface Props {
  value?: Option;
  onChange?: (v: Option) => void;
}

// 인원수 버튼 관리
export default function PeopleSelector({ value, onChange }: Props) {
  const options: Option[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, "무제한"];

  const handleKey = (e: React.KeyboardEvent, opt: Option) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange?.(opt);
    }
  };

  return (
    <div className={`grid grid-cols-5 gap-2`} role="radiogroup" aria-label="인원 선택">
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <button
            key={String(opt)}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange?.(opt)}
            onKeyDown={(e) => handleKey(e, opt)}
            className={`h-8 rounded-lg flex items-center justify-center text-sm text-[#767676] focus:outline-none transition-colors border
              ${isSelected ? "font-semibold border-[#161616]" : "font-normal border-[#DEE1E6]"}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
