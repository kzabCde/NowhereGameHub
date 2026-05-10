'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';

const SIZE = 16;
const INITIAL_SNAKE = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
const DIR = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function randomFood(snake) {
  while (true) {
    const p = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
  }
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(DIR.ArrowRight);
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE));
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getNumberStorage('snakeBestScore', 0));
  const [speed, setSpeed] = useState(140);

  const directionRef = useRef(direction);
  useEffect(() => { directionRef.current = direction; }, [direction]);

  const reset = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(DIR.ArrowRight);
    setFood(randomFood(INITIAL_SNAKE));
    setRunning(false);
    setGameOver(false);
    setScore(0);
    setSpeed(140);
  };

  const toggleRunning = () => {
    if (gameOver) {
      reset();
      setRunning(true);
      return;
    }
    setRunning((v) => !v);
  };

  const turn = (key) => {
    const next = DIR[key];
    if (!next) return;
    const now = directionRef.current;
    if (next.x === -now.x && next.y === -now.y) return;
    setDirection(next);
    if (!running && !gameOver) setRunning(true);
  };

  useEffect(() => {
    const onKey = (e) => turn(e.key);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [running, gameOver]);

  useEffect(() => {
    if (!running || gameOver) return;
    const timer = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const nextHead = { x: head.x + directionRef.current.x, y: head.y + directionRef.current.y };

        if (nextHead.x < 0 || nextHead.y < 0 || nextHead.x >= SIZE || nextHead.y >= SIZE) {
          setRunning(false);
          setGameOver(true);
          return prev;
        }

        const body = prev.slice(0, -1);
        if (body.some((s) => s.x === nextHead.x && s.y === nextHead.y)) {
          setRunning(false);
          setGameOver(true);
          return prev;
        }

        const eat = nextHead.x === food.x && nextHead.y === food.y;
        const grown = eat ? [nextHead, ...prev] : [nextHead, ...body];

        if (eat) {
          const newScore = score + 1;
          setScore(newScore);
          setFood(randomFood(grown));
          if (newScore > best) {
            setBest(newScore);
            setNumberStorage('snakeBestScore', newScore);
          }
          if (speed > 70) setSpeed((v) => Math.max(70, v - 4));
        }

        return grown;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [running, gameOver, food, score, best, speed]);

  const cells = useMemo(() => {
    const map = new Map();
    snake.forEach((s, i) => map.set(`${s.x}-${s.y}`, i === 0 ? 'head' : 'body'));
    map.set(`${food.x}-${food.y}`, 'food');
    return map;
  }, [snake, food]);

  const dpadBtn = 'glass min-h-12 rounded-xl text-xl active:scale-95 transition';

  return <div className='space-y-4'>
    <div className='glass p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm'>
      <div className='glass px-3 py-2'>Score <b>{score}</b></div>
      <div className='glass px-3 py-2'>Best <b>{best}</b></div>
      <div className='glass px-3 py-2 col-span-2 sm:col-span-1'>Speed <b>{Math.round((160 - speed) / 4) + 1}</b></div>
      <button className='glass px-3 py-2 font-semibold col-span-1 sm:col-span-1 active:scale-95 transition' onClick={toggleRunning}>{running ? 'Pause' : gameOver ? 'Start New' : 'Start'}</button>
      <button className='glass px-3 py-2 font-semibold col-span-1 sm:col-span-1 active:scale-95 transition' onClick={reset}>Reset</button>
    </div>

    <div className='glass p-2 sm:p-3 w-full max-w-[min(92vw,560px)] mx-auto'>
      <div className='grid gap-[2px] bg-slate-900 p-2 rounded-xl' style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}>
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);
          const type = cells.get(`${x}-${y}`);
          const cls = type === 'head' ? 'bg-emerald-300' : type === 'body' ? 'bg-emerald-500' : type === 'food' ? 'bg-rose-400' : 'bg-slate-800';
          return <div key={i} className={`aspect-square w-full rounded-[3px] ${cls}`} />;
        })}
      </div>
    </div>

    <div className='glass p-3 sm:p-4 max-w-[260px] mx-auto'>
      <p className='text-xs text-slate-300 mb-2 text-center'>ใช้ปุ่มลูกศรหรือคีย์บอร์ด</p>
      <div className='space-y-2'>
        <div className='grid grid-cols-3 gap-2'>
          <div />
          <button className={dpadBtn} onClick={() => turn('ArrowUp')} aria-label='Move up'>↑</button>
          <div />
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <button className={dpadBtn} onClick={() => turn('ArrowLeft')} aria-label='Move left'>←</button>
          <button className={dpadBtn} onClick={() => turn('ArrowDown')} aria-label='Move down'>↓</button>
          <button className={dpadBtn} onClick={() => turn('ArrowRight')} aria-label='Move right'>→</button>
        </div>
      </div>
    </div>

    {gameOver && <div className='glass p-4 animate-in-pop text-center'>
      <p className='text-rose-300 font-bold text-lg'>Game Over</p>
      <p className='text-sm text-slate-200'>คะแนนของคุณ: {score} — กด Start New เพื่อเริ่มทันที</p>
    </div>}
  </div>;
}
