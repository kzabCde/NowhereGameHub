'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getArrayStorage, getNumberStorage, setArrayStorage } from '@/lib/storage';
import { playClickSound } from '@/lib/sound';

const PRIORITY_IDS = ['core-defense', 'laser-maze', 'circuit-link', 'code-breaker', 'aim-grid', 'math-rain', 'reaction-rush'];
const RECOMMEND_LIMIT = 7;

function scoreBest(game) { if (!game?.bestScoreKey) return 0; return getNumberStorage(game.bestScoreKey, 0); }
function buildRecommended(games) {
  const available = (games || []).filter((game) => game?.status === 'available');
  if (!available.length) return [];
  const ordered = [];
  const pushUnique = (game) => { if (game && !ordered.find((x) => x.id === game.id)) ordered.push(game); };
  const byId = PRIORITY_IDS.map((id) => available.find((game) => game.id === id)).filter(Boolean);
  const strategyPuzzle = available.filter((game) => ['strategy', 'puzzle'].includes((game.category || '').toLowerCase()));
  const recentlyAdded = [...available].slice(-8).reverse();
  const bestScores = [...available].sort((a, b) => scoreBest(b) - scoreBest(a));
  [byId, strategyPuzzle, recentlyAdded, bestScores, available].forEach((g) => g.forEach(pushUnique));
  return ordered.slice(0, RECOMMEND_LIMIT);
}

export default function RecommendedGameSlider({ games = [], onPlay, onOpenDetail, favorites = [], onToggleFavorite }) {
  const recommendedGames = useMemo(() => buildRecommended(games), [games]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timerSeed, setTimerSeed] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canSlide = recommendedGames.length > 1;
  const currentGame = recommendedGames[currentIndex];

  useEffect(() => { if (!window.matchMedia) return; const m = window.matchMedia('(prefers-reduced-motion: reduce)'); const u = () => setReducedMotion(m.matches); u(); m.addEventListener('change', u); return () => m.removeEventListener('change', u); }, []);
  useEffect(() => setCurrentIndex(0), [recommendedGames.length]);

  useEffect(() => {
    if (!canSlide || isPaused) return undefined;
    const id = window.setInterval(() => { setDirection(1); setCurrentIndex((p) => (p + 1) % recommendedGames.length); }, 4500);
    return () => window.clearInterval(id);
  }, [canSlide, isPaused, recommendedGames.length, timerSeed]);

  const resetTimer = () => setTimerSeed((x) => x + 1);
  const goTo = (index, nextDirection = 1) => { if (!canSlide) return; setDirection(nextDirection); setCurrentIndex((index + recommendedGames.length) % recommendedGames.length); resetTimer(); };
  const goPrev = () => goTo(currentIndex - 1, -1);
  const goNext = () => goTo(currentIndex + 1, 1);
  const isFavorite = (id) => favorites.includes(id);

  const handlePlay = (game) => {
    if (!game?.id || !game?.url) return;
    playClickSound?.();
    if (onPlay) return onPlay(game.id);
    const currentRecent = getArrayStorage('nowhereGameHubRecentPlayed');
    setArrayStorage('nowhereGameHubRecentPlayed', [game.id, ...currentRecent.filter((id) => id !== game.id)].slice(0, 6));
  };

  if (!recommendedGames.length) return null;

  return <section className='surface-shell rounded-3xl p-4 md:p-6' onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={() => setIsPaused(false)}>
    <div className='mb-4 flex items-center justify-between gap-3'>
      <div><p className='font-hud text-[10px] uppercase tracking-[0.2em] text-zinc-400'>Recommended</p><h3 className='font-brand mt-1 text-2xl font-black md:text-3xl'>เกมแนะนำ</h3></div>
      <div className='hidden gap-2 sm:flex'>
        <button type='button' aria-label='ก่อนหน้า' onClick={goPrev} disabled={!canSlide} className='surface-control focus-frame rounded-xl px-3 py-2 text-sm transition-all duration-200 hover:border-white/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40'>ก่อนหน้า</button>
        <button type='button' aria-label='ถัดไป' onClick={goNext} disabled={!canSlide} className='surface-control focus-frame rounded-xl px-3 py-2 text-sm transition-all duration-200 hover:border-white/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40'>ถัดไป</button>
      </div>
    </div>

    <article key={currentGame.id} className={`surface-card grid gap-5 overflow-hidden rounded-2xl p-4 md:grid-cols-5 md:p-6 ${reducedMotion ? 'transition-opacity duration-300' : 'animate-fade-slide-in'}`}>
      <div className='md:col-span-3'>
        <h4 className='font-brand mt-3 text-2xl font-black md:text-4xl'>{currentGame.title}</h4>
        <p className='mt-1 text-zinc-400'>{currentGame.thaiTitle || '-'}</p>
        <p className='mt-3 text-sm leading-relaxed text-zinc-300'>{currentGame.description}</p>
        <div className='mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3'>
          <Link href={currentGame.url} onClick={() => handlePlay(currentGame)} className='btn-primary-mono rounded-xl px-4 py-2 text-center'>เล่นเลย</Link>
          <button type='button' onClick={() => { playClickSound?.(); onOpenDetail?.(currentGame); }} className='surface-control focus-frame rounded-xl px-4 py-2'>รายละเอียด</button>
          {onToggleFavorite ? <button type='button' onClick={() => { playClickSound?.(); onToggleFavorite(currentGame.id); }} className='surface-control focus-frame rounded-xl px-4 py-2'>{isFavorite(currentGame.id) ? '♥ โปรด' : '♡ โปรด'}</button> : null}
        </div>
      </div>
      <div className='md:col-span-2'>
        <div className={`surface-panel border-frame-strong group flex min-h-52 items-center justify-center rounded-2xl text-7xl text-white bg-black/35 transition-transform duration-500 ${!reducedMotion ? 'animate-slider-icon-pop' : ''} ${direction > 0 || reducedMotion ? 'translate-x-0' : '-translate-x-0'} scale-105`}>
          <span className='transition-transform duration-500 group-hover:scale-110'>{currentGame.icon || '◈'}</span>
        </div>
      </div>
    </article>

    <div className='mt-4 flex items-center justify-between sm:justify-center'>
      <button type='button' aria-label='ก่อนหน้า' onClick={goPrev} disabled={!canSlide} className='surface-control focus-frame sm:hidden rounded-xl px-3 py-2 text-sm disabled:opacity-40'>ก่อนหน้า</button>
      <div className='flex items-center gap-2'>
        {recommendedGames.map((game, index) => <button key={game.id} type='button' aria-label={`ไปยังสไลด์ที่ ${index + 1}`} onClick={() => goTo(index, index >= currentIndex ? 1 : -1)} className={`surface-control focus-frame rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 opacity-100' : 'w-2 opacity-40'} h-2`} />)}
      </div>
      <button type='button' aria-label='ถัดไป' onClick={goNext} disabled={!canSlide} className='surface-control focus-frame sm:hidden rounded-xl px-3 py-2 text-sm disabled:opacity-40'>ถัดไป</button>
    </div>
  </section>;
}
