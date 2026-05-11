import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import ReactionRushGame from '@/components/games/reaction-rush/ReactionRushGame';

export default function Page() {
  return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Reaction Rush</h2><ReactionRushGame /></PageShell>;
}
