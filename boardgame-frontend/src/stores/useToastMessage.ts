import { create } from "zustand";
import { combine } from "zustand/middleware";

interface ToastMessageState {
  isOpen: boolean;
  variant: "success" | "failure";
  message: string;
}

const initialState: ToastMessageState = {
  isOpen: false,
  variant: "success",
  message: "",
};

const useToastMessage = create(
  combine(initialState, (set) => ({
    setToastMessage: (variant: "success" | "failure", message: string) => set({ isOpen: true, variant, message }),
    setClose: () => set(initialState),
  }))
);

export default useToastMessage;
