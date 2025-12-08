import { useDebounce } from "@/hooks/useDebounce";
import { useRegion } from "@/hooks/useRegion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RegionSelect() {
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = useDebounce(keyword, 500);
  const { places, isLoading, error, searchPlaces, totalCount } = useRegion();

  useEffect(() => {
    if (debouncedSearch) {
      searchPlaces(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
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
            className="outline-none text-[14px] flex-1"
          />
        </div>
        <button type="button" onClick={() => setKeyword("")}>
          <Image src="/icons/ic_close_gray.svg" width={24} height={24} alt="검색창 초기화"></Image>
        </button>
      </form>
    </>
  );
}
