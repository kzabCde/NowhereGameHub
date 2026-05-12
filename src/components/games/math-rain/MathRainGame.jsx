'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';
import { playLoseSound, playMoveSound, playWinSound } from '@/lib/sound';
import { createMathQuestion, getMathRainConfig, MATH_RAIN_DIFFICULTIES } from '@/lib/math-rain/questions';

const DURATION = 60;

export default function MathRainGame() {
  const [difficulty, setDifficulty] = useState('Easy'); const cfg = useMemo(() => getMathRainConfig(difficulty), [difficulty]);
  const [state, setState] = useState('idle'); const [statusText, setStatusText] = useState('พร้อมรับฝนตัวเลข');
  const [timeLeft, setTimeLeft] = useState(DURATION); const [score, setScore] = useState(0); const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(cfg.lives); const [missed, setMissed] = useState(0); const [mistakes, setMistakes] = useState(0);
  const [questions, setQuestions] = useState([]); const [answerInput, setAnswerInput] = useState('');
  const [bestScore, setBestScore] = useState(() => getNumberStorage('mathRainBestScore', 0));
  const inputRef = useRef(null); const rafRef = useRef(null); const spawnRef = useRef(null); const timerRef = useRef(null); const qidRef = useRef(1);
  const scoreRef = useRef(0); const streakRef = useRef(0); const livesRef = useRef(cfg.lives);
  useEffect(() => { scoreRef.current = score; streakRef.current = streak; livesRef.current = lives; }, [score, streak, lives]);
  const cleanup = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); if (spawnRef.current) clearInterval(spawnRef.current); if (timerRef.current) clearInterval(timerRef.current); rafRef.current = null; spawnRef.current = null; timerRef.current = null; };
  const spawnQuestion = () => setQuestions((prev) => [...prev, createMathQuestion(difficulty, qidRef.current++)]);
  const finishGame = (msg = 'เกมจบ!') => {
    cleanup(); setState('finished'); setStatusText(msg);
    const prevBest = getNumberStorage('mathRainBestScore', 0);
    if (scoreRef.current > prevBest) { setNumberStorage('mathRainBestScore', scoreRef.current); setBestScore(scoreRef.current); playWinSound(); }
  };
  const startGame = () => {
    cleanup(); setState('playing'); setStatusText('พิมพ์คำตอบก่อนโจทย์ตกถึงพื้น'); setTimeLeft(DURATION); setScore(0); setStreak(0); setLives(cfg.lives); setMissed(0); setMistakes(0); setAnswerInput(''); setQuestions([]); qidRef.current = 1;
    setNumberStorage('mathRainTotalPlays', getNumberStorage('mathRainTotalPlays', 0) + 1); spawnQuestion();
  };
  useEffect(() => { setLives(cfg.lives); setState('idle'); setQuestions([]); setStatusText('พร้อมรับฝนตัวเลข'); }, [difficulty]);

  useEffect(() => {
    if (state !== 'playing') return undefined;
    timerRef.current = setInterval(() => setTimeLeft((t) => { if (t <= 1) { finishGame('หมดเวลา!'); return 0; } return t - 1; }), 1000);
    spawnRef.current = setInterval(spawnQuestion, cfg.spawnInterval);
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000; last = now;
      setQuestions((prev) => {
        let livesLost = 0;
        const next = prev.filter((q) => {
          q.y += q.speed * dt;
          const alive = q.y < 92;
          if (!alive) livesLost += 1;
          return alive;
        });
        if (livesLost > 0) {
          setMissed((m) => m + livesLost); setStreak(0); setStatusText('พลาด!'); playLoseSound();
          setLives((lv) => { const n = lv - livesLost; if (n <= 0) { setTimeout(() => finishGame('เกมจบ!'), 0); return 0; } return n; });
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    inputRef.current?.focus();
    return cleanup;
  }, [state, cfg.spawnInterval, difficulty]);

  const submitAnswer = () => {
    if (state !== 'playing') return;
    const val = answerInput.trim(); if (!val) return; setAnswerInput(''); if (!/^-?\d+$/.test(val)) return;
    const num = Number(val);
    setQuestions((prev) => {
      const matches = prev.filter((q) => q.answer === num);
      if (!matches.length) {
        setMistakes((m) => m + 1); setStreak(0); setScore((s) => Math.max(0, s - 2)); setStatusText('พลาด!'); playLoseSound(); return prev;
      }
      const target = [...matches].sort((a, b) => b.y - a.y || a.createdAt - b.createdAt)[0];
      const next = prev.filter((q) => q.id !== target.id);
      setScore((s) => { const ns = s + cfg.scorePerCorrect + (((streakRef.current + 1) % 5 === 0) ? 10 : 0); return ns; });
      setStreak((st) => { const ns = st + 1; setNumberStorage('mathRainBestStreak', Math.max(getNumberStorage('mathRainBestStreak', 0), ns)); return ns; });
      setStatusText('ตอบถูก!'); playMoveSound();
      return next;
    });
  };

  return <div className='space-y-4'>
    <div className='metal-card p-4 flex flex-wrap gap-2 items-center'><span className='font-hud text-xs text-slate-300'>ระดับความยาก</span>{MATH_RAIN_DIFFICULTIES.map((d) => <button key={d} onClick={() => setDifficulty(d)} className={`font-hud px-3 py-1 rounded-lg ${difficulty === d ? 'bg-white text-black font-bold' : 'metal-card'}`}>{d}</button>)}</div>
    <div className='grid grid-cols-2 md:grid-cols-7 gap-2'>{[['เวลา',`${timeLeft}s`],['ชีวิต',lives],['คะแนน',score],['Best',bestScore||'-'],['Streak',streak],['Missed',missed],['Mistakes',mistakes]].map(([k,v]) => <div key={k} className='metal-card p-2'><p className='font-hud text-[11px] text-slate-300'>{k}</p><p className='font-hud text-xl'>{v}</p></div>)}</div>
    <div className='metal-card p-4 space-y-3'>
      <p className='font-hud text-sm text-slate-300'>{statusText}</p>
      <div className='relative h-[52vh] min-h-[320px] bg-black/40 rounded-2xl border border-white/15 overflow-hidden'>
        <div className='absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#fff1_1px,transparent_1px),linear-gradient(to_bottom,#fff1_1px,transparent_1px)] bg-[size:24px_24px]' />
        {questions.map((q) => <div key={q.id} className='absolute px-3 py-1 rounded-xl border border-white/30 bg-white/10 shadow-[0_0_14px_rgba(255,255,255,0.15)] font-hud' style={{ left: `${q.x}%`, top: `${q.y}%` }}>{q.expression}</div>)}
        <div className='absolute bottom-0 left-0 right-0 border-t border-rose-400/40' />
      </div>
      <div className='flex flex-col sm:flex-row gap-2'>
        <input ref={inputRef} disabled={state !== 'playing'} value={answerInput} onChange={(e) => setAnswerInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitAnswer()} placeholder='พิมพ์คำตอบ' className='flex-1 bg-white/10 rounded-xl px-4 py-2 font-hud disabled:opacity-50' />
        <button onClick={submitAnswer} disabled={state !== 'playing'} className='px-4 py-2 rounded-xl bg-white text-black font-hud disabled:opacity-50'>ส่งคำตอบ</button>
        <button onClick={startGame} className='px-4 py-2 rounded-xl border border-white/30 font-hud'>{state === 'playing' ? 'รีสตาร์ต' : 'เริ่มเกม'}</button>
      </div>
    </div>
  </div>;
}
