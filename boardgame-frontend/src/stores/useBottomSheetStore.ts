import { create } from "zustand";
import { combine } from "zustand/middleware";
import { ReactNode } from "react";

type BottomSheetVariant = "fixed" | "auto";

type BottomSheetStat = {
  isOpen: boolean;
  children: ReactNode;
  variant: BottomSheetVariant;
};

const initialState: BottomSheetStat = {
  isOpen: false,
  children: null,
  variant: "fixed",
};

const useBottomSheetStore = create(
  combine(initialState, (set, get) => ({
    setOpen: (children: ReactNode, variant: BottomSheetVariant = "fixed") => set({ isOpen: true, children, variant }),
    setClose: () => {
      // variant는 유지하고 isOpen만 false로 변경
      set({ isOpen: false });
      // 애니메이션 완료 후 children과 variant 초기화 (duration-400 = 400ms)
      setTimeout(() => set({ children: null, variant: "fixed" }), 400);
    },
  }))
);

export default useBottomSheetStore;
