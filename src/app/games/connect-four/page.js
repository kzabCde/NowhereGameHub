import PageShell from '@/components/layout/PageShell'; import BackToHubButton from '@/components/layout/BackToHubButton'; import ConnectFourGame from '@/components/games/connect-four/ConnectFourGame';
export default function Page(){return <PageShell><BackToHubButton/><h2 className='font-brand text-2xl font-bold'>4 In A Row</h2><ConnectFourGame/></PageShell>}
