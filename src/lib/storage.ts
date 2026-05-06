import type { AppData } from '../types';

export const STORAGE_KEY = 'local-game-hub-data';

export const defaultData: AppData = {
  players: [{ id: crypto.randomUUID(), name: 'Player 1', createdAt: Date.now() }],
  leaderboard: [],
  history: [],
  theme: 'light',
};

export const loadData = (): AppData => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultData;
  try {
    const parsed = JSON.parse(raw) as AppData;
    return { ...defaultData, ...parsed };
  } catch {
    return defaultData;
  }
};
