import { ROWS, COLS, PLAYER, AI } from '@/lib/connect-four/constants';

export default function ConnectFourBoard({ board, onColClick, winning, isLocked }) {
  return <div className='grid gap-1 bg-[#0b0b0b] p-2 rounded-2xl shadow-lg shadow-black/50'>
    {Array.from({ length: ROWS }).map((_, r) => <div key={r} className='grid grid-cols-7 gap-1'>
      {Array.from({ length: COLS }).map((__, c) => {
        const p = board[r][c];
        const win = winning.some((x) => x.row === r && x.col === c);
        return <button key={c} disabled={isLocked} onClick={() => onColClick(c)} className={`h-10 w-10 rounded-full transition-all duration-200 ${p === PLAYER ? 'bg-white animate-drop' : p === AI ? 'bg-zinc-900 border border-white/70 animate-drop' : 'bg-black/70 hover:bg-black/50'} ${win ? 'ring-2 ring-white/70 win-pulse' : ''}`} />;
      })}
    </div>)}
  </div>;
}
