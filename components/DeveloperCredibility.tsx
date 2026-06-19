"use client"

import { MapPin, Briefcase, Code, GraduationCap, Award, ArrowRight } from "lucide-react"

const DEVELOPER = {
  name: "Amitav Panda",
  role: "Founder & Senior Full-Stack Engineer",
  location: "Bengaluru, India",
  experience: "10+ years",
  tagline: "I lead every project personally. No account managers, no handoffs — just senior-level execution.",
  highlights: [
    { icon: Briefcase, label: "10+ years full-stack development" },
    { icon: Code, label: "React, Next.js, Node.js, React Native, Python" },
    { icon: Award, label: "AI/ML: LLMs, LangChain, agents, RAG pipelines" },
    { icon: GraduationCap, label: "Shipped 20+ products from zero to production" },
  ],
  approach: [
    "Every line of code I ship is production-grade — not prototype quality",
    "I use AI workflows to deliver 3x faster without cutting corners",
    "You get direct access. No project manager buffer, no communication lag",
    "I only take projects where I can personally guarantee the outcome",
  ],
}

const DeveloperCredibility = () => {
  return (
    <section id="team" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">Who builds it</span>
          <h2 className="section-title mt-4">Senior engineer. Founder-led. No middlemen.</h2>
          <p className="section-sub mt-4">
            Every project is personally built and overseen by Amitav — a senior full-stack engineer
            with a decade of experience shipping production applications.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_2fr]">
          {/* Left — Profile card */}
          <div className="card-3d p-6 md:p-7">
            {/* Avatar placeholder */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--color-primary-highlight)] md:mx-0">
              <span className="font-display text-4xl font-extrabold text-[var(--color-primary)]">AP</span>
            </div>

            <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
              {DEVELOPER.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-primary)]">{DEVELOPER.role}</p>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" />
              {DEVELOPER.location}
            </div>

            <div className="mt-5 space-y-2.5">
              {DEVELOPER.highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-muted">
                  <Icon className="h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/getcodefree/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6 w-full"
            >
              Book a call with Amitav
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Right — Approach */}
          <div className="flex flex-col justify-center gap-5">
            <p className="text-lg text-[var(--color-text)]" style={{ lineHeight: 1.65 }}>
              {DEVELOPER.tagline}
            </p>

            <div className="grid gap-3">
              {DEVELOPER.approach.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-primary)]/20"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                  </span>
                  <span className="text-sm text-muted">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeveloperCredibility
