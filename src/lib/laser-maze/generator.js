import { getCellKey, getMirrorForTurn, traceLaser } from './laser.js';

const DIFF = {
  Easy: { key: 'easy', size: 6, walls: [2, 4], mirrors: [4, 6], minTurns: 1, attempts: 100 },
  Normal: { key: 'normal', size: 7, walls: [4, 7], mirrors: [6, 9], minTurns: 2, attempts: 200 },
  Hard: { key: 'hard', size: 8, walls: [6, 10], mirrors: [8, 12], minTurns: 2, attempts: 300 },
};
const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const dirs = ['up', 'down', 'left', 'right'];
export const randomDirection = () => dirs[randInt(0, 3)];
export const createEmptyGrid = (size) => Array.from({ length: size }, () => Array.from({ length: size }, () => 'empty'));
export const clonePuzzle = (p) => ({ ...p, emitter: { ...p.emitter }, target: { ...p.target }, walls: p.walls.map((w) => ({ ...w })), mirrors: p.mirrors.map((m) => ({ ...m })) });

export function placeEmitterAndTarget(size) {
  const edge = [];
  for (let i = 0; i < size; i += 1) edge.push([0, i], [size - 1, i], [i, 0], [i, size - 1]);
  const [er, ec] = edge[randInt(0, edge.length - 1)];
  const emitter = { row: er, col: ec, direction: er === 0 ? 'down' : er === size - 1 ? 'up' : ec === 0 ? 'right' : 'left' };
  let target = { row: er, col: ec };
  while ((Math.abs(target.row - er) + Math.abs(target.col - ec)) < Math.floor(size * 0.9)) {
    const [tr, tc] = edge[randInt(0, edge.length - 1)]; target = { row: tr, col: tc };
  }
  return { emitter, target };
}
export function placeRandomWalls(grid, count, protectedCells) {
  const size = grid.length; const used = new Set(protectedCells); const walls = [];
  while (walls.length < count) { const r = randInt(0, size - 1); const c = randInt(0, size - 1); const k = getCellKey(r, c); if (used.has(k)) continue; used.add(k); walls.push({ row: r, col: c }); }
  return walls;
}
export function placeRandomMirrors(grid, count, protectedCells) {
  const size = grid.length; const used = new Set(protectedCells); const mirrors = [];
  while (mirrors.length < count) { const r = randInt(0, size - 1); const c = randInt(0, size - 1); const k = getCellKey(r, c); if (used.has(k)) continue; used.add(k); mirrors.push({ row: r, col: c, type: Math.random() > 0.5 ? '/' : '\\' }); }
  return mirrors;
}

function buildPath(size, emitter, target, minTurns) {
  const pts = [{ row: emitter.row, col: emitter.col }];
  let dir = emitter.direction;
  let turns = 0;
  const step = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
  let row = emitter.row; let col = emitter.col;
  for (let i = 0; i < size * size; i += 1) {
    const [dr, dc] = step[dir]; const nr = row + dr; const nc = col + dc;
    if (nr < 0 || nc < 0 || nr >= size || nc >= size) { dir = ['up', 'down'].includes(dir) ? (col < size / 2 ? 'right' : 'left') : (row < size / 2 ? 'down' : 'up'); continue; }
    row = nr; col = nc; pts.push({ row, col });
    if (row === target.row && col === target.col && turns >= minTurns) return pts;
    if (Math.random() < 0.32) {
      const next = dir === 'up' || dir === 'down' ? (Math.random() > 0.5 ? 'left' : 'right') : (Math.random() > 0.5 ? 'up' : 'down');
      if (next !== dir) { dir = next; turns += 1; }
    }
  }
  return null;
}

const FALLBACKS = {
  easy: { size: 6, emitter: { row: 5, col: 0, direction: 'right' }, target: { row: 0, col: 5 }, walls: [{ row: 2, col: 2 }], mirrors: [{ row: 5, col: 4, type: '/', solutionType: '\\' }, { row: 0, col: 4, type: '/', solutionType: '/' }, { row: 3, col: 1, type: '/' }, { row: 4, col: 3, type: '\\' }] },
  normal: { size: 7, emitter: { row: 6, col: 0, direction: 'right' }, target: { row: 0, col: 6 }, walls: [{ row: 4, col: 4 }, { row: 1, col: 2 }], mirrors: [{ row: 6, col: 5, type: '/', solutionType: '\\' }, { row: 1, col: 5, type: '\\', solutionType: '/' }, { row: 1, col: 2, type: '/' }, { row: 3, col: 6, type: '\\' }, { row: 4, col: 1, type: '/' }, { row: 5, col: 3, type: '\\' }] },
  hard: { size: 8, emitter: { row: 7, col: 0, direction: 'right' }, target: { row: 0, col: 7 }, walls: [{ row: 6, col: 6 }, { row: 2, col: 3 }, { row: 3, col: 5 }], mirrors: [{ row: 7, col: 6, type: '/', solutionType: '\\' }, { row: 1, col: 6, type: '\\', solutionType: '/' }, { row: 1, col: 1, type: '\\' }, { row: 5, col: 2, type: '/' }, { row: 4, col: 4, type: '\\' }, { row: 2, col: 6, type: '/' }, { row: 6, col: 1, type: '/' }, { row: 3, col: 1, type: '\\' }] },
};

export function generateSolvablePuzzle(config) {
  const grid = createEmptyGrid(config.size);
  const { emitter, target } = placeEmitterAndTarget(config.size);
  const path = buildPath(config.size, emitter, target, config.minTurns);
  if (!path) return null;
  const pathSet = new Set(path.map((c) => getCellKey(c.row, c.col)));
  const mirrors = [];
  let prevDir = emitter.direction;
  for (let i = 1; i < path.length - 1; i += 1) {
    const cur = path[i]; const nxt = path[i + 1];
    const outDir = nxt.row > cur.row ? 'down' : nxt.row < cur.row ? 'up' : nxt.col > cur.col ? 'right' : 'left';
    if (outDir !== prevDir) { const s = getMirrorForTurn(prevDir, outDir); if (!s) return null; mirrors.push({ row: cur.row, col: cur.col, type: s, solutionType: s }); }
    prevDir = outDir;
  }
  if (!mirrors.length) return null;
  const protect = new Set([getCellKey(emitter.row, emitter.col), getCellKey(target.row, target.col), ...pathSet]);
  const walls = placeRandomWalls(grid, randInt(...config.walls), protect);
  const decoyMirrors = placeRandomMirrors(grid, Math.max(randInt(...config.mirrors) - mirrors.length, 0), new Set([...protect, ...walls.map((w) => getCellKey(w.row, w.col))]));
  const allMirrors = [...mirrors, ...decoyMirrors.map((m) => ({ ...m, solutionType: m.type }))];
  let wrong = 0;
  const randomized = allMirrors.map((m, idx) => {
    if (idx < mirrors.length && Math.random() < 0.7) { wrong += 1; return { ...m, type: m.solutionType === '/' ? '\\' : '/' }; }
    return { ...m };
  });
  if (!wrong) randomized[0].type = randomized[0].solutionType === '/' ? '\\' : '/';
  const base = { id: `laser-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, difficulty: config.key, size: config.size, emitter, target, walls, mirrors: randomized, createdAt: Date.now() };
  const solved = { ...base, mirrors: randomized.map((m) => ({ ...m, type: m.solutionType || m.type })) };
  if (!traceLaser(solved).hitTarget || traceLaser(base).hitTarget) return null;
  return base;
}

export function generateLaserMaze(difficulty = 'Easy') {
  const config = DIFF[difficulty] || DIFF.Easy;
  for (let i = 0; i < config.attempts; i += 1) { const p = generateSolvablePuzzle(config); if (p) return p; }
  const fb = FALLBACKS[config.key];
  return { ...fb, id: `fallback-${config.key}-${Date.now()}`, difficulty: config.key, createdAt: Date.now() };
}
