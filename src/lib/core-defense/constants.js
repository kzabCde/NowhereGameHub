export const BOARD_SIZE = 10;
export const TICK_MS = 250;
export const MAX_ACTIVE_ENEMIES = 25;
export const INITIAL_STATE = {
  wave: 1,
  coreHp: 20,
  credits: 150,
  score: 0,
  kills: 0,
  selectedTowerType: 'pulse',
  selectedTowerId: null,
  activeEnemies: [],
  placedTowers: [],
  attackEffects: [],
  gameState: 'idle',
  statusText: 'เตรียมป้องกัน Core',
};
