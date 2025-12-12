"use client";

import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useRegion } from "@/hooks/useRegion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LocationSearchResults from "./LocationSearchResults";

export default function SignupLocationForm() {
  const router = useRouter();
  const [regionInput, setRegionInput] = useState("");
  const debouncedSearch = useDebounce(regionInput, 300);

  const { searchResults, isLoading, getCurrentRegion, searchAddress } = useRegion();

  // 디바운스된 검색어로 자동 검색
  useEffect(() => {
    if (debouncedSearch) {
      searchAddress(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleRegionSelect = (region: string) => {
    // sessionStorage에 region 저장
    sessionStorage.setItem("region", region);
    router.back();
  };

  const handleCurrentRegionClick = async () => {
    const results = await getCurrentRegion();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionInput(e.target.value);
  };

  return (
    <>
      <button
        className="cursor-pointer"
        type="button"
        onClick={() => {
          if (window.history.length > 1) router.back();
          else router.push("/signup");
        }}
      >
        <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
      </button>

      <main>
        <section className="flex flex-col gap-3">
          <h2 className="mt-4 mb-[40px]  font-semibold text-2xl text-[#161616]">활동 지역을 선택해주세요</h2>

          <div className="mt-7">
            <TextInput
              label="활동지역"
              name="userRegion"
              placeholder="지역구를 입력해주세요.(ex.강남구, 서초구)"
              isHidden={true}
              value={regionInput}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            type="button"
            text={"현재 위치로 찾기"}
            btnSize="medium"
            bgColor="bg-[#06E393]"
            icon={<Image src="/icons/ic_gps.svg" alt="버튼" width={20} height={20} />}
            textColor="text-black"
            onClick={handleCurrentRegionClick}
            disabled={isLoading}
          />
        </section>

        <LocationSearchResults results={searchResults} onSelect={handleRegionSelect} isLoading={isLoading} />
      </main>
    </>
  );
}
