import './globals.css';
import ClientBoot from '@/components/layout/ClientBoot';

export const metadata = { title: 'NowhereGameHub', description: 'Play small games anywhere, even nowhere.' };

export default function RootLayout({ children }) {
  return <html lang='th' suppressHydrationWarning><body><ClientBoot />{children}</body></html>;
}
