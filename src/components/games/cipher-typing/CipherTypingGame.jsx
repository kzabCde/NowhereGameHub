'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { playLoseSound, playMoveSound, playWinSound } from '@/lib/sound';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';

const BEST_SCORE_KEY = 'cipherTypingBestScore';
const BEST_ACCURACY_KEY = 'cipherTypingBestAccuracy';
const BEST_STREAK_KEY = 'cipherTypingBestStreak';
const TOTAL_PLAYS_KEY = 'cipherTypingTotalPlays';
const BANK = { easy: ['ACCESS','UPLOAD','DECRYPT','SYSTEM','OVERRIDE','LOGIN','TRACE','SCAN','OPEN','LOCK'], normal: ['ACCESS_NODE','SYS-204','TRACE_7','PORT-OPEN','DECRYPT_12','CORE_SYNC','NODE_404','GRID_RESET','LOGIN-SEC','DATA_PUSH'], hard: ['/root/ACCESS_07','SYS#OVERRIDE-21','NODE_SYNC_404','TRACE/PACKET_9','CORE-LOCK#77','DECRYPT_KEY-204','INIT_VECTOR#12','PORT/SCAN_8080','ZERO-DAY_PATCH','AUTH_CHAIN#5'] };
const CFG = { easy: { label: 'Easy', thai: 'ง่าย', points: 10, keepOnWrong: true, caseSensitive: false }, normal: { label: 'Normal', thai: 'ปกติ', points: 15, keepOnWrong: false, caseSensitive: false }, hard: { label: 'Hard', thai: 'ยาก', points: 20, keepOnWrong: false, caseSensitive: true } };

export default function CipherTypingGame() {
  const inputRef = useRef(null); const timerRef = useRef(null);
  const [difficulty, setDifficulty] = useState('normal'); const conf = CFG[difficulty];
  const [state, setState] = useState('idle'); const [timeLeft, setTimeLeft] = useState(60); const [command, setCommand] = useState(BANK.normal[0]); const [input, setInput] = useState('');
  const [score, setScore] = useState(0); const [correct, setCorrect] = useState(0); const [mistakes, setMistakes] = useState(0); const [streak, setStreak] = useState(0); const [bestStreak, setBestStreak] = useState(0); const [feedback, setFeedback] = useState('');
  const [bestScore, setBestScore] = useState(() => getNumberStorage(BEST_SCORE_KEY, 0)); const [bestAccuracy, setBestAccuracy] = useState(() => getNumberStorage(BEST_ACCURACY_KEY, 0)); const [savedBestStreak, setSavedBestStreak] = useState(() => getNumberStorage(BEST_STREAK_KEY, 0));
  const pickCommand = (prev = '') => { const options = BANK[difficulty]; let next = options[Math.floor(Math.random() * options.length)]; if (options.length > 1 && next === prev) next = options[(options.indexOf(next) + 1) % options.length]; return next; };
  const resetRound = () => { setTimeLeft(60); setScore(0); setCorrect(0); setMistakes(0); setStreak(0); setBestStreak(0); setInput(''); setFeedback(''); setCommand(pickCommand(command)); };
  const start = () => { clearInterval(timerRef.current); resetRound(); setState('playing'); setNumberStorage(TOTAL_PLAYS_KEY, getNumberStorage(TOTAL_PLAYS_KEY, 0) + 1); timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000); setTimeout(() => inputRef.current?.focus(), 20); };
  useEffect(() => { if (timeLeft > 0 || state !== 'playing') return; clearInterval(timerRef.current); setState('finished'); if (score > bestScore) { setBestScore(score); setBestAccuracy(accuracy); setSavedBestStreak(Math.max(bestStreak, savedBestStreak)); setNumberStorage(BEST_SCORE_KEY, score); setNumberStorage(BEST_ACCURACY_KEY, accuracy); setNumberStorage(BEST_STREAK_KEY, Math.max(bestStreak, savedBestStreak)); playWinSound(); } }, [timeLeft, state, score, bestScore, bestStreak, savedBestStreak]);
  useEffect(() => () => clearInterval(timerRef.current), []);
  const total = correct + mistakes; const accuracy = useMemo(() => (total ? Math.round((correct / total) * 100) : 0), [correct, total]);

  const submit = (e) => { e.preventDefault(); if (state !== 'playing') return; const value = input.trim(); if (!value) return; const target = conf.caseSensitive ? command : command.toLowerCase(); const typed = conf.caseSensitive ? value : value.toLowerCase();
    if (typed === target) { playMoveSound(); const nextStreak = streak + 1; const bonus = nextStreak % 5 === 0 ? 25 : 0; setScore((s) => s + conf.points + bonus); setCorrect((c) => c + 1); setStreak(nextStreak); setBestStreak((b) => Math.max(b, nextStreak)); setFeedback(bonus ? '+BONUS 25' : 'ถูกต้อง'); setCommand(pickCommand(command)); }
    else { playLoseSound(); setMistakes((m) => m + 1); setStreak(0); setFeedback('ผิดพลาด'); if (!conf.keepOnWrong) setCommand(pickCommand(command)); }
    setInput('');
  };

  return <div className='space-y-4'>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      <div className='metal-card p-3'><p className='font-hud text-xs'>เวลาที่เหลือ</p><p className='font-hud text-2xl'>{timeLeft}s</p></div><div className='metal-card p-3'><p className='font-hud text-xs'>คะแนน</p><p className='font-hud text-2xl'>{score}</p></div><div className='metal-card p-3'><p className='font-hud text-xs'>คะแนนดีที่สุด</p><p className='font-hud text-2xl'>{bestScore}</p></div><div className='metal-card p-3'><p className='font-hud text-xs'>ความแม่นยำ</p><p className='font-hud text-2xl'>{accuracy}%</p></div>
    </div>
    <div className='metal-card p-4 space-y-4 pearl-border'><div className='flex flex-wrap gap-2'>{Object.entries(CFG).map(([key, d]) => <button key={key} type='button' onClick={() => { setDifficulty(key); setState('idle'); clearInterval(timerRef.current); resetRound(); }} className={`rounded-lg border px-3 py-1 font-hud text-xs ${difficulty === key ? 'bg-white text-black' : 'border-zinc-500'}`}>{d.label} / {d.thai}</button>)}</div>
      <p className='font-hud text-xs text-zinc-400'>คำสั่งปัจจุบัน</p><p className='font-hud text-2xl md:text-3xl tracking-wider break-all'>{command}<span className='animate-pulse'>_</span></p>
      <form onSubmit={submit} className='flex flex-col sm:flex-row gap-2'><input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} disabled={state !== 'playing'} className='flex-1 rounded-lg border border-zinc-500 bg-black/40 px-3 py-2 font-hud' placeholder='พิมพ์คำสั่ง...' /><button type='submit' disabled={state !== 'playing'} className='rounded-lg bg-white px-4 py-2 text-black font-bold disabled:opacity-40'>ส่งคำสั่ง</button></form>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-hud'><p>ตอบถูก: {correct}</p><p>ผิดพลาด: {mistakes}</p><p>คอมโบ: {streak}</p><p>คอมโบสูงสุด: {Math.max(bestStreak, savedBestStreak)}</p></div>
      {feedback && <p className={`font-hud text-sm ${feedback.includes('ผิด') ? 'text-rose-300' : 'text-emerald-300'}`}>{feedback}</p>}
      <button type='button' onClick={start} className='rounded-lg border border-white/40 px-4 py-2 font-hud'>{state === 'idle' ? 'เริ่มระบบ' : 'เริ่มใหม่'}</button>
      {state === 'finished' && <p className='font-hud text-zinc-200'>หมดเวลา | คะแนน {score} | ความแม่นยำ {accuracy}%</p>}
      <p className='font-hud text-xs text-zinc-500'>Best Accuracy: {bestAccuracy}% | Best Streak: {savedBestStreak}</p>
    </div>
  </div>;
}
