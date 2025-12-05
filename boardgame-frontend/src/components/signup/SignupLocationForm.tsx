"use client";

import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocation } from "@/hooks/useLocation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LocationSearchResults from "./LocationSearchResults";

export default function SignupLocationForm() {
  const router = useRouter();
  const [locationInput, setLocationInput] = useState("");
  const debouncedSearch = useDebounce(locationInput, 300);

  const { searchResults, isLoading, getCurrentLocation, searchAddress } = useLocation();

  // 디바운스된 검색어로 자동 검색
  useEffect(() => {
    if (debouncedSearch) {
      searchAddress(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleLocationSelect = (location: string) => {
    // sessionStorage에 location 저장
    sessionStorage.setItem("region", location);
    router.back();
  };

  const handleCurrentLocationClick = async () => {
    const results = await getCurrentLocation();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInput(e.target.value);
  };

  return (
    <>
      <header>
        <button onClick={() => router.back()}>
          <Image src="/icons/ic_back.svg" alt="뒤로가기 버튼" width={24} height={24} />
        </button>
      </header>

      <main>
        <section className="flex flex-col gap-3">
          <h2 className="mt-4 font-semibold text-2xl text-[#161616]">활동 지역을 선택해주세요</h2>

          <div className="mt-7">
            <TextInput
              label="활동지역"
              name="userLocation"
              placeholder="지역구를 입력해주세요.(ex.강남구, 서초구)"
              isHidden={true}
              value={locationInput}
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
            onClick={handleCurrentLocationClick}
            disabled={isLoading}
          />
        </section>

        <LocationSearchResults results={searchResults} onSelect={handleLocationSelect} isLoading={isLoading} />
      </main>
    </>
  );
}
