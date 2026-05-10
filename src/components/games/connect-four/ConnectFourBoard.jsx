import { ROWS, COLS, PLAYER, AI } from '@/lib/connect-four/constants';

export default function ConnectFourBoard({ board, onColClick, winning, isLocked }) {
  return <div className='grid gap-1 bg-blue-950 p-2 rounded-2xl shadow-lg shadow-blue-900/40'>
    {Array.from({ length: ROWS }).map((_, r) => <div key={r} className='grid grid-cols-7 gap-1'>
      {Array.from({ length: COLS }).map((__, c) => {
        const p = board[r][c];
        const win = winning.some((x) => x.row === r && x.col === c);
        return <button key={c} disabled={isLocked} onClick={() => onColClick(c)} className={`h-10 w-10 rounded-full transition-all duration-200 ${p === PLAYER ? 'bg-red-500 animate-drop' : p === AI ? 'bg-yellow-400 animate-drop' : 'bg-slate-800 hover:bg-slate-700'} ${win ? 'ring-2 ring-emerald-400 animate-pulse' : ''}`} />;
      })}
    </div>)}
  </div>;
}
