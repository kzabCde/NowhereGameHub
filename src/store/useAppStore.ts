import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppData, GameHistory, LeaderboardEntry, PageKey, Theme } from '../types';
import { defaultData, STORAGE_KEY } from '../lib/storage';

type AppState = AppData & {
  page: PageKey;
  setPage: (page: PageKey) => void;
  setTheme: (theme: Theme) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  addLeaderboard: (entry: Omit<LeaderboardEntry, 'id' | 'createdAt'>) => void;
  addHistory: (entry: Omit<GameHistory, 'id' | 'createdAt'>) => void;
  resetAll: () => void;
  importData: (data: AppData) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...defaultData,
      page: 'home',
      setPage: (page) => set({ page }),
      setTheme: (theme) => set({ theme }),
      addPlayer: (name) => set((s) => ({ players: [...s.players, { id: crypto.randomUUID(), name, createdAt: Date.now() }] })),
      removePlayer: (id) => set((s) => ({ players: s.players.filter((p) => p.id !== id) })),
      addLeaderboard: (entry) =>
        set((s) => ({ leaderboard: [{ ...entry, id: crypto.randomUUID(), createdAt: Date.now() }, ...s.leaderboard] })),
      addHistory: (entry) => set((s) => ({ history: [{ ...entry, id: crypto.randomUUID(), createdAt: Date.now() }, ...s.history] })),
      resetAll: () => set({ ...defaultData, page: 'home' }),
      importData: (data) => set({ ...data }),
    }),
    { name: STORAGE_KEY },
  ),
);
