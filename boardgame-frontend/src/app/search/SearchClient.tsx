"use client";

import backIco from "../../../public/icons/ic_back.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";
import CardList from "@/components/common/CardList";
import { ChipGroup, EmptyState } from "@/components/search";
import useSearch from "./useSearch";

interface Props {
  popularGames: string[];
  popularRegions: string[];
}

export default function SearchClient({ popularGames, popularRegions }: Props) {
  const router = useRouter();
  const { query, searchResult, isLoading, hasSearched, recentSearches, handleChipClick, handleSearch, ref } =
    useSearch();

  //조건부 렌더링을 위한 요소
  const hasQuery = query.trim().length > 0;
  const hasResults = searchResult.length > 0;
  const isEmptyState = hasQuery && !isLoading && !hasResults;

  return (
    <div className={`pt-11 max-w-[375px] min-h-dvh flex flex-col bg-[#F5F6FA]`}>
      <header className="h-[60px] max-w-[355px] flex justify-between items-center gap-3">
        <h1 className="sr-only">검색 페이지</h1>
        <button type="button" onClick={() => router.back()}>
          <Image src={backIco} alt="뒤로가기" width={24} height={24} />
        </button>
        <input
          type="text"
          className="w-full h-12 rounded-xl p-3 bg-[#EBECF1] font-normal text-[16px] text-[#161616]"
          placeholder="게임명, 동네로 찾기"
          onChange={handleSearch}
          value={query}
        />
      </header>

      {/* <main className="p-5"> */}
      <main className={`p-5 ${isEmptyState ? "flex-1 flex items-center justify-center" : ""}`}>
        {/* 검색어 없음 */}
        {!hasQuery && !hasSearched && (
          <section className="flex flex-col gap-12">
            <ChipGroup title="최근 검색어" chips={recentSearches} onItemClick={handleChipClick} />
            <ChipGroup title="인기 게임" chips={popularGames} onItemClick={handleChipClick} />
            <ChipGroup title="모임이 많은 동네" chips={popularRegions} onItemClick={handleChipClick} />
          </section>
        )}

        {/* 검색결과 있음 */}
        {!isLoading && hasResults && (
          <>
            <CardList results={searchResult} />
            <div ref={ref}></div>
          </>
        )}

        {/* 검색 결과 없음 */}
        {!isLoading && isEmptyState && (
          <>
            <EmptyState isBottom={true} textSize="lg" />
            <div ref={ref}></div>
          </>
        )}

        {/* 로딩중 */}
        {isLoading && <p>검색중입니다...</p>}
      </main>
    </div>
  );
}
