'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { GameDefinition } from '@/types/game';

export default function GameCard({ game }: { game: GameDefinition }) {
  return <motion.div whileHover={{ y: -4 }} className='overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-left'>
    <Link href={`/game/${game.id}`}>
      <div className='relative h-40 w-full'>
        <Image src={game.coverImage} alt={`${game.name} cover`} fill className='object-cover' sizes='(min-width: 768px) 50vw, 100vw' />
      </div>
      <div className='p-5'>
        <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-r ${game.color} px-3 py-2 text-xl`}>{game.icon}</div>
        <h3 className='font-semibold'>{game.name}</h3><p className='text-sm text-slate-400'>{game.description}</p>
      </div>
    </Link>
  </motion.div>;
}
