'use client';

import { create } from 'zustand';
import { ScoreEntry } from '@/types/game';

type GameStore = {
  playerName: string;
  activeGameId: string | null;
  scores: ScoreEntry[];
  hydrated: boolean;
  setPlayerName: (name: string) => void;
  setActiveGameId: (gameId: string | null) => void;
  addScore: (score: Omit<ScoreEntry, 'id' | 'playedAt'>) => void;
  importData: (data: Pick<GameStore, 'playerName' | 'scores'>) => void;
  resetScores: () => void;
  hydrate: () => void;
};

const STORAGE_KEY = 'ngh-local-game-hub-v1';

export const useGameStore = create<GameStore>((set, get) => ({
  playerName: 'Player 1',
  activeGameId: null,
  scores: [],
  hydrated: false,
  setPlayerName: (playerName) => {
    set({ playerName });
    persist(get());
  },
  setActiveGameId: (activeGameId) => set({ activeGameId }),
  addScore: (score) => {
    const next = {
      ...score,
      id: crypto.randomUUID(),
      playedAt: new Date().toISOString(),
    };
    set((state) => ({ scores: [next, ...state.scores] }));
    persist(get());
  },
  importData: ({ playerName, scores }) => {
    set({ playerName, scores });
    persist(get());
  },
  resetScores: () => {
    set({ scores: [] });
    persist(get());
  },
  hydrate: () => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Pick<GameStore, 'playerName' | 'scores'>;
        set({ playerName: parsed.playerName ?? 'Player 1', scores: parsed.scores ?? [] });
      } catch {}
    }
    set({ hydrated: true });
  },
}));

function persist(state: Pick<GameStore, 'playerName' | 'scores'>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ playerName: state.playerName, scores: state.scores }));
}
