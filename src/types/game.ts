import { ComponentType } from 'react';

export type GameResult = {
  score: number;
  details?: string;
  won?: boolean;
};

export type GameComponentProps = {
  gameId: string;
  playerName: string;
  onGameEnd: (result: GameResult) => void;
};

export type GameDefinition = {
  id: string;
  name: string;
  description: string;
  icon: string;
  coverImage: string;
  color: string;
  component: ComponentType<GameComponentProps>;
};

export type ScoreEntry = {
  id: string;
  gameId: string;
  playerName: string;
  score: number;
  details?: string;
  won?: boolean;
  playedAt: string;
};
