import { ROWS, COLS } from './board';
const dirs = [[0,1],[1,0],[1,1],[1,-1]];
export const findWinner = (board) => {
  for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) { const p=board[r][c]; if(!p) continue;
    for (const [dr,dc] of dirs){ const cells=[[r,c]]; for(let i=1;i<4;i++){const nr=r+dr*i,nc=c+dc*i; if(nr<0||nr>=ROWS||nc<0||nc>=COLS||board[nr][nc]!==p) break; cells.push([nr,nc]);}
      if(cells.length===4) return {winner:p,cells};
    }
  }
  return { winner:null, cells:[] };
};
export const isDraw = (board) => board[0].every(Boolean);
