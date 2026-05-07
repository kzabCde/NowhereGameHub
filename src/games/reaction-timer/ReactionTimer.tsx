'use client';
import { useEffect, useRef, useState } from 'react';
import { GameComponentProps } from '@/types/game';

export default function ReactionTimer({ onGameEnd }: GameComponentProps) {
  const [ready, setReady] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const startRef = useRef(0);
  useEffect(() => {
    const delay = 1200 + Math.random() * 2500;
    const t = setTimeout(() => { setReady(true); setCanClick(true); startRef.current = performance.now(); }, delay);
    return () => clearTimeout(t);
  }, []);
  return <div><p>{ready ? 'Tap now!' : 'Wait for green...'}</p><button className={`mt-4 rounded px-4 py-2 ${ready ? 'bg-green-500' : 'bg-slate-700'}`} onClick={() => { if (!canClick) return; const ms = Math.round(performance.now() - startRef.current); setCanClick(false); onGameEnd({ score: Math.max(0,1000-ms), details: `${ms}ms reaction`}); }}>React</button></div>;
}
