import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const symbols = ['🎮','🕹️','🎲','🎯','🧩','🏆','🚀','⭐'];
export function MemoryCard(){
  const [level,setLevel]=useState<'easy'|'medium'>('easy');
  const size = level==='easy'?6:12;
  const deck = useMemo(()=> [...symbols.slice(0,size/2),...symbols.slice(0,size/2)].sort(()=>Math.random()-0.5),[size]);
  const [open,setOpen]=useState<number[]>([]); const [matched,setMatched]=useState<number[]>([]); const [moves,setMoves]=useState(0); const [secs,setSecs]=useState(0);
  const addLeaderboard=useAppStore(s=>s.addLeaderboard);
  useEffect(()=>{const t=setInterval(()=>setSecs(s=>s+1),1000); return()=>clearInterval(t);},[]);
  useEffect(()=>{if(open.length===2){setMoves(m=>m+1); if(deck[open[0]]===deck[open[1]]) setMatched(m=>[...m,...open]); setTimeout(()=>setOpen([]),500);} },[open,deck]);
  useEffect(()=>{ if(matched.length===size){ addLeaderboard({game:'memory-card',playerName:'Local',scoreLabel:`${secs}s / ${moves} moves`,meta:{secs,moves,level}}); }},[matched,size,addLeaderboard,secs,moves,level]);
  return <div><div className='flex gap-2 mb-2'><button className='btn' onClick={()=>setLevel('easy')}>Easy</button><button className='btn' onClick={()=>setLevel('medium')}>Medium</button></div><p>Time: {secs}s | Moves: {moves}</p><div className='grid grid-cols-4 gap-2 max-w-md'>{deck.map((v,i)=>{const show=open.includes(i)||matched.includes(i); return <button key={i} onClick={()=>!show&&open.length<2&&setOpen(o=>[...o,i])} className='h-16 rounded-xl bg-pink-100 dark:bg-slate-800 text-2xl'>{show?v:'?'}</button>;})}</div></div>
}
