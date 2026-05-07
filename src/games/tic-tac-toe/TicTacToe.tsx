'use client';
import { useState } from 'react';
import { GameComponentProps } from '@/types/game';
const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export default function TicTacToe({ onGameEnd }: GameComponentProps) {
  const [b,setB]=useState<(null|'X'|'O')[]>(Array(9).fill(null));
  const [x,setX]=useState(true);
  const w = wins.find(([a,b1,c])=>b[a]&&b[a]===b[b1]&&b[a]===b[c]);
  const ended = !!w || b.every(Boolean);
  return <div className='space-y-4'><div className='grid grid-cols-3 gap-2 max-w-xs'>{b.map((v,i)=><button key={i} className='aspect-square rounded bg-slate-800 text-2xl' onClick={()=>{if(v||ended)return; const n=[...b]; n[i]=x?'X':'O'; setB(n); setX(!x); const nw=wins.find(([a,b1,c])=>n[a]&&n[a]===n[b1]&&n[a]===n[c]); if(nw) onGameEnd({score:nw?100:0,won:true,details:`Winner ${n[nw[0]]}`}); else if(n.every(Boolean)) onGameEnd({score:50,details:'Draw'});}}>{v}</button>)}</div></div>
}
