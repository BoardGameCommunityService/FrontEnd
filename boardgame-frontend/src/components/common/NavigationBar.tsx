import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavigationBar({ title, elements }: { title: string; elements?: React.ReactNode }) {
  return (
    <header className="px-5 flex justify-between items-center h-12">
      <div className="flex items-center gap-0.5">
        <Link href="/public" className="cursor-pointer">
          <Image src="/icons/ic_back.svg" alt="뒤로가기" width={24} height={24} />
        </Link>
        <h1 className="text-[#161616] font-bold text-[20px] leading-7">{title}</h1>
      </div>
      {elements}
    </header>
  );
}
