export const TOWER_TYPES = {
  pulse: { id:'pulse', name:'Pulse Tower', thaiName:'ป้อม Pulse', symbol:'◉', cost:50, baseDamage:10, range:2, cooldownTicks:2, description:'ยิงเร็ว เหมาะกับศัตรูทั่วไป' },
  rail: { id:'rail', name:'Rail Tower', thaiName:'ป้อม Rail', symbol:'━', cost:90, baseDamage:28, range:3, cooldownTicks:4, description:'ยิงแรงแต่ช้า เหมาะกับศัตรูเลือดเยอะ' },
  slow: { id:'slow', name:'Slow Tower', thaiName:'ป้อม Slow', symbol:'◌', cost:75, baseDamage:4, range:2, cooldownTicks:3, slowTicks:4, slowMultiplier:0.5, description:'ยิงเบาแต่ทำให้ศัตรูเคลื่อนที่ช้าลง' },
};

export const getTowerStats = (tower) => {
  const base = TOWER_TYPES[tower.type];
  const lvl = tower.level;
  const damage = Math.round(base.baseDamage * (lvl === 1 ? 1 : lvl === 2 ? 1.5 : 2));
  const range = base.range + ((tower.type === 'pulse' || tower.type === 'slow') && lvl >= 2 ? 1 : 0);
  const cooldown = Math.max(1, base.cooldownTicks - (lvl >= 2 ? 1 : 0));
  return { ...base, damage, range, cooldown };
};

export const getUpgradeCost = (tower) => {
  const base = TOWER_TYPES[tower.type].cost;
  if (tower.level === 1) return Math.floor(base * 0.7);
  if (tower.level === 2) return Math.floor(base * 1.2);
  return null;
};
