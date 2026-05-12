import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import MemorySequenceGame from '@/components/games/memory-sequence/MemorySequenceGame';

export default function Page() {
  return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Memory Sequence</h2><p className='text-slate-300'>จำลำดับสัญญาณและกดตามให้ถูกต้อง</p><MemorySequenceGame /></PageShell>;
}
