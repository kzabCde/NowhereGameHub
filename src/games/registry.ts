import { GameDefinition } from '@/types/game';
import TicTacToe from './tic-tac-toe/TicTacToe';
import MemoryCard from './memory-card/MemoryCard';
import ReactionTimer from './reaction-timer/ReactionTimer';
import ClickCounter from './click-counter/ClickCounter';
import NumberPuzzle from './number-puzzle/NumberPuzzle';

export const gameRegistry: GameDefinition[] = [
  { id: 'tic-tac-toe', name: 'Tic Tac Toe', description: 'Classic 3x3 strategy game', icon: '❌', coverImage: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?auto=format&fit=crop&w=1200&q=80', color: 'from-pink-500 to-rose-500', component: TicTacToe },
  { id: 'memory-card', name: 'Memory Card', description: 'Match pairs quickly', icon: '🧠', coverImage: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=1200&q=80', color: 'from-violet-500 to-fuchsia-500', component: MemoryCard },
  { id: 'reaction-timer', name: 'Reaction Timer', description: 'Test your reflexes', icon: '⚡', coverImage: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80', color: 'from-emerald-500 to-teal-500', component: ReactionTimer },
  { id: 'click-counter', name: 'Click Counter', description: 'Fastest clicking challenge', icon: '🖱️', coverImage: 'https://images.unsplash.com/photo-1527443224154-c4f0617db99d?auto=format&fit=crop&w=1200&q=80', color: 'from-cyan-500 to-blue-500', component: ClickCounter },
  { id: 'number-puzzle', name: 'Number Puzzle', description: 'Make exact sums', icon: '🔢', coverImage: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80', color: 'from-amber-500 to-orange-500', component: NumberPuzzle },
];
