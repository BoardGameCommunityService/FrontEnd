import { create } from "zustand";
import { combine } from "zustand/middleware";

type ModalState = {
  isOpen: boolean;
  content: string;
  rightBtnTxt: string;
  rightOnClick?: () => void;
  leftBtnTxt?: string;
  leftOnClick?: () => void;
};

const initialState: ModalState = {
  isOpen: false,
  content: "",
  rightBtnTxt: "",
  rightOnClick: undefined,
  leftBtnTxt: undefined,
  leftOnClick: undefined,
};

const useModalStore = create(
  combine(initialState, (set) => ({
    setModal: (
      content: string,
      rightBtnTxt: string,
      rightOnClick?: () => void,
      leftBtnTxt?: string,
      leftOnClick?: () => void
    ) => set({ isOpen: true, content, rightBtnTxt, rightOnClick, leftBtnTxt, leftOnClick }),
    setClose: () => set(initialState),
  }))
);

export default useModalStore;
