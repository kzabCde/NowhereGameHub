'use client';

import { useEffect, useMemo, useState } from 'react';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';
import { playMoveSound, playWinSound } from '@/lib/sound';
import { LASER_DIFFICULTIES, LASER_LEVELS } from '@/lib/laser-maze/levels';
import { rotateMirror, traceLaser } from '@/lib/laser-maze/laser';

const cloneLevel = (level) => ({ ...level, walls: level.walls.map((w) => ({ ...w })), mirrors: level.mirrors.map((m) => ({ ...m })), emitter: { ...level.emitter }, target: { ...level.target } });

export default function LaserMazeGame() {
  const [difficulty, setDifficulty] = useState('Easy'); const [levelIndex, setLevelIndex] = useState(0);
  const [moves, setMoves] = useState(0); const [elapsed, setElapsed] = useState(0); const [status, setStatus] = useState('playing');
  const [best, setBest] = useState(() => getNumberStorage('laserMazeBestScore', 0));
  const [levelState, setLevelState] = useState(() => cloneLevel(LASER_LEVELS.Easy[0]));

  useEffect(() => { setLevelState(cloneLevel(LASER_LEVELS[difficulty][levelIndex])); setMoves(0); setElapsed(0); setStatus('playing'); }, [difficulty, levelIndex]);
  useEffect(() => { if (status !== 'playing') return undefined; const t = setInterval(() => setElapsed((s) => s + 1), 1000); return () => clearInterval(t); }, [status, levelState.id]);

  const trace = useMemo(() => traceLaser(levelState), [levelState]);
  useEffect(() => {
    if (status === 'completed') return;
    if (trace.hitTarget) {
      setStatus('completed'); playWinSound();
      const prevMoves = getNumberStorage('laserMazeBestMoves', Number.POSITIVE_INFINITY);
      const prevTime = getNumberStorage('laserMazeBestTime', Number.POSITIVE_INFINITY);
      if (moves < prevMoves || (moves === prevMoves && elapsed < prevTime)) {
        setNumberStorage('laserMazeBestMoves', moves); setNumberStorage('laserMazeBestTime', elapsed); setNumberStorage('laserMazeBestScore', Math.max(0, 10000 - (moves * 80 + elapsed * 10))); setBest(getNumberStorage('laserMazeBestScore', 0));
      }
    }
  }, [trace.hitTarget]);

  const size = levelState.size;
  const pathSet = new Set(trace.path.map((p) => `${p.row},${p.col}`));
  const wallSet = new Set(levelState.walls.map((w) => `${w.row},${w.col}`));
  const mirrorMap = new Map(levelState.mirrors.map((m) => [`${m.row},${m.col}`, m.type]));

  const onCellClick = (r, c) => {
    if (status === 'completed') return;
    if (!mirrorMap.has(`${r},${c}`)) return;
    setLevelState((prev) => rotateMirror(prev, r, c)); setMoves((m) => m + 1); playMoveSound();
  };

  return <div className='space-y-4'>
    <div className='metal-card p-4 flex flex-wrap items-center gap-2'><span className='font-hud text-xs text-slate-300'>ระดับ</span>{LASER_DIFFICULTIES.map((d) => <button key={d} onClick={() => { setDifficulty(d); setLevelIndex(0); }} className={`font-hud px-3 py-1 rounded-lg ${difficulty === d ? 'bg-white text-black font-bold' : 'metal-card'}`}>{d}</button>)}<span className='font-hud text-sm ml-auto'>ด่าน {levelIndex + 1}/{LASER_LEVELS[difficulty].length}</span></div>
    <div className='grid grid-cols-3 gap-2'>{[['Moves',moves],['Timer',`${elapsed}s`],['Best',best ? `${getNumberStorage('laserMazeBestMoves', 0)} moves / ${getNumberStorage('laserMazeBestTime', 0)}s` : '-']].map(([k,v]) => <div key={k} className='metal-card p-3'><p className='font-hud text-xs text-slate-300'>{k}</p><p className='font-hud text-lg'>{v}</p></div>)}</div>
    <div className='metal-card p-4 space-y-3'>
      <p className='text-sm text-slate-300'>{levelState.description || 'หมุนกระจกให้เลเซอร์ไปถึงเป้าหมาย'}</p>
      <div className='mx-auto grid gap-1 w-full max-w-[560px]' style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {Array.from({ length: size * size }).map((_, i) => {
          const r = Math.floor(i / size); const c = i % size; const k = `${r},${c}`;
          const isEmitter = levelState.emitter.row === r && levelState.emitter.col === c; const isTarget = levelState.target.row === r && levelState.target.col === c;
          const mirror = mirrorMap.get(k); const isWall = wallSet.has(k); const onPath = pathSet.has(k);
          return <button key={k} onClick={() => onCellClick(r, c)} className={`aspect-square rounded-md border text-lg md:text-xl font-hud flex items-center justify-center ${isWall ? 'bg-white/20 border-white/30' : 'bg-black/40 border-white/20'} ${onPath ? 'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]' : ''}`}>
            {isEmitter ? '▶' : isTarget ? '◎' : mirror ? mirror : isWall ? '■' : ''}
          </button>;
        })}
      </div>
      <div className='flex gap-2 flex-wrap'>
        <button className='px-4 py-2 rounded-xl border border-white/30 font-hud' onClick={() => { setLevelState(cloneLevel(LASER_LEVELS[difficulty][levelIndex])); setMoves(0); setElapsed(0); setStatus('playing'); }}>เริ่มด่านใหม่</button>
        <button className='px-4 py-2 rounded-xl bg-white text-black font-hud disabled:opacity-50' disabled={status !== 'completed'} onClick={() => setLevelIndex((i) => (i + 1) % LASER_LEVELS[difficulty].length)}>ด่านถัดไป</button>
      </div>
      {status === 'completed' && <div className='border border-emerald-300/40 rounded-xl p-3'><p className='font-hud'>ผ่านด่านแล้ว! {moves} moves / {elapsed}s</p></div>}
    </div>
  </div>;
}
