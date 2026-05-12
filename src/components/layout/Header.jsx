'use client';

import { getStringStorage, setStringStorage } from '@/lib/storage';
import { playClickSound } from '@/lib/sound';
import { useEffect, useState } from 'react';

export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [sound, setSound] = useState('on');

  useEffect(() => {
    const t = getStringStorage('nowhereGameHubTheme', 'dark');
    const s = getStringStorage('nowhereGameHubSound', 'on');
    setTheme(t);
    setSound(s);
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, []);

  const toggleTheme = () => {
    playClickSound();
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStringStorage('nowhereGameHubTheme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const toggleSound = () => {
    const next = sound === 'on' ? 'off' : 'on';
    setSound(next);
    setStringStorage('nowhereGameHubSound', next);
    playClickSound();
  };

  return <header className='surface-shell flex flex-wrap items-center justify-between gap-3 border-b p-4'><div><h1 className='font-brand text-2xl font-black tracking-tight'>NowhereGameHub</h1><p className='font-hud text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>LOCAL-FIRST GAME SYSTEM</p></div><div className='flex gap-2 text-sm'><button onClick={toggleSound} className='surface-control focus-frame rounded-full px-4 py-2'>{sound === 'on' ? 'เสียง: เปิด' : 'เสียง: ปิด'}</button><button onClick={toggleTheme} className='surface-control focus-frame rounded-full px-4 py-2'>{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</button></div></header>;
}
