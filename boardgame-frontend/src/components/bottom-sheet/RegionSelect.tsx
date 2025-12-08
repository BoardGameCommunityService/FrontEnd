import { useDebounce } from "@/hooks/useDebounce";
import { useRegion } from "@/hooks/useRegion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RegionSelect() {
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = useDebounce(keyword, 500);
  const { places, isLoading, error, searchPlaces } = useRegion();

  useEffect(() => {
    if (debouncedSearch) {
      searchPlaces(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleMeetingRegion = (e: React.MouseEvent<HTMLLIElement>) => {};

  return (
    <div className="h-full flex flex-col">
      <form action="#" className="flex rounded gap-3">
        <div className="flex flex-1 bg-[#F5F6FA] px-3 py-[10px] gap-2 rounded-lg">
          <Image src="/icons/ic_search_gray.svg" width={16} height={16} alt="검색" />
          <label htmlFor="keywordSearch" className="sr-only">
            모임 장소 검색
          </label>
          <input
            id="keywordSearch"
            type="text"
            onChange={handleSearch}
            value={keyword}
            placeholder="모임 장소를 검색해주세요."
            className="outline-none text-[14px] flex-1"
          />
        </div>
        <button type="button" onClick={() => setKeyword("")}>
          <Image src="/icons/ic_close_gray.svg" width={24} height={24} alt="검색창 초기화"></Image>
        </button>
      </form>

      {!isLoading && !error && places.length > 0 && (
        <ul className="flex flex-1 flex-col gap-4 mt-4 pb-6 h-full overflow-y-scroll scrollbar-hide">
          {places.map((place) => (
            <li key={place.id} onClick={handleMeetingRegion} className="pb-4 border-b border-[#E3E5E9]">
              <h4 className="font-medium text-[16px] text-[#161616]">{place.place_name}</h4>
              <p className="mt-1 font-normal text-[14px] text-[#767676]">{place.address_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
