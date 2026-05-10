import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import SnakeGame from '@/components/games/snake/SnakeGame';

export default function Page() {
  return <PageShell><BackToHubButton /><h2 className='text-2xl font-bold'>Snake</h2><SnakeGame /></PageShell>;
}
