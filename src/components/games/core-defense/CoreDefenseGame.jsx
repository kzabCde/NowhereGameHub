'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { INITIAL_STATE, MAX_ACTIVE_ENEMIES, TICK_MS } from '@/lib/core-defense/constants';
import { createCellTypeMap, PATH_CELLS } from '@/lib/core-defense/path';
import { ENEMY_TYPES, pickEnemyType } from '@/lib/core-defense/enemies';
import { TOWER_TYPES, getTowerStats, getUpgradeCost } from '@/lib/core-defense/towers';
import CoreDefenseBoard from './CoreDefenseBoard';
import TowerPanel from './TowerPanel';
import UpgradePanel from './UpgradePanel';

const CELL_TYPE_MAP = createCellTypeMap();
const safeNum = (k) => (typeof window !== 'undefined' ? Number(localStorage.getItem(k) || 0) : 0);

export default function CoreDefenseGame(){
  const [game, setGame] = useState(INITIAL_STATE);
  const [best, setBest] = useState({ wave: 0, score: 0, kills: 0 });
  const intervalRef = useRef(null); const tickRef = useRef(0); const waveRef = useRef(null); const idRef = useRef(1); const [coreDamaged, setCoreDamaged] = useState(false);
  useEffect(()=>{ setBest({ wave:safeNum('coreDefenseBestWave'), score:safeNum('coreDefenseBestScore'), kills:safeNum('coreDefenseBestKills') }); },[]);
  const selectedTower = useMemo(() => game.placedTowers.find((t) => t.id === game.selectedTowerId), [game.placedTowers, game.selectedTowerId]);
  const saveBest = (g) => { if (typeof window==='undefined') return; const wave = Math.max(safeNum('coreDefenseBestWave'), g.wave); const score = Math.max(safeNum('coreDefenseBestScore'), g.score); const kills = Math.max(safeNum('coreDefenseBestKills'), g.kills); localStorage.setItem('coreDefenseBestWave', String(wave)); localStorage.setItem('coreDefenseBestScore', String(score)); localStorage.setItem('coreDefenseBestKills', String(kills)); setBest({wave,score,kills}); };

  const runTick = () => setGame((prev) => {
    if (prev.gameState !== 'wave') return prev; tickRef.current += 1;
    const s = { ...prev, activeEnemies: prev.activeEnemies.map((e) => ({ ...e, justHit: false })), placedTowers: prev.placedTowers.map((t) => ({ ...t })), attackEffects: prev.attackEffects.filter((fx)=> tickRef.current - fx.createdAtTick <= 2) };
    if (waveRef.current && waveRef.current.spawned < waveRef.current.total && tickRef.current % waveRef.current.spawnEvery === 0 && s.activeEnemies.length < MAX_ACTIVE_ENEMIES) {
      const type = pickEnemyType(s.wave); const def = ENEMY_TYPES[type]; const hp = def.baseHp + s.wave * 8;
      s.activeEnemies.push({ id:`e-${idRef.current++}`, type, symbol:def.symbol, hp, maxHp:hp, pathIndex:0, moveCooldown:def.speedTicks, slowedTicks:0, slowMultiplier:1, row:PATH_CELLS[0][0], col:PATH_CELLS[0][1] }); waveRef.current.spawned += 1;
    }
    let coreHit = 0;
    s.activeEnemies = s.activeEnemies.filter((e)=>{ const def = ENEMY_TYPES[e.type]; e.moveCooldown -= 1; if (e.slowedTicks>0) e.slowedTicks -=1; if (e.moveCooldown<=0){ const sp = Math.max(1, Math.round(def.speedTicks*(e.slowedTicks>0?e.slowMultiplier:1))); e.moveCooldown = sp; e.pathIndex += 1; if (e.pathIndex >= PATH_CELLS.length){ coreHit += def.coreDamage; return false; } [e.row, e.col] = PATH_CELLS[e.pathIndex]; } return true; });
    if (coreHit) setCoreDamaged(true);
    s.placedTowers.forEach((tower)=>{ const stats = getTowerStats(tower); if (tower.cooldown>0) { tower.cooldown -=1; return; } const inRange = s.activeEnemies.filter((e)=> Math.abs(tower.row-e.row)+Math.abs(tower.col-e.col)<=stats.range).sort((a,b)=>b.pathIndex-a.pathIndex); if (!inRange.length) return; const targets = tower.type==='pulse' && tower.level===3 ? inRange.slice(0,2) : [inRange[0]]; targets.forEach((target)=>{ let damage = stats.damage; if (tower.type==='rail' && tower.level===3 && Math.random()<0.25) damage *=2; if (target.type==='glitch' && Math.random()<0.2) damage = Math.floor(damage*0.5); target.hp -= damage; target.justHit = true; if (tower.type==='slow'){ const mul = tower.level===3?0.35:0.5; target.slowedTicks = 4; target.slowMultiplier = mul; if (tower.level===3){ s.activeEnemies.forEach((o)=>{ if (o.id!==target.id && Math.abs(o.row-target.row)+Math.abs(o.col-target.col)<=1){ o.slowedTicks = 3; o.slowMultiplier = mul; } }); } } s.attackEffects.push({ id:`fx-${idRef.current++}`, towerId:tower.id, targetEnemyId:target.id, createdAtTick:tickRef.current }); }); tower.cooldown = stats.cooldown; });
    let creditGain = 0, scoreGain=0, killGain=0;
    s.activeEnemies = s.activeEnemies.filter((e)=>{ if (e.hp>0) return true; const def = ENEMY_TYPES[e.type]; creditGain += def.reward; scoreGain += def.reward * s.wave; killGain += 1; return false; });
    s.credits = Math.max(0, s.credits + creditGain); s.score += scoreGain; s.kills += killGain; s.coreHp = Math.max(0, s.coreHp - coreHit);
    if (s.coreHp<=0){ saveBest(s); return { ...s, gameState:'game-over', statusText:'Core ถูกทำลาย' }; }
    if (waveRef.current && waveRef.current.spawned >= waveRef.current.total && s.activeEnemies.length === 0){ s.credits += 30 + s.wave * 5; s.wave += 1; s.gameState = 'idle'; s.statusText = 'ผ่าน Wave แล้ว'; waveRef.current = null; saveBest(s); }
    return s;
  });
  useEffect(()=>{ if (!coreDamaged) return; const t=setTimeout(()=>setCoreDamaged(false),350); return ()=>clearTimeout(t); },[coreDamaged]);
  useEffect(()=>{ if (game.gameState==='wave' && !intervalRef.current){ intervalRef.current = setInterval(runTick, TICK_MS); } if (game.gameState!=='wave' && intervalRef.current){ clearInterval(intervalRef.current); intervalRef.current = null; } return ()=>{}; },[game.gameState]);
  useEffect(()=>()=>{ if (intervalRef.current) clearInterval(intervalRef.current); },[]);

  const onCellClick=(row,col)=>setGame((prev)=>{ if (prev.gameState==='paused' || prev.gameState==='game-over') return prev; const type = CELL_TYPE_MAP[row][col]; const existing = prev.placedTowers.find((t)=>t.row===row&&t.col===col); if (existing) return { ...prev, selectedTowerId: existing.id }; if (type!=='buildable') return { ...prev, statusText:'วางป้อมตรงนี้ไม่ได้' }; const t = TOWER_TYPES[prev.selectedTowerType]; if (prev.credits<t.cost) return { ...prev, statusText:'เครดิตไม่พอ' }; const tower={ id:`t-${idRef.current++}`, type:t.id, row,col, level:1, cooldown:0, totalInvested:t.cost }; return { ...prev, credits:prev.credits-t.cost, placedTowers:[...prev.placedTowers,tower], selectedTowerId:tower.id, statusText:'เตรียมป้องกัน Core' }; });
  const startWave=()=>setGame((prev)=>{ if (prev.gameState!=='idle') return prev; waveRef.current={ total:5+prev.wave*2, spawned:0, spawnEvery:prev.wave%2===0?3:2 }; return { ...prev, gameState:'wave', statusText:'Wave กำลังบุก' }; });
  const togglePause=()=>setGame((p)=> p.gameState==='wave'?{...p,gameState:'paused',statusText:'หยุดชั่วคราว'}:p.gameState==='paused'?{...p,gameState:'wave',statusText:'Wave กำลังบุก'}:p);
  const restart=()=>{ waveRef.current=null; tickRef.current=0; setGame(INITIAL_STATE); };
  const upgrade=()=>setGame((prev)=>{ const t = prev.placedTowers.find((x)=>x.id===prev.selectedTowerId); if (!t || t.level>=3 || prev.gameState==='paused' || prev.gameState==='game-over') return prev; const cost=getUpgradeCost(t); if (prev.credits<cost) return { ...prev, statusText:'เครดิตไม่พอ' }; return { ...prev, credits:prev.credits-cost, placedTowers:prev.placedTowers.map((x)=>x.id===t.id?{...x,level:x.level+1,totalInvested:x.totalInvested+cost}:x) }; });
  const sell=()=>setGame((prev)=>{ if (prev.gameState==='game-over') return prev; const t=prev.placedTowers.find((x)=>x.id===prev.selectedTowerId); if (!t) return prev; return { ...prev, credits:prev.credits+Math.floor(t.totalInvested*0.5), placedTowers:prev.placedTowers.filter((x)=>x.id!==t.id), selectedTowerId:null }; });

  return <div className='space-y-4'><div className='grid grid-cols-2 md:grid-cols-6 gap-2 text-sm'>{[['Wave',game.wave],['Core HP',game.coreHp],['Credits',game.credits],['Score',game.score],['Kills',game.kills],['Best Wave',best.wave]].map(([k,v])=><div key={k} className='metal-card p-2'><p className='text-zinc-400 text-xs'>{k}</p><p className='font-bold'>{v}</p></div>)}</div><p className='text-sm text-zinc-300'>{game.statusText}</p><CoreDefenseBoard cellTypeMap={CELL_TYPE_MAP} towers={game.placedTowers} enemies={game.activeEnemies} selectedTowerId={game.selectedTowerId} onCellClick={onCellClick} attackEffects={game.attackEffects} coreDamaged={coreDamaged} gameState={game.gameState} /><TowerPanel selectedTowerType={game.selectedTowerType} onSelect={(id)=>setGame((p)=>({...p,selectedTowerType:id}))} /><UpgradePanel tower={selectedTower} credits={game.credits} onUpgrade={upgrade} onSell={sell} disabled={game.gameState==='paused'||game.gameState==='game-over'} /><div className='flex gap-2 flex-wrap'><button onClick={startWave} disabled={game.gameState!=='idle'} className='rounded border px-3 py-2 disabled:opacity-50'>เริ่ม Wave</button><button onClick={togglePause} disabled={!['wave','paused'].includes(game.gameState)} className='rounded border px-3 py-2 disabled:opacity-50'>{game.gameState==='paused'?'เล่นต่อ':'หยุดชั่วคราว'}</button><button onClick={restart} className='rounded border px-3 py-2'>เริ่มใหม่</button></div>{game.gameState==='game-over'&&<div className='metal-card p-4'>Core ถูกทำลาย | Wave {game.wave} | Score {game.score}</div>}</div>;
}
