import { useDebounce } from "@/hooks/useDebounce";
import { useRegion } from "@/hooks/useRegion";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import usePlaceStore from "../../stores/post/usePlaceStore";

interface Place {
  id: string;
  place_name: string;
  address_name: string;
}

export default function PlaceSelect() {
  const { setClose } = useBottomSheetStore();
  const { setPlace } = usePlaceStore();

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

  const handleSelectPlace = (place: Place) => {
    setPlace(place.place_name, place.address_name);
    setClose();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex rounded gap-3">
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
            className="outline-none text-sm flex-1"
          />
        </div>
        <button type="button" className="cursor-pointer" aria-label="닫기" onClick={setClose}>
          <Image src="/icons/ic_close_gray.svg" width={24} height={24} alt="검색창 초기화"></Image>
        </button>
      </div>

      {!isLoading && !error && places?.length > 0 && (
        <ul className="flex flex-1 flex-col gap-4 my-4 h-full overflow-y-scroll scrollbar-hide">
          {places.map((place) => (
            <li
              key={place.id}
              onClick={() => handleSelectPlace(place)}
              className="border-[#E3E5E9] flex gap-[5px] items-start cursor-pointer"
            >
              <Image src="/icons/ic_marker_outline.svg" width={16} height={16} alt="" className="mt-[3px]"></Image>
              <div className="flex-col">
                <h4 className="text-base font-semibold text-[#161616]">{place.place_name}</h4>
                <p className="mt-1 text-sm font-normal text-[#767676]">{place.address_name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
