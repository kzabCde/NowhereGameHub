import type { GameDefinition } from '../types/game';
import TicTacToe from './tic-tac-toe/TicTacToe';
import MemoryCard from './memory-card/MemoryCard';
import NumberPuzzle from './number-puzzle/NumberPuzzle';
import ReactionTimer from './reaction-timer/ReactionTimer';

export const gameRegistry: GameDefinition[] = [
  { id: 'tic-tac-toe', name: 'Tic Tac Toe', description: 'Classic duel game', accent: 'from-indigo-500 to-violet-500', component: TicTacToe },
  { id: 'memory-card', name: 'Memory Card', description: 'Match pairs fast', accent: 'from-pink-500 to-rose-500', component: MemoryCard },
  { id: 'number-puzzle', name: 'Number Puzzle', description: 'Sliding puzzle challenge', accent: 'from-emerald-500 to-teal-500', component: NumberPuzzle },
  { id: 'reaction-timer', name: 'Reaction Timer', description: 'Test your reflexes', accent: 'from-amber-500 to-orange-500', component: ReactionTimer },
];
