import Image from "next/image";
import Link from "next/link";
import emptyLogo from "../../../public/emptyLogo.svg";

//검색 결과 없음 Empty state
export default function EmptyState() {
  return (
    <div className="flex flex-col items-center">
      <Image src={emptyLogo} alt="보드메이트" width={48.75} height={58.5} className="-rotate-15" />
      <h2 className="mt-4 font-semibold text-[15px] text-[#363636]">첫 모임을 만들어볼까요?</h2>

      <p className="mt-1 font-normal text-[13px] text-[#767676]">모임을 만들어 보드메이트들을 만나보세요!</p>
      <Link
        href="/board/new"
        className="mt-6 w-20 h-[34px] px-2.5 py-2 rounded-[34px] bg-[#06E393] font-semibold text-[13px] text-[#161616]"
      >
        {"모임 만들기"}
      </Link>
    </div>
  );
}
