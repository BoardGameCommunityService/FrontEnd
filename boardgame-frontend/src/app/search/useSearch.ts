import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import useSearchStore from "@/stores/post/useSearchStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useInView } from "react-intersection-observer";

// 검색 훅
export default function useSearch() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const [page, setPage] = useState(0);
  const size = 15;

  const debouncedQuery = useDebounce(query, 500);
  const { recentSearches, addSearch } = useSearchStore();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      (async () => {
        setSearchResult([]);
        setPage(0);
        setHasMore(true);
        setHasSearched(false);

        await fetchSearchResult(debouncedQuery, 0);
      })();
    } else {
      setSearchResult([]);
      setHasSearched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    if (inView && !isLoading && hasMore && page > 0 && debouncedQuery.trim()) {
      (async () => {
        await fetchSearchResult(debouncedQuery, page);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  async function fetchSearchResult(query: string, pageNum: number) {
    if (!query.trim()) {
      setSearchResult([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/meetings/search?keyword=${encodeURIComponent(query)}&page=${pageNum}&size=${size}`
      );

      const { content } = await res.json();

      if (content.length === 0) {
        setHasMore(false);
      } else {
        setSearchResult((prev) => [...prev, ...content]);
        setHasSearched(true);
        addSearch(query);
        setPage((prev) => prev + 1);
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
    ref,
  };
}
