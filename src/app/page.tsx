'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, User } from 'lucide-react';
import GameCard from '@/components/GameCard';
import Leaderboard from '@/components/Leaderboard';
import SettingsPanel from '@/components/SettingsPanel';
import { gameRegistry } from '@/games/registry';
import { useGameStore } from '@/store/useGameStore';

export default function Page() {
  const { playerName, scores, hydrated, setPlayerName, hydrate } = useGameStore();
  useEffect(() => hydrate(), [hydrate]);

  if (!hydrated) return <div className='p-8 text-slate-400'>Loading local hub...</div>;

  return (
    <main className='mx-auto max-w-7xl p-4 md:p-8 space-y-6'>
      <header className='rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 p-4 md:p-6'>
        <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight'>Nowhere Local Game Hub</h1>
        <p className='mt-1 text-slate-300'>Play locally. Save locally. Own your scoreboard.</p>
      </header>

      <div className='grid gap-6 lg:grid-cols-3'>
        <section className='lg:col-span-2 space-y-4'>
          <div className='flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-lg shadow-slate-950/20'>
            <User size={16} />
            <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className='w-full bg-transparent outline-none' placeholder='Player name' />
          </div>

          <motion.div key='grid' initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='grid gap-3 sm:grid-cols-2'>
            {gameRegistry.map((game) => <GameCard key={game.id} game={game} />)}
          </motion.div>
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
