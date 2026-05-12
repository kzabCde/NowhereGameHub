import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import GridRunnerGame from '@/components/games/grid-runner/GridRunnerGame';
export default function Page() { return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Grid Runner</h2><p className='text-zinc-400'>วางแผนเส้นทาง หลบกำแพง และไปถึงเป้าหมายด้วยจำนวนก้าวน้อยที่สุด</p><GridRunnerGame /></PageShell>; }
