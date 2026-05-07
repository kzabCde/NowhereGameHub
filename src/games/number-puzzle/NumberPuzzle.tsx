'use client';
import { useState } from 'react';
import { GameComponentProps } from '@/types/game';
const target = 15;
export default function NumberPuzzle({ onGameEnd }: GameComponentProps){
 const [nums,setNums]=useState<number[]>([]);
 const pick=(n:number)=>{ if(nums.includes(n)||nums.length>=3) return; const next=[...nums,n]; setNums(next); if(next.length===3){ const sum=next.reduce((a,b)=>a+b,0); onGameEnd({score:sum===target?100:Math.max(0,70-Math.abs(target-sum)*10),won:sum===target,details:`Sum ${sum}`}); }};
 return <div className='space-y-3'><p>Pick 3 numbers to make {target}</p><div className='grid grid-cols-5 gap-2'>{Array.from({length:9},(_,i)=>i+1).map(n=><button key={n} onClick={()=>pick(n)} className='rounded bg-slate-800 p-3'>{n}</button>)}</div><p>Selected: {nums.join(', ')}</p></div>
}
