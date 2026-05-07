'use client';

import { useEffect, useState } from 'react';
import { GameComponentProps } from '@/types/game';

const ROUND_SECONDS = 10;

export default function ClickCounter({ onGameEnd }: GameComponentProps) {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [running, setRunning] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0 && !reported) {
      setRunning(false);
      setReported(true);
      onGameEnd({ score: count, details: `${count} clicks in ${ROUND_SECONDS}s`, won: count >= 40 });
      return;
    }
    const timer = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, timeLeft, count, reported, onGameEnd]);

  const click = () => {
    if (!running) {
      setRunning(true);
      setReported(false);
    }
    if (timeLeft > 0) setCount((v) => v + 1);
  };

  const reset = () => {
    setCount(0);
    setTimeLeft(ROUND_SECONDS);
    setRunning(false);
    setReported(false);
  };

  return (
    <div className='space-y-4 rounded-2xl border border-slate-700 bg-slate-950/50 p-5'>
      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-xl bg-slate-900/80 p-3 text-sm'>Time left: <span className='font-semibold text-cyan-300'>{timeLeft}s</span></div>
        <div className='rounded-xl bg-slate-900/80 p-3 text-sm'>Clicks: <span className='font-semibold text-cyan-300'>{count}</span></div>
      </div>
      <button className='rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50' onClick={click} disabled={timeLeft === 0}>
        Click Fast!
      </button>
      {timeLeft === 0 && <button onClick={reset} className='block rounded-xl bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500'>Play again</button>}
    </div>
  );
}
