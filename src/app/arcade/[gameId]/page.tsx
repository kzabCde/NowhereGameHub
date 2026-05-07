'use client';
import { useEffect, useMemo, useState } from 'react'; import Link from 'next/link';
import { getGameModule } from '@/games/registry'; import { GameRuntimeProvider, useGameRuntime } from '@/providers/game-runtime'; import { db } from '@/lib/db';
export default function GamePage({ params }: { params: { gameId: string } }) {
  const mod = useMemo(()=>getGameModule(params.gameId),[params.gameId]);
  const [player,setPlayer]=useState<{id:string;name:string}|null>(null);
  useEffect(()=>{(async()=>{let p=(await db.players.toArray())[0]; if(!p){p={id:crypto.randomUUID(),name:'Player 1',createdAt:new Date().toISOString(),lastActiveAt:new Date().toISOString()}; await db.players.add(p);} setPlayer({id:p.id,name:p.name});})();},[]);
  if(!mod) return <main className='p-6'>Game not found.</main>; if(!player) return <main className='p-6'>Loading player profile...</main>;
  const RuntimeGame=()=>{const runtime=useGameRuntime(mod.manifest.id); const C=mod.component; return <C runtime={runtime} manifest={mod.manifest}/>};
  return <main className='p-6 max-w-4xl mx-auto space-y-4'><Link href='/arcade' className='text-sm text-slate-300'>← Back</Link><GameRuntimeProvider playerId={player.id} playerName={player.name}><RuntimeGame/></GameRuntimeProvider></main>;
}
