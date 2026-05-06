import type { ComponentType } from 'react';

export type GameResult = { score: number; summary: string; metadata?: Record<string, string | number> };
export type GameComponentProps = { gameId: string; playerName: string; onGameEnd: (result: GameResult) => void };
export type GameDefinition = {
  id: string;
  name: string;
  description: string;
  accent: string;
  component: ComponentType<GameComponentProps>;
};

export type GameRecord = GameResult & { id: string; gameId: string; playerName: string; createdAt: number };
export type AppStateData = {
  playerName: string;
  theme: 'light'|'dark';
  history: GameRecord[];
};
