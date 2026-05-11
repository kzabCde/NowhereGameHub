export default function XOBoard({ board, onClick, winning, locked }) {
  return <div className='grid grid-cols-3 gap-2'>
    {board.map((v, i) => <button key={i} disabled={locked || v} onClick={() => onClick(i)} className={`h-20 text-4xl font-bold rounded-2xl metal-card transition-all duration-200 hover:scale-105 ${v ? 'animate-in-pop' : ''} ${winning.includes(i) ? 'ring-2 ring-white/70 win-pulse' : ''}`}>{v}</button>)}
  </div>;
}
