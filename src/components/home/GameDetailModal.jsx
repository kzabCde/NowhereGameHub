import Link from 'next/link';

export default function GameDetailModal({game,onClose,onFav,isFavorite,onPlay,best}){
  if(!game)return null;

  return <div className='fixed inset-0 z-50 grid place-items-center bg-black/75 p-4'>
    <div className='metal-card w-full max-w-2xl p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>รายละเอียดเกม</p>
          <h3 className='font-brand text-2xl font-black'>{game.title}</h3>
          <p className='text-zinc-500 dark:text-zinc-400'>{game.thaiTitle}</p>
        </div>
        <button onClick={onClose} className='rounded-lg border border-zinc-300 px-3 py-1 dark:border-white/15'>ปิด</button>
      </div>

      <div className='mt-4 flex h-28 w-28 items-center justify-center rounded-2xl border border-zinc-400/45 bg-black/[0.035] text-6xl font-hud tracking-tight text-neutral-950 soft-metal-shine dark:border-white/10 dark:bg-white/[0.035] dark:text-neutral-50'>
        {game.icon}
      </div>

      <p className='font-thai my-4'>{game.longDescription}</p>
      <div className='font-hud grid grid-cols-2 gap-2 text-sm'>
        <p>หมวด: {game.category}</p>
        <p>ระดับ: {game.difficulty}</p>
        <p>สถานะ: {game.status}</p>
        <p>Best: {game.status==='coming-soon'?'-':best ?? 0}</p>
      </div>
      <div className='mt-3 border-t border-zinc-300/60 pt-3 dark:border-white/10'>
        <p className='text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400'>Tags</p>
        <p className='text-sm'>{game.tags.join(', ')}</p>
      </div>
      <div className='mt-4 flex gap-2'>
        <button onClick={()=>onFav(game.id)} className='rounded-xl border border-zinc-300 px-3 py-2 dark:border-white/15'>{isFavorite?'♥ เลิกโปรด':'♡ โปรด'}</button>
        {game.status==='available'&&<Link href={game.url} onClick={()=>onPlay(game.id)} className='rounded-xl bg-black px-3 py-2 text-white dark:bg-white dark:text-black'>เล่น</Link>}
      </div>
    </div>
  </div>;
}
