import { create } from "zustand";
import { combine } from "zustand/middleware";
import { ReactNode } from "react";

type BottomSheetStat = {
  isOpen: boolean;
  children: ReactNode;
};

const initialState: BottomSheetStat = {
  isOpen: false,
  children: null,
};

const useBottomSheetStore = create(
  combine(initialState, (set, get) => ({
    setOpen: (children: ReactNode) => set({ isOpen: true, children }),
    setClose: () => set(initialState),
  }))
);

export default useBottomSheetStore;
