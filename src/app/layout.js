import './globals.css';
import ClientBoot from '@/components/layout/ClientBoot';
import { Noto_Sans_Thai, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const notoThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-noto-thai',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = { title: 'NowhereGameHub', description: 'Play small games anywhere, even nowhere.' };

export default function RootLayout({ children }) {
  return <html lang='th' suppressHydrationWarning className={`${notoThai.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} dark`}><body><ClientBoot />{children}</body></html>;
}
