"use client"

import Link from "next/link"
import { useState } from "react"
import ProjectCard from "@/components/ProjectCard"
import { DEFAULT_PROJECTS, DEFAULT_SECTION_HEADERS } from "@/lib/cms/defaults"
import type { Project } from "@/lib/projects"
import type { SectionHeader } from "@/lib/cms/mappers"

const FILTERS = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile" },
  { key: "web", label: "Web Apps" },
  { key: "ai", label: "AI Products" },
  { key: "automations", label: "Automations" },
]

interface ProjectsProps {
  projects?: Project[]
  header?: SectionHeader
}

const Projects = ({ projects = DEFAULT_PROJECTS, header = DEFAULT_SECTION_HEADERS.projects }: ProjectsProps) => {
  const [active, setActive] = useState("all")

  const filtered = projects.filter(
    (p) => active === "all" || p.categories.includes(active)
  )

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-12">
          <div className="max-w-2xl reveal-up">
            <span className="eyebrow">{header.eyebrow}</span>
            <h2 className="section-title mt-4">
              {header.title}{" "}
              {header.titleHighlight && <span className="hl-grad">{header.titleHighlight}</span>}
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:gap-3 transition-all"
          >
            See all projects
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={active === f.key}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active === f.key
                  ? "border-transparent bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                  : "border-[var(--color-border)] text-muted hover:text-[var(--color-text)] hover:border-[rgba(var(--color-primary-rgb),0.4)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
