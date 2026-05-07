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
    <div className='space-y-4'>
      <p>Time left: {timeLeft}s</p>
      <p className='text-3xl font-bold'>{count}</p>
      <button className='rounded bg-cyan-500 px-5 py-3 font-semibold text-slate-950' onClick={click} disabled={timeLeft === 0}>
        Click Fast!
      </button>
      {timeLeft === 0 && <button onClick={reset} className='block rounded bg-indigo-600 px-4 py-2'>Play again</button>}
    </div>
  );
}
