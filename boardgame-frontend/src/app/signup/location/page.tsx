"use client";

import Button from "@/components/common/Button";
import TextInput from '@/components/common/TextInput';
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignupLocation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState("");

  // 이전 페이지에서 전달받은 값들
  const nickname = searchParams.get("nickname") || "";
  const gender = searchParams.get("gender") || "";

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);

    // 이전 값들과 함께 다시 전달
    const params = new URLSearchParams();
    if (nickname) params.set("nickname", nickname);
    if (gender) params.set("gender", gender);
    params.set("location", location);

    router.push(`/signup?${params.toString()}`);
  };
  const handleCurrentLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 현재 위치 찾기 로직
    const location = e.currentTarget.textContent || "";
handleLocationSelect(location);
  };
  return (
    <>
        <Link href={`/signup?${searchParams.toString()}`}>
          <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
        </Link>

      <form action="/signup/location" className="flex flex-col">
      <h2 className="mt-4 font-semibold text-2xl text-[#161616]">활동 지역을 선택해주세요</h2>
        <TextInput label="활동지역" name="userLocation" placeholder="지역구를 입력해주세요.(ex.강남구, 서초구)" isHidden={true}  />
        <Button type="submit" text="현재 위치로 찾기" btnSize="medium" bgColor="bg-[#06E393]" icon={<Image src="/icons/ic_gps.svg" alt="버튼" width={20} height={20} />} textColor="text-black"/>
      </form>

      <section className='mt-6 text-[#999999]'>
        <h3 className='text-xs'>검색 결과</h3>
        <ul>
          <li className='my-3 text-[#161616]'>
            <button type="button" onClick={handleCurrentLocation}>서울특별시 강남구</button>
          </li>
        </ul>
      </section>
    </>
  );
}
