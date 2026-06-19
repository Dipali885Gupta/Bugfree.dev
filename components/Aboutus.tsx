"use client"

import { Brain, UserCheck, Award, Gauge } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Differentiator {
  icon: LucideIcon
  title: string
  body: string
}

const ITEMS: Differentiator[] = [
  {
    icon: Brain,
    title: "AI-native, not AI-adjacent",
    body: "Every workflow uses LLM-assisted development, automated QA, and agent-driven processes. Speed without sacrificing quality.",
  },
  {
    icon: UserCheck,
    title: "Founder-led execution",
    body: "You speak directly with the person building. No account managers, no PM layers, no handoff lag. What you describe is what gets shipped.",
  },
  {
    icon: Award,
    title: "Senior engineers only",
    body: "No juniors on your project. Every engineer has shipped production apps with real users and real scale.",
  },
  {
    icon: Gauge,
    title: "Speed as a system, not a promise",
    body: "The 5-week MVP timeline is a tested delivery model. It works because scope, tooling, and workflow are built around it.",
  },
]

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">The difference</span>
          <h2 className="section-title mt-4">Built differently. On purpose.</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-3d interactive-card p-6 md:p-7">
              <span className="icon-pill">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted" style={{ lineHeight: 1.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
