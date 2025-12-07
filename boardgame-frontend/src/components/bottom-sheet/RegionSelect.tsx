import { useDebounce } from "@/hooks/useDebounce";
import { useRegion } from "@/hooks/useRegion";
import { useEffect, useState } from "react";

export default function RegionSelect() {
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = useDebounce(keyword, 300);
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
      <form action="#">
        <label htmlFor="keywordSearch"></label>
        <input id="keywordSearch" type="text" onChange={handleSearch} value={keyword} />
      </form>
    </>
  );
}
