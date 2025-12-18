"use client";

import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useRegion } from "@/hooks/useRegion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useBottomSheetStore from "../../stores/useBottomSheetStore";

interface RegionSelectProps {
  onSelect: (region: string) => void;
}

export default function RegionSelect({ onSelect }: RegionSelectProps) {
  const { data: session, status } = useSession();
  const { setClose } = useBottomSheetStore();
  const [regionInput, setRegionInput] = useState("");
  const debouncedSearch = useDebounce(regionInput, 300);
  const { searchResults, isLoading, getCurrentRegion, searchAddress } = useRegion();

  useEffect(() => {
    if (debouncedSearch) {
      searchAddress(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleCurrentRegionClick = async () => {
    const results = await getCurrentRegion();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionInput(e.target.value);
  };

  const handleRegionSelect = (locationString: string) => {
    onSelect(locationString); // 부모에게 선택된 지역 전달
    setClose(); // 바텀시트 닫기
  };

  return (
    <>
      <section className="flex justify-between mb-6">
        <h2 className="mt-4  font-semibold text-2xl text-[#161616]">활동 지역을 선택해주세요</h2>
        <button type="button" className="cursor-pointer" aria-label="닫기" onClick={setClose}>
          <Image src="/icons/ic_close_gray.svg" alt="" width={24} height={24} />
        </button>
      </section>

      <main>
        <section className="flex flex-col gap-3">
          <div>
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

        <section className="mt-6 text-[#999999]">
          <h3 className="text-xs">검색 결과</h3>
          <ul>
            {searchResults.map((result, index) => {
              const locationString = [result.region_1depth_name, result.region_2depth_name].filter(Boolean).join(" ");

              return (
                <li key={index} className="my-3 text-[#161616]">
                  <button
                    type="button"
                    onClick={() => handleRegionSelect(locationString)}
                    className="w-full text-left transition-colors cursor-pointer"
                  >
                    {locationString}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
