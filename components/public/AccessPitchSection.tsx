export function AccessPitchSection() {
  const bullets = [
    'Speakers are reachable after every session',
    'Some are actively looking for talent right now',
    'Every session is a live introduction to someone who matters',
  ];

  return (
    <section className="bg-canvas-soft px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[2px] text-primary">
              Why these sessions are different
            </p>

            <h2 className="mt-5 max-w-[420px] text-[28px] font-medium leading-tight tracking-tight text-ink sm:text-[40px]">
              The person teaching is the person who might hire you.
            </h2>

            <p className="mt-6 text-[15px] leading-relaxed text-body">
              Every speaker at Sarwagyna School is an active founder or practitioner — not a career
              coach, not a theorist. They are in the room because they chose to be.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-body">
              They make hiring decisions. They give referrals. They remember the students who ask
              sharp questions.
            </p>

            <p className="mt-6 text-[16px] font-medium text-ink">
              The session is not the point.
              <br />
              The access is the point.
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] text-body">
                  <span className="mt-0.5 font-medium text-primary" aria-hidden="true">
                    →
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — 3 stacked cards */}
          <div className="flex flex-col gap-2">
            <div className="rounded-[12px] border border-ink/10 bg-canvas p-5">
              <p className="text-[11px] font-medium uppercase tracking-[1.5px] text-body-mid">
                What you learn
              </p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-ink">
                How startups raise funding, fail, and scale — the unfiltered version.
              </p>
            </div>

            <div className="flex justify-center py-1" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 15l7 7 7-7"
                  stroke="#ff4f00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="rounded-[12px] bg-ink p-5">
              <p className="text-[11px] font-medium uppercase tracking-[1.5px] text-primary">
                What you unlock
              </p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-canvas-soft">
                Direct access to the founder who built it. The one currently looking for their next
                hire.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Actively looking for talent
              </span>
            </div>

            <div className="flex justify-center py-1" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 15l7 7 7-7"
                  stroke="#ff4f00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="rounded-[12px] border border-primary/30 bg-canvas p-5">
              <p className="text-[11px] font-medium uppercase tracking-[1.5px] text-primary">
                The outcome
              </p>
              <p className="mt-2 text-[15px] font-medium leading-snug text-ink">
                A conversation that starts here and ends with an internship, a referral, or a role
                that was never posted publicly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
