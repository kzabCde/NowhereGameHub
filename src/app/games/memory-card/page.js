import PageShell from '@/components/layout/PageShell'; import BackToHubButton from '@/components/layout/BackToHubButton'; import MemoryCardGame from '@/components/games/memory-card/MemoryCardGame';
export default function Page(){return <PageShell><BackToHubButton/><h2 className='font-brand text-2xl font-bold'>Memory Card</h2><MemoryCardGame/></PageShell>}
