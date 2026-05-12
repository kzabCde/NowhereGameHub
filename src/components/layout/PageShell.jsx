export default function PageShell({ children }) {
  return <div className='app-bg min-h-screen overflow-x-hidden p-4 md:p-8'><div className='relative z-10 mx-auto max-w-6xl space-y-6 surface-shell p-3 md:p-5'>{children}<footer className='pt-8 text-center text-sm text-secondary'>© 2026 <a href='https://nowheredev.vercel.app/' target='_blank' rel='noopener noreferrer' className='surface-control rounded-md px-2 py-1'>NOWHEREDEV</a></footer></div></div>;
}
