import { create } from "zustand";
import type { Post } from "@/types/post"; // Post 타입 import

interface ApprovedResult {
  upcoming: Post[];
  finished: Post[];
}

interface ParticipatedStoreState {
  results: Post[] | null;
  approvedResult: ApprovedResult | null;
  isFetched: boolean;
  setResults: (data: Post[]) => void;
  appendResults: (data: Post[]) => void;
  clearResults: () => void;
  setApprovedResult: (data: ApprovedResult) => void;
  setIsFetched: (flag: boolean) => void;
}

export const useParticipatedStore = create<ParticipatedStoreState>((set) => ({
  results: null,
  approvedResult: null,
  isFetched: false,
  setResults: (data) => set({ results: [...data] }),
  appendResults: (data) => set((state) => ({ results: [...(state.results ?? []), ...data] })),
  clearResults: () => set({ results: null }),
  setApprovedResult: (data) =>
    set({
      approvedResult: {
        upcoming: Array.isArray(data.upcoming) ? [...data.upcoming] : [],
        finished: Array.isArray(data.finished) ? [...data.finished] : [],
      },
    }),
  setIsFetched: (flag) => set({ isFetched: flag }),
}));
