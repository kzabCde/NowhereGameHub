'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getArrayStorage, getNumberStorage, setArrayStorage } from '@/lib/storage';
import { playClickSound } from '@/lib/sound';

const PRIORITY_IDS = ['core-defense', 'laser-maze', 'circuit-link', 'code-breaker', 'aim-grid', 'math-rain', 'reaction-rush'];
const RECOMMEND_LIMIT = 7;

function scoreBest(game) {
  if (!game?.bestScoreKey) return 0;
  return getNumberStorage(game.bestScoreKey, 0);
}

function buildRecommended(games) {
  const available = (games || []).filter((game) => game?.status === 'available');
  if (!available.length) return [];

  const byId = PRIORITY_IDS.map((id) => available.find((game) => game.id === id)).filter(Boolean);
  const strategyPuzzle = available.filter((game) => ['strategy', 'puzzle'].includes((game.category || '').toLowerCase()));
  const recentlyAdded = [...available].slice(-8).reverse();
  const bestScores = [...available].sort((a, b) => scoreBest(b) - scoreBest(a));

  const ordered = [];
  const pushUnique = (game) => {
    if (!game || ordered.find((item) => item.id === game.id)) return;
    ordered.push(game);
  };

  [byId, strategyPuzzle, recentlyAdded, bestScores, available].forEach((group) => group.forEach(pushUnique));
  return ordered.slice(0, RECOMMEND_LIMIT);
}

export default function RecommendedGameSlider({ games = [], onPlay, onOpenDetail, favorites = [], onToggleFavorite }) {
  const recommendedGames = useMemo(() => buildRecommended(games), [games]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [timerSeed, setTimerSeed] = useState(0);
  const intervalRef = useRef(null);

  const canSlide = recommendedGames.length > 1;
  const currentGame = recommendedGames[currentIndex] || null;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [recommendedGames.length]);

  useEffect(() => {
    if (!canSlide || isPaused) return undefined;
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendedGames.length);
    }, 4500);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [canSlide, isPaused, recommendedGames.length, timerSeed]);

  const resetTimer = () => setTimerSeed((x) => x + 1);

  const goTo = (index) => {
    if (!canSlide) return;
    setCurrentIndex((index + recommendedGames.length) % recommendedGames.length);
    resetTimer();
  };

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  const handlePlay = (game) => {
    if (!game?.id) return;
    playClickSound?.();
    if (onPlay) {
      onPlay(game.id);
      return;
    }
    const currentRecent = getArrayStorage('nowhereGameHubRecentPlayed');
    const nextRecent = [game.id, ...currentRecent.filter((id) => id !== game.id)].slice(0, 6);
    setArrayStorage('nowhereGameHubRecentPlayed', nextRecent);
  };

  const isFavorite = (gameId) => favorites.includes(gameId);

  if (!recommendedGames.length) {
    return <section className='metal-card hud-corners rounded-3xl p-6 md:p-8'>
      <p className='font-hud text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>Recommended</p>
      <h3 className='font-brand mt-2 text-2xl font-black md:text-3xl'>เกมแนะนำ</h3>
      <p className='mt-2 text-zinc-500 dark:text-zinc-400'>ยังไม่มีเกมที่พร้อมแนะนำ</p>
    </section>;
  }

  return <section
    className='metal-card hud-corners rounded-3xl p-4 md:p-6'
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onFocusCapture={() => setIsPaused(true)}
    onBlurCapture={() => setIsPaused(false)}
  >
    <div className='mb-4 flex items-center justify-between gap-3'>
      <div>
        <p className='font-hud text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>Recommended</p>
        <h3 className='font-brand mt-1 text-2xl font-black md:text-3xl'>เกมแนะนำ</h3>
        <p className='text-sm text-zinc-600 dark:text-zinc-300'>เกมเด่นที่เหมาะให้ลองเล่นตอนนี้</p>
      </div>
      <div className='hidden gap-2 sm:flex'>
        <button type='button' aria-label='ก่อนหน้า' onClick={goPrev} disabled={!canSlide} className='pearl-border rounded-xl border border-zinc-300 px-3 py-2 text-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15'>ก่อนหน้า</button>
        <button type='button' aria-label='ถัดไป' onClick={goNext} disabled={!canSlide} className='pearl-border rounded-xl border border-zinc-300 px-3 py-2 text-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15'>ถัดไป</button>
      </div>
    </div>

    <article className='grid gap-5 overflow-hidden rounded-2xl border border-zinc-300/60 bg-white/45 p-4 md:grid-cols-5 md:p-6 dark:border-white/15 dark:bg-white/[0.03]'>
      <div className={`md:col-span-3 ${reducedMotion ? '' : 'transition-all duration-500 ease-out'}`} key={currentGame.id}>
        <span className='font-hud rounded-full border border-zinc-300 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:border-white/15 dark:text-zinc-300'>Available</span>
        <h4 className='font-brand mt-3 text-2xl font-black md:text-4xl'>{currentGame.title}</h4>
        <p className='mt-1 text-zinc-500 dark:text-zinc-400'>{currentGame.thaiTitle || '-'}</p>
        <p className='mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300'>{currentGame.description}</p>

        <div className='mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3'>
          <p><span className='font-hud text-zinc-500 dark:text-zinc-400'>หมวดหมู่:</span> {currentGame.category || '-'}</p>
          <p><span className='font-hud text-zinc-500 dark:text-zinc-400'>ความยาก:</span> {currentGame.difficulty || '-'}</p>
          <p><span className='font-hud text-zinc-500 dark:text-zinc-400'>คะแนนดีที่สุด:</span> {currentGame.bestScoreKey ? getNumberStorage(currentGame.bestScoreKey, 0) || '-' : '-'}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {(currentGame.tags || []).slice(0, 5).map((tag) => <span key={tag} className='rounded-full border border-zinc-300/80 px-2 py-1 text-[11px] text-zinc-600 dark:border-white/15 dark:text-zinc-300'>{tag}</span>)}
        </div>

        <div className='mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3'>
          <Link href={currentGame.url || '#'} onClick={() => handlePlay(currentGame)} className='rounded-xl bg-black px-4 py-2 text-center text-white transition-all duration-500 ease-out hover:-translate-y-1 dark:bg-white dark:text-black'>เล่นเลย</Link>
          <button type='button' onClick={() => { playClickSound?.(); onOpenDetail?.(currentGame); }} className='pearl-border rounded-xl border border-zinc-300 px-4 py-2 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/30 dark:border-white/15'>รายละเอียด</button>
          {onToggleFavorite ? <button type='button' onClick={() => { playClickSound?.(); onToggleFavorite(currentGame.id); }} className='pearl-border rounded-xl border border-zinc-300 px-4 py-2 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/30 dark:border-white/15'>{isFavorite(currentGame.id) ? '♥ โปรด' : '♡ โปรด'}</button> : null}
        </div>
      </div>

      <div className='md:col-span-2'>
        <div className={`flex min-h-52 items-center justify-center rounded-2xl border border-zinc-300/70 bg-black/[0.03] text-7xl dark:border-white/15 dark:bg-white/[0.02] ${reducedMotion ? '' : 'transition-all duration-500 ease-out'} ${canSlide ? 'scale-100' : ''}`}>
          {currentGame.icon || '◈'}
        </div>
      </div>
    </article>

    <div className='mt-4 flex items-center justify-between sm:justify-center'>
      <button type='button' aria-label='ก่อนหน้า' onClick={goPrev} disabled={!canSlide} className='sm:hidden pearl-border rounded-xl border border-zinc-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-white/15'>ก่อนหน้า</button>
      <div className='flex items-center gap-2'>
        {recommendedGames.map((game, index) => <button key={game.id} type='button' aria-label={`ไปสไลด์ ${index + 1}`} onClick={() => goTo(index)} className={`h-2.5 w-6 rounded-full border transition-all duration-500 ease-out ${index === currentIndex ? 'border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white' : 'border-zinc-400/80 bg-transparent dark:border-white/30'}`} />)}
      </div>
      <button type='button' aria-label='ถัดไป' onClick={goNext} disabled={!canSlide} className='sm:hidden pearl-border rounded-xl border border-zinc-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-white/15'>ถัดไป</button>
    </div>
  </section>;
}
