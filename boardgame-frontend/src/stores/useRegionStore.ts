import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStore {
  selectedRegion: string;
  isInitialized: boolean;

  setSelectedRegion: (region: string) => void;
  initializeRegion: (accessToken: string) => Promise<void>;
}

const useRegionStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      selectedRegion: "서울 강남구",
      isInitialized: false,

      setSelectedRegion: (region: string) => {
        set({ selectedRegion: region });
      },
      initializeRegion: async (accessToken: string) => {
        // 이미 초기화됐으면 API 호출 안 함
        if (get().isInitialized) {
          return;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!res.ok) throw new Error("지역 정보 fetch 에러");

          const data = await res.json();
          set({
            selectedRegion: data.region || "서울 강남구",
            isInitialized: true,
          });
        } catch (error) {
          console.error("지역 정보 로드 실패:", error);
        }
      },
    }),
    {
      name: "search-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

export default useRegionStore;
