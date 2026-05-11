import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import NumberNinjaGame from '@/components/games/number-ninja/NumberNinjaGame';

export default function Page() {
  return <PageShell><BackToHubButton /><h2 className='text-2xl font-bold'>Number Ninja</h2><NumberNinjaGame /></PageShell>;
}
