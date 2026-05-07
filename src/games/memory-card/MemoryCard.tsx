'use client';

import { useMemo, useState } from 'react';
import { GameComponentProps } from '@/types/game';

const symbols = ['🎮', '🎯', '🚀', '🧩', '⚡', '👾'];

export default function MemoryCard({ onGameEnd }: GameComponentProps) {
  const deck = useMemo(() => [...symbols, ...symbols].sort(() => Math.random() - 0.5), []);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [reported, setReported] = useState(false);

  const flipCard = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((v) => v + 1);
      if (deck[next[0]] === deck[next[1]]) {
        const nextMatched = [...matched, ...next];
        setMatched(nextMatched);
        setFlipped([]);

        if (nextMatched.length === deck.length && !reported) {
          setReported(true);
          const score = Math.max(20, 220 - (moves + 1) * 12);
          onGameEnd({ score, won: true, details: `${moves + 1} moves` });
        }
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-300'>Moves: {moves}</p>
      <div className='grid grid-cols-4 gap-2 sm:grid-cols-6'>
        {deck.map((value, index) => {
          const open = flipped.includes(index) || matched.includes(index);
          return (
            <button key={index} onClick={() => flipCard(index)} className='aspect-square rounded-lg bg-slate-800 text-lg'>
              {open ? value : '❓'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
