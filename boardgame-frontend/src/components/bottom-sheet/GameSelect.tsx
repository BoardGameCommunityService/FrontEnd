"use client";

import Image from "next/image";
import useBottomSheetStore from "@/stores/useBottomSheetStore";

export default function GameSelect() {
  const { setClose } = useBottomSheetStore();
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex w-full relative">
          <Image
            className="absolute left-3 top-1/2 -translate-y-1/2"
            src="/icons/ic_search_gray.svg"
            alt=""
            width={16}
            height={16}
          />
          <label htmlFor="search" className="sr-only">
            검색
          </label>
          <input
            className="w-full bg-[#F5F6FA] h-10 rounded-xl pl-[34px] placeholder:text-[#767676] text-sm text-[#161616] font-normal"
            type="text"
            id="search"
            placeholder="게임을 검색해주세요."
          />
        </div>
        <button aria-label="닫기" onClick={setClose}>
          <Image src="/icons/ic_close.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
