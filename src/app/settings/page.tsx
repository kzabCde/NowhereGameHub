'use client';
import { db } from '@/lib/db';
export default function Page(){
  const reset=async()=>{await db.delete(); location.reload();};
  const exp=async()=>{const payload={schemaVersion:1,players:await db.players.toArray(),sessions:await db.sessions.toArray(),saveStates:await db.saveStates.toArray(),achievements:await db.achievements.toArray(),events:await db.events.toArray()}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='nowhere-arcade-backup.json'; a.click();};
  return <main className='p-6 max-w-4xl mx-auto space-y-3'><h1 className='text-2xl font-semibold'>Settings</h1><button onClick={exp} className='px-4 py-2 rounded bg-slate-800'>Export backup JSON</button><button onClick={reset} className='px-4 py-2 rounded bg-red-900 ml-2'>Reset local database</button></main>;
}
