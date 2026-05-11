'use client';
import { useState } from 'react';
import ConnectFourBoard from './ConnectFourBoard';
import DifficultySelector from './DifficultySelector';
import { AI, PLAYER } from '@/lib/connect-four/constants';
import { createEmptyBoard, cloneBoard, dropPiece, isBoardFull } from '@/lib/connect-four/board';
import { checkWinner } from '@/lib/connect-four/winner';
import { getEasyMove, getNormalMove, getHardMove, getExpertMove } from '@/lib/connect-four/ai';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';

const aiFn = { easy: getEasyMove, normal: getNormalMove, hard: getHardMove, expert: getExpertMove };

export default function ConnectFourGame() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [difficulty, setDifficulty] = useState('hard');
  const [status, setStatus] = useState('ตาคุณ');
  const [locked, setLocked] = useState(false);
  const [winning, setWinning] = useState([]);
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({ p: getNumberStorage('connectFourPlayerWins', 0), m: getNumberStorage('connectFourMachineWins', 0), d: getNumberStorage('connectFourDraws', 0) });

  const end = (type, cells = []) => {
    setWinning(cells); setLocked(true);
    if (type === 'p') { setStatus('คุณชนะ!'); const v = scores.p + 1; setScores((s) => ({ ...s, p: v })); setNumberStorage('connectFourPlayerWins', v); setNumberStorage('connectFourBestScore', getNumberStorage('connectFourBestScore', 0) + 1); setResult({ title: 'Victory', detail: 'ปิดเกมได้สมบูรณ์แบบ!', tone: 'text-emerald-300' }); }
    if (type === 'm') { setStatus('Machine ชนะ!'); const v = scores.m + 1; setScores((s) => ({ ...s, m: v })); setNumberStorage('connectFourMachineWins', v); setResult({ title: 'Defeat', detail: 'AI จัดคอมโบชนะ ลองแก้ทางใหม่', tone: 'text-rose-300' }); }
    if (type === 'd') { setStatus('เสมอ!'); const v = scores.d + 1; setScores((s) => ({ ...s, d: v })); setNumberStorage('connectFourDraws', v); setResult({ title: 'Draw', detail: 'เกมยื้อถึงจังหวะสุดท้าย', tone: 'text-amber-300' }); }
  };

  const reset = () => { setBoard(createEmptyBoard()); setWinning([]); setLocked(false); setStatus('ตาคุณ'); setResult(null); };

  const move = (col) => {
    if (locked) return;
    const b = cloneBoard(board); if (dropPiece(b, col, PLAYER) < 0) return;
    const win = checkWinner(b, PLAYER); setBoard(b);
    if (win.hasWon) return end('p', win.cells); if (isBoardFull(b)) return end('d');

    setLocked(true); setStatus('Machine กำลังคิด...');
    setTimeout(() => {
      const n = cloneBoard(b); const c = aiFn[difficulty](n);
      if (c === undefined || dropPiece(n, c, AI) < 0) { setLocked(false); setStatus('ตาคุณ'); return; }
      const aiw = checkWinner(n, AI); setBoard(n);
      if (aiw.hasWon) return end('m', aiw.cells); if (isBoardFull(n)) return end('d');
      setLocked(false); setStatus('ตาคุณ');
    }, 360);
  };

  return <div className='space-y-4'><div className='metal-card p-3 flex gap-2 items-center'>ระดับ <DifficultySelector value={difficulty} onChange={setDifficulty} /><button className='metal-card px-3' onClick={reset}>Reset Game</button></div><p className='font-brand font-semibold'>{status}</p><ConnectFourBoard board={board} onColClick={move} winning={winning} isLocked={locked} /><div className='grid grid-cols-3 gap-2'><div className='font-hud metal-card p-2'>Player {scores.p}</div><div className='font-hud metal-card p-2'>Machine {scores.m}</div><div className='font-hud metal-card p-2'>Draw {scores.d}</div></div>{result && <div className='metal-card p-4 animate-in-pop'><p className={`text-lg font-bold ${result.tone}`}>{result.title}</p><p className='text-sm text-slate-200'>{result.detail}</p></div>}</div>;
}
