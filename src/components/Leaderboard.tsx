import { gameRegistry } from '../games/registry';
import { selectBestScores, useGameStore } from '../store/useGameStore';
export function Leaderboard(){ const history=useGameStore(s=>s.history); const best=selectBestScores(history); return <div className='space-y-2'>{gameRegistry.map(g=>{const b=best.get(g.id); return <div key={g.id} className='card'><b>{g.name}</b><div>{b?`${b.playerName} · ${b.score} · ${b.summary}`:'No score yet'}</div></div>})}</div> }
