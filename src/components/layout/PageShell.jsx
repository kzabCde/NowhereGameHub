import Footer from '@/components/layout/Footer';

export default function PageShell({ children }) {
  return (
    <main id='top' className='app-bg min-h-screen overflow-x-hidden p-4 md:p-8'>
      <div className='relative z-10 mx-auto max-w-6xl space-y-6 surface-shell p-3 md:p-5'>
        {children}
        <Footer />
      </div>
    </main>
  );
}
