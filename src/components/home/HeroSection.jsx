import NowhereGameHubLogo from '@/components/brand/NowhereGameHubLogo';

export default function HeroSection({ onRandom }) {
  return (
    <section className="surface-shell relative w-full max-w-full overflow-hidden rounded-3xl p-4 sm:p-5 md:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current/30 to-transparent" />

      <div className="relative grid w-full min-w-0 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
        <div className="min-w-0 space-y-5">
          <div className="flex max-w-full flex-wrap items-center gap-2">
            {['Local-First', 'No Backend', 'Mini Games'].map((item) => (
              <span
                key={item}
                className="surface-control max-w-full truncate rounded-full px-3 py-1 font-hud text-[9px] uppercase tracking-[0.16em] text-muted sm:text-[10px] sm:tracking-[0.2em]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="min-w-0 space-y-3">
            <div className="w-full max-w-full overflow-hidden">
              <NowhereGameHubLogo
                href="/"
                animated
                className="mb-1 block w-full max-w-full"
              />
            </div>

            <p className="max-w-2xl break-words font-brand text-lg font-semibold leading-snug text-secondary sm:text-xl md:text-2xl">
              Play small games anywhere, even nowhere.
            </p>

            <p className="max-w-2xl break-words text-sm leading-6 text-muted sm:text-base md:text-lg md:leading-7">
              ศูนย์รวมมินิเกมเล่นง่าย โหลดไว เก็บคะแนนในเครื่อง ใช้งานได้โดยไม่ต้องมี Backend
              พร้อมระบบเกมแนะนำ รายการโปรด และประวัติเกมที่เล่นล่าสุด
            </p>
          </div>

          <div className="divider-frame w-32 sm:w-40" />

          <div className="grid w-full max-w-full gap-3 sm:grid-cols-3">
            <a
              href="#games"
              className="btn-primary-mono focus-frame inline-flex min-w-0 items-center justify-center rounded-2xl px-4 py-3 text-center text-sm font-bold sm:px-5 sm:text-base"
            >
              ดูรายการเกม
            </a>

            <button
              type="button"
              onClick={() => {
                if (typeof onRandom === 'function') {
                  onRandom();
                }
              }}
              className="surface-control focus-frame inline-flex min-w-0 items-center justify-center rounded-2xl px-4 py-3 text-center text-sm font-bold sm:px-5 sm:text-base"
            >
              สุ่มเกมให้เล่น
            </button>

            <a
              href="#recommended"
              className="surface-control focus-frame inline-flex min-w-0 items-center justify-center rounded-2xl px-4 py-3 text-center text-sm font-bold sm:px-5 sm:text-base"
            >
              เกมแนะนำ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
