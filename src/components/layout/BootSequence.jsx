'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const BOOT_KEY = 'nowhereGameHubBootSeen';

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [lineCount, setLineCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timersRef = useRef([]);

  const lines = useMemo(
    () => ['NOWHERE SYSTEM ONLINE', 'INITIALIZING LOCAL GAME MODULES...', 'READY'],
    [],
  );

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const pushTimer = (cb, ms) => {
      const id = window.setTimeout(cb, ms);
      timersRef.current.push(id);
    };

    let shouldShow = true;
    try {
      shouldShow = window.sessionStorage.getItem(BOOT_KEY) !== 'true';
    } catch {
      shouldShow = true;
    }

    if (!shouldShow) return undefined;

    setVisible(true);
    setPhase('in');

    if (reducedMotion) {
      pushTimer(() => setLineCount(3), 40);
      pushTimer(() => setPhase('out'), 540);
      pushTimer(() => {
        try { window.sessionStorage.setItem(BOOT_KEY, 'true'); } catch {}
        setVisible(false);
      }, 820);
    } else {
      pushTimer(() => setLineCount(1), 120);
      pushTimer(() => setLineCount(2), 360);
      pushTimer(() => setLineCount(3), 620);
      pushTimer(() => setPhase('out'), 1020);
      pushTimer(() => {
        try { window.sessionStorage.setItem(BOOT_KEY, 'true'); } catch {}
        setVisible(false);
      }, 1260);
    }

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] app-bg flex items-center justify-center p-6 ${phase === 'out' ? 'animate-boot-fade-out' : 'animate-boot-fade-in'}`}>
      <div className='surface-card border-frame-strong relative w-full max-w-xl overflow-hidden rounded-2xl border p-5 shadow-2xl'>
        <div className='boot-scan-line' aria-hidden='true' />
        <p className='font-hud text-[10px] tracking-[0.22em] text-zinc-400'>NOWHERE BOOT PROTOCOL</p>

        <div className='mt-4 space-y-2 font-hud text-sm'>
          {lines.map((line, index) => (
            <p key={line} className={index < lineCount ? 'animate-boot-line opacity-100' : 'opacity-0'}>{line}</p>
          ))}
          <span className='inline-block animate-terminal-blink font-hud'>▍</span>
        </div>

        <p className='mt-5 text-[10px] tracking-[0.2em] text-zinc-400'>LOCAL-FIRST SYSTEM // NO BACKEND REQUIRED</p>
      </div>
    </div>
  );
}
