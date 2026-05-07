'use client';

import { useEffect, useRef, useState } from 'react';
import { GameComponentProps } from '@/types/game';

type Phase = 'waiting' | 'ready' | 'finished' | 'early';

export default function ReactionTimer({ onGameEnd }: GameComponentProps) {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (phase !== 'waiting') return;
    const delay = 1000 + Math.random() * 3000;
    const timer = setTimeout(() => {
      setPhase('ready');
      startRef.current = performance.now();
    }, delay);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleTap = () => {
    if (phase === 'waiting') {
      setPhase('early');
      return;
    }
    if (phase !== 'ready') return;
    const ms = Math.round(performance.now() - startRef.current);
    setReactionMs(ms);
    setPhase('finished');
    onGameEnd({ score: Math.max(0, 1200 - ms), won: ms < 400, details: `${ms}ms reaction` });
  };

  const reset = () => {
    setReactionMs(null);
    setPhase('waiting');
  };

  return (
    <div className='space-y-4'>
      <p>{phase === 'ready' ? 'Tap now!' : phase === 'early' ? 'Too early! Try again.' : 'Wait for green...'}</p>
      <button onClick={handleTap} className={`rounded px-5 py-3 ${phase === 'ready' ? 'bg-green-500' : 'bg-slate-700'}`}>
        React
      </button>
      {(phase === 'finished' || phase === 'early') && (
        <button onClick={reset} className='rounded bg-indigo-600 px-4 py-2'>
          Retry
        </button>
      )}
      {reactionMs !== null && <p className='text-sm text-slate-300'>Reaction: {reactionMs}ms</p>}
    </div>
  );
}
