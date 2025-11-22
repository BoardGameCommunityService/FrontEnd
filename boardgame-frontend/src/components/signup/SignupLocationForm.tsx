"use client";

import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupLocationForm() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);

    // sessionStorage에 location 저장
    sessionStorage.setItem("signupLocation", location);

    router.push("/signup");
  };

  const handleCurrentLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const location = e.currentTarget.textContent || "";
    handleLocationSelect(location);
  };

  return (
    <>
      <Link href="/signup">
        <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
      </Link>

      <form className="flex flex-col">
        <h2 className="mt-4 font-semibold text-2xl text-[#161616]">활동 지역을 선택해주세요</h2>
        <TextInput
          label="활동지역"
          name="userLocation"
          placeholder="지역구를 입력해주세요.(ex.강남구, 서초구)"
          isHidden={true}
        />
        <Button
          type="button"
          text="현재 위치로 찾기"
          btnSize="medium"
          bgColor="bg-[#06E393]"
          icon={<Image src="/icons/ic_gps.svg" alt="버튼" width={20} height={20} />}
          textColor="text-black"
        />
      </form>

      <section className="mt-6 text-[#999999]">
        <h3 className="text-xs">검색 결과</h3>
        <ul>
          <li className="my-3 text-[#161616]">
            <button type="button" onClick={handleCurrentLocation}>
              서울특별시 강남구
            </button>
          </li>
        </ul>
      </section>
    </>
  );
}
