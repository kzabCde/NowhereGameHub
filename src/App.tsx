import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { MemoryCard } from './games/memory-card/MemoryCard';
import { NumberPuzzle } from './games/number-puzzle/NumberPuzzle';
import { TicTacToe } from './games/tic-tac-toe/TicTacToe';
import { GamesPage, HomePage, LeaderboardPage, PlayersPage, SettingsPage } from './pages/SimplePages';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const page = useAppStore((s) => s.page);
  const theme = useAppStore((s) => s.theme);
  const pageView = {
    home: <HomePage />,
    games: <GamesPage />,
    players: <PlayersPage />,
    leaderboard: <LeaderboardPage />,
    settings: <SettingsPage />,
    'tic-tac-toe': <TicTacToe />,
    'memory-card': <MemoryCard />,
    'number-puzzle': <NumberPuzzle />,
  }[page];

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 md:flex">
        <Navigation />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-4 md:p-6">
            {pageView}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
