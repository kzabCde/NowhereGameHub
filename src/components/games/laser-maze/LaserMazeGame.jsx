'use client';

import { useEffect, useMemo, useState } from 'react';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';
import { playMoveSound, playWinSound } from '@/lib/sound';
import { generateLaserMaze, clonePuzzle } from '@/lib/laser-maze/generator';
import { getCellKey, rotateMirrorInPuzzle, traceLaser } from '@/lib/laser-maze/laser';

const DIFFICULTIES = ['Easy', 'Normal', 'Hard'];

export default function LaserMazeGame() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [originalPuzzle, setOriginalPuzzle] = useState(() => generateLaserMaze('Easy'));
  const [currentPuzzle, setCurrentPuzzle] = useState(() => clonePuzzle(originalPuzzle));
  const [rotationCount, setRotationCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [newBest, setNewBest] = useState(false);

  const trace = useMemo(() => traceLaser(currentPuzzle), [currentPuzzle]);
  const bestRotations = getNumberStorage('laserMazeBestRotations', null);
  const bestTime = getNumberStorage('laserMazeBestTime', null);
  const bestText = (typeof bestRotations === 'number' && typeof bestTime === 'number') ? `หมุน ${bestRotations} ครั้ง / ${bestTime} วินาที` : '-';

  useEffect(() => {
    const next = generateLaserMaze(difficulty);
    setOriginalPuzzle(next); setCurrentPuzzle(clonePuzzle(next)); setRotationCount(0); setElapsedTime(0); setCompleted(false); setNewBest(false);
  }, [difficulty]);

  useEffect(() => {
    if (completed) return undefined;
    const id = setInterval(() => setElapsedTime((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [completed, currentPuzzle.id]);

  useEffect(() => {
    if (!completed && trace.hitTarget) {
      setCompleted(true); playWinSound();
      const prevRot = getNumberStorage('laserMazeBestRotations', Number.POSITIVE_INFINITY);
      const prevTime = getNumberStorage('laserMazeBestTime', Number.POSITIVE_INFINITY);
      if (rotationCount < prevRot || (rotationCount === prevRot && elapsedTime < prevTime)) {
        setNumberStorage('laserMazeBestRotations', rotationCount);
        setNumberStorage('laserMazeBestTime', elapsedTime);
        setNumberStorage('laserMazeBestScore', Math.max(0, 10000 - rotationCount * 200 - elapsedTime * 10));
        setNewBest(true);
      }
    }
  }, [trace.hitTarget, completed, rotationCount, elapsedTime]);

  const newPuzzle = () => {
    const next = generateLaserMaze(difficulty);
    setOriginalPuzzle(next); setCurrentPuzzle(clonePuzzle(next)); setRotationCount(0); setElapsedTime(0); setCompleted(false); setNewBest(false);
  };
  const restartPuzzle = () => { setCurrentPuzzle(clonePuzzle(originalPuzzle)); setRotationCount(0); setElapsedTime(0); setCompleted(false); setNewBest(false); };

  const pathSet = new Set(trace.path.map((p) => getCellKey(p.row, p.col)));
  const mirrorMap = new Map(currentPuzzle.mirrors.map((m) => [getCellKey(m.row, m.col), m.type]));
  const wallSet = new Set(currentPuzzle.walls.map((w) => getCellKey(w.row, w.col)));

  const rotate = (r, c) => {
    if (completed || !mirrorMap.has(getCellKey(r, c))) return;
    setCurrentPuzzle((prev) => rotateMirrorInPuzzle(prev, r, c)); setRotationCount((v) => v + 1); playMoveSound();
  };

  return <div className='space-y-4'>
    <div className='metal-card p-4 flex flex-wrap items-center gap-2'>
      <span className='font-hud text-xs text-slate-300'>ระดับ</span>
      {DIFFICULTIES.map((d) => <button key={d} onClick={() => setDifficulty(d)} className={`font-hud px-3 py-1 rounded-lg ${difficulty === d ? 'bg-white text-black font-bold' : 'metal-card'}`}>{d}</button>)}
      <button onClick={newPuzzle} className='ml-auto px-3 py-1 rounded-lg border border-white/30 font-hud'>สร้างด่านสุ่มใหม่</button>
      <button onClick={restartPuzzle} className='px-3 py-1 rounded-lg border border-white/30 font-hud'>เริ่มใหม่</button>
    </div>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
      <div className='metal-card p-3'><p className='font-hud text-xs text-slate-300'>จำนวนครั้งที่หมุนกระจก</p><p className='font-hud text-lg'>{rotationCount}</p></div>
      <div className='metal-card p-3'><p className='font-hud text-xs text-slate-300'>เวลา</p><p className='font-hud text-lg'>{elapsedTime}s</p></div>
      <div className='metal-card p-3'><p className='font-hud text-xs text-slate-300'>Best</p><p className='font-hud text-sm'>{bestText}</p></div>
      <div className='metal-card p-3'><p className='font-hud text-xs text-slate-300'>สถานะ</p><p className='font-hud text-sm'>{trace.hitTarget ? 'ลำแสงถึงเป้าหมายแล้ว' : 'ยังไม่ถึงเป้าหมาย'}</p></div>
    </div>
    <div className='metal-card p-4'>
      <p className='text-slate-300 mb-2'>หมุนกระจกเพื่อสะท้อนลำแสงให้ถึงเป้าหมาย</p>
      <div className='mx-auto grid gap-1 w-full max-w-[580px]' style={{ gridTemplateColumns: `repeat(${currentPuzzle.size}, minmax(0, 1fr))` }}>
        {Array.from({ length: currentPuzzle.size * currentPuzzle.size }).map((_, i) => {
          const row = Math.floor(i / currentPuzzle.size); const col = i % currentPuzzle.size; const key = getCellKey(row, col);
          const isEmitter = row === currentPuzzle.emitter.row && col === currentPuzzle.emitter.col;
          const isTarget = row === currentPuzzle.target.row && col === currentPuzzle.target.col;
          return <button key={key} onClick={() => rotate(row, col)} className={`aspect-square border rounded-md font-hud text-lg flex items-center justify-center ${wallSet.has(key) ? 'bg-white/20' : 'bg-black/40'} ${pathSet.has(key) ? 'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.85)]' : ''} ${isTarget && trace.hitTarget ? 'animate-pulse' : ''}`}>
            {isEmitter ? '▶' : isTarget ? '◎' : wallSet.has(key) ? '■' : (mirrorMap.get(key) || '')}
          </button>;
        })}
      </div>
      <p className='mt-3 text-xs text-slate-400 font-hud'>hitTarget: {String(trace.hitTarget)} | blocked: {String(trace.blocked)} | exited: {String(trace.exited)} | looped: {String(trace.looped)}</p>
      {completed && <div className='mt-3 border border-emerald-300/40 rounded-xl p-3'><p className='font-hud'>สำเร็จ! หมุน {rotationCount} ครั้ง / {elapsedTime} วินาที</p>{newBest && <p className='font-hud text-emerald-200'>คะแนนดีที่สุดใหม่!</p>}</div>}
    </div>
  </div>;
}
