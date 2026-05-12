import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import CodeBreakerGame from '@/components/games/code-breaker/CodeBreakerGame';

export default function Page() {
  return <PageShell><BackToHubButton href='/' /><h2 className='font-brand text-2xl font-bold'>Code Breaker</h2><p className='text-sm text-zinc-400'>ถอดรหัสลับด้วยตรรกะและการวิเคราะห์</p><CodeBreakerGame /></PageShell>;
}
