'use client';
import { useMemo, useState } from 'react';
import { GameComponentProps } from '@/types/game';
export default function MemoryCard({ onGameEnd }: GameComponentProps){
 const deck = useMemo(()=>['A','A','B','B','C','C','D','D'].sort(()=>Math.random()-0.5),[]);
 const [open,setOpen]=useState<number[]>([]); const [matched,setMatched]=useState<number[]>([]); const [moves,setMoves]=useState(0);
 const flip=(i:number)=>{ if(open.includes(i)||matched.includes(i)||open.length===2) return; const n=[...open,i]; setOpen(n); if(n.length===2){ setMoves(m=>m+1); if(deck[n[0]]===deck[n[1]]){ const next=[...matched,...n]; setMatched(next); setOpen([]); if(next.length===deck.length){ onGameEnd({score:Math.max(0,200-moves*10),won:true,details:`${moves+1} moves`});}} else setTimeout(()=>setOpen([]),700);} };
 return <div className='grid grid-cols-4 gap-2'>{deck.map((v,i)=><button key={i} onClick={()=>flip(i)} className='aspect-square rounded bg-slate-800'>{open.includes(i)||matched.includes(i)?v:'?'}</button>)}</div>
}
