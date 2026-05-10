import { ROWS, COLS } from './constants';
export function checkWinner(board, piece) {
  const dirs = [[0,1],[1,0],[1,1],[-1,1]];
  for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) if (board[r][c]===piece) {
    for (const [dr,dc] of dirs){ const cells=[{row:r,col:c}];
      for(let i=1;i<4;i++){ const nr=r+dr*i,nc=c+dc*i; if(nr<0||nr>=ROWS||nc<0||nc>=COLS||board[nr][nc]!==piece)break; cells.push({row:nr,col:nc}); }
      if(cells.length===4) return {hasWon:true,cells};
    }
  }
  return {hasWon:false,cells:[]};
}
