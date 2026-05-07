'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { gameRegistry } from '@/games/registry';
import { useGameStore } from '@/store/useGameStore';

export default function GamePage() {
  const params = useParams<{ id: string }>();
  const gameId = params.id;
  const { playerName, hydrated, addScore, hydrate } = useGameStore();

  useEffect(() => hydrate(), [hydrate]);
  const activeGame = useMemo(() => gameRegistry.find((g) => g.id === gameId), [gameId]);

  if (!activeGame) return notFound();
  if (!hydrated) return <div className='p-8 text-slate-400'>Loading game...</div>;

  return (
    <main className='mx-auto max-w-4xl p-4 md:p-8 space-y-4'>
      <Link href='/' className='inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2'>
        <ArrowLeft size={16} />
        Back to games
      </Link>

      <section className='rounded-2xl border border-slate-700 bg-slate-900 p-4'>
        <h1 className='mb-2 text-2xl font-semibold'>{activeGame.name}</h1>
        <p className='mb-4 text-slate-400'>{activeGame.description}</p>
        <activeGame.component gameId={activeGame.id} playerName={playerName} onGameEnd={(result) => addScore({ gameId: activeGame.id, playerName, ...result })} />
      </section>
    </main>
  );
}
