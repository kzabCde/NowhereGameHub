import { AI, PLAYER } from './constants';
import { cloneBoard, dropPiece, getValidColumns, isBoardFull } from './board';
import { checkWinner } from './winner';
import { evaluateBoard } from './scoring';
const order=[3,2,4,1,5,0,6];
const pick=(arr)=>arr[Math.floor(Math.random()*arr.length)] ?? 3;
export const getEasyMove=(b)=>pick(getValidColumns(b));
export function getNormalMove(b){ const valid=getValidColumns(b); for(const c of valid){const n=cloneBoard(b); dropPiece(n,c,AI); if(checkWinner(n,AI).hasWon)return c;} for(const c of valid){const n=cloneBoard(b); dropPiece(n,c,PLAYER); if(checkWinner(n,PLAYER).hasWon)return c;} return pick(valid); }
export function getHardMove(b){ let best=-Infinity, move=getNormalMove(b); for(const c of order){ if(!getValidColumns(b).includes(c)) continue; const n=cloneBoard(b); dropPiece(n,c,AI); if(checkWinner(n,AI).hasWon)return c; const sc=evaluateBoard(n); if(sc>best){best=sc; move=c;}} return move; }
export function minimax(board,depth,alpha,beta,maximizing){ const valid=getValidColumns(board); if(depth===0||checkWinner(board,AI).hasWon||checkWinner(board,PLAYER).hasWon||isBoardFull(board)) return [null,evaluateBoard(board)];
 if(maximizing){ let v=-Infinity,col=valid[0]; for(const c of order){ if(!valid.includes(c)) continue; const b=cloneBoard(board); dropPiece(b,c,AI); const [,sc]=minimax(b,depth-1,alpha,beta,false); if(sc>v){v=sc;col=c;} alpha=Math.max(alpha,v); if(alpha>=beta)break;} return [col,v]; }
 let v=Infinity,col=valid[0]; for(const c of order){ if(!valid.includes(c)) continue; const b=cloneBoard(board); dropPiece(b,c,PLAYER); const [,sc]=minimax(b,depth-1,alpha,beta,true); if(sc<v){v=sc;col=c;} beta=Math.min(beta,v); if(alpha>=beta)break;} return [col,v]; }
export const getExpertMove=(b)=>minimax(b,5,-Infinity,Infinity,true)[0] ?? getHardMove(b);
