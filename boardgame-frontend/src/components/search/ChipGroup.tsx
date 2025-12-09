interface ChipGroupProps {
  title: string;
  chips: string[];
  onItemClick: (chip: string) => void;
}

//검색어 입력 전
export default function ChipGroup({ title, chips, onItemClick }: ChipGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-[16px] text-[#161616]">{title}</h2>
      <ul className="flex flex-wrap gap-x-1 gap-y-2">
        {chips.map((v, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onItemClick?.(v)}
              className="px-2.5 py-2 rounded-[34px] border border-[#DEE1E6] font-medium text-[13px] text-[#767676]"
            >
              {v}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
