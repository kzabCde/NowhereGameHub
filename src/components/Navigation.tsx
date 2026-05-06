import { navItems } from '../data/nav';
import { useAppStore } from '../store/useAppStore';

const mainItems = navItems.slice(0, 5);

export function Navigation() {
  const page = useAppStore((s) => s.page);
  const setPage = useAppStore((s) => s.setPage);

  return (
    <>
      <aside className="hidden md:flex w-64 p-4 border-r border-slate-200 dark:border-slate-800 flex-col gap-2">
        <h1 className="text-xl font-bold mb-4">Local Game Hub</h1>
        {mainItems.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setPage(key)} className={`p-3 rounded-xl flex gap-2 ${page === key ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-900'}`}><Icon size={18} />{label}</button>
        ))}
      </aside>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 grid grid-cols-5 p-2 z-20">
        {mainItems.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setPage(key)} className={`p-2 rounded-lg text-xs ${page === key ? 'bg-indigo-500 text-white' : ''}`}><Icon className="mx-auto" size={16} />{label}</button>
        ))}
      </nav>
    </>
  );
}
