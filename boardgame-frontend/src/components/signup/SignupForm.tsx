"use client";

import Button from "@/components/common/Button";
import GenderRadio from "@/components/common/GenderRadio";
import TextInput from "@/components/common/TextInput";
import useToastMessage from "@/stores/useToastMessage";
import { UserDataType } from "@/types/UserDataType";
import { getSessionValue } from "@/util/getSession";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<UserDataType>({
    defaultValues: {
      nickname: getSessionValue("nickname") || "",
      gender: (getSessionValue("gender") as "male" | "female") || undefined,
      location: getSessionValue("region") || "",
    },
    mode: "onChange",
  });

  const saveFormDataToSession = () => {
    const { nickname = "", gender = "", location = "" } = getValues();

    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("gender", gender);
    sessionStorage.setItem("region", location);
  };
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const { setToastMessage, setClose } = useToastMessage();

  const onSubmit = async () => {
    const { nickname = "", gender = "", location = "" } = getValues();
    const consent = {
      service: true,
      privacy: true,
    };
    // 회원가입 완료 API 호출
    // /api/auth/complete-signup
    if (!nickname || !gender || !location) return;
    setLoading(true);
    try {
      // 세션 로딩/인증 확인 (로딩 중엔 처리하지 않음)
      if (status === "loading") {
        setLoading(false);
        return;
      }
      if (status === "unauthenticated") {
        setLoading(false);
        alert("소셜 로그인이 필요합니다. 다시 시도해주세요.");
        router.push("/login");
        return;
      }
      const query = {
        nickname,
        gender,
        region: location,
        consent,
      };

      // 인증 토큰은 useSession에서 읽기 (간단 타입 사용)
      const user = session?.user as { accessToken?: string } | undefined;
      const token = user?.accessToken as string | undefined;
      if (!token) {
        setLoading(false);
        setToastMessage("failure", "세션에 인증 토큰이 없습니다. 다시 로그인해주세요.");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/auth/complete-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(query),
      });

      if (!res.ok) {
        throw new Error(`서버 응답 에러: ${res.status}`);
      }

      // 성공 시 세션에 남은 임시 가입 데이터 정리
      sessionStorage.removeItem("nickname");
      sessionStorage.removeItem("gender");
      sessionStorage.removeItem("region");

      // profileCompleted 값을 true로 session 갱신 필요???

      // 가입 완료 후 홈으로 이동
      setToastMessage("success", "회원가입 완료!");
      router.push("/");
    } catch (err) {
      console.error("complete-signup error:", err);
      setToastMessage("failure", "회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    saveFormDataToSession();

    router.push("/signup/location");
  };

  useEffect(() => {
    //TODO: 임시코드이며 추후 session에서 zustand로 변경 예정
    Promise.resolve(getSessionValue("region")).then((data) => setLocation(data));
  }, []);

  ///=======================================
  // const handleNext = async () => {
  //   if (!allChecked || loading) return;
  //   setLoading(true);
  //   try {
  //     // 세션 로딩/인증 확인 (로딩 중엔 처리하지 않음)
  //     if (status === "loading") {
  //       setLoading(false);
  //       return;
  //     }
  //     if (status !== "authenticated") {
  //       setLoading(false);
  //       alert("소셜 로그인이 필요합니다. 다시 시도해주세요.");
  //       router.push("/login");
  //       return;
  //     }

  //     // 이전 signup 페이지에서 sessionStorage에 저장한 값 가져오기
  //     const nickname = sessionStorage.getItem("nickname");
  //     const gender = sessionStorage.getItem("gender");
  //     const region = sessionStorage.getItem("region");

  //     if (!nickname || !gender || !region) {
  //       setLoading(false);
  //       alert("추가 회원정보가 없어 소셜 로그인으로 이동합니다.");
  //       router.push("/api/auth/signin");
  //       return;
  //     }

  //     // consent는 프론트에서 boolean 값만 전송 (agreedAt은 서버에서 기록)
  //     const consent = {
  //       service: check.service,
  //       privacy: check.privacy,
  //     };

  //     const payload = {
  //       nickname,
  //       gender,
  //       region,
  //       consent,
  //     };

  //     // 인증 토큰은 useSession에서 읽기 (간단 타입 사용)
  //     const user = session?.user as { accessToken?: string } | undefined;
  //     const token = user?.accessToken as string | undefined;
  //     if (!token) {
  //       setLoading(false);
  //       alert("세션에 인증 토큰이 없습니다. 다시 로그인해주세요.");
  //       router.push("/login");
  //       return;
  //     }
  //     const headers: Record<string, string> = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/auth/complete-signup`, {
  //       method: "POST",
  //       headers,
  //       body: JSON.stringify(payload),
  //     });

  //     if (!res.ok) {
  //       throw new Error(`서버 응답 에러: ${res.status}`);
  //     }

  //     // 성공 시 세션에 남은 임시 가입 데이터 정리
  //     sessionStorage.removeItem("nickname");
  //     sessionStorage.removeItem("gender");
  //     sessionStorage.removeItem("region");

  //     // profileCompleted 값을 true로 session 갱신
  //     await update({ profileCompleted: true });

  //     // 가입 완료 후 홈으로 이동
  //     router.push("/");
  //     alert("회원가입 완료!");
  //   } catch (err) {
  //     console.error("complete-signup error:", err);
  //     alert("회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  ///=======================================

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between flex-1">
      <div>
        <h2 className="mt-4 mb-10 font-semibold text-2xl text-[#161616]">회원 정보를 입력해주세요</h2>
        <fieldset>
          <TextInput
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            {...register("nickname", {
              required: true,
              pattern: {
                value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]+$/,
                message: "특수기호를 제외한 한글 또는 영문을 입력해주세요",
              },
            })}
          />
          <div className="flex items-center gap-1 mt-2">
            <svg
              className={`${!errors.nickname?.message ? "text-[#999999]" : "text-[#FC3B45]"}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1.5" y="1.5" width="13" height="13" rx="6.5" stroke="currentColor" />
              <circle cx="8" cy="5" r="0.75" fill="currentColor" />
              <path d="M8 7.5V11.5" stroke="currentColor" strokeLinecap="round" />
            </svg>

            <span className={`text-[13px] ${!errors.nickname?.message ? "text-[#999999]" : "text-[#FC3B45]"}`}>
              특수기호를 제외한 한글 또는 영문을 입력해주세요
            </span>
          </div>
        </fieldset>

        <fieldset className="w-full mt-8">
          <legend className="text-sm font-medium text-[#363636]">성별</legend>
          <div className="flex gap-2 mt-3">
            <GenderRadio
              id="man"
              label="남성"
              value="male"
              {...register("gender", {
                required: true,
              })}
            />
            <GenderRadio
              id="female"
              label="여성"
              value="female"
              {...register("gender", {
                required: true,
              })}
            />
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="block font-medium text-sm text-[#363636]">지역</legend>
          <button
            type="button"
            className={`flex ${location ? "justify-center" : "justify-between"} w-full mt-3 text-sm text-[${location ? "#161616" : "#767676"}] border border-[${location ? "#161616" : "#E9E9ED"}] rounded-xl py-3.5 pl-3 pr-3.5`}
            onClick={handleLocationClick}
            {...register("location", { required: true })}
          >
            {location || (
              <>
                활동 지역을 선택해주세요
                <Image src="/icons/ic_chevron_right_icon.svg" alt="" width={20} height={20} />
              </>
            )}
          </button>
        </fieldset>
      </div>

      <Button
        type="submit"
        text="다음"
        btnSize="large"
        textColor={`${!isValid ? "text-[#767676]" : "#161616"}`}
        bgColor={`${!isValid ? "bg-[#EEF0F7]" : "bg-[#06E393]"}`}
        disabled={!isValid}
      />
    </form>
  );
}
