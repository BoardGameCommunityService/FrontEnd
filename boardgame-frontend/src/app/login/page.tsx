import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "소셜 로그인",
  // 더 좋은 멘트 있으면 추천 부탁드립니다.
  description: "보드메이트에 소셜아이디로 가입하고 새로운 친구들을 만나보세요!",
};

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <section className="w-full max-w-[375px] h-[524px] flex flex-col gap-6 items-center justify-center">
        {/* 말풍선 */}
        <div className="flex flex-col items-center">
          <div className="w-[118px] h-[52px] rounded-xl px-3 py-2 bg-[#161616]">
            <h2 className="m-0 font-semibold text-[13px] leading-[140%] tracking-[-0.02em] text-center text-[#FAFAFA] whitespace-pre">
              함께하면 더 즐거운{"\n"}보드게임 라이프!
            </h2>
          </div>
          <Image src="/bubbleTriangle.svg" alt="" aria-hidden="true" width={14} height={8} />
        </div>
        {/* 로고 */}
        <Image src="/logo.svg" alt="보드메이트 로고" width={140} height={140} priority />
      </section>
      <section className="flex flex-col gap-3" aria-label="소셜 로그인">
        <button
          type="button"
          className="w-[355px] h-14 bg-[#FEE500] rounded-2xl py-3 px-4 flex items-center justify-center relative"
          aria-label="카카오로 로그인"
        >
          <Image src="/kakao.svg" alt="" width={32} height={32} className="absolute left-4" aria-hidden="true" />
          <span className="text-[16px]">카카오로 로그인</span>
        </button>
        <button
          type="button"
          className="w-[355px] h-14 border border-[#E9E9ED] rounded-2xl py-3 px-4 flex items-center justify-center relative"
          aria-label="구글로 로그인"
        >
          <Image src="/google.svg" alt="" width={22} height={22} className="absolute left-4" aria-hidden="true" />
          <span className="text-[16px] font-medium">구글로 로그인</span>
        </button>
      </section>
    </main>
  );
}
