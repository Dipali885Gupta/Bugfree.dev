"use client"

interface Step {
  week: string
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    week: "Week 1",
    title: "Scope & System Design",
    body: "Align on problem definition, user flows, API contracts, architecture decisions, milestones, and success criteria. Kill ambiguity before a line of code is written.",
  },
  {
    week: "Week 2–4",
    title: "Build & Iterate",
    body: "Ship in public with weekly demos, async feedback, and rapid product iteration. No disappearing for 4 weeks.",
  },
  {
    week: "Week 5+",
    title: "Launch & Harden",
    body: "Deploy to production with monitoring, load testing, and bug fixes. Transition into support if product gains traction.",
  },
]

const ProcessSection = () => {
  return (
    <section id="process" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title mt-4">Week by week. No ambiguity.</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.week} className="card-3d interactive-card flex flex-col p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="badge">{step.week}</span>
                <span className="font-display text-3xl font-extrabold text-[var(--color-primary)] opacity-40">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted" style={{ lineHeight: 1.65 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
