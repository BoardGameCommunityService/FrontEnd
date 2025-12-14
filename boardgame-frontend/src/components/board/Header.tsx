"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 공유 버튼(클립보드 카피) 함수
const copyToClipboard = () => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("URL이 복사되었습니다!");
    })
    .catch((err) => {
      console.error("복사 실패:", err);
    });
};

type HeaderProps = { host: boolean; id: number };

export default function Header({ host, id }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="px-5 flex justify-between items-center h-12">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
      </button>
      <div className="flex gap-4">
        <button className="cursor-pointer" type="button" onClick={copyToClipboard}>
          <Image src="/icons/ic_share.svg" alt="공유하기 버튼" width={24} height={24} />
        </button>
        {host ? (
          <Link href={`/board/new?id=${id}`} className="cursor-pointer">
            <Image src="/icons/ic_edit.svg" alt="수정하기 버튼" width={24} height={24} />
          </Link>
        ) : null}
      </div>
    </header>
  );
}
