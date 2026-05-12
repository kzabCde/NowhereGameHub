export default function HeroSection({ onRandom }) {
  return (
    <section className="surface-shell relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-current/10" />
        <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full border border-current/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current/30 to-transparent" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-current/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span className="font-hud text-[10px] uppercase tracking-[0.22em] text-muted">
              NOWHERE LOCAL GAME SYSTEM
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="font-brand text-4xl font-black leading-tight text-primary md:text-6xl lg:text-7xl">
              NowhereGameHub
            </h2>

            <p className="max-w-2xl font-brand text-xl font-semibold text-secondary md:text-2xl">
              Play small games anywhere, even nowhere.
            </p>

            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">
              รวมมินิเกมแนว Sci-Fi เล่นง่าย โหลดไว ไม่ต้องใช้ Backend
              พร้อมระบบคะแนน เกมแนะนำ รายการโปรด และประวัติเกมที่เล่นล่าสุด
            </p>
          </div>

          <div className="divider-frame w-40" />

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#games"
              className="btn-primary-mono focus-frame inline-flex items-center justify-center rounded-2xl px-5 py-3 font-bold"
            >
              ดูรายการเกม
            </a>

            <button
              type="button"
              onClick={onRandom}
              className="surface-control focus-frame inline-flex items-center justify-center rounded-2xl px-5 py-3 font-bold"
            >
              สุ่มเกมให้เล่น
            </button>
          </div>
        </div>

        <div className="surface-card relative overflow-hidden rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-hud text-[10px] uppercase tracking-[0.22em] text-muted">
              SYSTEM STATUS
            </p>

            <span className="rounded-full border border-current/10 px-3 py-1 font-hud text-[10px] uppercase tracking-[0.18em] text-secondary">
              Online
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["Mode", "Local-First"],
              ["Backend", "None"],
              ["Saves", "Local"],
              ["Theme", "Pearl"],
            ].map(([label, value]) => (
              <div key={label} className="surface-panel rounded-2xl p-4">
                <p className="font-hud text-[10px] uppercase tracking-[0.18em] text-muted">
                  {label}
                </p>

                <p className="mt-2 font-brand text-xl font-black text-primary">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-current/10 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-hud text-[10px] uppercase tracking-[0.18em] text-muted">
                Recommended Flow
              </span>

              <span className="font-hud text-xs text-secondary">Ready</span>
            </div>

            <div className="space-y-2">
              <div className="h-2 rounded-full bg-current/10">
                <div className="h-2 w-10/12 rounded-full bg-current/70" />
              </div>

              <div className="h-2 rounded-full bg-current/10">
                <div className="h-2 w-7/12 rounded-full bg-current/50" />
              </div>

              <div className="h-2 rounded-full bg-current/10">
                <div className="h-2 w-9/12 rounded-full bg-current/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}