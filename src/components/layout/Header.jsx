'use client';
import { getStringStorage, setStringStorage } from '@/lib/storage';
import { playClickSound } from '@/lib/sound';
import { useEffect, useState } from 'react';
export default function Header(){const [theme,setTheme]=useState('dark'); const [sound,setSound]=useState('on');
useEffect(()=>{const t=getStringStorage('nowhereGameHubTheme','dark'); const s=getStringStorage('nowhereGameHubSound','on'); setTheme(t); setSound(s); document.documentElement.classList.toggle('dark',t==='dark');},[]);
const toggleTheme=()=>{playClickSound(); const n=theme==='dark'?'light':'dark'; setTheme(n); setStringStorage('nowhereGameHubTheme',n); document.documentElement.classList.toggle('dark',n==='dark');};
const toggleSound=()=>{const n=sound==='on'?'off':'on'; setSound(n); setStringStorage('nowhereGameHubSound',n); playClickSound();};
return <header className='glass p-4 flex flex-wrap justify-between gap-3 items-center'><div><h1 className='text-2xl font-bold'>NowhereGameHub</h1><p className='text-slate-300 text-sm'>รวมเกมเล็ก เล่นง่าย สนุกได้ทุกที่</p></div><div className='flex gap-2'><button onClick={toggleTheme} className='glass px-3 py-2'>{theme==='dark'?'🌙 Dark':'☀️ Light'}</button><button onClick={toggleSound} className='glass px-3 py-2'>{sound==='on'?'🔊 Sound':'🔇 Muted'}</button></div></header>;}
