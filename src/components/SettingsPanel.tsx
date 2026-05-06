import type { ChangeEvent } from 'react';
import { useGameStore } from '../store/useGameStore';
export function SettingsPanel(){const {playerName,theme,history,setPlayerName,setTheme,resetAll,importData}=useGameStore();
const exp=()=>{const d={playerName,theme,history}; const blob=new Blob([JSON.stringify(d,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='local-game-hub-backup.json'; a.click();};
const imp=(e:ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0]; if(!f)return; f.text().then((t)=>importData(JSON.parse(t)));};
return <div className='space-y-3 card'><label>Player Name<input className='input' value={playerName} onChange={(e)=>setPlayerName(e.target.value)} /></label><button className='btn' onClick={()=>setTheme(theme==='light'?'dark':'light')}>Theme: {theme}</button><button className='btn' onClick={exp}>Export JSON</button><label className='btn inline-flex'>Import JSON<input className='hidden' type='file' accept='application/json' onChange={imp}/></label><button className='btn bg-red-500' onClick={resetAll}>Reset Local Data</button></div>
}
