"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, CheckCircle, Target, Gauge, Headphones } from "lucide-react"

interface Phase {
  icon: typeof Target
  number: string
  title: string
  subtitle: string
  timeline: string
  body: string
  outcomes: string[]
  highlight: string
}

const PHASES: Phase[] = [
  {
    icon: Target,
    number: "01",
    title: "Build your MVP",
    subtitle: "Under 3 weeks",
    timeline: "Weeks 1–3",
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
    subtitle: "Ongoing sprints",
    timeline: "Weekly",
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
    title: "Support & Partner",
    subtitle: "Weekly calls",
    timeline: "Always on",
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

const TaskItem = ({ label, status }: { label: string; status: "done" | "active" | "queued" }) => (
  <div className="flex items-center gap-2 py-1.5">
    {status === "done" ? (
      <div className="h-4 w-4 rounded-full flex items-center justify-center" style={{ background: "#34d399" }}>
        <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
    ) : status === "active" ? (
      <div className="h-4 w-4 rounded-full border-2" style={{ borderColor: "var(--color-primary)" }} />
    ) : (
      <div className="h-4 w-4 rounded-full border" style={{ borderColor: "var(--color-border)" }} />
    )}
    <span
      className="text-xs"
      style={{
        color: status === "done" ? "var(--color-text-muted)" : status === "active" ? "var(--color-text)" : "var(--color-text-faint)",
        textDecoration: status === "done" ? "line-through" : "none",
      }}
    >
      {label}
    </span>
    {status === "active" && (
      <span className="ml-auto text-[0.6rem] font-medium" style={{ color: "var(--color-primary)" }}>In progress</span>
    )}
  </div>
)

const TaskOverlayCard = () => (
  <div
    className="overflow-hidden shadow-2xl"
    style={{
      borderRadius: "1rem",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "linear-gradient(180deg, var(--color-surface), var(--color-surface-2))",
      boxShadow: "0 20px 50px rgba(var(--color-shadow-rgb),0.5), 0 0 30px rgba(var(--color-primary-rgb),0.08)",
    }}
  >
    <div className="flex items-center justify-between px-3.5 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <div className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <span className="font-mono text-[0.6rem]" style={{ color: "var(--color-text-faint)" }}>Development</span>
    </div>
    <div className="px-3.5 py-2" style={{ background: "rgba(0,0,0,0.15)" }}>
      <p className="text-[0.75rem] font-bold" style={{ color: "var(--color-text)" }}>Develop KPI Dashboard</p>
      <p className="text-[0.6rem]" style={{ color: "var(--color-text-faint)" }}>Design & Develop new dashboard</p>
    </div>
    <div className="px-3.5 pb-1.5">
      <TaskItem label="User auth & roles" status="done" />
      <TaskItem label="Database schema" status="done" />
      <TaskItem label="Core API endpoints" status="active" />
      <TaskItem label="Dashboard views" status="queued" />
    </div>
    <div className="px-3.5 py-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[0.6rem]" style={{ color: "var(--color-text-faint)" }}>Progress</span>
        <span className="text-[0.6rem] font-mono font-semibold" style={{ color: "var(--color-primary)" }}>74%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-full rounded-full" style={{ width: "74%", background: "linear-gradient(90deg, var(--color-primary), var(--color-blue))" }} />
      </div>
    </div>
    <div className="px-3.5 py-2 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
      <div className="flex items-center gap-1.5">
        <svg className="h-3 w-3" style={{ color: "var(--color-text-faint)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        <span className="text-[0.6rem]" style={{ color: "var(--color-text-faint)" }}>Add a new task</span>
      </div>
    </div>
  </div>
)

const DashboardScreenshot = () => (
  <div
    className="overflow-hidden relative"
    style={{
      borderRadius: "1rem",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "linear-gradient(180deg, var(--color-surface), var(--color-surface-2))",
      boxShadow: "0 25px 60px rgba(var(--color-shadow-rgb),0.4), 0 0 40px rgba(var(--color-primary-rgb),0.06)",
    }}
  >
    <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full" style={{ background: "#34d399" }} />
        <span className="text-[0.65rem] font-medium" style={{ color: "#34d399" }}>Live</span>
      </div>
    </div>
    <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(0,0,0,0.15)" }}>
      <div>
        <p className="text-[0.7rem] font-bold" style={{ color: "var(--color-text)" }}>Dashboard</p>
        <p className="text-[0.55rem]" style={{ color: "var(--color-text-faint)" }}>Last 30 days</p>
      </div>
      <div className="flex gap-1.5">
        {["1D", "7D", "30D"].map((p, i) => (
          <span
            key={p}
            className="rounded-md px-2 py-0.5 text-[0.55rem] font-medium"
            style={{
              background: i === 2 ? "var(--color-primary-highlight)" : "rgba(255,255,255,0.04)",
              color: i === 2 ? "var(--color-primary)" : "var(--color-text-faint)",
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-4 gap-2 px-4 py-3">
      {[
        { label: "Revenue", val: "48.2K", change: "+24%", changeColor: "#34d399" },
        { label: "Users", val: "12.8K", change: "+18%", changeColor: "var(--color-primary)" },
        { label: "Conv.", val: "3.8%", change: "+5%", changeColor: "var(--color-blue)" },
        { label: "Active", val: "6.2K", change: "+12%", changeColor: "#a78bfa" },
      ].map((m) => (
        <div key={m.label} className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="text-[0.55rem] uppercase tracking-wider" style={{ color: "var(--color-text-faint)" }}>{m.label}</p>
          <p className="font-display text-lg font-bold" style={{ color: "var(--color-text)" }}>{m.val}</p>
          <p className="text-[0.55rem] font-semibold" style={{ color: m.changeColor }}>{m.change}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-2 px-4 pb-3">
      <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[0.65rem] font-semibold" style={{ color: "var(--color-text-muted)" }}>Revenue Trend</span>
          <span className="text-[0.6rem]" style={{ color: "#34d399" }}>+24%</span>
        </div>
        <svg viewBox="0 0 200 70" className="w-full" preserveAspectRatio="none" style={{ height: "3.5rem" }}>
          <defs>
            <linearGradient id="dashChartGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 55 L12 48 L24 52 L36 42 L48 46 L60 35 L72 32 L84 38 L96 28 L108 22 L120 26 L132 18 L144 15 L156 20 L168 10 L180 8 L200 5" fill="none" stroke="#34d399" strokeWidth="2" />
          <path d="M0 55 L12 48 L24 52 L36 42 L48 46 L60 35 L72 32 L84 38 L96 28 L108 22 L120 26 L132 18 L144 15 L156 20 L168 10 L180 8 L200 5 L200 70 L0 70 Z" fill="url(#dashChartGrad1)" />
        </svg>
      </div>
      <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[0.65rem] font-semibold" style={{ color: "var(--color-text-muted)" }}>Users</span>
          <span className="text-[0.6rem]" style={{ color: "var(--color-primary)" }}>+18%</span>
        </div>
        <svg viewBox="0 0 200 70" className="w-full" preserveAspectRatio="none" style={{ height: "3.5rem" }}>
          <defs>
            <linearGradient id="dashChartGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 60 L15 55 L30 50 L45 52 L55 45 L70 38 L85 42 L100 35 L115 28 L130 20 L145 25 L160 15 L175 18 L190 10 L200 8" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M0 60 L15 55 L30 50 L45 52 L55 45 L70 38 L85 42 L100 35 L115 28 L130 20 L145 25 L160 15 L175 18 L190 10 L200 8 L200 70 L0 70 Z" fill="url(#dashChartGrad2)" />
        </svg>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 px-4 pb-3">
      <div className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="text-[0.55rem] font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>Sprint Tasks</p>
        <div className="space-y-1.5">
          <TaskItem label="Auth module" status="done" />
          <TaskItem label="Payments integration" status="active" />
          <TaskItem label="Notifications" status="queued" />
          <TaskItem label="Deploy to staging" status="queued" />
        </div>
      </div>
      <div className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="text-[0.55rem] font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>Recent Events</p>
        <div className="space-y-1.5">
          {[
            { label: "API deployed", time: "2m ago", col: "#34d399" },
            { label: "Schema migrated", time: "15m ago", col: "var(--color-primary)" },
            { label: "Build passed", time: "18m ago", col: "#34d399" },
            { label: "PR merged", time: "1h ago", col: "var(--color-primary)" },
          ].map((ev) => (
            <div key={ev.label} className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: ev.col }} />
              <span className="text-[0.55rem] truncate" style={{ color: "var(--color-text-muted)" }}>{ev.label}</span>
              <span className="ml-auto text-[0.5rem] flex-shrink-0" style={{ color: "var(--color-text-faint)" }}>{ev.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const ChatScreenshot = () => (
  <div
    className="overflow-hidden relative"
    style={{
      borderRadius: "1rem",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "linear-gradient(180deg, var(--color-surface), var(--color-surface-2))",
      boxShadow: "0 25px 60px rgba(var(--color-shadow-rgb),0.4), 0 0 40px rgba(var(--color-primary-rgb),0.06)",
    }}
  >
    <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="font-mono text-[0.65rem]" style={{ color: "var(--color-text-faint)" }}>Slack · #mvp-build</span>
    </div>
    <div className="p-4 space-y-3">
      {[
        { name: "You", time: "1:32 PM", msg: "How's the auth module coming along?", isUser: true },
        { name: "GetCodeFree", time: "1:34 PM", msg: "Just pushed — all 12 tests passing. Moving to payments next.", isUser: false },
        { name: "You", time: "1:35 PM", msg: "Great progress. Let's sync on dashboard wireframes tomorrow.", isUser: true },
        { name: "GetCodeFree", time: "1:35 PM", msg: "Already shared the Figma link in docs. Take a look anytime 👍", isUser: false },
        { name: "You", time: "1:36 PM", msg: "Perfect. Also — can we add a weekly changelog to the dashboard?", isUser: true },
        { name: "GetCodeFree", time: "1:37 PM", msg: "Easy add. I'll include it in the next sprint. Any preferred format?", isUser: false },
        { name: "GetCodeFree", time: "1:38 PM", msg: "Here's a quick mockup of what it could look like:", isUser: false },
      ].map((chat, i) => (
        <div key={i} className="flex gap-2.5">
          <div
            className="h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center text-[0.55rem] font-bold"
            style={{
              background: chat.isUser ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, var(--color-primary), var(--color-blue))",
              color: chat.isUser ? "var(--color-text-faint)" : "var(--color-text-inverse)",
            }}
          >
            {chat.isUser ? "Y" : "G"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[0.7rem] font-semibold" style={{ color: chat.isUser ? "var(--color-text-muted)" : "var(--color-primary)" }}>{chat.name}</span>
              <span className="text-[0.55rem]" style={{ color: "var(--color-text-faint)" }}>{chat.time}</span>
            </div>
            <p className="text-[0.75rem] leading-snug" style={{ color: "var(--color-text-muted)" }}>{chat.msg}</p>
          </div>
        </div>
      ))}
      <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-2 mb-2">
          <svg className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-primary)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
          <span className="text-[0.65rem] font-semibold" style={{ color: "var(--color-text)" }}>changelog-mockup-v2.png</span>
          <span className="ml-auto text-[0.5rem]" style={{ color: "var(--color-text-faint)" }}>124 KB</span>
        </div>
        <div className="rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", height: "4rem" }}>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-blue))" }} />
            <span className="text-[0.6rem] font-medium" style={{ color: "var(--color-text-faint)" }}>changelog_preview.png</span>
          </div>
        </div>
      </div>
    </div>
    <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)" }}>
        <span className="text-[0.7rem]" style={{ color: "var(--color-text-faint)" }}>Type a message...</span>
        <svg className="ml-auto h-4 w-4" style={{ color: "var(--color-primary)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
      </div>
    </div>
  </div>
)

const VISUALS = [
  { component: DashboardScreenshot, overlay: null },
  { component: DashboardScreenshot, overlay: TaskOverlayCard },
  { component: ChatScreenshot, overlay: null },
]

const ProcessSection = () => {
  const cardsRef = useRef<(HTMLLIElement | null)[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced || cardsRef.current.length === 0) return

    const animate = () => {
      const vh = window.innerHeight
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const nextCard = cardsRef.current[i + 1]
        if (!nextCard) {
          const inner = card.querySelector(".card-inner") as HTMLElement | null
          if (inner) {
            inner.style.setProperty("--stack-scale", "1")
            inner.style.setProperty("--stack-opacity", "1")
          }
          return
        }
        const cardH = card.offsetHeight
        const nextTop = nextCard.getBoundingClientRect().top
        const progress = Math.max(0, Math.min(1, nextTop / cardH))
        const scale = 0.85 + 0.15 * progress
        const inner = card.querySelector(".card-inner") as HTMLElement | null
        if (inner) {
          inner.style.setProperty("--stack-scale", String(scale))
          inner.style.setProperty("--stack-opacity", String(progress))
        }
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section id="process" className="section" style={{ paddingBottom: 0 }}>
      <div className="container-x mb-10 md:mb-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center reveal-up">
          <span className="eyebrow">Our process</span>
          <h2 className="section-title mt-4">
            Three phases. <span className="hl-grad">Clear outcomes.</span>
          </h2>
          <p className="section-sub mt-4">
            From scope to shipped to scale — we move fast and stay engaged.
          </p>
        </div>
      </div>

      <div className="process-stack-wrapper">
        <ol className="process-stack" style={{ "--numcards": 3 } as React.CSSProperties}>
          {PHASES.map((phase, i) => {
            const Icon = phase.icon
            const Visual = VISUALS[i]

            return (
              <li
                key={phase.number}
                ref={(el) => { cardsRef.current[i] = el }}
                className="process-stack-card"
              >
                <div className="card-inner container-x">
                  <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2 md:items-center md:gap-10 lg:gap-14">
                    {/* Text side */}
                    <div className="w-full">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="icon-pill">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="badge">{phase.timeline}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--color-text)] md:text-3xl lg:text-4xl">
                        {phase.title}
                      </h3>
                      <p
                        className="mt-1 font-display text-lg font-semibold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {phase.subtitle}
                      </p>
                      <p className="mt-4 text-sm text-muted" style={{ lineHeight: 1.65 }}>
                        {phase.body}
                      </p>

                      <ul className="mt-5 space-y-2.5">
                        {phase.outcomes.map((outcome) => (
                          <li key={outcome} className="flex gap-2.5 text-sm text-muted">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-[var(--color-divider)] p-3 text-xs font-medium" style={{ background: "var(--color-primary-highlight)", color: "var(--color-primary)" }}>
                        <span className="flex items-center gap-1.5">
                          <ArrowRight className="h-3 w-3" />
                          {phase.highlight}
                        </span>
                      </div>
                    </div>

                    {/* Visual side */}
                    <div className="relative w-full md:[perspective:1200px]">
                      <div className="transition-transform duration-500 md:hover:scale-[1.01] md:[transform:rotateY(-3deg)_rotateX(1deg)]">
                        <Visual.component />
                      </div>

                      {Visual.overlay && (
                        <div
                          className="hidden md:block absolute -bottom-5 -right-5 lg:-bottom-7 lg:-right-7 process-overlay-card"
                          style={{ zIndex: 10 }}
                        >
                          <Visual.overlay />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phase number — inline badge on mobile, subtle watermark on desktop */}
                <span
                  className="pointer-events-none absolute right-6 top-6 font-display text-5xl font-extrabold opacity-[0.07] md:right-10 md:top-8 md:text-7xl"
                  style={{ color: "var(--color-primary)" }}
                  aria-hidden="true"
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div className="card-bottom">
                  <span className="flex items-center justify-center gap-1.5">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Phase {(i + 1).toString().padStart(2, "0")} / 03
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>


    </section>
  )
}

export default ProcessSection