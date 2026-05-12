import { checkCircuitConnected, rotateConnectionsClockwise } from './circuit';

const CFG = { easy: { size: 5, minLen: 7 }, normal: { size: 6, minLen: 10 }, hard: { size: 7, minLen: 14 } };
const dirs = [[-1,0],[0,1],[1,0],[0,-1]];
const key = (r,c)=>`${r},${c}`;
const inb=(n,r,c)=>r>=0&&c>=0&&r<n&&c<n;

export function cloneCircuitGrid(grid){ return grid.map((row)=>row.map((cell)=>({ ...cell, connections:[...(cell.connections||[])] }))); }

function bfs(size, start, end){
  const q=[start]; const prev=new Map(); prev.set(key(start.row,start.col), null);
  while(q.length){ const cur=q.shift(); if(cur.row===end.row&&cur.col===end.col) break;
    for(const [dr,dc] of dirs.sort(()=>Math.random()-0.5)){ const nr=cur.row+dr,nc=cur.col+dc; const id=key(nr,nc);
      if(!inb(size,nr,nc)||prev.has(id)) continue; prev.set(id,cur); q.push({row:nr,col:nc}); }
  }
  if(!prev.has(key(end.row,end.col))) return null;
  const path=[]; let cur=end; while(cur){ path.push(cur); cur=prev.get(key(cur.row,cur.col)); }
  return path.reverse();
}

export function createCircuitPath(size, config){
  const source={row:0,col:0}; const core={row:size-1,col:size-1};
  let path=bfs(size,source,core); if(!path) return null;
  while(path.length<config.minLen){ const i=1+Math.floor(Math.random()*(path.length-2)); const p=path[i];
    const candidates=dirs.map(([dr,dc])=>({row:p.row+dr,col:p.col+dc})).filter((n)=>inb(size,n.row,n.col)&&!path.some((x)=>x.row===n.row&&x.col===n.col));
    if(!candidates.length) break; path.splice(i,0,candidates[Math.floor(Math.random()*candidates.length)]);
  }
  return { path, source, core };
}

const connBetween=(a,b)=>a.row===b.row?(a.col<b.col?['right','left']:['left','right']):(a.row<b.row?['down','up']:['up','down']);

export function buildTilesFromPath({ path, size, source, core }){
  const grid=Array.from({length:size},()=>Array.from({length:size},()=>({type:'empty',rotatable:false,connections:[]})));
  for(let i=0;i<path.length;i+=1){ const p=path[i]; const prev=path[i-1]; const next=path[i+1]; const con=[];
    if(prev) con.push(connBetween(p,prev)[0]); if(next) con.push(connBetween(p,next)[0]);
    let type='straight'; if(i===0) type='source'; else if(i===path.length-1) type='core'; else if(con[0]!==con[1] && !(con.includes('up')&&con.includes('down')) && !(con.includes('left')&&con.includes('right'))) type='corner';
    grid[p.row][p.col]={ type, rotatable:type==='straight'||type==='corner', connections:[...new Set(con)] };
  }
  for(let r=0;r<size;r++) for(let c=0;c<size;c++) if(grid[r][c].type==='empty') grid[r][c]=Math.random()<0.2?{type:'block',rotatable:false,connections:[]}:{type:'empty',rotatable:false,connections:[]};
  grid[source.row][source.col].connections=['right','down'].includes(grid[source.row][source.col].connections[0])?grid[source.row][source.col].connections:['right'];
  return grid;
}

export function scrambleRotatableTiles(grid){
  const next=cloneCircuitGrid(grid); let rotations=0;
  for(const row of next){ for(const cell of row){ if(!cell.rotatable) continue; const turns=1+Math.floor(Math.random()*3); for(let i=0;i<turns;i++) cell.connections=rotateConnectionsClockwise(cell.connections); rotations+=1; }}
  return { grid: next, rotations };
}

function fallback(difficulty){ const size=CFG[difficulty].size; const made=createCircuitPath(size,CFG[difficulty]); const sol=buildTilesFromPath({...made,size}); const sc=scrambleRotatableTiles(sol).grid; return {size,source:made.source,core:made.core,solutionGrid:sol,grid:sc}; }

export function generateCircuitPuzzle(difficulty='normal'){
  const cfg=CFG[difficulty]||CFG.normal;
  try {
    for(let t=0;t<16;t+=1){
      const made=createCircuitPath(cfg.size,cfg); if(!made) continue;
      const solutionGrid=buildTilesFromPath({ ...made, size: cfg.size });
      if(!checkCircuitConnected(solutionGrid).connected) continue;
      const {grid}=scrambleRotatableTiles(solutionGrid);
      if(checkCircuitConnected(grid).connected) continue;
      return { id:`${difficulty}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`, difficulty, size:cfg.size, grid, solutionGrid, source:made.source, core:made.core, createdAt:Date.now() };
    }
  } catch {}
  const fb=fallback(difficulty);
  return { id:`fallback-${difficulty}-${Date.now()}`, difficulty, size:fb.size, grid:fb.grid, solutionGrid:fb.solutionGrid, source:fb.source, core:fb.core, createdAt:Date.now() };
}
