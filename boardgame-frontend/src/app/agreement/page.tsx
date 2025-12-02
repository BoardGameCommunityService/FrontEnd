"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TERMS } from "../../content/terms/terms";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Agreement() {
  // 동의 체크박스
  // 체크 상태관리(객체)
  const [check, setCheck] = useState({
    service: false,
    privacy: false,
    location: false,
  });

  // 전체 동의
  const allChecked = check.service && check.location && check.privacy;
  // 전체 동의 핸들러
  const handleAllCheck = (checked: boolean) => {
    setCheck({
      service: checked,
      privacy: checked,
      location: checked,
    });
  };

  // 개별동의 핸들러
  const handleSingleCheck = (key: keyof typeof check, checked: boolean) => {
    setCheck((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  // 더보기 상태관리
  const [isOpen, setIsOpen] = useState({ service: false, privacy: false, location: false });

  // 더보기 핸들러
  const handleOpen = (key: keyof typeof isOpen) => {
    setIsOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 회원 가입 (세션 정보 가져와서 합쳐서 서버로 요청)
  const router = useRouter();
  const { status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const handleNext = async () => {
    if (!allChecked || loading) return;
    setLoading(true);
    try {
      // 세션 로딩/인증 확인 (로딩 중엔 처리하지 않음)
      if (status === "loading") {
        setLoading(false);
        return;
      }
      if (status !== "authenticated") {
        setLoading(false);
        alert("소셜 로그인이 필요합니다. 다시 시도해주세요.");
        router.push("/login");
        return;
      }

      // 이전 signup 페이지에서 sessionStorage에 저장한 값 가져오기
      const nickname = sessionStorage.getItem("nickname");
      const gender = sessionStorage.getItem("gender");
      const region = sessionStorage.getItem("region");

      if (!nickname || !gender || !region) {
        setLoading(false);
        alert("추가 회원정보가 없어 소셜 로그인으로 이동합니다.");
        router.push("/api/auth/signin");
        return;
      }

      // consent는 프론트에서 boolean 값만 전송 (agreedAt은 서버에서 기록)
      const consent = {
        service: check.service,
        privacy: check.privacy,
        location: check.location,
      };

      const payload = {
        nickname,
        gender,
        region,
        consent,
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/auth/complete-signup`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        credentials: "include", // httpOnly 토큰 적용
      });

      if (!res.ok) {
        throw new Error(`서버 응답 에러: ${res.status}`);
      }

      // 성공 시 세션에 남은 임시 가입 데이터 정리
      sessionStorage.removeItem("nickname");
      sessionStorage.removeItem("gender");
      sessionStorage.removeItem("region");

      // profileCompleted 값을 true로 session 갱신
      await update({ profileCompleted: true });

      // 가입 완료 후 홈으로 이동
      router.push("/");
      alert("회원가입 완료!");
    } catch (err) {
      console.error("complete-signup error:", err);
      alert("회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <main className="mt-10 max-w-[355px] flex flex-col justify-between">
        <section className="flex flex-col">
          <Link href="/login">
            <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
          </Link>
          <div>
            <h1 className="mt-4 mb-10 font-semibold text-2xl text-[#161616]">약관 동의</h1>
          </div>
          {/* 전체 동의 */}
          <label>
            <input type="checkbox" checked={allChecked} onChange={(e) => handleAllCheck(e.target.checked)} />
            <span>모두 동의</span>
          </label>
          <div className="flex flex-col">
            {/* 개별 약관 */}
            <div className="mt-2 flex items-center gap-4">
              <label>
                <input
                  type="checkbox"
                  checked={check.service}
                  onChange={(e) => handleSingleCheck("service", e.target.checked)}
                />
                <span className="font-medium text-[14px] text-[#999999]">(필수)</span>
                <span className="font-medium text-[14px] text-[#363636]"> 서비스 이용약관</span>
              </label>
              <span className="font-light text-sm text-[#999]" onClick={() => handleOpen("service")}>
                더보기
              </span>
            </div>{" "}
            <div
              className={`${isOpen.service ? "" : "hidden"} max-w-[355px] h-40 mt-2 text-sm border border-[#E9E9ED] rounded-lg overflow-auto p-3`}
            >
              <pre className="whitespace-pre-wrap">{TERMS.servicePolicy}</pre>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <label>
                <input
                  type="checkbox"
                  checked={check.privacy}
                  onChange={(e) => handleSingleCheck("privacy", e.target.checked)}
                />
                <span className="font-medium text-[14px] text-[#999999]">(필수)</span>
                <span className="font-medium text-[14px] text-[#363636]"> 개인정보 수집 및 이용</span>
              </label>
              <span className="font-light text-sm text-[#999]" onClick={() => handleOpen("privacy")}>
                더보기
              </span>
            </div>
            <div
              className={`${isOpen.privacy ? "" : "hidden"} max-w-[355px] h-40 mt-2 text-sm border border-[#E9E9ED] rounded-lg overflow-auto p-3`}
            >
              <pre className="whitespace-pre-wrap">{TERMS.privacyPolicy}</pre>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <label>
                <input
                  type="checkbox"
                  checked={check.location}
                  onChange={(e) => handleSingleCheck("location", e.target.checked)}
                />
                <span className="font-medium text-[14px] text-[#999999]">(필수)</span>
                <span className="font-medium text-[14px] text-[#363636]"> 위치기반서비스 이용약관</span>
              </label>
              <span className="font-light text-sm text-[#999]" onClick={() => handleOpen("location")}>
                더보기
              </span>
            </div>
            <div
              className={`${isOpen.location ? "" : "hidden"} max-w-[355px] h-40 mt-2 text-sm border border-[#E9E9ED] rounded-lg overflow-auto p-3`}
            >
              <pre className="whitespace-pre-wrap">{TERMS.locationPolicy}</pre>
            </div>
          </div>
        </section>
        <footer className="mb-12 mt-12">
          <button
            type="button"
            onClick={handleNext}
            disabled={!allChecked || loading}
            className={`w-[335px] h-14 rounded-2xl font-semibold text-[16px] cursor-pointer ${allChecked ? "bg-[#06E393] text-[#161616]" : "bg-[#EEF0F7]  text-[#767676]"} `}
          >
            {loading ? "처리중..." : "가입하기"}
          </button>
        </footer>
      </main>
    </div>
  );
}
