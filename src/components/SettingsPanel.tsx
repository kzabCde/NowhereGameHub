'use client';
import { Download, RotateCcw, Upload } from 'lucide-react';
import { useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';

export default function SettingsPanel() {
  const ref = useRef<HTMLInputElement>(null);
  const { playerName, scores, importData, resetScores } = useGameStore();
  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ playerName, scores }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game-hub-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  return <div className='rounded-2xl border border-slate-700 bg-slate-900 p-4 space-y-3'><h2 className='font-semibold'>Settings</h2>
    <button className='w-full rounded bg-slate-800 p-2 flex items-center justify-center gap-2' onClick={exportJson}><Download size={16}/>Export JSON backup</button>
    <button className='w-full rounded bg-slate-800 p-2 flex items-center justify-center gap-2' onClick={()=>ref.current?.click()}><Upload size={16}/>Import JSON backup</button>
    <button className='w-full rounded bg-red-900/50 p-2 flex items-center justify-center gap-2' onClick={resetScores}><RotateCcw size={16}/>Reset scores</button>
    <input ref={ref} type='file' className='hidden' accept='application/json' onChange={async(e)=>{const f=e.target.files?.[0]; if(!f) return; const text=await f.text(); const data=JSON.parse(text); importData(data);}}/>
  </div>
}
