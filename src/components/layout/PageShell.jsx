export default function PageShell({ children }) {
  return <div className='app-bg min-h-screen overflow-x-hidden p-4 md:p-8'><div className='relative z-10 mx-auto max-w-6xl space-y-6'>{children}<footer className='pt-8 text-center text-sm text-zinc-600 dark:text-zinc-400'>© 2026 <a href='https://nowheredev.vercel.app/' target='_blank' rel='noopener noreferrer' className='pearl-border rounded-md px-1 underline underline-offset-4'>NOWHEREDEV</a></footer></div></div>;
}
