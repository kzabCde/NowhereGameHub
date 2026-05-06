import { Play } from 'lucide-react';
import type { GameDefinition } from '../types/game';

export function GameCard({ game, onPlay }: { game: GameDefinition; onPlay: (id: string) => void }) {
  return <div className='card'><div className={`h-24 rounded-xl bg-gradient-to-br ${game.accent} mb-3`} /><h3 className='text-lg font-semibold'>{game.name}</h3><p className='text-sm opacity-70 mb-3'>{game.description}</p><button className='btn' onClick={()=>onPlay(game.id)}><Play size={16}/>Play</button></div>;
}
