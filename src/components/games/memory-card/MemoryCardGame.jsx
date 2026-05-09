'use client';
import { useEffect, useMemo, useState } from 'react';
import { getStorage, setStorage } from '@/lib/storage';
const shuffle=(a)=>[...a].sort(()=>Math.random()-0.5);
export default function MemoryCardGame(){const cards=useMemo(()=>shuffle(['A','B','C','D','E','F','A','B','C','D','E','F']).map((v,i)=>({id:i,v})),[]); const [open,setOpen]=useState([]); const [matched,setMatched]=useState([]); const [moves,setMoves]=useState(0); const [time,setTime]=useState(0);
useEffect(()=>{const t=setInterval(()=>setTime(s=>s+1),1000); return ()=>clearInterval(t);},[]);
useEffect(()=>{if(open.length===2){setMoves(m=>m+1); const [a,b]=open; if(cards[a].v===cards[b].v){setMatched(m=>[...m,a,b]); setOpen([]);} else setTimeout(()=>setOpen([]),600);}},[open,cards]);
useEffect(()=>{if(matched.length===cards.length){const best=getStorage('memoryCardBestScore',null); if(best===null||moves<best) setStorage('memoryCardBestScore',moves);}},[matched,cards.length,moves]);
const flip=(i)=>{if(open.includes(i)||matched.includes(i)||open.length===2) return; setOpen(o=>[...o,i]);};
return <div><p className='mb-2'>Moves: {moves} | Time: {time}s | Matched: {matched.length/2}/6</p><div className='grid grid-cols-4 gap-2 max-w-sm'>{cards.map((c,i)=>{const show=open.includes(i)||matched.includes(i); return <button key={c.id} onClick={()=>flip(i)} className='h-14 border rounded'>{show?c.v:'?'}</button>;})}</div></div>}
