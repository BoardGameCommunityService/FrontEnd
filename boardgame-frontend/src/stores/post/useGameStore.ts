import { create } from "zustand";
import { combine } from "zustand/middleware";

type GameStat = {
  games: Array<string>;
};

const initialStat: GameStat = {
  games: [],
};

const useGameStore = create(
  combine(initialStat, (set, get) => ({
    setGames: (games: Array<string>) => set({ games }),
  }))
);

export default useGameStore;
