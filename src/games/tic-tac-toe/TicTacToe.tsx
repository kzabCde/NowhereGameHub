import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

type Cell = 'X' | 'O' | null;
const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<'X'|'O'>('X');
  const [bot, setBot] = useState(false);
  const addLeaderboard = useAppStore((s)=>s.addLeaderboard); const addHistory = useAppStore((s)=>s.addHistory);
  const winner = lines.find(([a,b,c])=> board[a] && board[a]===board[b] && board[a]===board[c])?.map(i=>board[i])[0] as Cell;
  const draw = !winner && board.every(Boolean);
  const play = (i:number)=>{ if(board[i]||winner) return; const next=[...board]; next[i]=turn; setBoard(next); const nextTurn=turn==='X'?'O':'X'; setTurn(nextTurn);
    if(bot && nextTurn==='O'){ const empty=next.map((v,idx)=>v? -1:idx).filter(v=>v>=0); if(empty.length){ setTimeout(()=>play(empty[Math.floor(Math.random()*empty.length)]),250);} }
  };
  const done = winner || draw;
  if(done){ const result = winner?`${winner} wins`:'Draw'; addHistory({game:'tic-tac-toe', result}); addLeaderboard({game:'tic-tac-toe', playerName:winner||'Both', scoreLabel:result}); }
  return <div className='space-y-3'><div className='flex gap-2'><button className='btn' onClick={()=>setBot(!bot)}>Mode: {bot?'Vs Bot':'PvP'}</button><button className='btn' onClick={()=>{setBoard(Array(9).fill(null));setTurn('X')}}>Reset</button></div><p>Turn: {turn}</p><div className='grid grid-cols-3 gap-2 max-w-xs'>{board.map((c,i)=><button key={i} onClick={()=>play(i)} className='h-20 rounded-xl bg-indigo-100 dark:bg-slate-800 text-2xl font-bold'>{c}</button>)}</div><p>{winner?`${winner} wins!`:draw?'Draw':''}</p></div>;
}
