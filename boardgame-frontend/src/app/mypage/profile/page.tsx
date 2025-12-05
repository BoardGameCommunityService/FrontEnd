"use client";

import React from "react";
import NavigationBar from "@/components/common/NavigationBar";
import Image from "next/image";
import TextInput from "@/components/common/TextInput";
import GenderRadio from "@/components/common/GenderRadio";
import { useForm } from "react-hook-form";
import { FormValueType } from "@/types/SignupFormType";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormValueType>({
    defaultValues: {
      nickname: "즐겜러",
      gender: "male",
      location: "서울시 강남구",
    },
    mode: "onChange",
  });

  const { location } = getValues();

  const onSubmit = () => {
    router.push(`/agreement`);
  };

  const handleLocationClick = () => {
    router.push("/mypage/profile/location");
  };

  return (
    <>
      <NavigationBar href="/mypage" title="프로필" />
      <main className="mt-2 px-5">
        <section className="flex justify-center">
          <div className="relative">
            <Image className="w-[100px] h-[100px]" src="/temp_profile.svg" alt="" width={100} height={100} />
            <Image className="absolute bottom-0 right-0" src="/icons/ic_camera.svg" alt="" width={32} height={32} />
          </div>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="bg-white mt-6 p-5 pb-6 rounded-2xl">
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

            <fieldset className="mt-6">
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

            <fieldset className="mt-6">
              <legend className="block font-medium text-sm text-[#363636]">지역</legend>
              <button
                type="button"
                className={
                  "flex justify-between w-full mt-3 text-sm text-[#767676] border border-[#E9E9ED] rounded-xl py-3.5 pl-3 pr-3.5"
                }
                {...register("location", { required: true })}
                onClick={handleLocationClick}
              >
                {location}
                <Image src="/icons/ic_chevron_right_icon.svg" alt="" width={20} height={20} />
              </button>
            </fieldset>
          </section>
        </form>

        <div className="flex gap-2 mt-[clamp(10px,10vw,160px)] text-[#161616] text-sm leading-[22px] font-semibold">
          <button className="flex-1 bg-white py-[11px] rounded-[10px]" type="button">
            로그아웃
          </button>
          <button className="flex-1 bg-white py-[11px] rounded-[10px]" type="button">
            회원탈퇴
          </button>
        </div>
      </main>
    </>
  );
}
