import PageShell from '@/components/layout/PageShell';
import BackToHubButton from '@/components/layout/BackToHubButton';
import MathRainGame from '@/components/games/math-rain/MathRainGame';

export default function Page() {
  return <PageShell><BackToHubButton /><h2 className='font-brand text-2xl font-bold'>Math Rain</h2><p className='text-slate-300'>พิมพ์คำตอบก่อนฝนโจทย์ตกถึงพื้น</p><MathRainGame /></PageShell>;
}
