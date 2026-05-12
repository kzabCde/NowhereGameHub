'use client';
import { getTowerStats, getUpgradeCost } from '@/lib/core-defense/towers';

export default function UpgradePanel({ tower, credits, onUpgrade, onSell, disabled }) {
  if (!tower) return <div className='metal-card p-4 text-sm text-zinc-400'>เลือกป้อมบนกระดานเพื่อดูรายละเอียด</div>;
  const stats = getTowerStats(tower);
  const cost = getUpgradeCost(tower);
  return <div className='metal-card p-4 space-y-2'><h3 className='font-bold'>ป้อมที่เลือก</h3><p>{stats.symbol} {stats.thaiName} Lv.{tower.level}</p><p className='text-xs text-zinc-400'>ดาเมจ {stats.damage} | ระยะ {stats.range} | คูลดาวน์ {stats.cooldown}</p>{tower.level===3?<p className='text-xs text-zinc-300'>เลเวลสูงสุดแล้ว</p>:<button disabled={disabled || credits < cost} onClick={onUpgrade} className='rounded border border-white/20 px-3 py-2 text-sm disabled:opacity-50'>อัปเกรดป้อม ({cost})</button>}<button disabled={disabled} onClick={onSell} className='rounded border border-white/20 px-3 py-2 text-sm ml-2 disabled:opacity-50'>ขายป้อม</button></div>;
}
