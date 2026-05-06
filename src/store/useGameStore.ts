import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEY } from '../lib/storage';
import type { AppStateData, GameRecord, GameResult } from '../types/game';

type Page = 'home'|'games'|'play'|'leaderboard'|'settings';

type GameStore = AppStateData & {
  page: Page;
  selectedGameId: string | null;
  setPage: (p: Page) => void;
  setSelectedGame: (id: string | null) => void;
  setPlayerName: (name: string) => void;
  setTheme: (t: 'light'|'dark') => void;
  logResult: (gameId: string, playerName: string, result: GameResult) => void;
  importData: (data: AppStateData) => void;
  resetAll: () => void;
};

const defaults: AppStateData = { playerName: 'Player 1', theme: 'light', history: [] };

export const useGameStore = create<GameStore>()(persist((set)=>( {
  ...defaults,
  page: 'home',
  selectedGameId: null,
  setPage: (page)=>set({page}),
  setSelectedGame: (selectedGameId)=>set({selectedGameId, page: selectedGameId ? 'play':'games'}),
  setPlayerName: (playerName)=>set({playerName}),
  setTheme: (theme)=>set({theme}),
  logResult: (gameId, playerName, result)=>set((s)=>({history:[{id:crypto.randomUUID(),gameId,playerName,createdAt:Date.now(),...result}, ...s.history]})),
  importData: (data)=>set({...data}),
  resetAll: ()=>set({...defaults, page:'home', selectedGameId:null}),
}), {name: STORAGE_KEY}));

export const selectBestScores = (history: GameRecord[]) => {
  const best = new Map<string, GameRecord>();
  history.forEach((h)=>{ const cur=best.get(h.gameId); if(!cur || h.score>cur.score) best.set(h.gameId, h); });
  return best;
};
