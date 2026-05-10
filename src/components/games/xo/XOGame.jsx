'use client';

import { useMemo, useState } from 'react';
import XOBoard from './XOBoard';
import { AI, PLAYER } from '@/lib/xo/constants';
import { checkWinner } from '@/lib/xo/winner';
import { easyMove, normalMove, hardMove } from '@/lib/xo/ai';
import { getNumberStorage, setNumberStorage } from '@/lib/storage';

export default function XOGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [difficulty, setDifficulty] = useState('hard');
  const [status, setStatus] = useState('ตาคุณ');
  const [winning, setWinning] = useState([]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({
    p: getNumberStorage('xoPlayerWins', 0),
    m: getNumberStorage('xoMachineWins', 0),
    d: getNumberStorage('xoDraws', 0),
  });

  const ai = useMemo(() => ({ easy: easyMove, normal: normalMove, hard: hardMove }), []);

  const done = (type, cells = []) => {
    setWinning(cells);
    setLocked(true);
    if (type === 'p') {
      setStatus('คุณชนะ!');
      const v = scores.p + 1;
      setScores((x) => ({ ...x, p: v }));
      setNumberStorage('xoPlayerWins', v);
      setNumberStorage('xoBestScore', getNumberStorage('xoBestScore', 0) + 1);
      setResult({ title: 'Victory', detail: 'วางแผนเฉียบคมมาก!', tone: 'text-emerald-300' });
    }
    if (type === 'm') {
      setStatus('Machine ชนะ!');
      const v = scores.m + 1;
      setScores((x) => ({ ...x, m: v }));
      setNumberStorage('xoMachineWins', v);
      setResult({ title: 'Defeat', detail: 'AI อ่านเกมได้ขาด ลองเริ่มใหม่', tone: 'text-rose-300' });
    }
    if (type === 'd') {
      setStatus('เสมอ!');
      const v = scores.d + 1;
      setScores((x) => ({ ...x, d: v }));
      setNumberStorage('xoDraws', v);
      setResult({ title: 'Draw', detail: 'สูสีมาก! เกมนี้ไม่มีใครพลาด', tone: 'text-amber-300' });
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setLocked(false);
    setWinning([]);
    setStatus('ตาคุณ');
    setResult(null);
  };

  const move = (i) => {
    if (locked || board[i]) return;
    const n = [...board];
    n[i] = PLAYER;
    setBoard(n);

    const cw = checkWinner(n, PLAYER);
    if (cw) return done('p', cw);
    if (n.every(Boolean)) return done('d');

    setLocked(true);
    setStatus('Machine กำลังคิด...');
    setTimeout(() => {
      const x = [...n];
      const m = ai[difficulty](x);
      x[m] = AI;
      setBoard(x);
      const aw = checkWinner(x, AI);
      if (aw) return done('m', aw);
      if (x.every(Boolean)) return done('d');
      setLocked(false);
      setStatus('ตาคุณ');
    }, 320);
  };

  return <div className='space-y-3'>
    <div className='glass p-3 flex gap-2'>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className='bg-white/10 rounded-xl px-2'>
        <option value='easy'>easy</option><option value='normal'>normal</option><option value='hard'>hard</option>
      </select>
      <button className='glass px-2' onClick={reset}>Reset Game</button>
    </div>
    <p className='font-semibold'>{status}</p>
    <XOBoard board={board} onClick={move} winning={winning} locked={locked} />
    <div className='grid grid-cols-3 gap-2 text-sm'>
      <div className='glass p-2'>Player {scores.p}</div><div className='glass p-2'>Machine {scores.m}</div><div className='glass p-2'>Draw {scores.d}</div>
    </div>
    {result && <div className='glass p-4 animate-in-pop'>
      <p className={`text-lg font-bold ${result.tone}`}>{result.title}</p>
      <p className='text-sm text-slate-200'>{result.detail}</p>
    </div>}
  </div>;
}
