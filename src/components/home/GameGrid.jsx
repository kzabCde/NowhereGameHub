import GameCard from './GameCard'; import EmptyState from './EmptyState';
export default function GameGrid({games,...props}){if(!games.length)return <EmptyState text='ไม่พบเกมที่ตรงกับการค้นหา'/>; return <div id='games' className='grid md:grid-cols-2 gap-4'>{games.map(g=><GameCard key={g.id} game={g} {...props}/> )}</div>}
