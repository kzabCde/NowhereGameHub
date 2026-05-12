export default function HeroSection({ onRandom }) {
  return (
    <section className="surface-shell relative overflow-hidden rounded-3xl p-6 md:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current/30 to-transparent" />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="surface-control rounded-full px-3 py-1 font-hud text-[10px] uppercase tracking-[0.2em] text-muted">
              Local-First
            </span>
            <span className="surface-control rounded-full px-3 py-1 font-hud text-[10px] uppercase tracking-[0.2em] text-muted">
              No Backend
            </span>
            <span className="surface-control rounded-full px-3 py-1 font-hud text-[10px] uppercase tracking-[0.2em] text-muted">
              Mini Games
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-400 bg-clip-text font-brand text-4xl font-black leading-tight text-transparent dark:from-blue-200 dark:via-sky-300 dark:to-cyan-200 md:text-6xl">
              NowhereGameHub
            </h1>

            <p className="max-w-2xl font-brand text-xl font-semibold text-secondary md:text-2xl">
              Play small games anywhere, even nowhere.
            </p>

            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">
              ศูนย์รวมมินิเกมเล่นง่าย โหลดไว เก็บคะแนนในเครื่อง ใช้งานได้โดยไม่ต้องมี Backend
              พร้อมระบบเกมแนะนำ รายการโปรด และประวัติเกมที่เล่นล่าสุด
            </p>
          </div>

          <div className="divider-frame w-40" />

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <a
              href="#games"
              className="btn-primary-mono focus-frame inline-flex items-center justify-center rounded-2xl px-5 py-3 font-bold"
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
              className="surface-control focus-frame inline-flex items-center justify-center rounded-2xl px-5 py-3 font-bold"
            >
              สุ่มเกมให้เล่น
            </button>

            <a
              href="#recommended"
              className="surface-control focus-frame inline-flex items-center justify-center rounded-2xl px-5 py-3 font-bold"
            >
              เกมแนะนำ
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
