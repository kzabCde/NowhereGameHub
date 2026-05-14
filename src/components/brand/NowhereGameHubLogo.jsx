'use client';

import Link from 'next/link';

export default function NowhereGameHubLogo({
  compact = false,
  href = '/',
  className = '',
  animated = true,
}) {
  const textSize = compact
    ? 'text-[clamp(0.9rem,3.8vw,1.2rem)] sm:text-xl md:text-2xl'
    : 'text-[clamp(1.55rem,7vw,3.2rem)] sm:text-5xl md:text-6xl lg:text-7xl';

  const alignClass = compact ? 'text-left' : 'text-center sm:text-left';

  const content = (
    <span
      className={[
        'logo-wordmark group/logo relative inline-block max-w-full min-w-0 overflow-hidden rounded-xl',
        'transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.985]',
        animated ? 'logo-wordmark-reveal' : '',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'logo-wordmark-main relative z-20 block max-w-full break-words font-brand font-black uppercase leading-tight',
          'tracking-[0.015em] transition-all duration-300',
          'bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent',
          'drop-shadow-[0_0_18px_rgba(255,255,255,0.10)]',
          '[-webkit-text-stroke:0.35px_rgba(255,255,255,0.35)]',
          alignClass,
          textSize,
        ].join(' ')}
      >
        NowhereGameHub
      </span>

      {animated && (
        <>
          <span
            aria-hidden="true"
            className={[
              'logo-wordmark-glitch absolute inset-0 z-10 block max-w-full break-words font-brand font-black uppercase leading-tight',
              'tracking-[0.015em]',
              'bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent',
              '[-webkit-text-stroke:0.35px_rgba(255,255,255,0.22)]',
              alignClass,
              textSize,
            ].join(' ')}
          >
            NowhereGameHub
          </span>

          <span aria-hidden="true" className="logo-wordmark-shine pointer-events-none absolute inset-y-0 left-0 z-30 w-1/3" />

          <span aria-hidden="true" className="logo-wordmark-scan pointer-events-none absolute inset-x-0 top-0 z-40 h-px" />
        </>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="NowhereGameHub home" className="block max-w-full min-w-0 overflow-hidden">
      {content}
    </Link>
  );
}
