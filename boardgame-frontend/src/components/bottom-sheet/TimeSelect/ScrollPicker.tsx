"use client";
import { useRef, useEffect } from "react";

interface ScrollPickerProps<T extends string | number> {
  /** 선택 가능한 아이템 목록 */
  items: readonly T[];
  /** 현재 선택된 값 */
  value: T;
  /** 값 변경 시 호출 */
  onChange: (value: T) => void;
  /** 아이템 표시 형식 */
  formatItem: (item: T) => string;
  /** 무한 스크롤 여부 */
  infinite?: boolean;
}

const ITEM_HEIGHT = 40;
const REPEAT_COUNT = 100;

export default function ScrollPicker<T extends string | number>({
  items,
  value,
  onChange,
  formatItem,
  infinite = false,
}: ScrollPickerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 무한스크롤 시 중앙 세트의 시작 인덱스
  const middleOffset = infinite ? Math.floor(REPEAT_COUNT / 2) * items.length : 0;

  // 초기 스크롤 위치 설정
  useEffect(() => {
    if (!containerRef.current) return;

    const valueIndex = items.indexOf(value);
    if (valueIndex === -1) return;

    const targetIndex = middleOffset + valueIndex;
    containerRef.current.scrollTop = targetIndex * ITEM_HEIGHT;
  }, []);

  // 스크롤 끝났을 때 가장 가까운 아이템 선택
  const handleScrollEnd = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const rawIndex = Math.round(scrollTop / ITEM_HEIGHT);

    // 실제 아이템 인덱스 계산
    const actualIndex = infinite
      ? ((rawIndex % items.length) + items.length) % items.length
      : Math.max(0, Math.min(rawIndex, items.length - 1));

    if (items[actualIndex] !== value) {
      onChange(items[actualIndex]);
    }

    // 스냅 위치로 정렬
    containerRef.current.scrollTo({
      top: rawIndex * ITEM_HEIGHT,
      behavior: "smooth",
    });
  };

  // 스크롤 이벤트 (debounce로 끝 감지)
  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(handleScrollEnd, 100);
  };

  // 클릭으로 선택
  const handleItemClick = (displayIndex: number) => {
    if (!containerRef.current) return;

    const actualIndex = displayIndex % items.length;
    onChange(items[actualIndex]);

    containerRef.current.scrollTo({
      top: displayIndex * ITEM_HEIGHT,
      behavior: "smooth",
    });
  };

  // 렌더링할 총 아이템 수
  const totalCount = infinite ? items.length * REPEAT_COUNT : items.length;

  return (
    <div ref={containerRef} className="h-[200px] w-20 overflow-y-auto scrollbar-hide" onScroll={handleScroll}>
      {/* 상단 여백 */}
      <div className="h-20" />

      {Array.from({ length: totalCount }, (_, i) => {
        const actualIndex = i % items.length;
        const item = items[actualIndex];
        const isSelected = item === value;

        return (
          <div
            key={i}
            onClick={() => handleItemClick(i)}
            className={`h-10 flex justify-center items-center text-base cursor-pointer
              ${isSelected ? "font-semibold text-[#161616] bg-[#F1F1F4] rounded-lg" : "text-[#767676]"}
            `}
          >
            {formatItem(item)}
          </div>
        );
      })}

      {/* 하단 여백 */}
      <div className="h-20" />
    </div>
  );
}
