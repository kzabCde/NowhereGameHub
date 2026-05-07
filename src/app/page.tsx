'use client';

import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Trophy, User } from 'lucide-react';
import GameCard from '@/components/GameCard';
import Leaderboard from '@/components/Leaderboard';
import SettingsPanel from '@/components/SettingsPanel';
import { gameRegistry } from '@/games/registry';
import { useGameStore } from '@/store/useGameStore';

export default function Page() {
  const { playerName, activeGameId, scores, hydrated, setPlayerName, setActiveGameId, addScore, hydrate } = useGameStore();
  useEffect(() => hydrate(), [hydrate]);
  const activeGame = useMemo(() => gameRegistry.find((g) => g.id === activeGameId), [activeGameId]);

  if (!hydrated) return <div className='p-8 text-slate-400'>Loading local hub...</div>;

  return (
    <main className='mx-auto max-w-7xl p-4 md:p-8 space-y-6'>
      <header className='rounded-2xl border border-slate-700 bg-slate-900 p-4 md:p-6'>
        <h1 className='text-2xl md:text-3xl font-bold'>Nowhere Local Game Hub</h1>
        <p className='text-slate-400'>Play locally. Save locally. Own your scoreboard.</p>
      </header>

      <div className='grid gap-6 lg:grid-cols-3'>
        <section className='lg:col-span-2 space-y-4'>
          <div className='flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-3'>
            <User size={16} />
            <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className='w-full bg-transparent outline-none' placeholder='Player name' />
          </div>

          <AnimatePresence mode='wait'>
            {activeGame ? (
              <motion.div key={activeGame.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='rounded-2xl border border-slate-700 bg-slate-900 p-4'>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-xl font-semibold'>{activeGame.name}</h2>
                  <button className='rounded-lg bg-slate-800 px-3 py-2 inline-flex items-center gap-2' onClick={() => setActiveGameId(null)}><ArrowLeft size={16}/>Back</button>
                </div>
                <activeGame.component gameId={activeGame.id} playerName={playerName} onGameEnd={(result) => addScore({ gameId: activeGame.id, playerName, ...result })} />
              </motion.div>
            ) : (
              <motion.div key='grid' initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='grid gap-3 sm:grid-cols-2'>
                {gameRegistry.map((game) => <GameCard key={game.id} game={game} onPlay={setActiveGameId} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <aside className='space-y-4'>
          <Leaderboard scores={scores} />
          <div className='rounded-2xl border border-slate-700 bg-slate-900 p-4'>
            <h2 className='mb-2 font-semibold inline-flex items-center gap-2'><Trophy size={16}/>Recent Scores</h2>
            <div className='space-y-2 text-sm'>{scores.slice(0, 8).map(s => <div key={s.id} className='flex justify-between rounded bg-slate-800 p-2'><span>{s.playerName}</span><span>{s.score}</span></div>)}{scores.length===0&&<p className='text-slate-400'>No games played yet.</p>}</div>
          </div>
          <SettingsPanel />
        </aside>
      </div>
    </main>
  );
}
