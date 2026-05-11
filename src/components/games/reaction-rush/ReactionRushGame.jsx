'use client';

import { useEffect, useRef, useState } from 'react';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';

const BEST_SCORE_KEY = 'reactionRushBestScore';

const formatMs = (value) => (typeof value === 'number' && Number.isFinite(value) ? `${value} ms` : '-');

const getPerformanceLabel = (time) => {
  if (time < 200) return 'เร็วมาก!';
  if (time < 300) return 'ดีมาก';
  if (time <= 450) return 'ปานกลาง';
  return 'ลองใหม่อีกครั้ง';
};

export default function ReactionRushGame() {
  const [state, setState] = useState('idle');
  const [bestScore, setBestScore] = useState(() => getNumberStorage(BEST_SCORE_KEY, null));
  const [lastReaction, setLastReaction] = useState(null);
  const [falseStarts, setFalseStarts] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const timerRef = useRef(null);
  const readyAtRef = useRef(0);

  const clearReadyTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startRound = () => {
    clearReadyTimer();
    setState('waiting');
    readyAtRef.current = 0;
    const delay = Math.floor(Math.random() * 3001) + 1500;
    timerRef.current = setTimeout(() => {
      readyAtRef.current = Date.now();
      setState('ready');
      timerRef.current = null;
    }, delay);
  };

  const handleAreaClick = () => {
    if (state === 'waiting') {
      clearReadyTimer();
      setAttempts((v) => v + 1);
      setFalseStarts((v) => v + 1);
      setState('false-start');
      return;
    }

    if (state !== 'ready') return;

    const reactionTime = Date.now() - readyAtRef.current;
    setAttempts((v) => v + 1);
    setLastReaction(reactionTime);

    if (bestScore === null || reactionTime < bestScore) {
      setBestScore(reactionTime);
      setNumberStorage(BEST_SCORE_KEY, reactionTime);
    }

    setState('result');
  };

  useEffect(() => () => clearReadyTimer(), []);

  const panelClass = state === 'ready'
    ? 'border-emerald-400 bg-emerald-400/20'
    : state === 'waiting'
      ? 'border-amber-300 bg-amber-200/10'
      : state === 'false-start'
        ? 'border-rose-400 bg-rose-400/20'
        : 'border-cyan-300 bg-cyan-500/10';

  const statusText = {
    idle: 'กดเริ่มเพื่อทดสอบรีเฟล็กซ์ของคุณ',
    waiting: 'รอสัญญาณ...',
    ready: 'กดเลย!',
    result: lastReaction !== null ? `เวลาตอบสนอง: ${lastReaction} ms` : 'เสร็จแล้ว',
    'false-start': 'กดเร็วเกินไป!',
  }[state];

  return <div className='space-y-4'>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      <div className='glass p-3'><p className='text-xs text-slate-300'>Best Score</p><p className='text-xl font-bold'>{formatMs(bestScore)}</p></div>
      <div className='glass p-3'><p className='text-xs text-slate-300'>Last Reaction</p><p className='text-xl font-bold'>{formatMs(lastReaction)}</p></div>
      <div className='glass p-3'><p className='text-xs text-slate-300'>False Start</p><p className='text-xl font-bold'>{falseStarts}</p></div>
      <div className='glass p-3'><p className='text-xs text-slate-300'>Attempts</p><p className='text-xl font-bold'>{attempts}</p></div>
    </div>

    <button
      type='button'
      className={`glass w-full max-w-3xl mx-auto min-h-[260px] md:min-h-[320px] rounded-3xl border-2 transition-all duration-300 grid place-items-center px-4 text-center ${panelClass}`}
      onClick={handleAreaClick}
      aria-label='Reaction area'
    >
      <div>
        <p className='text-2xl md:text-4xl font-extrabold mb-3'>{statusText}</p>
        {state === 'result' && lastReaction !== null && <p className='text-lg text-cyan-200'>{getPerformanceLabel(lastReaction)}</p>}
      </div>
    </button>

    <div className='flex justify-center'>
      {(state === 'idle' || state === 'result' || state === 'false-start') && (
        <button className='px-6 py-3 rounded-xl bg-emerald-400 text-black font-bold active:scale-95 transition' onClick={startRound}>
          {state === 'idle' ? 'เริ่มเกม' : 'ลองอีกครั้ง'}
        </button>
      )}
    </div>
  </div>;
}
