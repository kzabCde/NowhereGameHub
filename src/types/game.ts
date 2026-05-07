import { ComponentType } from 'react';

export type GameCategory = 'strategy' | 'puzzle' | 'arcade' | 'reflex' | 'memory';
export type GameDifficulty = 'easy' | 'medium' | 'hard';

export type GameAchievement = { id: string; title: string; description: string };

export type GameManifest = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: GameCategory;
  difficulty: GameDifficulty;
  version: string;
  author: string;
  icon: string;
  tags: string[];
  minPlayers: number;
  maxPlayers: number;
  supportsBot: boolean;
  supportsSaveState: boolean;
  achievements: GameAchievement[];
};

export type SessionResult = { score: number; won?: boolean; details?: string; durationMs?: number };

export type GameRuntime = {
  playerId: string;
  playerName: string;
  startSession: () => Promise<string>;
  pauseSession: () => Promise<void>;
  resumeSession: () => Promise<void>;
  endSession: (result: SessionResult) => Promise<void>;
  saveState: (state: unknown) => Promise<void>;
  loadState: () => Promise<unknown | null>;
  unlockAchievement: (achievementId: string) => Promise<void>;
};

export type GameComponentProps = { runtime: GameRuntime; manifest: GameManifest };

export type GameModule = {
  manifest: GameManifest;
  component: ComponentType<GameComponentProps>;
};
