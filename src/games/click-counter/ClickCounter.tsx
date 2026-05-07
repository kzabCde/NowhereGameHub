'use client';
import { useEffect, useState } from 'react';
import { GameComponentProps } from '@/types/game';

export default function ClickCounter({ onGameEnd }: GameComponentProps) {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  useEffect(() => {
    if (timeLeft <= 0) {
      onGameEnd({ score: count, details: 'Clicks in 10 seconds' });
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, count, onGameEnd]);
  return <div className='space-y-4'><p>Time: {timeLeft}s</p><p className='text-3xl'>{count}</p><button className='rounded bg-cyan-500 px-4 py-2' onClick={() => setCount((v) => v + 1)}>Click!</button></div>;
}
