"use client";

import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import GenderRadio from "@/components/signup/GenderRadio";
import { getSessionValue } from "@/util/getSession";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SearchFormValueType {
  nickname?: string;
  gender?: string;
  location?: string;
}

export default function SignupForm() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SearchFormValueType>({
    defaultValues: {
      nickname: getSessionValue("nickname") || "",
      gender: getSessionValue("gender") || "",
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

  const onSubmit = () => {
    saveFormDataToSession();

    router.push(`/agreement`);
  };

  const handleLocationClick = () => {
    saveFormDataToSession();

    router.push("/signup/location");
  };

  useEffect(() => {
    //TODO: 임시코드이며 추후 session에서 zustand로 변경 예정
    Promise.resolve(getSessionValue("region")).then((data) => setLocation(data));
  }, []);

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
          <div className="flex gap-2 mt-3 ">
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
