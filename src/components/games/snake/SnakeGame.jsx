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
  });

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

  return <div className='space-y-3'>
    <div className='glass p-3 flex flex-wrap gap-2 items-center text-sm'>
      <div>Score: <b>{score}</b></div>
      <div>Best: <b>{best}</b></div>
      <div>Speed: <b>{Math.round((160 - speed) / 4) + 1}</b></div>
      <button className='glass px-3 py-1' onClick={() => setRunning((v) => !v)}>{running ? 'Pause' : gameOver ? 'Start New' : 'Start'}</button>
      <button className='glass px-3 py-1' onClick={reset}>Reset</button>
    </div>

    <div className='glass p-3 inline-block'>
      <div className='grid gap-[2px] bg-slate-900 p-2 rounded-xl' style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}>
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);
          const type = cells.get(`${x}-${y}`);
          const cls = type === 'head' ? 'bg-emerald-300' : type === 'body' ? 'bg-emerald-500' : type === 'food' ? 'bg-rose-400' : 'bg-slate-800';
          return <div key={i} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] ${cls}`} />;
        })}
      </div>
    </div>

    <div className='grid grid-cols-3 gap-2 max-w-[220px]'>
      <button className='glass p-2 col-start-2' onClick={() => turn('ArrowUp')}>↑</button>
      <button className='glass p-2' onClick={() => turn('ArrowLeft')}>←</button>
      <button className='glass p-2' onClick={() => turn('ArrowDown')}>↓</button>
      <button className='glass p-2' onClick={() => turn('ArrowRight')}>→</button>
    </div>

    {gameOver && <div className='glass p-4 animate-in-pop'>
      <p className='text-rose-300 font-bold text-lg'>Game Over</p>
      <p className='text-sm text-slate-200'>คะแนนของคุณ: {score} — กด Start New หรือ Reset เพื่อเล่นอีกครั้ง</p>
    </div>}
  </div>;
}
