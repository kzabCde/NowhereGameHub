const DIR_STEP = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
export const getCellKey = (row, col) => `${row},${col}`;
export const isCellEqual = (a, b) => a.row === b.row && a.col === b.col;

export function getNextDirection(direction, mirrorType) {
  if (mirrorType === '/') return ({ up: 'right', right: 'up', down: 'left', left: 'down' })[direction] || direction;
  if (mirrorType === '\\') return ({ up: 'left', left: 'up', down: 'right', right: 'down' })[direction] || direction;
  return direction;
}

export function getMirrorForTurn(inDirection, outDirection) {
  for (const m of ['/', '\\']) if (getNextDirection(inDirection, m) === outDirection) return m;
  return null;
}

export function rotateMirrorInPuzzle(puzzle, row, col) {
  const next = { ...puzzle, mirrors: puzzle.mirrors.map((m) => ({ ...m })) };
  const idx = next.mirrors.findIndex((m) => m.row === row && m.col === col);
  if (idx >= 0) next.mirrors[idx].type = next.mirrors[idx].type === '/' ? '\\' : '/';
  return next;
}

export function traceLaser(puzzle) {
  const { size, emitter, target, walls, mirrors } = puzzle;
  const wallSet = new Set(walls.map((w) => getCellKey(w.row, w.col)));
  const mirrorMap = new Map(mirrors.map((m) => [getCellKey(m.row, m.col), m.type]));
  const path = [];
  const visited = new Set();
  let row = emitter.row; let col = emitter.col; let direction = emitter.direction;
  for (let i = 0; i < size * size * 4; i += 1) {
    const [dr, dc] = DIR_STEP[direction]; row += dr; col += dc;
    if (row < 0 || col < 0 || row >= size || col >= size) return { path, hitTarget: false, blocked: false, exited: true, looped: false };
    const stateKey = `${row},${col},${direction}`;
    if (visited.has(stateKey)) return { path, hitTarget: false, blocked: false, exited: false, looped: true };
    visited.add(stateKey); path.push({ row, col, direction });
    if (row === target.row && col === target.col) return { path, hitTarget: true, blocked: false, exited: false, looped: false };
    if (wallSet.has(getCellKey(row, col))) return { path, hitTarget: false, blocked: true, exited: false, looped: false };
    const mirror = mirrorMap.get(getCellKey(row, col)); if (mirror) direction = getNextDirection(direction, mirror);
  }
  return { path, hitTarget: false, blocked: false, exited: false, looped: true };
}
