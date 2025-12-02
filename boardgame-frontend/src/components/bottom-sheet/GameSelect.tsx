"use client";

import Image from "next/image";

export default function GameSelect() {
  return (
    <div>
      <div className="flex">
        <div>
          <Image src="/icons/ic_search.svg" alt="" width={16} height={16} />
          <label htmlFor="search" className="sr-only">
            검색
          </label>
          <input type="text" />
        </div>
        <button aria-label="닫기">
          <Image src="/icons/ic_close.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
