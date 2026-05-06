import { useEffect, useState } from 'react';
import type { GameComponentProps } from '../../types/game';
export default function ReactionTimer({ gameId, playerName, onGameEnd }: GameComponentProps){
  const [status,setStatus]=useState<'idle'|'wait'|'go'>('idle'); const [start,setStart]=useState(0);
  useEffect(()=>{ if(status==='wait'){ const t=setTimeout(()=>{setStatus('go'); setStart(performance.now())}, 1200+Math.random()*2200); return()=>clearTimeout(t)}},[status]);
  const click=()=>{ if(status==='idle') setStatus('wait'); else if(status==='go'){ const ms=Math.round(performance.now()-start); onGameEnd({score:Math.max(1,1000-ms),summary:`${playerName} reacted in ${ms}ms on ${gameId}`,metadata:{ms}}); setStatus('idle'); } else setStatus('idle'); };
  return <button className={`w-full h-64 rounded-2xl text-xl font-bold ${status==='go'?'bg-green-500':'bg-orange-500'} text-white`} onClick={click}>{status==='idle'?'Tap to Start':status==='wait'?'Wait for green...':'TAP NOW!'}</button>
}
