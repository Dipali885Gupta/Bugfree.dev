"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Gauge, Headphones, ArrowRight, CheckCircle } from "lucide-react"

interface Phase {
  icon: typeof Target
  number: string
  title: string
  timeline: string
  body: string
  outcomes: string[]
  highlight: string
}

const PHASES: Phase[] = [
  {
    icon: Target,
    number: "01",
    title: "Scope & Build MVP",
    timeline: "Under 3 weeks",
    body: "We align on your vision, define the scope, and ship a production-grade MVP. No ambiguity, no scope creep — just a working product with real architecture.",
    outcomes: [
      "Clear spec with user flows and milestones",
      "Production-grade MVP deployed on your infra",
      "Admin dashboard and user auth included",
      "Clean codebase with full handoff docs",
    ],
    highlight: "From zero to deployed in weeks — not months",
  },
  {
    icon: Gauge,
    number: "02",
    title: "Iterate & Scale",
    timeline: "Ongoing",
    body: "Once the MVP is live, we run weekly sprints to ship features, improve UX, optimize performance, and prepare your product for growth.",
    outcomes: [
      "Feature sprints with clear priorities",
      "Performance optimization and scalability hardening",
      "User feedback integration and UX polish",
      "Architecture evolution as you grow",
    ],
    highlight: "Ship features every week — not every quarter",
  },
  {
    icon: Headphones,
    number: "03",
    title: "Support & Partnership",
    timeline: "Weekly calls",
    body: "We stay with you. Weekly sync calls, async communication, ongoing maintenance, and strategic advice to keep your product ahead.",
    outcomes: [
      "Weekly strategy and progress calls",
      "Active communication on Slack / WhatsApp",
      "Bug fixes and hotfix SLA under 24 hours",
      "Ongoing product and growth consulting",
    ],
    highlight: "A partner who cares about outcomes — not just output",
  },
]

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.fonts?.ready.then(() => {
            section.classList.add("opacity-100")
          })
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.abs(rect.top)
      const pct = Math.min(Math.max(scrolled / total, 0), 1)
      setProgress(pct)
      const idx = Math.min(Math.floor(pct * PHASES.length), PHASES.length - 1)
      setActiveStep(idx)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section relative opacity-0 transition-opacity duration-700"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[40%] top-[10%] h-[50%] w-[30%] rounded-full blur-3xl" style={{ background: "var(--color-primary-glow)" }} />
      </div>

      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">Our process</span>
          <h2 className="section-title mt-4">Three phases. Clear outcomes.</h2>
          <p className="section-sub mt-4">
            From scope to shipped to scale — we move fast and stay engaged.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-10 hidden h-1.5 overflow-hidden rounded-full bg-[var(--color-border)] md:block">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${(progress * 100).toFixed(0)}%`,
              background: "linear-gradient(90deg, var(--color-primary), var(--color-blue))",
            }}
          />
        </div>

        {/* Phases */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PHASES.map((phase, i) => {
            const Icon = phase.icon
            const isActive = i === activeStep

            return (
              <div
                key={phase.number}
                className={`group relative rounded-2xl border p-6 md:p-7 transition-all duration-500 ${
                  isActive
                    ? "border-[var(--color-primary)]/40 shadow-lg shadow-[var(--color-primary)]/5"
                    : "border-[var(--color-border)] hover:border-[var(--color-primary)]/20"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(180deg, rgba(25,211,197,0.06), transparent)"
                    : "linear-gradient(180deg, var(--color-surface), var(--color-surface-2))",
                }}
              >
                {/* Number badge */}
                <div className="flex items-start justify-between">
                  <span className="icon-pill">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`font-display text-4xl font-extrabold transition-colors duration-300 ${
                      isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-faint)]"
                    }`}
                  >
                    {phase.number}
                  </span>
                </div>

                {/* Timeline tag */}
                <span className="badge mt-4 inline-flex">{phase.timeline}</span>

                {/* Title */}
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-muted" style={{ lineHeight: 1.65 }}>
                  {phase.body}
                </p>

                {/* Outcomes */}
                <ul className="mt-5 space-y-2">
                  {phase.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2.5 text-sm text-muted">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlight */}
                <div
                  className={`mt-5 rounded-xl border p-3 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "border-[var(--color-primary)]/20 text-[var(--color-primary)]"
                      : "border-[var(--color-divider)] text-muted opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: isActive ? "rgba(25,211,197,0.06)" : "transparent",
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <ArrowRight className="h-3 w-3" />
                    {phase.highlight}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center reveal-up">
          <p className="text-sm text-muted">
            Each phase is tailored to your product stage. Not every project needs all three.
          </p>
          <a
            href="https://calendly.com/getcodefree/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-4"
          >
            Start with a scoping call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
