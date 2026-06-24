"use client"

import { Rocket, Bot, ShieldCheck, Users, Gauge, Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Metric {
  icon: LucideIcon
  value: string
  label: string
  description: string
}

const METRICS: Metric[] = [
  {
    icon: Rocket,
    value: "20+",
    label: "Products built",
    description: "Web platforms, mobile apps, and AI automations shipped to production.",
  },
  {
    icon: Clock,
    value: "~3 wk",
    label: "Average MVP delivery",
    description: "From scope to deployed product. Not months — weeks.",
  },
  {
    icon: Bot,
    value: "AI-native",
    label: "Development approach",
    description: "Multi-agent workflows, LLM-assisted code review, automated testing. Not a headcount play.",
  },
  {
    icon: Users,
    value: "10+ yr",
    label: "Senior engineer experience",
    description: "Every project is led by a senior full-stack engineer. No juniors on your product.",
  },
  {
    icon: ShieldCheck,
    value: "Production-",
    label: "grade from day one",
    description: "Auth, CI/CD, monitoring, security. Not a prototype thrown over the wall.",
  },
  {
    icon: Gauge,
    value: "1 team",
    label: "Direct partnership",
    description: "You speak directly with the person building. No PM layers, no account managers.",
  },
]

const MetricsSection = () => {
  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">Why us</span>
          <h2 className="section-title mt-4">
            No inflated logos. Just real numbers.
          </h2>
          <p className="section-sub mt-4">
            We don't embellish our track record. Here's what we can honestly stand behind.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map(({ icon: Icon, value, label, description }) => (
            <div
              key={label}
              className="card-3d interactive-card group p-6 md:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="icon-pill flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-primary)]">
                    {value}
                  </div>
                  <h3 className="mt-0.5 font-display text-sm font-bold tracking-tight text-[var(--color-text)]">
                    {label}
                  </h3>
                  <p className="mt-2 text-xs text-muted" style={{ lineHeight: 1.6 }}>
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MetricsSection