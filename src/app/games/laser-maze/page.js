import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import LaserMazeGame from '@/components/games/laser-maze/LaserMazeGame';

export default function Page() {
  return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Laser Maze</h2><p className='text-slate-300'>หมุนกระจกให้ลำแสงเดินทางถึงเป้าหมาย</p><LaserMazeGame /></PageShell>;
}
