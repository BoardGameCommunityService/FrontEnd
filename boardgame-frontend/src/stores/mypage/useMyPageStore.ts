import { create } from "zustand";

interface MyPartData {
  hostCount: number;
  approvedCount: number;
  pendingCount: number;
}

interface MyPageStore {
  myPartData: MyPartData;
  isFetched: boolean;
  setMyPartData: (data: MyPartData) => void;
  setIsFetched: (flag: boolean) => void;
}

// 나의 참여 현황 (숫자) 데이터 전역 관리 함수
export const useMyPageStore = create<MyPageStore>((set) => ({
  myPartData: { hostCount: 0, approvedCount: 0, pendingCount: 0 },
  isFetched: false,
  setMyPartData: (data) => set({ myPartData: data }),
  setIsFetched: (flag) => set({ isFetched: flag }),
}));
