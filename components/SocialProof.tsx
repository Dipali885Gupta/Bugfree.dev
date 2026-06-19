"use client"

import { Rocket, Smartphone, Zap, Bot, Lock } from "lucide-react"

const SIGNALS = [
  { icon: Rocket, label: "20+ products built" },
  { icon: Smartphone, label: "1 live App Store app" },
  { icon: Zap, label: "3-week average MVP delivery" },
  { icon: Bot, label: "AI-native team — not a headcount play" },
  { icon: Lock, label: "Senior engineers only" },
]

const SocialProof = () => {
  return (
    <section className="py-10 md:py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
          {SIGNALS.map(({ icon: Icon, label }) => (
            <span key={label} className="chip fade-in">
              <Icon className="h-4 w-4 text-[var(--color-primary)]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof
