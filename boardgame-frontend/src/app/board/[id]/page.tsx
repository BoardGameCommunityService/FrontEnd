import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const title = "퇴근 후 루미큐브, 다빈치코드 초보 고수 모두 환영";
  const options = ["4/6", "루미큐브", "다빈치코드"];
  const content = `퇴근 후 강남역 ㅇㅇ보드게임 카페에서 루미큐브, 다빈치 코드 할 사람 모두 모여!
                  루미큐브, 다빈치코드 외에도 다양하게 게임할 예정입니다.
                  성별은 무관
                  노쇼 X, 지각 X`;
  const date = "25.11.27 오후 2:00";

  return (
    <div className="px-5">
      <header className="flex justify-between items-center h-12">
        <Link href="/">
          <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
        </Link>
        <Image src="/icons/ic_share.svg" alt="공유하기 버튼" width={24} height={24} />
      </header>
      <main>
        <section className="mt-2.5">
          <h1 className="text-[20px] leading-7 font-bold">{title}</h1>
          <ul className="flex gap-1 text-[13px] text-[#767676] font-medium leading-5 mt-3">
            {options.map((v) => (
              <li key={v} className="bg-[#F5F6FA] rounded-md py-0.5 px-1">
                {v}
              </li>
            ))}
          </ul>
          <p className="whitespace-pre-line mt-4 bg-[#F5F6FA] rounded-[12px] p-3 text-sm leading-[22px]">{content}</p>
        </section>
        <section className="mt-6">
          <h2 className="text-sm text-[#363636] font-semibold leading-[22px]">날짜</h2>
          <div className="flex gap-2 mt-2 border border-[#DEE1E6] rounded-lg py-[9px]">
            <Image className="ml-3" src="/icons/ic_calendar.svg" alt="" width={16} height={16} />
            <span className="text-sm leading-[22px] font-semibold">{date}</span>
          </div>
        </section>
        <section className="mt-6">
          <h2 className="text-sm text-[#363636] font-semibold leading-[22px]">장소</h2>
          <div className="mt-2 border border-[#DEE1E6] rounded-xl">
            <div className="flex gap-[5px] px-3 py-[9px]">
              <Image className="self-start" src="/icons/ic_black_marker.svg" alt="" width={16} height={16} />
              <div className="flex flex-col">
                <h3 className="text-sm text-[#161616] font-semibold leading-[22px]">OO보드게임카페 강남역점</h3>
                <span className="text-xs text-[#767676] leading-[18px]">서울시 강남구 OO동 123-12</span>
              </div>
            </div>
            <div>
              <Image className="rounded-b-xl" src="/temp_map.png" alt="" width={335} height={160} />
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
