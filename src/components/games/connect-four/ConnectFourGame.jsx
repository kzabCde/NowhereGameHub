'use client';
import { useState } from 'react';
import { emptyBoard, makeMove } from '@/lib/connect-four/board';
import { findWinner, isDraw } from '@/lib/connect-four/winner';
import { pickMove } from '@/lib/connect-four/ai';
import { getStorage, setStorage } from '@/lib/storage';
export default function ConnectFourGame(){const [b,setB]=useState(emptyBoard()); const [d,setD]=useState('Normal'); const [win,setWin]=useState([]); const [thinking,setThinking]=useState(false); const [msg,setMsg]=useState('');
const doMove=(col)=>{if(thinking||msg)return; const pm=makeMove(b,col,'P'); if(!pm)return; const w1=findWinner(pm.board); if(w1.winner){setB(pm.board);setWin(w1.cells);setMsg('You win'); setStorage('connectFourBestScore',getStorage('connectFourBestScore',0)+1); return;} if(isDraw(pm.board)){setB(pm.board);setMsg('Draw'); return;} setB(pm.board); setThinking(true); setTimeout(()=>{const mc=pickMove(pm.board,d); const mm=makeMove(pm.board,mc,'M'); if(!mm){setThinking(false);return;} const w2=findWinner(mm.board); setB(mm.board); if(w2.winner){setWin(w2.cells);setMsg('Machine wins');} else if(isDraw(mm.board)) setMsg('Draw'); setThinking(false);},450);};
return <div><div className='mb-3'>Difficulty: <select value={d} onChange={e=>setD(e.target.value)}><option>Easy</option><option>Normal</option><option>Hard</option><option>Expert</option></select></div><div className='space-y-1'>{b.map((row,r)=><div key={r} className='flex gap-1'>{row.map((v,c)=>{const hl=win.some(([rr,cc])=>rr===r&&cc===c); return <button key={c} onClick={()=>doMove(c)} className={`w-10 h-10 rounded-full border ${hl?'bg-emerald-400':v==='P'?'bg-red-500':v==='M'?'bg-yellow-400':'bg-slate-100'}`}/>})}</div>)}</div><p className='mt-2'>{thinking?'Machine thinking...':msg||'Your turn'}</p></div>}
