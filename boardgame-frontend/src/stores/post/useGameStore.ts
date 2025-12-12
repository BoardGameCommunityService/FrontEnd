import { create } from "zustand";
import { combine } from "zustand/middleware";

type GameState = {
  games: Array<string>;
};

const initialState: GameState = {
  games: [],
};

const useGameStore = create(
  combine(initialState, (set, get) => ({
    setClear: () => set(initialState),
    setGames: (games: Array<string>) => set({ games }),
  }))
);

export default useGameStore;
