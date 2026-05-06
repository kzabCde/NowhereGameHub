import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { GameCard } from '../components/GameCard';
import { Leaderboard } from '../components/Leaderboard';
import { SettingsPanel } from '../components/SettingsPanel';
import { gameRegistry } from '../games/registry';
import { useGameStore } from '../store/useGameStore';

export default function App(){
  const {page,selectedGameId,setSelectedGame,playerName,history,logResult}=useGameStore();
  const selected=gameRegistry.find((g)=>g.id===selectedGameId); const Game=selected?.component;
  return <div className={useGameStore.getState().theme==='dark'?'dark':''}><Layout><motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
    {page==='home'&&<div className='grid md:grid-cols-3 gap-3'><div className='card md:col-span-2'><h2 className='text-2xl font-bold'>Welcome, {playerName} 👋</h2><p>Play locally. Everything is saved in your browser.</p></div><div className='card'><h3 className='font-semibold'>Recent Activity</h3>{history.slice(0,4).map(h=><p key={h.id} className='text-sm'>{h.summary}</p>)}</div></div>}
    {page==='games'&&<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>{gameRegistry.map((g)=><GameCard key={g.id} game={g} onPlay={setSelectedGame}/>)}</div>}
    {page==='play'&&Game&&<div className='card'><button className='btn mb-3' onClick={()=>setSelectedGame(null)}>Back</button><h2 className='text-xl font-semibold mb-3'>{selected?.name}</h2><Game gameId={selected.id} playerName={playerName} onGameEnd={(r)=>logResult(selected.id, playerName, r)} /></div>}
    {page==='leaderboard'&&<Leaderboard/>}
    {page==='settings'&&<SettingsPanel/>}
  </motion.div></Layout></div>
}
