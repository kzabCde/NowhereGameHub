import PageShell from '@/components/layout/PageShell'; import BackToHubButton from '@/components/layout/BackToHubButton'; import XOGame from '@/components/games/xo/XOGame';
export default function Page(){return <PageShell><BackToHubButton/><h2 className='font-brand text-2xl font-bold'>XO Battle</h2><XOGame/></PageShell>}
