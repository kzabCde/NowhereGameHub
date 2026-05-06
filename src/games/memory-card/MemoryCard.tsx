import { useEffect, useMemo, useState } from 'react';
import type { GameComponentProps } from '../../types/game';
const s=['🍉','🍒','🍋','🍇','🍊','🥝','🍓','🍌'];
export default function MemoryCard({ gameId, playerName, onGameEnd }: GameComponentProps){
const cards=useMemo(()=>[...s.slice(0,6),...s.slice(0,6)].sort(()=>Math.random()-0.5),[]); const [o,setO]=useState<number[]>([]); const [m,setM]=useState<number[]>([]); const [moves,setMoves]=useState(0); const [sec,setSec]=useState(0);
useEffect(()=>{const t=setInterval(()=>setSec(v=>v+1),1000); return()=>clearInterval(t)},[]);
useEffect(()=>{if(o.length===2){setMoves(v=>v+1); if(cards[o[0]]===cards[o[1]]) setM(v=>[...v,...o]); setTimeout(()=>setO([]),450)}},[o,cards]);
useEffect(()=>{if(m.length===cards.length) onGameEnd({score:Math.max(1,1000-(moves*10+sec)),summary:`${playerName} solved ${gameId} in ${sec}s`})},[m,cards.length,moves,sec,onGameEnd,gameId,playerName]);
return <div><p>Time {sec}s · Moves {moves}</p><div className='grid grid-cols-4 gap-2 mt-2'>{cards.map((c,i)=>{const show=o.includes(i)||m.includes(i); return <button key={i} className='tile h-16' onClick={()=>!show&&o.length<2&&setO(v=>[...v,i])}>{show?c:'?'}</button>})}</div></div>
}
