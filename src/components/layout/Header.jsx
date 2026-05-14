'use client';

import NowhereGameHubLogo from '@/components/brand/NowhereGameHubLogo';
import { getStringStorage, setStringStorage } from '@/lib/storage';
import { playClickSound } from '@/lib/sound';
import { useEffect, useState } from 'react';

export default function Header() {
  const [sound, setSound] = useState('on');

  useEffect(() => {
    setSound(getStringStorage('nowhereGameHubSound', 'on'));
  }, []);

  const toggleSound = () => {
    const next = sound === 'on' ? 'off' : 'on';
    setSound(next);
    setStringStorage('nowhereGameHubSound', next);
    playClickSound();
  };

  return <header className='surface-shell flex flex-wrap items-center justify-between gap-3 border-b p-4'><div className='min-w-0'><NowhereGameHubLogo compact href='/' /><p className='font-hud text-[10px] uppercase tracking-[0.2em] text-zinc-400'>LOCAL-FIRST GAME SYSTEM</p></div><div className='flex gap-2 text-sm'><button onClick={toggleSound} className='surface-control focus-frame rounded-full px-4 py-2'>{sound === 'on' ? 'เสียง: เปิด' : 'เสียง: ปิด'}</button></div></header>;
}
