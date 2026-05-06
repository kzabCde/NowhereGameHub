import { Gamepad2, Home, List, Settings, Trophy, Users } from 'lucide-react';
import type { PageKey } from '../types';

export const navItems: { key: PageKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'games', label: 'Games', icon: Gamepad2 },
  { key: 'players', label: 'Players', icon: Users },
  { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'tic-tac-toe', label: 'TicTacToe', icon: List },
  { key: 'memory-card', label: 'Memory', icon: List },
  { key: 'number-puzzle', label: 'Puzzle', icon: List },
];
