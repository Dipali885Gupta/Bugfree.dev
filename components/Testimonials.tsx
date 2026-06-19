"use client"

import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  name: string
  role: string
  initial: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We had a half-built product that had been stuck for 3 months. GetCodeFree scoped it in a day, shipped it in 4 weeks. It's now our main demo for investors.",
    name: "Alex M.",
    role: "CTO at a fintech startup",
    initial: "A",
  },
  {
    quote:
      "I needed a lead generation workflow that didn't require a full-time ops hire. They built it in 4 days. It's been running without touching it for 2 months.",
    name: "Priya K.",
    role: "Founder at a D2C brand",
    initial: "P",
  },
]

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">What clients say</span>
          <h2 className="section-title mt-4">Real feedback. No padding.</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card-3d interactive-card flex flex-col p-7 md:p-8">
              <Quote className="h-8 w-8 text-[var(--color-primary)] opacity-40" />
              <blockquote className="mt-4 flex-1 text-lg text-[var(--color-text)]" style={{ lineHeight: 1.55 }}>
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full font-display text-lg font-bold"
                  style={{ background: "var(--color-primary-highlight)", color: "var(--color-primary)" }}
                >
                  {t.initial}
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold text-[var(--color-text)]">{t.name}</span>
                  <span className="text-sm text-faint">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
