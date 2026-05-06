import { useEffect, useMemo, useState } from 'react';
import type { GameComponentProps } from '../../types/game';
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export default function TicTacToe({ gameId, playerName, onGameEnd }: GameComponentProps){
  const [b,setB]=useState<(null|'X'|'O')[]>(Array(9).fill(null)); const [t,setT]=useState<'X'|'O'>('X'); const [done,setDone]=useState(false);
  const w=useMemo(()=>wins.find(([a,b1,c])=>b[a]&&b[a]===b[b1]&&b[a]===b[c])?.map(i=>b[i])[0],[b]); const draw=!w&&b.every(Boolean);
  useEffect(()=>{ if((w||draw)&&!done){ setDone(true); onGameEnd({score:w?1:0,summary:w?`${playerName} (${w}) won ${gameId}`:`${playerName} drew ${gameId}`,metadata:{winner:w??'draw'}});} },[w,draw,done,onGameEnd,playerName,gameId]);
  const play=(i:number)=>{if(b[i]||w||draw)return; const n=[...b]; n[i]=t; setB(n); setT(t==='X'?'O':'X');};
  return <div><p className='mb-2'>Turn: {t}</p><div className='grid grid-cols-3 gap-2 max-w-xs'>{b.map((c,i)=><button key={i} onClick={()=>play(i)} className='tile'>{c}</button>)}</div><p className='mt-2 text-sm'>{w?`Winner: ${w}`:draw?'Draw':''}</p><button className='btn mt-3' onClick={()=>{setB(Array(9).fill(null));setT('X');setDone(false)}}>Reset</button></div>
}
