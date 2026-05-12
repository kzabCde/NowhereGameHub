const DIRS = [
  { key: 'up', dr: -1, dc: 0, opposite: 'down' },
  { key: 'right', dr: 0, dc: 1, opposite: 'left' },
  { key: 'down', dr: 1, dc: 0, opposite: 'up' },
  { key: 'left', dr: 0, dc: -1, opposite: 'right' },
];

export function rotateConnectionsClockwise(connections = []) {
  const map = { up: 'right', right: 'down', down: 'left', left: 'up' };
  return connections.map((d) => map[d]).sort((a, b) => ['up', 'right', 'down', 'left'].indexOf(a) - ['up', 'right', 'down', 'left'].indexOf(b));
}

export function checkCircuitConnected(grid) {
  const size = grid.length;
  let source = null;
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      if (grid[r][c].type === 'source') source = { row: r, col: c };
    }
  }
  if (!source) return { connected: false, poweredCells: [], deadEnds: [] };

  const visited = new Set();
  const q = [source];
  const poweredCells = [];
  const deadEnds = [];
  let connected = false;

  while (q.length) {
    const curr = q.shift();
    const id = `${curr.row},${curr.col}`;
    if (visited.has(id)) continue;
    visited.add(id);
    poweredCells.push(curr);
    const cell = grid[curr.row][curr.col];
    if (cell.type === 'core') connected = true;

    let forward = 0;
    for (const d of DIRS) {
      if (!cell.connections?.includes(d.key)) continue;
      const nr = curr.row + d.dr;
      const nc = curr.col + d.dc;
      if (nr < 0 || nc < 0 || nr >= size || nc >= size) continue;
      const nCell = grid[nr][nc];
      if (!nCell.connections?.includes(d.opposite)) continue;
      forward += 1;
      const nid = `${nr},${nc}`;
      if (!visited.has(nid)) q.push({ row: nr, col: nc });
    }
    if (forward === 0 && (cell.type === 'straight' || cell.type === 'corner' || cell.type === 'source')) deadEnds.push(curr);
  }

  return { connected, poweredCells, deadEnds };
}
