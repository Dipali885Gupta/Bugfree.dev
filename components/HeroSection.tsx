"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, ArrowDown, Sparkles, Smartphone, Monitor, Bot, ShieldCheck } from "lucide-react"
import { SITE } from "@/lib/site"
import "splitting/dist/splitting.css"

const META_CHIPS = [
  { icon: Smartphone, label: "Mobile apps" },
  { icon: Monitor, label: "Web platforms" },
  { icon: Bot, label: "AI automations" },
  { icon: ShieldCheck, label: "Production support" },
]

const PANEL_CARDS = [
  {
    title: "MVP Launch Sprint",
    body: "Scope, design, build, ship. One focused sprint — production-ready MVP in ~3 weeks.",
    featured: true,
  },
  {
    title: "Full Product Development",
    body: "From zero to production — design, build, deploy, and monthly support included.",
    featured: false,
  },
  {
    title: "AI Workflow Automation",
    body: "Lead gen, content pipelines, CRM sync, and internal copilots shipped in days — not months.",
    featured: false,
  },
]

const TICKER_ITEMS = [
  "React Native builds",
  "Next.js product teams",
  "LangChain workflows",
  "Python automations",
  "Supabase + Node.js",
  "Founder-led execution",
  "AI agent systems",
]

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bgGlowRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let cancelled = false

    const init = async () => {
      // --- Splitting.js per-char headline ---
      try {
        const Splitting = (await import("splitting")).default
        await (document as Document).fonts?.ready
        if (cancelled || !headlineRef.current) return
        Splitting({ target: headlineRef.current.querySelectorAll("[data-splitting]"), by: "chars" })
        // Re-index chars across all segments for one continuous stagger
        const chars = headlineRef.current.querySelectorAll<HTMLElement>(".char")
        chars.forEach((c, i) => c.style.setProperty("--char-index", String(i)))
      } catch {}

      // --- Motion One parallax (skip when reduced motion) ---
      if (prefersReduced || cancelled) return
      try {
        const { scroll, animate } = await import("motion")
        if (heroRef.current && bgGlowRef.current) {
          scroll(animate(bgGlowRef.current, { y: [-30, 40] }, { ease: "linear" }), {
            target: heroRef.current,
          })
        }
        if (heroRef.current && copyRef.current) {
          scroll(animate(copyRef.current, { y: [0, -24] }, { ease: "linear" }), {
            target: heroRef.current,
          })
        }
      } catch {}
    }

    init()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-20"
    >
      {/* Parallax background glow */}
      <div ref={bgGlowRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -left-[12%] top-[6%] h-[42%] w-[46%] rounded-full blur-3xl"
          style={{ background: "var(--color-primary-glow)" }}
        />
        <div
          className="absolute right-[2%] top-[2%] h-[38%] w-[38%] rounded-full blur-3xl"
          style={{ background: "var(--color-blue-glow)" }}
        />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr]">
          {/* LEFT */}
          <div ref={copyRef}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              For founders who ship — not just plan
            </span>

            <h1
              ref={headlineRef}
              className="mt-6 font-display font-extrabold text-[var(--color-text)]"
              style={{ fontSize: "var(--text-hero)", letterSpacing: "-0.05em", lineHeight: 0.92 }}
            >
              <span data-splitting>Ship your MVP in </span>
              <span data-splitting className="hl-grad">3 weeks.</span>
              <br />
              <span data-splitting>Automate your ops in </span>
              <span data-splitting className="hl-grad">5 days.</span>
            </h1>

            <p className="mt-6 max-w-xl text-muted" style={{ fontSize: "var(--text-base)", lineHeight: 1.65 }}>
              GetCodeFree builds mobile apps, web platforms, and AI automations for startups and
              growth-stage businesses — with a lean senior team, production-grade execution, and
              founder-level speed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn btn-primary">
                Start a project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#projects" className="btn btn-ghost">
                See shipped work
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {META_CHIPS.map(({ icon: Icon, label }) => (
                <span key={label} className="chip">
                  <Icon className="h-4 w-4 text-[var(--color-primary)]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — glass panel */}
          <div className="relative">
            <div
              className="card-3d p-5 md:p-6"
              style={{ borderRadius: "1.75rem" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow-line">What we ship</span>
                <span className="badge">6 offers</span>
              </div>
              <div className="flex flex-col gap-3">
                {PANEL_CARDS.map((card) =>
                  card.featured ? (
                    <div key={card.title} className="card-glow-border p-[1px]">
                      <div
                        className="rounded-[1.15rem] p-4"
                        style={{
                          background:
                            "linear-gradient(180deg, var(--color-surface-2), var(--color-surface))",
                        }}
                      >
                        <h3 className="font-display text-base font-bold tracking-tight text-[var(--color-text)]">
                          {card.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted" style={{ lineHeight: 1.55 }}>
                          {card.body}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={card.title}
                      className="rounded-[1.15rem] border border-[var(--color-border)] p-4"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      <h3 className="font-display text-base font-bold tracking-tight text-[var(--color-text)]">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted" style={{ lineHeight: 1.55 }}>
                        {card.body}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="ticker mt-14 border-y border-[var(--color-divider)] py-4 md:mt-20"
        aria-hidden="true"
      >
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-sm text-faint">
              {item}
              <span className="text-[var(--color-primary)]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
