export default function Footer() {
  return (
    <footer className="surface-shell mt-10 rounded-3xl px-5 py-5 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-hud text-[10px] uppercase tracking-[0.22em] text-muted">
            Local Game System
          </p>

          <p className="text-sm text-muted">
            © 2026{' '}
            <a
              href="https://nowheredev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit NOWHEREDEV"
              className="font-hud font-semibold tracking-[0.16em] text-muted underline-offset-4 transition-all duration-200 hover:-translate-y-px hover:text-secondary hover:underline focus-visible:text-secondary focus-visible:underline focus-visible:outline-none"
            >
              NOWHEREDEV
            </a>
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-2 text-xs"
        >
          <a
            href="#recommended"
            className="surface-control focus-frame rounded-full px-3 py-1.5 font-hud uppercase tracking-[0.16em] text-muted transition-all duration-200 hover:-translate-y-px hover:text-secondary"
          >
            เกมแนะนำ
          </a>

          <a
            href="#games"
            className="surface-control focus-frame rounded-full px-3 py-1.5 font-hud uppercase tracking-[0.16em] text-muted transition-all duration-200 hover:-translate-y-px hover:text-secondary"
          >
            เกมทั้งหมด
          </a>

          <a
            href="#top"
            className="surface-control focus-frame rounded-full px-3 py-1.5 font-hud uppercase tracking-[0.16em] text-muted transition-all duration-200 hover:-translate-y-px hover:text-secondary"
          >
            กลับด้านบน
          </a>
        </nav>
      </div>

      <div className="divider-frame my-4" />

      <div className="flex flex-col gap-2 font-hud text-[10px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p>Local-first // No Backend // Built for mini games</p>
        <p>NowhereGameHub v1.0.0</p>
      </div>
    </footer>
  );
}
