import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import CoreDefenseGame from '@/components/games/core-defense/CoreDefenseGame';

export default function Page(){
  return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Core Defense</h2><p className='text-zinc-400'>วางป้อม อัปเกรด และป้องกัน Core จากศัตรูที่บุกเข้ามา</p><CoreDefenseGame /></PageShell>;
}
