import { useEffect, useMemo, useState } from 'react';
import type { GameComponentProps } from '../../types/game';
const mk=()=>[1,2,3,4,5,6,7,8,0];
export default function NumberPuzzle({ gameId, playerName, onGameEnd }: GameComponentProps){
  const [t,setT]=useState<number[]>(mk().sort(()=>Math.random()-0.5)); const [moves,setMoves]=useState(0); const [sec,setSec]=useState(0); const [done,setDone]=useState(false);
  useEffect(()=>{const x=setInterval(()=>setSec(v=>v+1),1000); return()=>clearInterval(x)},[]);
  const doneNow=useMemo(()=>t.every((v,i)=>v===mk()[i]),[t]);
  useEffect(()=>{if(doneNow&&!done){setDone(true); onGameEnd({score:Math.max(1,800-(moves*5+sec)),summary:`${playerName} finished ${gameId}`,metadata:{moves,sec}})}},[doneNow,done,onGameEnd,moves,sec,playerName,gameId]);
  const move=(i:number)=>{const e=t.indexOf(0); if(![i-1,i+1,i-3,i+3].includes(e)) return; const n=[...t]; [n[i],n[e]]=[n[e],n[i]]; setT(n); setMoves(v=>v+1)};
  return <div><p>Time {sec}s · Moves {moves}</p><div className='grid grid-cols-3 gap-2 mt-2 max-w-xs'>{t.map((n,i)=><button key={i} className='tile h-16' onClick={()=>move(i)}>{n||''}</button>)}</div><p className='mt-2 text-sm'>{doneNow?'Completed!':''}</p><button className='btn mt-3' onClick={()=>{setT(mk().sort(()=>Math.random()-0.5));setMoves(0);setSec(0);setDone(false)}}>Shuffle</button></div>
}
