import Link from 'next/link';
export default function RandomGameModal({ game, onClose, onAgain, onPlay }) {
  if (game === undefined) return null;

  const canPlay = Boolean(game?.id && game?.url);

  return <div className='fixed inset-0 z-50 grid place-items-center bg-black/75 p-4' role='dialog' aria-modal='true' aria-label='สุ่มเกม'>
    <div className='surface-card w-full max-w-md p-6'>
      <h3 className='text-xl font-bold text-primary'>สุ่มเกม</h3>
      {!game ? <p className='mt-2 text-muted'>ยังไม่มีเกมที่พร้อมให้สุ่ม</p> : <>
        <p className='mt-2 text-secondary'>{game.icon} {game.title}</p>
        {canPlay ? <Link href={game.url} onClick={() => onPlay?.(game.id)} className='btn-primary-mono mt-3 inline-block px-3 py-2'>เล่นเลย</Link> : null}
      </>}
      <div className='mt-4 flex gap-2'>
        <button type='button' onClick={() => onAgain?.()} className='surface-control focus-frame px-3 py-2'>สุ่มอีกครั้ง</button>
        <button type='button' onClick={() => onClose?.()} className='surface-control focus-frame px-3 py-2'>ปิด</button>
      </div>
    </div>
  </div>;
}
