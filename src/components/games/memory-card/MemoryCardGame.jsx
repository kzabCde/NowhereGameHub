'use client';
import { useEffect, useState } from 'react';
import MemoryCardBoard from './MemoryCardBoard';
import { createDeck } from '@/lib/memory-card/cards';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';

export default function MemoryCardGame() {
  const [cards, setCards] = useState(createDeck());
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (result) return undefined;
    const id = setInterval(() => setTime((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [result]);

  const reset = () => { setCards(createDeck()); setFlipped([]); setMoves(0); setTime(0); setLocked(false); setResult(null); };

  const onFinished = (nextCards, latestMoves) => {
    const bestMoves = getNumberStorage('memoryCardBestMoves', 0);
    if (!bestMoves || latestMoves < bestMoves) { setNumberStorage('memoryCardBestMoves', latestMoves); setNumberStorage('memoryCardBestScore', latestMoves); }
    const bestTime = getNumberStorage('memoryCardBestTime', 0);
    if (!bestTime || time < bestTime) setNumberStorage('memoryCardBestTime', time);
    setLocked(true);
    setResult({ title: 'Stage Clear', detail: `จับคู่ครบทั้งหมดใน ${latestMoves} moves และ ${time} วินาที`, tone: 'text-cyan-300' });
  };

  const flip = (i) => {
    if (locked || flipped.includes(i)) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      const latestMoves = moves + 1;
      setMoves(latestMoves);
      const [a, b] = next;
      if (cards[a].icon === cards[b].icon) {
        const nextCards = cards.map((c, idx) => (idx === a || idx === b ? { ...c, matched: true } : c));
        setCards(nextCards);
        setFlipped([]);
        if (nextCards.every((c) => c.matched)) onFinished(nextCards, latestMoves);
      } else {
        setLocked(true);
        setTimeout(() => { setFlipped([]); setLocked(false); }, 550);
      }
    }
  };

  return <div className='space-y-3'><div className='font-hud metal-card p-3 flex gap-3'><span>Moves: {moves}</span><span>Time: {time}s</span><span>Matched: {cards.filter((c) => c.matched).length / 2}/8</span><button onClick={reset} className='metal-card px-2'>Reset Game</button></div><MemoryCardBoard cards={cards} flipped={flipped} onFlip={flip} locked={locked} />{result && <div className='metal-card p-4 animate-in-pop'><p className={`text-lg font-bold ${result.tone}`}>{result.title}</p><p className='text-sm text-slate-200'>{result.detail}</p></div>}</div>;
}
