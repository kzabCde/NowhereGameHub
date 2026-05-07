import './globals.css';

export const metadata = {
  title: 'Nowhere Game Hub',
  description: 'Local-first browser game hub',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
