// stores/post/usePlaceStore.ts
import { create } from "zustand";
import { combine } from "zustand/middleware";

type PlaceState = {
  meetingPlace: string; // 상호명
  meetingAddress: string; // 주소
};

const initialState: PlaceState = {
  meetingPlace: "",
  meetingAddress: "",
};

const usePlaceStore = create(
  combine(initialState, (set) => ({
    setClear: () => set(initialState),
    setPlace: (place: string, address: string) => set({ meetingPlace: place, meetingAddress: address }),
    clearPlace: () => set({ meetingPlace: "", meetingAddress: "" }),
  }))
);

export default usePlaceStore;
