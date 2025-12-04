import Image from "next/image";
import Link from "next/link";

export default function Page() {
  // dummy data
  const title = "퇴근 후 루미큐브, 다빈치코드 초보 고수 모두 환영";
  const options = ["4/6", "루미큐브", "다빈치코드"];
  const content = `퇴근 후 강남역 ㅇㅇ보드게임 카페에서 루미큐브, 다빈치 코드 할 사람 모두 모여!
                  루미큐브, 다빈치코드 외에도 다양하게 게임할 예정입니다.
                  성별은 무관
                  노쇼 X, 지각 X`;
  const date = "25.11.27 오후 2:00";
  const members = [
    { profile: "/temp_profile.svg", nickname: "즐겜러", isHost: true },
    { profile: "/temp_profile.svg", nickname: "주사위빌런", isHost: false },
    { profile: "/temp_profile.svg", nickname: "보드겜린이", isHost: false },
    { profile: "/temp_profile.svg", nickname: "한판만", isHost: false },
  ];
  // dummy data end

  return (
    <div>
      <header className="px-5 flex justify-between items-center h-12">
        <Link href="/">
          <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
        </Link>
        <Image src="/icons/ic_share.svg" alt="공유하기 버튼" width={24} height={24} />
      </header>
      <main>
        <section className="px-5 mt-2.5">
          <h1 className="text-[20px] leading-7 font-bold">{title}</h1>
          <ul className="flex gap-1 text-[13px] text-[#767676] font-medium leading-5 mt-3">
            {options.map((v) => (
              <li key={v} className="bg-[#F5F6FA] rounded-md py-0.5 px-1">
                {v}
              </li>
            ))}
          </ul>
          <p className="whitespace-pre-line mt-4 bg-[#F5F6FA] rounded-[12px] p-3 text-sm text-[#161616] leading-[22px]">
            {content}
          </p>
        </section>
        <section className="px-5 mt-6">
          <h2 className="text-sm text-[#363636] font-semibold leading-[22px]">날짜</h2>
          <div className="flex gap-2 mt-2 border border-[#DEE1E6] rounded-lg py-[9px]">
            <Image className="ml-3" src="/icons/ic_calendar.svg" alt="" width={16} height={16} />
            <span className="text-sm leading-[22px] font-semibold">{date}</span>
          </div>
        </section>
        <section className="px-5 mt-6">
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
        <div className="h-2.5 bg-[#F5F6FA] mt-5"></div>
        <section className="px-5 mt-5 pb-3">
          <h2 className="text-sm leading-[22px] font-semibold text-[#363636]">멤버</h2>
          <ul className="mt-4 flex flex-col gap-5">
            {members.map((m, index) => (
              <li key={index} className="flex items-center gap-3">
                <Image src={m.profile} alt={`${m.nickname} 프로필 이미지`} width={32} height={32} />
                <div>
                  <span className="text-base text-[#121212] leading-[26px] font-medium">{m.nickname}</span>
                  {m.isHost && (
                    <span className="ml-2 text-[13px] text-[#10C584] font-medium leading-5 bg-[#D1FAEB] rounded-md px-1 py-0.5 inline-block">
                      호스트
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <div className="px-5 mt-4">
        <button className="w-full bg-[#06E393] text-sm leading-[22px] text-[#161616] font-semibold py-[11px] rounded-[10px]">
          참가 신청
        </button>
      </div>
    </div>
  );
}
