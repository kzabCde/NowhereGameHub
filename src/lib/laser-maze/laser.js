const DIR_STEP = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };

export function isSameCell(a, b) { return a.row === b.row && a.col === b.col; }

export function getNextDirection(direction, mirrorType) {
  if (mirrorType === '/') return ({ up: 'right', right: 'up', down: 'left', left: 'down' })[direction] || direction;
  if (mirrorType === '\\') return ({ up: 'left', left: 'up', down: 'right', right: 'down' })[direction] || direction;
  return direction;
}

export function rotateMirror(levelState, row, col) {
  const next = { ...levelState, mirrors: levelState.mirrors.map((m) => ({ ...m })) };
  const idx = next.mirrors.findIndex((m) => m.row === row && m.col === col);
  if (idx < 0) return next;
  next.mirrors[idx].type = next.mirrors[idx].type === '/' ? '\\' : '/';
  return next;
}

export function traceLaser(levelState) {
  const { size, emitter, target, walls, mirrors } = levelState;
  const wallSet = new Set(walls.map((w) => `${w.row},${w.col}`));
  const mirrorMap = new Map(mirrors.map((m) => [`${m.row},${m.col}`, m.type]));
  const path = [];
  const visited = new Set();
  let row = emitter.row;
  let col = emitter.col;
  let direction = emitter.direction;

  for (let i = 0; i < size * size * 6; i += 1) {
    const [dr, dc] = DIR_STEP[direction];
    row += dr; col += dc;
    if (row < 0 || col < 0 || row >= size || col >= size) return { path, hitTarget: false, blocked: false, exited: true };

    const key = `${row},${col},${direction}`;
    if (visited.has(key)) return { path, hitTarget: false, blocked: false, exited: true, looped: true };
    visited.add(key);
    path.push({ row, col });

    if (row === target.row && col === target.col) return { path, hitTarget: true, blocked: false, exited: false };
    if (wallSet.has(`${row},${col}`)) return { path, hitTarget: false, blocked: true, exited: false };

    const mirror = mirrorMap.get(`${row},${col}`);
    if (mirror) direction = getNextDirection(direction, mirror);
  }
  return { path, hitTarget: false, blocked: false, exited: true, looped: true };
}
