import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import CipherTypingGame from '@/components/games/cipher-typing/CipherTypingGame';

export default function Page() {
  return <PageShell><BackToHubButton href='/' /><h2 className='font-brand text-2xl font-bold'>Cipher Typing</h2><p className='text-sm text-zinc-400'>พิมพ์รหัสคำสั่งให้เร็วและแม่น ก่อนเวลาหมด</p><CipherTypingGame /></PageShell>;
}
