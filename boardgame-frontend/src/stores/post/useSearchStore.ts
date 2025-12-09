import { create } from "zustand";

// zustand 미들웨어 (로컬스토리지 저장/복원용)
import { persist } from "zustand/middleware";

interface SearchStore {
  recentSearches: string[];
  addSearch: (keyword: string) => void;
  clearSearches: () => void;
}

const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      recentSearches: [],
      addSearch: (keyword) =>
        set((state) => ({
          // 중복 제거 후 맨 앞에 추가, 최대 10개
          recentSearches: [keyword, ...state.recentSearches.filter((k) => k !== keyword)].slice(0, 10),
        })),
      clearSearches: () => set({ recentSearches: [] }),
    }),
    { name: "recent-searches" } // localStorage 키 이름
  )
);

export default useSearchStore;
