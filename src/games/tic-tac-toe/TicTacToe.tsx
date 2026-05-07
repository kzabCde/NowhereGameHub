'use client';

import { useMemo, useState } from 'react';
import { GameComponentProps } from '@/types/game';

type Mark = 'X' | 'O' | null;
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe({ onGameEnd, playerName }: GameComponentProps) {
  const [board, setBoard] = useState<Mark[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [reported, setReported] = useState(false);

  const winnerLine = useMemo(
    () => WIN_LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]),
    [board],
  );
  const winner = winnerLine ? board[winnerLine[0]] : null;
  const isDraw = !winner && board.every(Boolean);

  const play = (index: number) => {
    if (board[index] || winner || isDraw) return;
    const next = [...board];
    next[index] = isXTurn ? 'X' : 'O';
    setBoard(next);
    setIsXTurn((v) => !v);

    const newWinnerLine = WIN_LINES.find(([a, b, c]) => next[a] && next[a] === next[b] && next[a] === next[c]);
    const newWinner = newWinnerLine ? next[newWinnerLine[0]] : null;

    if (newWinner && !reported) {
      setReported(true);
      const playerWon = newWinner === 'X';
      onGameEnd({ score: playerWon ? 120 : 80, won: playerWon, details: `${playerName} is X · Winner ${newWinner}` });
      return;
    }
    if (!newWinner && next.every(Boolean) && !reported) {
      setReported(true);
      onGameEnd({ score: 90, won: false, details: 'Draw match' });
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setReported(false);
  };

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-300'>You are X. Turn: {isXTurn ? 'X' : 'O (CPU style)'}</p>
      <div className='grid max-w-xs grid-cols-3 gap-2'>
        {board.map((cell, index) => (
          <button key={index} className='aspect-square rounded-lg bg-slate-800 text-2xl font-bold' onClick={() => play(index)}>
            {cell}
          </button>
        ))}
      </div>
      {(winner || isDraw) && <button onClick={reset} className='rounded-lg bg-indigo-600 px-4 py-2'>Play again</button>}
    </div>
  );
}
