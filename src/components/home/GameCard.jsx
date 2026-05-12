import Link from 'next/link';

export default function GameCard({game,best,isFavorite,onFav,onDetail,onPlay}){
  const available=game.status==='available';

  return <div className='group metal-card pearl-border soft-metal-shine p-4 transition hover:-translate-y-1'>
    <div className='flex items-start justify-between'>
      <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-400/45 bg-black/[0.035] text-3xl font-hud tracking-tight text-neutral-950 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-zinc-500/70 dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-100 dark:group-hover:border-white/30'>
        {game.icon}
      </div>
      <span className={`rounded-full px-2 py-1 font-hud text-[10px] uppercase tracking-[0.2em] ${available?'bg-white text-black dark:bg-white dark:text-black':'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'}`}>{available?'Available':'Coming Soon'}</span>
    </div>
    <h3 className='font-brand mt-3 font-bold'>{game.title}</h3>
    <p className='text-sm text-zinc-500 dark:text-zinc-400'>{game.thaiTitle}</p>
    <p className='my-2 text-sm'>{game.description}</p>
    <p className='font-hud text-xs text-zinc-500 dark:text-zinc-400'>Best: {available?best ?? 0:'-'}</p>
    <div className='mt-3 flex flex-wrap gap-2 text-sm'>
      <button className='rounded-xl border border-zinc-300 px-2 py-1 dark:border-white/15' onClick={()=>onFav(game.id)}>{isFavorite?'♥ โปรด':'♡ โปรด'}</button>
      <button className='rounded-xl border border-zinc-300 px-2 py-1 dark:border-white/15' onClick={()=>onDetail(game)}>รายละเอียด</button>
      {available?<Link className='rounded-xl bg-black px-2 py-1 text-white dark:bg-white dark:text-black' href={game.url} onClick={()=>onPlay(game.id)}>เล่น</Link>:<button disabled className='rounded-xl bg-zinc-300 px-2 py-1 text-zinc-600 dark:bg-zinc-800'>Coming Soon</button>}
    </div>
  </div>;
}
