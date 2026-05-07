'use client';
import { motion } from 'framer-motion';
import { GameDefinition } from '@/types/game';

export default function GameCard({ game, onPlay }: { game: GameDefinition; onPlay: (id: string) => void }) {
  return <motion.button whileHover={{ y: -4 }} onClick={() => onPlay(game.id)} className='rounded-2xl border border-slate-700 bg-slate-900 p-5 text-left'>
    <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-r ${game.color} px-3 py-2 text-xl`}>{game.icon}</div>
    <h3 className='font-semibold'>{game.name}</h3><p className='text-sm text-slate-400'>{game.description}</p>
  </motion.button>;
}
