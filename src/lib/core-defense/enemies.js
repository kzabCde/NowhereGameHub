export const ENEMY_TYPES = {
  walker: { id:'walker', thaiName:'Walker', symbol:'○', baseHp:30, speedTicks:2, reward:12, coreDamage:1 },
  runner: { id:'runner', thaiName:'Runner', symbol:'◦', baseHp:18, speedTicks:1, reward:10, coreDamage:1 },
  tank: { id:'tank', thaiName:'Tank', symbol:'◼', baseHp:80, speedTicks:3, reward:25, coreDamage:2 },
  glitch: { id:'glitch', thaiName:'Glitch', symbol:'◇', baseHp:45, speedTicks:2, reward:18, coreDamage:1 },
};

export const pickEnemyType = (wave) => {
  const roll = Math.random();
  if (wave <= 2) return roll < 0.55 ? 'walker' : 'runner';
  if (wave <= 5) return roll < 0.45 ? 'walker' : roll < 0.75 ? 'runner' : 'tank';
  return roll < 0.3 ? 'walker' : roll < 0.5 ? 'runner' : roll < 0.78 ? 'tank' : 'glitch';
};
