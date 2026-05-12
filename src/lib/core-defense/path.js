import { BOARD_SIZE } from './constants';

export const PATH_CELLS = [
  [4, 0],[4, 1],[4, 2],[4, 3],[3, 3],[2, 3],[2, 4],[2, 5],[3, 5],[4, 5],[5, 5],[6, 5],[6, 6],[6, 7],[5, 7],[4, 7],[3, 7],[3, 8],[3, 9],
];

export const SPAWN_CELL = PATH_CELLS[0];
export const CORE_CELL = PATH_CELLS[PATH_CELLS.length - 1];

export const createCellTypeMap = () => {
  const map = Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => 'buildable'));
  PATH_CELLS.forEach(([r, c], idx) => {
    map[r][c] = idx === 0 ? 'spawn' : idx === PATH_CELLS.length - 1 ? 'core' : 'path';
  });
  return map;
};
