import Link from "next/link"
import type { Project } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card-3d interactive-card block animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <article className="h-full flex flex-col">
        <div
          className="relative overflow-hidden"
          style={{ height: "13rem", minHeight: "13rem" }}
        >
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 50%, var(--color-surface) 100%)",
            }}
          />
        </div>

        <div className="flex flex-col p-6 pt-5 flex-1">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: "var(--color-primary)",
                  boxShadow: "0 0 10px var(--color-primary)",
                }}
              />
              {project.status}
            </span>
            <span className="text-xs uppercase tracking-wider text-faint">
              {project.industry}
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
            {project.name}
          </h2>
          <p className="mt-2 text-sm text-muted line-clamp-2" style={{ lineHeight: 1.6 }}>
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-muted"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-faint">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          <div className="mt-auto pt-6">
            <div className="grid grid-cols-3 gap-4 border-t border-[var(--color-divider)] pt-4">
              {project.metrics.slice(0, 3).map((m) => (
                <div key={m.label}>
                  <div
                    className="font-display text-lg font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-faint mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
            View case study
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
          </div>
        </div>
      </article>
    </Link>
  )
}
