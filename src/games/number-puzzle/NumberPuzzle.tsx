'use client';

import { useMemo, useState } from 'react';
import { GameComponentProps } from '@/types/game';

export default function NumberPuzzle({ onGameEnd }: GameComponentProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [reported, setReported] = useState(false);
  const target = useMemo(() => 12 + Math.floor(Math.random() * 10), []);

  const pick = (num: number) => {
    if (selected.includes(num) || selected.length >= 3) return;
    const next = [...selected, num];
    setSelected(next);

    if (next.length === 3 && !reported) {
      setReported(true);
      const sum = next.reduce((acc, n) => acc + n, 0);
      const diff = Math.abs(target - sum);
      const won = diff === 0;
      onGameEnd({ score: won ? 130 : Math.max(10, 90 - diff * 10), won, details: `Target ${target}, sum ${sum}` });
    }
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-300'>Pick 3 unique numbers to match target: <span className='font-bold text-white'>{target}</span></p>
      <div className='grid grid-cols-5 gap-2'>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
          <button key={n} onClick={() => pick(n)} disabled={selected.includes(n) || selected.length >= 3} className='rounded bg-slate-800 p-3 disabled:opacity-40'>
            {n}
          </button>
        ))}
      </div>
      <p>Selected: {selected.join(', ') || 'None'}</p>
    </div>
  );
}
