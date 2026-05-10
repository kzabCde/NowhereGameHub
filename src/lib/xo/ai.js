import { AI, PLAYER } from './constants'; import { checkWinner } from './winner';
const valid=(b)=>b.map((v,i)=>v?null:i).filter((v)=>v!==null); const rand=(a)=>a[Math.floor(Math.random()*a.length)]
export const easyMove=(b)=>rand(valid(b));
export function normalMove(b){ for(const i of valid(b)){const n=[...b];n[i]=AI;if(checkWinner(n,AI))return i;} for(const i of valid(b)){const n=[...b];n[i]=PLAYER;if(checkWinner(n,PLAYER))return i;} return easyMove(b); }
function mm(board,max){ if(checkWinner(board,AI))return {s:1}; if(checkWinner(board,PLAYER))return {s:-1}; const v=valid(board); if(!v.length)return{s:0}; let best={s:max?-Infinity:Infinity,m:v[0]}; for(const i of v){const n=[...board];n[i]=max?AI:PLAYER; const r=mm(n,!max); if(max? r.s>best.s:r.s<best.s) best={s:r.s,m:i}; } return best; }
export const hardMove=(b)=>mm(b,true).m;
