import Link from "next/link";
import Image from "next/image";

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

type HearderProps = { host: boolean; id: number };

export default function Hearder({ host, id }: HearderProps) {
  return (
    <header className="px-5 flex justify-between items-center h-12">
      <Link href="/" className="cursor-pointer">
        <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
      </Link>
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
