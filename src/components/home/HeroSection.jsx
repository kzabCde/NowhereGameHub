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

        <div className="surface-card min-w-0 rounded-3xl p-4 sm:p-5">
          <div className="mb-4 flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-hud text-[9px] uppercase tracking-[0.18em] text-muted sm:text-[10px] sm:tracking-[0.2em]">
                System
              </p>

              <h2 className="mt-1 truncate font-brand text-xl font-black text-primary sm:text-2xl">
                Ready
              </h2>
            </div>

            <div className="shrink-0 rounded-2xl border border-current/10 px-3 py-2 font-hud text-[10px] text-secondary sm:px-4 sm:text-xs">
              ONLINE
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ['บันทึกคะแนน', 'localStorage'],
              ['ระบบเกมแนะนำ', 'Auto Slide'],
              ['ธีมเว็บไซต์', 'Dark Mode'],
              ['สถานะระบบ', 'No Database'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="surface-panel flex min-w-0 items-center justify-between gap-3 rounded-2xl p-3 sm:p-4"
              >
                <span className="min-w-0 truncate text-sm text-secondary sm:text-base">
                  {label}
                </span>

                <span className="shrink-0 font-hud text-xs text-primary sm:text-sm">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
