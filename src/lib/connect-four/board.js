import { ROWS, COLS, EMPTY } from './constants';
export const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
export const cloneBoard = (board) => board.map((r) => [...r]);
export const getValidColumns = (board) => board[0].map((v, c) => (v === EMPTY ? c : -1)).filter((v) => v >= 0);
export function dropPiece(board, col, piece) { for (let r = ROWS - 1; r >= 0; r -= 1) { if (board[r][col] === EMPTY) { board[r][col] = piece; return r; } } return -1; }
export const isBoardFull = (board) => getValidColumns(board).length === 0;
