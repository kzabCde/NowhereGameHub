export const ROWS = 6; export const COLS = 7;
export const emptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));
export const getDropRow = (board, col) => { for (let r = ROWS - 1; r >= 0; r--) if (!board[r][col]) return r; return -1; };
export const makeMove = (board, col, player) => { const row = getDropRow(board, col); if (row < 0) return null; const next = board.map((rr) => [...rr]); next[row][col] = player; return { board: next, row, col }; };
export const validMoves = (board) => Array.from({ length: COLS }, (_, c) => c).filter((c) => getDropRow(board, c) >= 0);
