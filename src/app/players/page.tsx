'use client';
import { useEffect, useState } from 'react'; import { db, Player } from '@/lib/db';
export default function Page(){ const [rows,setRows]=useState<Player[]>([]); useEffect(()=>{db.players.toArray().then(setRows);},[]); return <main className='p-6 max-w-4xl mx-auto'><h1 className='text-2xl font-semibold'>Players</h1>{rows.length===0?<p className='text-slate-400 mt-3'>No local players yet.</p>:<div className='space-y-2 mt-4'>{rows.map(p=><div key={p.id} className='p-3 rounded bg-slate-900 border border-slate-700'>{p.name}</div>)}</div>}</main>; }
