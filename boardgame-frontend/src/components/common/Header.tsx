"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const options = [
    "서울",
    "부산",
    "대구",
    "인천",
    "울산",
    "세종시",
    "경기도",
    "충청남도",
    "충청북도",
    "전라남도",
    "경상남도",
    "경상북도",
    "제주도",
    "강원도",
    "전라북도",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("서울");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  return (
    <header className="w-full px-5 py-3 mt-11 mb-3 text-xl font-bold flex justify-between">
      <h1 className="sr-only">보드게임 친구 찾을때 보드메이트!</h1>

      <div ref={dropdownRef} className="relative inline-block">
        {/* Dropdown 버튼 */}
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-[2px] cursor-pointer outline-none">
          <span>{selected}</span>
          <Image src="/icons/ic_dropdown.svg" width={24} height={24} alt="dropdown" />
        </button>

        {/* Dropdown 메뉴 */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-[#DEE1E6] text-[#767676] font-normal rounded-xl shadow-lg z-10">
            {options.map((option) => (
              <label
                key={option}
                className="
                flex items-center gap-2
                px-[10px] py-2

                cursor-pointer
                whitespace-nowrap
                mr-3

              "
              >
                <input
                  type="radio"
                  name="location"
                  value={option}
                  checked={selected === option}
                  onChange={() => handleSelect(option)}
                  className="cursor-pointer hidden"
                />
                {/* 선택된 항목에만 체크 표시 */}
                {selected === option && (
                  <>
                    <span className="text-green-500">✓</span>
                    <span className="text-black font-semibold">{option}</span>
                  </>
                )}

                {/* 선택되지 않은 항목은 체크 자리 비우기 */}
                {selected !== option && (
                  <>
                    <span className="w-5"></span>
                    <span>{option}</span>
                  </>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      <nav className="flex gap-2">
        <Link href="/board/search" className="m-[6px]">
          <Image src="/icons/ic_search.svg" alt="검색페이지로 이동" width={24} height={24} />
        </Link>
        <Link href="/profile" className="m-[6px]">
          <Image src="/icons/ic_profile.svg" alt="내 프로필로 이동" width={24} height={24} />
        </Link>
      </nav>
    </header>
  );
}
