'use client';
import { gameRegistry } from '@/games/registry';
import { ScoreEntry } from '@/types/game';

export default function Leaderboard({ scores }: { scores: ScoreEntry[] }) {
  const top = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);
  return <div className='rounded-2xl border border-slate-700 bg-slate-900 p-4'><h2 className='mb-3 text-lg font-semibold'>Local Leaderboard</h2><div className='space-y-2'>{top.map((s,i)=>{const g=gameRegistry.find(x=>x.id===s.gameId); return <div key={s.id} className='flex justify-between rounded bg-slate-800 p-2 text-sm'><span>{i+1}. {s.playerName} · {g?.name}</span><span>{s.score}</span></div>})}{top.length===0&&<p className='text-slate-400 text-sm'>No scores yet.</p>}</div></div>
}
