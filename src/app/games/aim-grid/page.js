import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import AimGridGame from '@/components/games/aim-grid/AimGridGame';
export default function Page() { return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Aim Grid</h2><p className='text-zinc-400'>เล็งเป้า คลิกให้ไว และรักษาความแม่นยำให้สูงที่สุด</p><AimGridGame /></PageShell>; }
