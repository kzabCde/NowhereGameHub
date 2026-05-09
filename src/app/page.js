'use client';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import GameGrid from '@/components/home/GameGrid';
import RecentPlayed from '@/components/home/RecentPlayed';
import FavoriteGames from '@/components/home/FavoriteGames';
import GameDetailModal from '@/components/home/GameDetailModal';
import { games } from '@/lib/games';
import { getStorage, setStorage } from '@/lib/storage';
const cats=['All','Strategy','Classic','Puzzle','Arcade'];
export default function Page(){const [q,setQ]=useState('');const [cat,setCat]=useState('All');const [f,setF]=useState([]);const [r,setR]=useState([]);const [theme,setTheme]=useState('dark');const [sound,setSound]=useState(true);const [active,setActive]=useState(null);
useEffect(()=>{setF(getStorage('gameHubFavorites',[]));setR(getStorage('gameHubRecentPlayed',[]));setTheme(getStorage('gameHubTheme','dark'));setSound(getStorage('gameHubSound',true));},[]);
useEffect(()=>{document.documentElement.classList.toggle('dark',theme==='dark');setStorage('gameHubTheme',theme);},[theme]); useEffect(()=>setStorage('gameHubSound',sound),[sound]);
const list=useMemo(()=>games.filter(g=>(cat==='All'||g.category===cat)&&(`${g.title} ${g.description} ${g.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase()))),[q,cat]);
const toggleFav=(id)=>{const n=f.includes(id)?f.filter(x=>x!==id):[...f,id];setF(n);setStorage('gameHubFavorites',n);};
const open=(g)=>{setActive(g);const n=[g,...r.filter(x=>x.id!==g.id)].slice(0,6);setR(n);setStorage('gameHubRecentPlayed',n);};
return <main className='max-w-6xl mx-auto p-4 md:p-8'><Header theme={theme} sound={sound} toggleTheme={()=>setTheme(t=>t==='dark'?'light':'dark')} toggleSound={()=>setSound(s=>!s)}/><HeroSection/><div className='flex gap-2 flex-wrap mb-4'><input placeholder='Search games...' value={q} onChange={e=>setQ(e.target.value)} className='border rounded px-3 py-2 flex-1 min-w-56'/>{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-2 rounded border ${cat===c?'bg-indigo-600 text-white':''}`}>{c}</button>)}</div><GameGrid games={list} onOpen={open} onFav={toggleFav} best={(g)=>getStorage(g.bestScoreKey,null)} isFav={(id)=>f.includes(id)}/><div className='grid md:grid-cols-2 gap-4 mt-6'><RecentPlayed recent={r}/><FavoriteGames favorites={games.filter(g=>f.includes(g.id))}/></div><GameDetailModal game={active} onClose={()=>setActive(null)}/></main>}
