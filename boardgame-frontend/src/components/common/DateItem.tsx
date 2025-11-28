// 날짜 컴포넌트
interface DateItemProps {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
}

export default function DateItem({ date, isSelected, onClick }: DateItemProps) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dateNum = date.getDate();
  const dayName = week[date.getDay()];

  return (
    <li>
      <button
        onClick={onClick}
        className={`w-[42px] h-[56px] rounded-full ${
          isSelected ? "bg-[#06E393] border-black border-2" : "border-2 border-transparent"
        }`}
      >
        <p
          className={`flex flex-col justify-center ${
            isSelected ? "text-black font-semibold" : dayName === "일" ? "text-[#FC3B45]" : "text-[#161616]"
          }`}
        >
          <span>{dateNum}</span>
          <span className="text-xs">{dayName}</span>
        </p>
      </button>
    </li>
  );
}
