'use client';
import { useEffect, useState } from 'react';
import { db, GameSession } from '@/lib/db';
export default function Page(){ const [rows,setRows]=useState<GameSession[]>([]); useEffect(()=>{db.sessions.orderBy('startedAt').reverse().limit(25).toArray().then(setRows);},[]); return <main className='p-6 max-w-4xl mx-auto'><h1 className='text-2xl font-semibold'>Leaderboard</h1><div className='space-y-2 mt-4'>{rows.map(r=><div key={r.id} className='p-3 rounded bg-slate-900 border border-slate-700 flex justify-between'><span>{r.gameId}</span><span>{r.result?.score ?? '-'}</span></div>)}{rows.length===0&&<p className='text-slate-400'>No sessions yet.</p>}</div></main>; }
