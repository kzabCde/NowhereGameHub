import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import CircuitLinkGame from '@/components/games/circuit-link/CircuitLinkGame';

export default function Page() {
  return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Circuit Link</h2><p className='text-slate-300'>หมุนชิ้นส่วนวงจรเพื่อเชื่อมพลังงานสู่ Core</p><CircuitLinkGame /></PageShell>;
}
