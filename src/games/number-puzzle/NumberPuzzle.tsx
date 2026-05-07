'use client';

import { useMemo, useState } from 'react';
import { GameComponentProps } from '@/types/game';

export default function NumberPuzzle({ onGameEnd }: GameComponentProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [reported, setReported] = useState(false);
  const target = useMemo(() => 12 + Math.floor(Math.random() * 10), []);
  const [resultText, setResultText] = useState('');

  const pick = (num: number) => {
    if (selected.includes(num) || selected.length >= 3) return;
    const next = [...selected, num];
    setSelected(next);

    if (next.length === 3 && !reported) {
      setReported(true);
      const sum = next.reduce((acc, n) => acc + n, 0);
      const diff = Math.abs(target - sum);
      const won = diff === 0;
      setResultText(won ? `Perfect! You matched ${target}` : `Your sum is ${sum} (target ${target})`);
      onGameEnd({ score: won ? 130 : Math.max(10, 90 - diff * 10), won, details: `Target ${target}, sum ${sum}` });
    }
  };

  const reset = () => {
    setSelected([]);
    setReported(false);
    setResultText('');
  };

  return (
    <div className='space-y-4 rounded-2xl border border-slate-700 bg-slate-950/50 p-5'>
      <p className='rounded-xl bg-slate-900/80 p-3 text-sm text-slate-300'>Pick 3 unique numbers to match target: <span className='font-bold text-amber-300'>{target}</span></p>
      <div className='grid grid-cols-5 gap-2'>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
          <button key={n} onClick={() => pick(n)} disabled={selected.includes(n) || selected.length >= 3} className='rounded-xl border border-slate-700 bg-slate-800 p-3 transition hover:border-amber-400 hover:bg-slate-700 disabled:opacity-40'>
            {n}
          </button>
        ))}
      </div>
      <p>Selected: {selected.join(', ') || 'None'}</p>
      {resultText && <p className='text-sm text-amber-200'>{resultText}</p>}
      {reported && <button onClick={reset} className='rounded-xl bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500'>Try new round</button>}
    </div>
  );
}
