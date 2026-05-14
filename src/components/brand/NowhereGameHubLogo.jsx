'use client';

import Link from 'next/link';

export default function NowhereGameHubLogo({
  compact = false,
  href = '/',
  className = '',
  animated = true,
}) {
  const textSize = compact
    ? 'text-[clamp(1rem,4.5vw,1.4rem)] sm:text-2xl'
    : 'text-[clamp(2.2rem,9vw,4.8rem)] md:text-6xl lg:text-7xl';

  const content = (
    <span
      className={[
        'group/logo relative inline-flex max-w-full min-w-0 items-center gap-2.5 sm:gap-3',
        'rounded-2xl px-1 py-0.5 transition-all duration-300',
        'hover:-translate-y-px active:scale-[0.98]',
        animated ? 'logo-reveal' : '',
        className,
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'logo-status-dot relative h-2.5 w-2.5 shrink-0 rounded-full',
          'bg-sky-600 dark:bg-sky-300',
          'shadow-[0_0_14px_rgba(56,189,248,0.28)]',
          animated ? 'logo-dot-pulse' : '',
        ].join(' ')}
      />

      <span className="relative block min-w-0 max-w-full overflow-hidden">
        <span
          data-logo-text="NowhereGameHub"
          className={[
            'logo-hover-glitch relative z-10 block truncate font-brand font-black leading-none tracking-tight',
            'bg-gradient-to-r from-neutral-950 via-sky-600 to-neutral-950 bg-clip-text text-transparent',
            'dark:from-white dark:via-sky-300 dark:to-white',
            'drop-shadow-[0_0_0_rgba(56,189,248,0)] transition-[filter,text-shadow] duration-300',
            'group-hover/logo:drop-shadow-[0_0_10px_rgba(56,189,248,0.22)]',
            textSize,
          ].join(' ')}
        >
          NowhereGameHub
        </span>

        {animated && (
          <span
            aria-hidden="true"
            className="logo-shine pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent dark:via-white/35"
          />
        )}
      </span>
    </span>
  );

  if (!href) {
    return (
      <div aria-label="NowhereGameHub home" className="inline-flex max-w-full">
        {content}
      </div>
    );
  }

  return (
    <Link href={href} aria-label="NowhereGameHub home" className="inline-flex max-w-full min-w-0">
      {content}
    </Link>
  );
}
