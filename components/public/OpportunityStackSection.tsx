interface OpportunityStackSectionProps {
  communityCount: string;
}

export function OpportunityStackSection({ communityCount }: OpportunityStackSectionProps) {
  return (
    <section className="border-t border-canvas-soft bg-canvas px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[12px] font-medium uppercase tracking-[2px] text-primary">
          What you actually get
        </p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="max-w-[400px] text-[28px] font-medium leading-tight text-ink sm:text-[40px]">
            Four things. All of them matter.
          </h2>
          <p className="max-w-[280px] text-[14px] leading-relaxed text-body">
            Most sessions give you knowledge. We give you the room, the people, and what comes
            after.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {/* Item 01 — spans full width */}
          <div className="rounded-[12px] bg-ink p-6 sm:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
              <p className="flex-shrink-0 text-[40px] font-medium leading-none text-primary">01</p>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[1.5px] text-primary">
                  Knowledge
                </p>
                <h3 className="mt-1 text-[22px] font-semibold leading-snug text-canvas-soft">
                  What nobody teaches in lecture halls.
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-body">
                  Every session covers something your syllabus skipped. Real frameworks. Real
                  decisions. Real consequences. Not a textbook version.
                </p>
              </div>
            </div>
          </div>

          {/* Item 02 */}
          <div className="rounded-[12px] bg-canvas-soft p-6">
            <p className="text-[40px] font-medium leading-none text-primary/40">02</p>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[1.5px] text-body-mid">
              Network
            </p>
            <h3 className="mt-1 text-[18px] font-semibold leading-snug text-ink">
              The people in the room matter.
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-body">
              {communityCount}+ students who show up, take notes, and stay connected after. The
              connections made here tend to matter later — not the LinkedIn connections you forget
              in a week.
            </p>
          </div>

          {/* Item 03 */}
          <div className="rounded-[12px] bg-canvas-soft p-6">
            <p className="text-[40px] font-medium leading-none text-primary/40">03</p>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[1.5px] text-body-mid">
              Opportunity
            </p>
            <h3 className="mt-1 text-[18px] font-semibold leading-snug text-ink">
              Before it gets posted publicly.
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-body">
              Job leads, internship openings, and founder referrals shared in the community before
              they hit any job board. By the time a role gets posted, someone here already knew.
            </p>
          </div>

          {/* Item 04 */}
          <div className="rounded-[12px] bg-canvas-soft p-6 sm:col-span-2 sm:col-start-1 md:col-span-1 md:col-start-auto">
            <p className="text-[40px] font-medium leading-none text-primary/40">04</p>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[1.5px] text-body-mid">
              Access
            </p>
            <h3 className="mt-1 text-[18px] font-semibold leading-snug text-ink">
              Direct lines to people who build things.
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-body">
              Every speaker is reachable after their session. Ask a sharp question in the Q&A.
              Follow up. That is how most of the real opportunities here begin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
