'use client';
import { useEffect, useState } from 'react'; import { db } from '@/lib/db';
export default function Page(){ const [count,setCount]=useState(0); useEffect(()=>{db.events.count().then(setCount)},[]); return <main className='p-6 max-w-4xl mx-auto'><h1 className='text-2xl font-semibold'>Developer Panel</h1><p className='text-slate-400 mt-2'>Local events logged: {count}</p></main>; }
