import Link from 'next/link';

export default function GameCard({game,best,isFavorite,onFav,onDetail,onPlay}){
  const available=game.status==='available';

  return <div className='group surface-card p-4'>
    <div className='flex items-start justify-between'>
      <div className='surface-panel border-frame-strong flex h-16 w-16 items-center justify-center text-3xl font-hud tracking-tight text-black dark:text-white bg-white/95 dark:bg-black/35 transition-all duration-300 group-hover:scale-110'>
        {game.icon}
      </div>
      <span className={`rounded-full px-2 py-1 font-hud text-[10px] uppercase tracking-[0.2em] ${available?'surface-control-active':'surface-panel text-secondary'}`}>{available?'Available':'Coming Soon'}</span>
    </div>
    <h3 className='font-brand mt-3 font-bold text-primary'>{game.title}</h3>
    <p className='text-sm text-muted'>{game.thaiTitle}</p>
    <p className='my-2 text-sm text-secondary'>{game.description}</p>
    <p className='font-hud text-xs text-muted'>Best: {available?best ?? 0:'-'}</p>
    <div className='mt-3 flex flex-wrap gap-2 text-sm'>
      <button className='surface-control focus-frame px-2 py-1' onClick={()=>onFav(game.id)}>{isFavorite?'♥ โปรด':'♡ โปรด'}</button>
      <button className='surface-control focus-frame px-2 py-1' onClick={()=>onDetail(game)}>รายละเอียด</button>
      {available?<Link className='btn-primary-mono px-2 py-1' href={game.url} onClick={()=>onPlay(game.id)}>เล่น</Link>:<button disabled className='surface-control px-2 py-1'>Coming Soon</button>}
    </div>
  </div>;
}
