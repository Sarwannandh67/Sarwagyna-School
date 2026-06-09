import Link from 'next/link';

interface SchoolVisionSectionProps {
  communityCount: string;
}

export function SchoolVisionSection({ communityCount }: SchoolVisionSectionProps) {
  const milestones = [
    {
      year: 'Now',
      title: 'Free live sessions',
      body: `Founder-taught sessions, community of ${communityCount}+, and the knowledge your syllabus skipped.`,
      active: true,
    },
    {
      year: '2027',
      title: 'Low-cost deep courses',
      body: 'Paid workshops and cohort programs for students who want to go further.',
      active: false,
    },
    {
      year: 'Future',
      title: 'A real institution',
      body: 'A school — and eventually a college — that closes this gap for good.',
      active: false,
    },
  ];

  return (
    <section className="border-t border-canvas-soft bg-canvas px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[12px] font-medium uppercase tracking-[2px] text-primary">
          Why we built this
        </p>

        <h2 className="mt-6 text-[34px] font-medium leading-tight sm:text-5xl">
          <span className="text-ink">One day, a real institution.</span>
          <br />
          <span className="text-body">Today, the beginning.</span>
        </h2>

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {/* Left — story */}
          <div>
            <p className="text-[18px] leading-relaxed text-body">
              Sarwagyna School was not built to be another webinar platform. It was built to close a
              gap that exists everywhere — the space between what universities teach and what the
              real world requires.
            </p>

            <p className="mt-5 text-base leading-relaxed text-body">
              That gap costs students six months to two years of confusion after graduation. Most
              figure it out eventually. Some don&apos;t. We are building the thing that shortens
              that.
            </p>

            <p className="mt-6 text-base font-medium text-ink">
              Free sessions and a community are where it starts.
              <br />
              A full institution is where it ends.
              <br />
              You are here at the beginning.
            </p>
          </div>

          {/* Right — milestone timeline */}
          <div className="flex flex-col gap-3">
            {milestones.map((m) => (
              <div
                key={m.year}
                className={`relative rounded-[12px] p-5 ${
                  m.active ? 'bg-ink' : 'bg-canvas-soft'
                }`}
              >
                {m.active && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    Live
                  </span>
                )}
                <p
                  className={`text-[14px] font-bold ${m.active ? 'text-primary' : 'text-body-mid'}`}
                >
                  {m.year}
                </p>
                <p
                  className={`mt-1 text-[14px] font-semibold ${
                    m.active ? 'text-canvas-soft' : 'text-ink'
                  }`}
                >
                  {m.title}
                </p>
                <p
                  className={`mt-1 text-[12px] leading-relaxed ${
                    m.active ? 'text-body' : 'text-body-mid'
                  }`}
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 border-t border-canvas-soft pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex-shrink-0">
              <p className="text-[40px] font-medium leading-none text-ink">{communityCount}+</p>
              <p className="mt-1 text-[14px] text-body">
                Students already inside.
                <br />
                Growing every session.
              </p>
            </div>

            <div className="hidden h-12 w-px bg-canvas-soft sm:block" aria-hidden="true" />

            <p className="max-w-[360px] text-[14px] leading-relaxed text-body">
              The students who join at the start of something are the ones who shape it. The
              community is open now. The seat is free.
            </p>

            <div className="flex-shrink-0">
              <Link
                href="/community"
                className="text-[14px] font-semibold text-primary hover:underline"
              >
                Learn about the community →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
