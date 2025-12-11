"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TextInput from "@/components/common/TextInput";
import GenderRadio from "@/components/common/GenderRadio";
import { useForm } from "react-hook-form";
import { UserDataType } from "@/types/UserDataType";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getSessionValue } from "@/util/getSession";
import useModalStore from "@/stores/useModalStore";

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataType>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserDataType>({
    values: userData,
    mode: "onChange",
  });

  const { data: session, status } = useSession();
  const { setModal, setClose } = useModalStore();

  const onSubmit = (data: UserDataType) => {
    if (status === "loading" || !session?.user?.accessToken) return;

    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({
        nickname: data.nickname,
        gender: data.gender,
        region: getSessionValue("region") || data.location,
      }),
    })
      .then(() => {
        sessionStorage.removeItem("nickname");
        sessionStorage.removeItem("gender");
        sessionStorage.removeItem("region");
      })
      .catch((err) => console.error(err));

    router.push("/mypage");
  };

  const handleLocationClick = () => {
    const { nickname, gender } = getValues();
    sessionStorage.setItem("nickname", nickname || "");
    sessionStorage.setItem("gender", gender || "");

    router.push("/mypage/profile/location");
  };

  const handleLogout = () => {
    setModal(
      "로그아웃 하시겠습니까?",
      "취소",
      () => setClose(),
      "로그아웃",
      async () => {
        await fetch("/api/auth/logout", { method: "POST" })
          .then((res) => res.json())
          .then(async (data) => {
            await signOut({ redirect: false });
            router.replace(data.redirectURL);
          })
          .catch((err) => console.error(err));
      }
    );
  };

  const handleDeactivate = () => {};

  useEffect(() => {
    if (status === "loading" || !session?.user?.accessToken) return;

    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({
          nickname: getSessionValue("nickname") || data.nickname,
          gender: getSessionValue("gender") || data.gender,
          location: data.region,
        });
      })
      .catch((err) => console.error(err));
  }, [session, status]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-5 flex justify-between items-center h-12">
        <div className="flex items-center gap-0.5">
          <button type="submit" className="cursor-pointer">
            <Image src="/icons/ic_back.svg" alt="뒤로가기" width={24} height={24} />
          </button>
          <h1 className="text-[#161616] font-bold text-[20px] leading-7">프로필</h1>
        </div>
      </div>
      <div className="mt-2 px-5">
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
                onChange: () => sessionStorage.removeItem("nickname"),
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
                  onChange: () => sessionStorage.removeItem("gender"),
                })}
              />
              <GenderRadio
                id="female"
                label="여성"
                value="female"
                {...register("gender", {
                  required: true,
                  onChange: () => sessionStorage.removeItem("gender"),
                })}
              />
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="block font-medium text-sm text-[#363636]">지역</legend>
            <button
              type="button"
              className={
                "flex justify-between w-full mt-3 text-sm text-[#767676] border border-[#E9E9ED] rounded-xl py-3.5 pl-3 pr-3.5 cursor-pointer"
              }
              onClick={handleLocationClick}
            >
              {getSessionValue("region") || userData?.location}
              <Image src="/icons/ic_chevron_right_icon.svg" alt="" width={20} height={20} />
            </button>
          </fieldset>
        </section>

        <div className="flex gap-2 mt-[clamp(10px,10vw,160px)] text-[#161616] text-sm leading-[22px] font-semibold">
          <button
            className="flex-1 bg-white py-[11px] rounded-[10px] cursor-pointer"
            type="button"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button
            className="flex-1 bg-white py-[11px] rounded-[10px] cursor-pointer"
            type="button"
            onClick={handleDeactivate}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </form>
  );
}
