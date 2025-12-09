import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import useSearchStore from "@/stores/post/useSearchStore";
import useDebounce from "@/util/debouncer";

// 검색 훅
export default function useSearch() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [page, setPage] = useState(0);
  const size = 10;

  const debouncedQuery = useDebounce(query, 500);
  const { recentSearches, addSearch } = useSearchStore();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchSearchResult(debouncedQuery);
    } else {
      setSearchResult([]);
      setHasSearched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  async function fetchSearchResult(query: string) {
    if (!query.trim()) {
      setSearchResult([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/search?keyword=${encodeURIComponent(query)}&page=${page}&size=${size}`
      );
      const data = await res.json();
      setSearchResult(data.content);
      setHasSearched(true);
      if (data.length > 0) {
        addSearch(query);
      }
    } catch (e: any) {
      console.error("통신 에러", e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChipClick = (chip: string) => {
    addSearch(chip);
    setQuery(chip);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return {
    query,
    searchResult,
    isLoading,
    hasSearched,
    recentSearches,
    handleChipClick,
    handleSearch,
  };
}
