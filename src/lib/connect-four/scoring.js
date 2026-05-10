import { AI, PLAYER, COLS, ROWS } from './constants';
export function scoreWindow(window){ let ai=0,p=0,e=0; window.forEach(v=>{if(v===AI)ai++; else if(v===PLAYER)p++; else e++;}); if(ai===4)return 100000; if(ai===3&&e===1)return 50; if(ai===2&&e===2)return 10; if(p===3&&e===1)return -80; if(p===2&&e===2)return -8; if(p===4)return -100000; return 0; }
export function evaluateBoard(board){ let s=0; const center=board.map(r=>r[Math.floor(COLS/2)]).filter(v=>v===AI).length; s+=center*6;
 for(let r=0;r<ROWS;r++)for(let c=0;c<COLS-3;c++)s+=scoreWindow(board[r].slice(c,c+4));
 for(let c=0;c<COLS;c++)for(let r=0;r<ROWS-3;r++)s+=scoreWindow([board[r][c],board[r+1][c],board[r+2][c],board[r+3][c]]);
 for(let r=0;r<ROWS-3;r++)for(let c=0;c<COLS-3;c++)s+=scoreWindow([board[r][c],board[r+1][c+1],board[r+2][c+2],board[r+3][c+3]]);
 for(let r=3;r<ROWS;r++)for(let c=0;c<COLS-3;c++)s+=scoreWindow([board[r][c],board[r-1][c+1],board[r-2][c+2],board[r-3][c+3]]);
 return s; }
