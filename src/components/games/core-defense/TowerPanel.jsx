'use client';
import { TOWER_TYPES } from '@/lib/core-defense/towers';

export default function TowerPanel({ selectedTowerType, onSelect }) {
  return <div className='metal-card p-4'><h3 className='font-bold mb-3'>เลือกป้อม</h3><div className='grid gap-2 sm:grid-cols-3'>{Object.values(TOWER_TYPES).map((tower) => <button key={tower.id} onClick={() => onSelect(tower.id)} className={`text-left rounded-lg border p-3 ${selectedTowerType===tower.id?'border-white bg-white/10':'border-white/10 bg-black/20'}`}><div className='flex items-center justify-between'><span>{tower.symbol} {tower.thaiName}</span><span>{tower.cost}฿</span></div><p className='text-xs text-zinc-400'>ดาเมจ {tower.baseDamage} | ระยะ {tower.range}</p><p className='text-xs text-zinc-500'>{tower.description}</p></button>)}</div></div>;
}
