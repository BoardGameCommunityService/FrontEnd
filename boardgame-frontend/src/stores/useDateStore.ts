import { create } from "zustand";
import { combine } from "zustand/middleware";

type DateState = {
  selectedDate: Date | null;
};

const initialState: DateState = {
  selectedDate: null,
};

const useDateStore = create(
  combine(initialState, (set) => ({
    setSelectedDate: (date: Date | null) => set({ selectedDate: date }),
    clearSelectedDate: () => set({ selectedDate: null }),
  }))
);

export default useDateStore;