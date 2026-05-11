'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';

const BEST_SCORE_KEY = 'numberNinjaBestScore';
const DURATION = 60;

const difficultyConfig = {
  Easy: { ops: ['+', '-'], min: 1, max: 20 },
  Normal: { ops: ['+', '-', '×'], min: 1, max: 50 },
  Hard: { ops: ['+', '-', '×', '÷'], min: 5, max: 99 },
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function makeQuestion(level) {
  const cfg = difficultyConfig[level];
  const op = cfg.ops[Math.floor(Math.random() * cfg.ops.length)];

  if (op === '÷') {
    const divisor = randomInt(2, 12);
    const quotient = randomInt(2, 12);
    return {
      text: `${divisor * quotient} ÷ ${divisor}`,
      answer: quotient,
    };
  }

  const a = randomInt(cfg.min, cfg.max);
  const b = randomInt(cfg.min, cfg.max);

  if (op === '+') return { text: `${a} + ${b}`, answer: a + b };
  if (op === '-') return { text: `${a} - ${b}`, answer: a - b };
  return { text: `${a} × ${b}`, answer: a * b };
}

export default function NumberNinjaGame() {
  const [state, setState] = useState('idle');
  const [difficulty, setDifficulty] = useState('Easy');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => getNumberStorage(BEST_SCORE_KEY, 0));
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [question, setQuestion] = useState(() => makeQuestion('Easy'));
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const inputRef = useRef(null);
  const intervalRef = useRef(null);
  const scoreRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const nextQuestion = (level = difficulty) => {
    setQuestion(makeQuestion(level));
    setAnswerInput('');
  };

  const startGame = () => {
    clearTimer();
    setState('playing');
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setMistakes(0);
    setTimeLeft(DURATION);
    setFeedback('');
    nextQuestion(difficulty);
  };

  const finishGame = (finalScore) => {
    clearTimer();
    setState('finished');
    if (finalScore > bestScore) {
      setBestScore(finalScore);
      setNumberStorage(BEST_SCORE_KEY, finalScore);
    }
  };

  const submitAnswer = () => {
    if (state !== 'playing') return;
    const value = answerInput.trim();
    if (!value) return;
    if (!/^-?\d+$/.test(value)) return;

    const numericValue = Number(value);
    if (numericValue === question.answer) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      setBestStreak((prev) => Math.max(prev, nextStreak));
      setFeedback('correct');
      nextQuestion();
    } else {
      setStreak(0);
      setMistakes((v) => v + 1);
      setFeedback('wrong');
      nextQuestion();
    }
  };

  useEffect(() => {
    if (state !== 'playing') return;
    clearTimer();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          finishGame(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimer();
  }, [state]);

  useEffect(() => {
    if (inputRef.current && state === 'playing') {
      inputRef.current.focus();
    }
  }, [question, state]);

  useEffect(() => () => clearTimer(), []);

  const feedbackClass = useMemo(() => (feedback === 'correct'
    ? 'ring-2 ring-emerald-400'
    : feedback === 'wrong'
      ? 'ring-2 ring-rose-400'
      : ''), [feedback]);

  return <div className='space-y-4'>
    <div className='metal-card p-4 flex flex-wrap gap-2 items-center'>
      <span className='text-slate-300 text-sm'>ระดับความยาก</span>
      {Object.keys(difficultyConfig).map((level) => <button key={level} className={`px-3 py-1 rounded-lg ${difficulty === level ? 'bg-white text-black dark:bg-white dark:text-black font-bold' : 'metal-card'}`} onClick={() => {
        setDifficulty(level);
        nextQuestion(level);
      }}>{level}</button>)}
    </div>

    <div className='grid grid-cols-2 md:grid-cols-6 gap-3'>
      <div className='metal-card p-3'><p className='text-xs text-slate-300'>เวลา</p><p className='text-xl font-bold'>{timeLeft}s</p></div>
      <div className='metal-card p-3'><p className='text-xs text-slate-300'>คะแนน</p><p className='text-xl font-bold'>{score}</p></div>
      <div className='metal-card p-3'><p className='text-xs text-slate-300'>Best</p><p className='text-xl font-bold'>{bestScore}</p></div>
      <div className='metal-card p-3'><p className='text-xs text-slate-300'>Streak</p><p className='text-xl font-bold'>{streak}</p></div>
      <div className='metal-card p-3'><p className='text-xs text-slate-300'>Best Streak</p><p className='text-xl font-bold'>{bestStreak}</p></div>
      <div className='metal-card p-3'><p className='text-xs text-slate-300'>Mistakes</p><p className='text-xl font-bold'>{mistakes}</p></div>
    </div>

    <div className={`metal-card p-6 rounded-3xl space-y-4 ${feedbackClass}`}>
      <p className='text-center text-slate-300'>ตอบโจทย์ให้เร็วที่สุดภายใน 60 วินาที</p>
      <p className='text-center text-4xl md:text-6xl font-black tracking-wide'>{question.text}</p>
      <div className='flex flex-col sm:flex-row gap-2 max-w-xl mx-auto'>
        <input ref={inputRef} className='flex-1 bg-white/10 rounded-xl px-4 py-3 text-lg' value={answerInput} onChange={(e) => setAnswerInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submitAnswer(); }} inputMode='numeric' placeholder='คำตอบของคุณ' disabled={state !== 'playing'} />
        <button className='px-5 py-3 rounded-xl bg-white text-black dark:bg-white dark:text-black font-bold disabled:opacity-50' onClick={submitAnswer} disabled={state !== 'playing'}>ส่งคำตอบ</button>
      </div>
      <div className='text-center'>
        <button className='px-6 py-3 rounded-xl bg-white text-black dark:bg-white dark:text-black font-bold' onClick={startGame}>{state === 'idle' ? 'เริ่มเกม' : state === 'finished' ? 'เริ่มใหม่' : 'รีสตาร์ต'}</button>
      </div>
    </div>

    {state === 'finished' && <div className='metal-card p-4 text-center'>
      <p className='text-xl font-bold text-amber-200'>หมดเวลา!</p>
      <p>คะแนนสุดท้าย: <b>{score}</b></p>
      <p>สถิติคอมโบสูงสุด: <b>{bestStreak}</b></p>
      <p>จำนวนข้อผิดพลาด: <b>{mistakes}</b></p>
    </div>}
  </div>;
}
