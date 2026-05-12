import Link from 'next/link';

export default function GameDetailModal({game,onClose,onFav,isFavorite,onPlay,best}){
  if(!game)return null;

  return <div className='fixed inset-0 z-50 grid place-items-center bg-black/75 p-4'>
    <div className='surface-card w-full max-w-2xl p-6'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-xs uppercase tracking-[0.2em] text-muted'>รายละเอียดเกม</p>
          <h3 className='font-brand text-2xl font-black text-primary'>{game.title}</h3>
          <p className='text-muted'>{game.thaiTitle}</p>
        </div>
        <button onClick={onClose} className='surface-control focus-frame px-3 py-1'>ปิด</button>
      </div>

      <div className='surface-panel mt-4 flex h-28 w-28 items-center justify-center text-6xl font-hud tracking-tight text-primary'>{game.icon}</div>
      <p className='font-thai my-4 text-secondary'>{game.longDescription}</p>
      <div className='font-hud grid grid-cols-2 gap-2 text-sm text-secondary'>
        <p>หมวด: {game.category}</p><p>ระดับ: {game.difficulty}</p><p>สถานะ: {game.status}</p><p>Best: {game.status==='coming-soon'?'-':best ?? 0}</p>
      </div>
      <div className='mt-3 pt-3'><div className='divider-frame mb-3'/><p className='text-xs uppercase tracking-[0.2em] text-muted'>Tags</p><p className='text-sm text-secondary'>{game.tags.join(', ')}</p></div>
      <div className='mt-4 flex gap-2'>
        <button onClick={()=>onFav(game.id)} className='surface-control focus-frame px-3 py-2'>{isFavorite?'♥ เลิกโปรด':'♡ โปรด'}</button>
        {game.status==='available'&&<Link href={game.url} onClick={()=>onPlay(game.id)} className='btn-primary-mono px-3 py-2'>เล่น</Link>}
      </div>
    </div>
  </div>;
}
