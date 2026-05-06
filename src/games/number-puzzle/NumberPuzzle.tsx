import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const makeGrid=(n:number)=>[...Array(n*n).keys()].map(i=>i+1).map(v=>v===n*n?0:v);
export function NumberPuzzle(){
  const [n,setN]=useState(3); const [tiles,setTiles]=useState<number[]>(makeGrid(3)); const [moves,setMoves]=useState(0); const [secs,setSecs]=useState(0);
  const addLeaderboard=useAppStore(s=>s.addLeaderboard);
  useEffect(()=>{const t=setInterval(()=>setSecs(s=>s+1),1000); return()=>clearInterval(t);},[]);
  const solved = useMemo(()=>tiles.every((v,i)=>v===makeGrid(n)[i]),[tiles,n]);
  useEffect(()=>{ if(solved&&moves>0) addLeaderboard({game:'number-puzzle',playerName:'Local',scoreLabel:`${secs}s/${moves} moves`,meta:{size:n}});},[solved,moves,secs,n,addLeaderboard]);
  const shuffle=()=>setTiles([...tiles].sort(()=>Math.random()-0.5));
  const move=(idx:number)=>{ const e=tiles.indexOf(0); const r=Math.floor(idx/n), c=idx%n, er=Math.floor(e/n), ec=e%n; if(Math.abs(r-er)+Math.abs(c-ec)!==1) return; const t=[...tiles]; [t[idx],t[e]]=[t[e],t[idx]]; setTiles(t); setMoves(m=>m+1);};
  return <div><div className='flex gap-2 mb-2'><button className='btn' onClick={()=>{setN(3);setTiles(makeGrid(3));}}>3x3</button><button className='btn' onClick={()=>{setN(4);setTiles(makeGrid(4));}}>4x4</button><button className='btn' onClick={shuffle}>Shuffle</button></div><p>Time {secs}s | Moves {moves}</p><div className='grid gap-2' style={{gridTemplateColumns:`repeat(${n}, minmax(0,1fr))`, maxWidth: n===3?260:340}}>{tiles.map((v,i)=><button key={i} onClick={()=>move(i)} className='h-16 rounded-xl bg-emerald-100 dark:bg-slate-800 font-bold'>{v||''}</button>)}</div><p>{solved?'Solved!':''}</p></div>
}
