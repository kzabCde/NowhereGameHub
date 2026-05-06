export type PageKey =
  | 'home'
  | 'games'
  | 'tic-tac-toe'
  | 'memory-card'
  | 'number-puzzle'
  | 'players'
  | 'leaderboard'
  | 'settings';

export type Theme = 'light' | 'dark';

export type Player = { id: string; name: string; createdAt: number };

export type LeaderboardEntry = {
  id: string;
  game: 'tic-tac-toe' | 'memory-card' | 'number-puzzle';
  playerName: string;
  scoreLabel: string;
  meta?: Record<string, string | number>;
  createdAt: number;
};

export type GameHistory = {
  id: string;
  game: string;
  result: string;
  createdAt: number;
};

export type AppData = {
  players: Player[];
  leaderboard: LeaderboardEntry[];
  history: GameHistory[];
  theme: Theme;
};
