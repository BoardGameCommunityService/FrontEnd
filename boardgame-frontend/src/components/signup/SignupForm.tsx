"use client";

import TextInput from "@/components/common/TextInput";
import Image from "next/image";
import GenderRadio from "@/components/signup/GenderRadio";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { SearchFormValueType } from "@/types/SearchFormValueType";
import { useRouter } from "next/navigation";

export default function SignupForm({ nickname, gender, location }: SearchFormValueType) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SearchFormValueType>({
    defaultValues: {
      nickname: nickname,
      gender: gender,
      location: location,
    },
    mode: "onChange",
  });

  const onSubmit = (data: SearchFormValueType) => {
    const filteredData = Object.entries(data).filter(([_, v]) => v);
    const params = new URLSearchParams(filteredData);
    router.push(`/agreement?${params.toString()}`);
  };

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
          <Link
            className="flex items-center justify-between mt-3 text-sm text-[#767676] border border-[#E9E9ED] rounded-xl py-3.5 pl-3 pr-3.5"
            href="/signup/location"
          >
            활동 지역을 선택해주세요
            <Image src="/icons/ic_chevron_right_icon.svg" alt="" width={20} height={20} />
          </Link>
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
