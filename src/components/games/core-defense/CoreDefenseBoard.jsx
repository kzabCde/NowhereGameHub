'use client';
import { BOARD_SIZE, } from '@/lib/core-defense/constants';

export default function CoreDefenseBoard({ cellTypeMap, towers, enemies, selectedTowerId, onCellClick, attackEffects, coreDamaged, gameState }) {
  const enemyByCell = new Map();
  enemies.forEach((e) => {
    const key = `${e.row}-${e.col}`;
    const arr = enemyByCell.get(key) || [];
    arr.push(e);
    enemyByCell.set(key, arr);
  });

  return <div className={`metal-card p-3 ${gameState==='wave'?'animate-[boardScan_1.5s_ease]':''}`}><div className='grid gap-1 mx-auto w-full max-w-[420px]' style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0,1fr))` }}>{Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
      const row = Math.floor(idx / BOARD_SIZE);
      const col = idx % BOARD_SIZE;
      const type = cellTypeMap[row][col];
      const tower = towers.find((t) => t.row === row && t.col === col);
      const cellEnemies = enemyByCell.get(`${row}-${col}`) || [];
      return <button key={`${row}-${col}`} onClick={() => onCellClick(row, col)} className={`relative aspect-square rounded border text-xs ${type==='buildable'?'border-white/10 bg-black/30':'border-white/20 bg-white/[0.07]'}`}>
        {type === 'spawn' && <span className='text-[10px]'>SP</span>}
        {type === 'core' && <span className={`text-[10px] ${coreDamaged?'animate-[coreDamageShake_.3s_ease]':''} animate-[corePulse_2s_ease-in-out_infinite]`}>⬢</span>}
        {tower && <span className={`absolute inset-0 grid place-items-center animate-[towerIdlePulse_1.7s_ease-in-out_infinite] ${selectedTowerId===tower.id?'text-white':'text-zinc-300'}`}>{tower.type==='pulse'?'◉':tower.type==='rail'?'┃':'◌'}</span>}
        {cellEnemies[0] && <div className='absolute inset-0 grid place-items-center'><span className={`${cellEnemies[0].type==='runner'?'animate-[runnerDash_.7s_linear_infinite]':cellEnemies[0].type==='tank'?'animate-[tankRumble_1s_ease-in-out_infinite]':cellEnemies[0].type==='glitch'?'animate-[glitchFlicker_.6s_steps(2)_infinite]':'animate-[enemyWalkBob_1.1s_ease-in-out_infinite]'} ${cellEnemies[0].justHit?'animate-[hitFlash_.25s_linear]':''}`}>{cellEnemies[0].symbol}</span><div className='absolute -top-1 h-1 w-5 bg-black/60'><div className='h-1 bg-white' style={{ width: `${Math.max(0, (cellEnemies[0].hp / cellEnemies[0].maxHp) * 100)}%` }} /></div></div>}
        {attackEffects.some((fx) => fx.targetEnemyId === cellEnemies[0]?.id) && <span className='absolute inset-0 pointer-events-none animate-[pulseAttackRing_.35s_ease] rounded-full border border-white/40' />}
      </button>;
    })}</div></div>;
}
