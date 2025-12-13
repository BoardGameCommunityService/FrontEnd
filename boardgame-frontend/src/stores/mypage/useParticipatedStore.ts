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
  setApprovedResult: (data: ApprovedResult) => void;
  setIsFetched: (flag: boolean) => void;
}

export const useParticipatedStore = create<ParticipatedStoreState>((set) => ({
  results: null,
  approvedResult: null,
  isFetched: false,
  setResults: (data) => set({ results: data }),
  setApprovedResult: (data) => set({ approvedResult: data }),
  setIsFetched: (flag) => set({ isFetched: flag }),
}));
