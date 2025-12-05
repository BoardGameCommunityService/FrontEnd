import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Menu({
  title,
  elements = (
    <Link href="/terms">
      <Image src="/icons/ic_right20.svg" alt="이동하기" width={20} height={20} />
    </Link>
  ),
  isTop = false,
  isBottom = false,
}: {
  title: string;
  elements?: React.ReactNode;
  isTop?: boolean;
  isBottom?: boolean;
}) {
  return (
    <li
      className={`flex justify-between bg-[#FFFFFF] ${isTop && "rounded-t-2xl"} ${isBottom && "rounded-b-2xl"} px-4 py-[13px]`}
    >
      <span className="text-sm leading-[22px] font-medium">{title}</span>
      {elements}
    </li>
  );
}
