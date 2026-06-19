"use client"

import { useState } from "react"

type FilterKey = "all" | "mobile" | "web" | "ai" | "automations"

interface Project {
  id: string
  name: string
  status: string
  statusColor: string
  industry: string
  description: string
  stack: string[]
  architecture: string
  categories: FilterKey[]
}

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "web", label: "Web Apps" },
  { key: "ai", label: "AI Products" },
  { key: "automations", label: "Automations" },
]

const PROJECTS: Project[] = [
  {
    id: "nativenest",
    name: "NativeNest",
    status: "Live — App Store",
    statusColor: "#19D3C5",
    industry: "Mobile · EdTech",
    description:
      "Language-learning mobile app built for engagement-first onboarding and daily practice loops.",
    stack: ["React Native", "Node.js", "Supabase", "Expo"],
    architecture: `React Native App (Expo)
       ↓
Node.js REST API
       ↓
Supabase (Auth + PostgreSQL)
       ↓
Push Notifications + Analytics
       ↓
App Store & Play Store Deployment`,
    categories: ["mobile"],
  },
  {
    id: "accounsaathi",
    name: "AccounSaathi",
    status: "Beta — Web App",
    statusColor: "#6F8CFF",
    industry: "Web App · FinOps",
    description:
      "Accounting workflow platform for small businesses — simplifying internal ops and financial process management.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    architecture: `Next.js Dashboard (SSR + ISR)
       ↓
Node.js API Layer
       ↓
PostgreSQL via Prisma ORM
       ↓
Admin Ops + Role-based Access Control`,
    categories: ["web"],
  },
  {
    id: "outbound",
    name: "Outbound AI Engine",
    status: "Internal Tool",
    statusColor: "#E0B341",
    industry: "AI Automation · Sales Ops",
    description:
      "AI-assisted outbound workflow for prospect research, personalization at scale, CRM-ready campaigns.",
    stack: ["Python", "LangChain", "GPT-4o", "CRM APIs"],
    architecture: `Prospect Data Intake
       ↓
Enrichment + Research Agent
       ↓
LLM Personalization Layer (GPT-4o)
       ↓
Campaign Content Generator
       ↓
CRM Sync + Delivery Pipeline`,
    categories: ["ai", "automations"],
  },
]

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <article className="card-3d interactive-card group flex flex-col overflow-hidden p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: project.statusColor, boxShadow: `0 0 10px ${project.statusColor}` }}
          />
          {project.status}
        </span>
        <span className="text-xs uppercase tracking-wider text-faint">{project.industry}</span>
      </div>

      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[var(--color-text)]">
        {project.name}
      </h3>
      <p className="mt-2 text-sm text-muted" style={{ lineHeight: 1.6 }}>
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-muted"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Architecture reveal: always shown on mobile, hover-reveal on md+ */}
      <div className="mt-5 md:mt-auto md:pt-5">
        <div className="arch-reveal overflow-hidden">
          <div className="rounded-xl border border-[var(--color-divider)] p-4" style={{ background: "rgba(0,0,0,0.25)" }}>
            <pre
              className="whitespace-pre font-mono text-[0.72rem] leading-relaxed text-[var(--color-primary)]"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              {project.architecture}
            </pre>
          </div>
        </div>
      </div>
    </article>
  )
}

const Projects = () => {
  const [active, setActive] = useState<FilterKey>("all")

  const visible = PROJECTS.filter((p) => active === "all" || p.categories.includes(active))

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">Selected builds</span>
          <h2 className="section-title mt-4">Shipped products. Real architectures.</h2>
          <p className="section-sub mt-4">
            Hover a card to reveal the architecture behind each build.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={active === f.key}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active === f.key
                  ? "border-transparent bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                  : "border-[var(--color-border)] text-muted hover:text-[var(--color-text)] hover:border-[rgba(25,211,197,0.4)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid (keyed by filter to retrigger entrance animation) */}
        <div key={active} className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <div
              key={project.id}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
