'use client';
import { getStringStorage, setStringStorage } from '@/lib/storage';
import { playClickSound } from '@/lib/sound';
import { useEffect, useState } from 'react';
export default function Header(){const [theme,setTheme]=useState('dark');const [sound,setSound]=useState('on');
useEffect(()=>{const t=getStringStorage('nowhereGameHubTheme','dark');const s=getStringStorage('nowhereGameHubSound','on');setTheme(t);setSound(s);document.documentElement.classList.toggle('dark',t==='dark');},[]);
const toggleTheme=()=>{playClickSound();const n=theme==='dark'?'light':'dark';setTheme(n);setStringStorage('nowhereGameHubTheme',n);document.documentElement.classList.toggle('dark',n==='dark');};
const toggleSound=()=>{const n=sound==='on'?'off':'on';setSound(n);setStringStorage('nowhereGameHubSound',n);playClickSound();};
return <header className='metal-card flex flex-wrap items-center justify-between gap-3 border-b p-4'><div><h1 className='text-2xl font-black tracking-tight'>NowhereGameHub</h1><p className='text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>LOCAL-FIRST GAME SYSTEM</p></div><div className='flex gap-2 text-sm'><button onClick={toggleSound} className='pearl-border rounded-full border border-zinc-300/70 bg-white/60 px-4 py-2 dark:border-white/15 dark:bg-white/[0.05]'>{sound==='on'?'เสียง: เปิด':'เสียง: ปิด'}</button><button onClick={toggleTheme} className='pearl-border rounded-full border border-zinc-300/70 bg-white/60 px-4 py-2 dark:border-white/15 dark:bg-white/[0.05]'>{theme==='dark'?'โหมด: มืด':'โหมด: สว่าง'}</button></div></header>;}
