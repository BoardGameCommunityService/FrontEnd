"use client";

import RegionSelect from "@/components/bottom-sheet/RegionSelect";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  region: string;
  changeRegion: (region: string) => void;
}

export default function Header({ region, changeRegion }: HeaderProps) {
  const { setOpen } = useBottomSheetStore();

  const handleRegionSelect = () => {
    setOpen(<RegionSelect onSelect={(region) => changeRegion(region)} />, "auto");
  };

  return (
    <header className="w-full px-5 py-3 mt-11 mb-3 text-xl font-bold flex justify-between">
      <h1 className="sr-only">보드게임 친구 찾을때 보드메이트!</h1>

      <div className="relative inline-block">
        <button onClick={handleRegionSelect} className="flex items-center gap-[2px] cursor-pointer outline-none">
          <span>{region}</span>
          <Image src="/icons/ic_dropdown.svg" width={24} height={24} alt="dropdown" />
        </button>
      </div>

      <nav className="flex gap-2">
        <Link href="/search" className="m-[6px]">
          <Image src="/icons/ic_search.svg" alt="검색페이지로 이동" width={24} height={24} />
        </Link>
        <Link href="/mypage" className="m-[6px]">
          <Image src="/icons/ic_profile.svg" alt="마이페이지 이동" width={24} height={24} />
        </Link>
      </nav>
    </header>
  );
}
