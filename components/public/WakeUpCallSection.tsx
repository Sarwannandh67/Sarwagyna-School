export function WakeUpCallSection() {
  return (
    <section className="bg-ink px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[12px] font-medium uppercase tracking-[2px] text-primary">
          The gap nobody talks about
        </p>

        <h2 className="mt-6 text-[34px] font-medium leading-tight sm:text-5xl">
          <span className="text-canvas-soft">Your degree teaches you what to know.</span>
          <br />
          <span className="text-canvas-soft/50">Nobody teaches you what to do with it.</span>
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="rounded-[12px] border border-white/5 bg-ink-soft p-6">
            <p className="text-[36px] font-medium text-canvas-soft">93%</p>
            <p className="mt-3 text-sm leading-relaxed text-body">
              of students graduate without understanding how a startup raises funding or what equity
              actually means.
            </p>
          </div>

          <div className="rounded-[12px] border border-white/5 bg-ink-soft p-6">
            <p className="text-[36px] font-medium text-canvas-soft">0</p>
            <p className="mt-3 text-sm leading-relaxed text-body">
              university lectures explain what a term sheet says, how VCs think, or what your first
              salary offer really should look like.
            </p>
          </div>

          <div className="rounded-[12px] border border-primary/20 bg-primary/10 p-6">
            <p className="text-[36px] font-medium text-primary">1</p>
            <p className="mt-3 text-sm leading-relaxed text-canvas-soft">
              school is fixing this. Free sessions. Real founders. The knowledge your syllabus
              skipped.
            </p>
          </div>
        </div>

        <p className="mt-12 max-w-[560px] text-base leading-relaxed text-body">
          You will graduate. The question is whether you graduate knowing what to do next — or
          spending six months figuring out what nobody told you.
        </p>
      </div>
    </section>
  );
}
