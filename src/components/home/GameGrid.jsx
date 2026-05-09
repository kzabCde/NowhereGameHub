'use client';
import GameCard from './GameCard';
export default function GameGrid(props){const {games,...rest}=props; if(!games.length) return <p className='opacity-70'>No games match your filters.</p>; return <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>{games.map(g=><GameCard key={g.id} game={g} {...rest}/>)}</div>}
