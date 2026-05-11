export default function MemoryCardBoard({ cards, flipped, onFlip, locked }) {
  return <div className='grid grid-cols-4 gap-2'>
    {cards.map((c, i) => {
      const show = flipped.includes(i) || c.matched;
      return <button key={c.id} disabled={locked || show} onClick={() => onFlip(i)} className={`h-16 rounded-xl metal-card text-2xl transition-all duration-300 ${show ? 'animate-in-pop bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.12)]' : 'hover:scale-105'}`}>
        {show ? c.icon : '❔'}
      </button>;
    })}
  </div>;
}
