import { Gamepad2, Home, Settings, Trophy } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
const nav=[['home','Home',Home],['games','Games',Gamepad2],['leaderboard','Leaderboard',Trophy],['settings','Settings',Settings]] as const;
export function Layout({children}:{children:React.ReactNode}){const {page,setPage}=useGameStore();
return <div className='min-h-screen md:flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100'><aside className='hidden md:block w-64 p-4 border-r border-slate-200 dark:border-slate-800'><h1 className='text-2xl font-bold mb-4'>Local Game Hub</h1><div className='space-y-2'>{nav.map(([k,l,I])=><button key={k} className={`w-full navbtn ${page===k?'active':''}`} onClick={()=>setPage(k as any)}><I size={16}/>{l}</button>)}</div></aside><main className='flex-1 p-4 pb-24 md:pb-6'>{children}</main><nav className='md:hidden fixed bottom-0 left-0 right-0 grid grid-cols-4 p-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800'>{nav.map(([k,l,I])=><button key={k} className={`navbtn ${page===k?'active':''}`} onClick={()=>setPage(k as any)}><I size={16}/>{l}</button>)}</nav></div>
}
