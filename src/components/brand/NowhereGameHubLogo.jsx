'use client';

import Link from 'next/link';

export default function NowhereGameHubLogo({
  compact = false,
  href = '/',
  className = '',
  animated = true,
}) {
  const textSize = compact
    ? 'text-[clamp(1rem,4.8vw,1.45rem)] sm:text-2xl'
    : 'text-[clamp(2.4rem,10vw,5.4rem)] md:text-7xl lg:text-8xl';

  const content = (
    <span
      className={[
        'group/logo relative inline-flex max-w-full min-w-0 items-center gap-3',
        'rounded-2xl px-1 py-0.5',
        'transition-transform duration-300 ease-out',
        'hover:-translate-y-0.5 active:scale-[0.985]',
        animated ? 'nh-logo-reveal' : '',
        className,
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={['relative grid h-4 w-4 shrink-0 place-items-center', compact ? 'h-3 w-3' : 'h-4 w-4 md:h-5 md:w-5'].join(' ')}
      >
        <span className="absolute inset-0 rotate-45 border border-sky-300/60 shadow-[0_0_14px_rgba(125,211,252,0.18)]" />
        <span className={['h-1.5 w-1.5 rounded-full bg-sky-200 shadow-[0_0_10px_rgba(125,211,252,0.65)] nh-logo-glitch', animated ? 'nh-logo-core-pulse' : ''].join(' ')} />
      </span>

      <span className="relative block max-w-full overflow-hidden">
        <span
          className={[
            'relative z-10 block break-words font-brand font-black uppercase leading-[0.92]',
            'tracking-[0.08em] text-transparent sm:whitespace-nowrap',
            'bg-gradient-to-r from-white via-sky-300 to-white bg-clip-text',
            '[-webkit-text-stroke:1px_rgba(255,255,255,0.16)]',
            '[text-shadow:0_0_1px_rgba(255,255,255,0.9),0_0_14px_rgba(125,211,252,0.18)]',
            textSize,
          ].join(' ')}
        >
          NowhereGameHub
        </span>

        {animated && (
          <>
            <span aria-hidden="true" className="nh-logo-sharp-shine pointer-events-none absolute inset-y-0 left-0 z-20 w-1/5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <span aria-hidden="true" className="nh-logo-underline pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-sky-200/70 to-transparent" />
          </>
        )}
      </span>
    </span>
  );

  if (!href) return content;

  return <Link href={href} aria-label="NowhereGameHub home" className="inline-flex max-w-full">{content}</Link>;
}
