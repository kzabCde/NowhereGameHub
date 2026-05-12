'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getNumberStorage, getStringStorage, setNumberStorage, setStringStorage } from '@/lib/storage';

const BEST_SCORE_KEY = 'codeBreakerBestScore';
const BEST_ATTEMPTS_KEY = 'codeBreakerBestAttempts';
const BEST_TIME_KEY = 'codeBreakerBestTime';
const TOTAL_WINS_KEY = 'codeBreakerTotalWins';
const TOTAL_PLAYS_KEY = 'codeBreakerTotalPlays';
const DIFFICULTIES = {
  easy: { label: 'Easy', thai: 'ง่าย', codeLength: 3, maxDigit: 5, allowRepeats: false, maxAttempts: 12 },
  normal: { label: 'Normal', thai: 'ปกติ', codeLength: 4, maxDigit: 7, allowRepeats: false, maxAttempts: 12 },
  hard: { label: 'Hard', thai: 'ยาก', codeLength: 5, maxDigit: 9, allowRepeats: true, maxAttempts: 14 },
};
const formatBest = (attempts, time, fallback = '-') => (attempts && Number.isFinite(time) ? `${attempts} ครั้ง / ${time} วินาที` : fallback);
const buildCode = ({ codeLength, maxDigit, allowRepeats }) => { const pool = Array.from({ length: maxDigit + 1 }, (_, i) => String(i)); const code = []; while (code.length < codeLength) { const next = pool[Math.floor(Math.random() * pool.length)]; if (!allowRepeats && code.includes(next)) continue; code.push(next); } return code.join(''); };
const evaluateGuess = (secret, guess) => { let exact = 0; const sc = {}; const gc = {}; for (let i = 0; i < secret.length; i += 1) { if (secret[i] === guess[i]) exact += 1; else { sc[secret[i]] = (sc[secret[i]] || 0) + 1; gc[guess[i]] = (gc[guess[i]] || 0) + 1; } } let partial = 0; Object.keys(gc).forEach((d) => { partial += Math.min(gc[d] || 0, sc[d] || 0); }); return { exact, partial }; };

export default function CodeBreakerGame() {
  const inputRef = useRef(null); const timerRef = useRef(null);
  const [difficulty, setDifficulty] = useState('normal'); const config = DIFFICULTIES[difficulty];
  const [gameState, setGameState] = useState('idle'); const [secretCode, setSecretCode] = useState(''); const [guess, setGuess] = useState(''); const [error, setError] = useState(''); const [attempts, setAttempts] = useState([]); const [seconds, setSeconds] = useState(0);
  const [bestAttempts, setBestAttempts] = useState(() => getNumberStorage(BEST_ATTEMPTS_KEY, null)); const [bestTime, setBestTime] = useState(() => getNumberStorage(BEST_TIME_KEY, null)); const [bestScore, setBestScore] = useState(() => getStringStorage(BEST_SCORE_KEY, '-'));
  useEffect(() => () => timerRef.current && clearInterval(timerRef.current), []);
  useEffect(() => { if (gameState === 'playing') inputRef.current?.focus(); }, [gameState]);

  const startGame = () => { if (timerRef.current) clearInterval(timerRef.current); setSecretCode(buildCode(config)); setGameState('playing'); setAttempts([]); setGuess(''); setSeconds(0); setError(''); setNumberStorage(TOTAL_PLAYS_KEY, getNumberStorage(TOTAL_PLAYS_KEY, 0) + 1); timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000); };
  const handleDifficulty = (next) => { setDifficulty(next); setGameState('idle'); setGuess(''); setError(''); setAttempts([]); setSeconds(0); clearInterval(timerRef.current); };
  const validate = (value) => { const v = value.trim(); if (!v) return 'กรุณากรอกรหัส'; if (v.length !== config.codeLength) return `กรอกรหัสให้ครบ ${config.codeLength} หลัก`; if (!(new RegExp(`^[0-${config.maxDigit}]+$`).test(v))) return `ใช้ตัวเลขได้เฉพาะ 0-${config.maxDigit}`; if (!config.allowRepeats && new Set(v.split('')).size !== v.length) return 'โหมดนี้ห้ามใช้ตัวเลขซ้ำ'; return ''; };
  const onSubmit = (e) => { e.preventDefault(); if (gameState !== 'playing') return; const issue = validate(guess); if (issue) return setError(issue); setError(''); const trimmed = guess.trim(); const { exact, partial } = evaluateGuess(secretCode, trimmed); const nextAttempts = [...attempts, { guess: trimmed, exact, partial }]; setAttempts(nextAttempts); setGuess(''); if (exact === config.codeLength) { clearInterval(timerRef.current); setGameState('won'); const used = nextAttempts.length; const isNewBest = bestAttempts === null || used < bestAttempts || (used === bestAttempts && seconds < bestTime); if (isNewBest) { const nextBest = `${used} ครั้ง / ${seconds} วินาที`; setBestAttempts(used); setBestTime(seconds); setBestScore(nextBest); setNumberStorage(BEST_ATTEMPTS_KEY, used); setNumberStorage(BEST_TIME_KEY, seconds); setStringStorage(BEST_SCORE_KEY, nextBest); } setNumberStorage(TOTAL_WINS_KEY, getNumberStorage(TOTAL_WINS_KEY, 0) + 1); return; } if (nextAttempts.length >= config.maxAttempts) { clearInterval(timerRef.current); setGameState('failed'); } };
  const infoHint = useMemo(() => `รหัสยาว ${config.codeLength} หลัก | ช่วงตัวเลข 0-${config.maxDigit} | ${config.allowRepeats ? 'ซ้ำได้' : 'ห้ามซ้ำ'}`, [config]);

  return <div className='space-y-4'>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      <div className='metal-card p-3'><p className='font-hud text-xs'>เวลาที่ใช้</p><p className='font-hud text-2xl'>{seconds}s</p></div>
      <div className='metal-card p-3'><p className='font-hud text-xs'>จำนวนครั้ง</p><p className='font-hud text-2xl'>{attempts.length}</p></div>
      <div className='metal-card p-3'><p className='font-hud text-xs'>คะแนนดีที่สุด</p><p className='font-hud text-sm'>{formatBest(bestAttempts, bestTime, bestScore)}</p></div>
      <div className='metal-card p-3'><p className='font-hud text-xs'>Max Attempts</p><p className='font-hud text-2xl'>{config.maxAttempts}</p></div>
    </div>
    <div className='metal-card p-4 md:p-5 space-y-4 pearl-border'>
      <div className='flex flex-wrap gap-2'>{Object.entries(DIFFICULTIES).map(([key, d]) => <button key={key} type='button' onClick={() => handleDifficulty(key)} className={`rounded-lg border px-3 py-1 font-hud text-xs ${difficulty === key ? 'bg-white text-black' : 'border-zinc-500'}`}>{d.label} / {d.thai}</button>)}</div>
      <p className='font-hud text-xs text-zinc-400'>{infoHint}</p>
      <form onSubmit={onSubmit} className='flex flex-col sm:flex-row gap-2'>
        <input ref={inputRef} inputMode='numeric' maxLength={config.codeLength} value={guess} disabled={gameState !== 'playing'} onChange={(e) => setGuess(e.target.value)} className='flex-1 rounded-lg border border-zinc-500 bg-black/40 px-3 py-2 font-hud tracking-[0.35em]' placeholder={'0'.repeat(config.codeLength)} />
        <button type='submit' disabled={gameState !== 'playing'} className='rounded-lg bg-white px-4 py-2 font-bold text-black disabled:opacity-40'>ส่งคำตอบ</button>
      </form>
      {error && <p className='font-hud text-sm text-rose-300'>{error}</p>}
      <button type='button' onClick={startGame} className='rounded-lg border border-white/40 px-4 py-2 font-hud'>{gameState === 'idle' ? 'เริ่มระบบ' : 'ลองใหม่'}</button>
      {gameState === 'won' && <p className='font-hud text-emerald-300'>รหัสถูกต้อง! ระบบถูกปลดล็อกแล้ว</p>}
      {gameState === 'failed' && <p className='font-hud text-rose-300'>หมดจำนวนครั้ง รหัสคือ {secretCode}</p>}
    </div>
    <div className='metal-card overflow-hidden'><table className='w-full text-sm'><thead className='font-hud text-xs border-b border-white/10'><tr><th className='p-2 text-left'>#</th><th className='p-2 text-left'>Guess</th><th className='p-2 text-left'>ตำแหน่งถูก</th><th className='p-2 text-left'>ตัวถูกผิดตำแหน่ง</th></tr></thead><tbody>{attempts.map((a, i) => <tr key={`${a.guess}-${i}`} className='border-b border-white/5'><td className='p-2 font-hud'>{i + 1}</td><td className='p-2 font-hud tracking-[0.25em]'>{a.guess}</td><td className='p-2 font-hud'>{a.exact}</td><td className='p-2 font-hud'>{a.partial}</td></tr>)}</tbody></table></div>
  </div>;
}
