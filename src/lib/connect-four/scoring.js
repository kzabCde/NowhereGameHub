export const scoreWindow = (w,p)=>{const o=p==='P'?'M':'P'; const pc=w.filter(x=>x===p).length, ec=w.filter(x=>!x).length, oc=w.filter(x=>x===o).length; if(pc===4) return 100; if(pc===3&&ec===1) return 7; if(pc===2&&ec===2) return 2; if(oc===3&&ec===1) return -8; return 0;};
export const heuristic = (board,p) => {
  let s=0;
  for(let r=0;r<6;r++) for(let c=0;c<4;c++) s+=scoreWindow([board[r][c],board[r][c+1],board[r][c+2],board[r][c+3]],p);
  for(let c=0;c<7;c++) for(let r=0;r<3;r++) s+=scoreWindow([board[r][c],board[r+1][c],board[r+2][c],board[r+3][c]],p);
  return s;
};
