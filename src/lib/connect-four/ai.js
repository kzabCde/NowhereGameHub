import { validMoves, makeMove } from './board';
import { findWinner } from './winner';
import { heuristic } from './scoring';
const rand = (arr)=>arr[Math.floor(Math.random()*arr.length)];
const winningMove = (board,pl) => validMoves(board).find(c => findWinner(makeMove(board,c,pl).board).winner===pl);
const minimax = (board, depth, alpha, beta, maxing) => {
  const w = findWinner(board).winner; if (w==='M') return {score:10000+depth}; if (w==='P') return {score:-10000-depth};
  const moves = validMoves(board); if (depth===0||moves.length===0) return {score:heuristic(board,'M')};
  let best={move:moves[0], score:maxing?-Infinity:Infinity};
  for(const m of moves){ const next=makeMove(board,m,maxing?'M':'P').board; const sc=minimax(next,depth-1,alpha,beta,!maxing).score;
    if(maxing && sc>best.score){best={move:m,score:sc}; alpha=Math.max(alpha,sc);} if(!maxing && sc<best.score){best={move:m,score:sc}; beta=Math.min(beta,sc);} if(beta<=alpha) break;
  } return best;
};
export const pickMove = (board,diff) => {
  const moves=validMoves(board); if(!moves.length) return null;
  if(diff==='Easy') return rand(moves);
  if(diff==='Normal'){ return winningMove(board,'M') ?? winningMove(board,'P') ?? rand(moves); }
  if(diff==='Hard'){ let best=moves[0],bs=-Infinity; for(const m of moves){ const s=heuristic(makeMove(board,m,'M').board,'M'); if(s>bs){bs=s;best=m;} } return best; }
  return minimax(board,5,-Infinity,Infinity,true).move;
};
