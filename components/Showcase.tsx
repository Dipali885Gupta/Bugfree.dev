"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ExternalLink } from "lucide-react"

interface ShowcaseItem {
  name: string
  industry: string
  gradient: string
  accent: string
  description: string
  url?: string
}

const ITEMS: ShowcaseItem[] = [
  {
    name: "NativeNest",
    industry: "EdTech · App Store",
    gradient: "linear-gradient(135deg, #0d9488, #155e75)",
    accent: "#19D3C5",
    description: "Language-learning app with engagement-first onboarding and daily practice loops.",
    url: "#",
  },
  {
    name: "AccounSaathi",
    industry: "FinOps · Web App",
    gradient: "linear-gradient(135deg, #4f46e5, #3730a3)",
    accent: "#6F8CFF",
    description: "Accounting workflow platform with AI-powered financial insights.",
    url: "#",
  },
  {
    name: "Outbound AI Engine",
    industry: "AI Automation · Sales Ops",
    gradient: "linear-gradient(135deg, #b45309, #78350f)",
    accent: "#E0B341",
    description: "AI-driven prospect research and personalized campaign generation.",
    url: "#",
  },
  {
    name: "InsureFlow",
    industry: "Insurance · Web Platform",
    gradient: "linear-gradient(135deg, #0891b2, #164e63)",
    accent: "#22d3ee",
    description: "Corporate insurance platform with admin dashboard and vehicle insurance workflows.",
    url: "https://insurance-seven-delta.vercel.app/",
  },
  {
    name: "Photobytes",
    industry: "Photography · Portfolio",
    gradient: "linear-gradient(135deg, #7c3aed, #4c1d95)",
    accent: "#a855f7",
    description: "Dynamic portfolio platform with real-time content management dashboard.",
    url: "https://www.photobytejas.com/",
  },
  {
    name: "Rent-Wizard",
    industry: "LegalTech · Web App",
    gradient: "linear-gradient(135deg, #be185d, #701a75)",
    accent: "#ec4899",
    description: "Digital rental agreement platform with PDF editing and stamp paper integration.",
    url: "#",
  },
]

const Showcase = () => {
  const [hovered, setHovered] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section overflow-hidden">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">Recent work</span>
          <h2 className="section-title mt-4">Products we have built.</h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <a
              key={item.name}
              href={item.url || "#projects"}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative flex h-52 flex-col justify-end overflow-hidden rounded-2xl border border-[var(--color-border)] p-5 transition-all duration-500 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                background: item.gradient,
              }}
            >
              {/* Hover overlay glow */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.accent}44, transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: item.accent }}
              />

              {/* Category pill */}
              <span
                className="relative z-10 mb-2 inline-flex w-fit rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider"
                style={{
                  background: `${item.accent}22`,
                  color: item.accent,
                  border: `1px solid ${item.accent}44`,
                }}
              >
                {item.industry}
              </span>

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className="font-display text-xl font-bold tracking-tight text-white transition-transform duration-300"
                  style={{
                    transform: hovered === item.name ? "translateY(-2px)" : "none",
                  }}
                >
                  {item.name}
                </h3>

                {/* Description reveal on hover */}
                <div
                  className="mt-1 overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: hovered === item.name ? "60px" : "0",
                    opacity: hovered === item.name ? 1 : 0,
                  }}
                >
                  <p className="text-xs text-white/80">{item.description}</p>
                </div>

                {/* View link */}
                <div
                  className="mt-2 flex items-center gap-1 text-xs font-medium transition-all duration-300"
                  style={{
                    color: item.accent,
                    opacity: hovered === item.name ? 1 : 0.6,
                  }}
                >
                  {item.url ? (
                    <>
                      <ExternalLink className="h-3 w-3" />
                      View project
                    </>
                  ) : (
                    <>
                      <ArrowRight className="h-3 w-3" />
                      See details
                    </>
                  )}
                </div>
              </div>

              {/* Decorative number */}
              <span className="absolute bottom-3 right-4 text-[5rem] font-extrabold leading-none text-white/5 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Showcase
