import Image from "next/image";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <section className="w-full max-w-md h-[524px] flex flex-col gap-6 items-center justify-center">
        <Image src="/logo.svg" alt="보드메이트 로고" width={140} height={140} priority />
        <h1 className="text-[20px] font-medium">보드메이트에 오신 걸 환영합니다!</h1>
      </section>
      <section className="flex flex-col gap-3" aria-label="소셜 로그인">
        <button
          type="button"
          className="w-[355px] h-14 bg-[#FEE500] rounded-full py-3 px-4 flex items-center justify-center relative"
          aria-label="카카오로 로그인"
        >
          <Image src="/카카오.svg" alt="" width={22} height={21} className="absolute left-4" aria-hidden="true" />
          <span className="text-[16px]">카카오로 로그인</span>
        </button>
        <button
          type="button"
          className="w-[355px] h-14 border border-[#E9E9ED] rounded-full py-3 px-4 flex items-center justify-center relative"
          aria-label="구글로 로그인"
        >
          <Image src="/구글.svg" alt="" width={22} height={22} className="absolute left-4" aria-hidden="true" />
          <span className="text-[16px] font-medium">구글로 로그인</span>
        </button>
      </section>
    </main>
  );
}
