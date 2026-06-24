"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ProjectHeroImage, ProjectGallery, ProjectFeatureImage } from "@/components/project-images"
import type { Project } from "@/lib/projects"

interface ProjectLink {
  name: string
  slug: string
  description: string
}

interface Props {
  project: Project
  prevProject: ProjectLink | null
  nextProject: ProjectLink | null
}

function FadeInSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div
      className="animate-fade-in-up opacity-0"
      style={{ animationDelay: `${delay}s`, animationDuration: "0.7s" }}
    >
      {children}
    </div>
  )
}

export default function ProjectDetailClient({ project, prevProject, nextProject }: Props) {

  return (
    <article>
      <section className="pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="container-x">
          <FadeInSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-faint hover:text-[var(--color-text)] transition-colors mb-8"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              All projects
            </Link>
          </FadeInSection>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <FadeInSection delay={0.1}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--color-primary)", boxShadow: "0 0 12px var(--color-primary)" }}
                  />
                  <span className="text-sm font-semibold text-[var(--color-text)]">
                    {project.status}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-faint">
                    {project.industry}
                  </span>
                </div>

                <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
                  {project.name}
                </h1>
                <p className="mt-4 text-xl font-medium md:text-2xl" style={{ color: "var(--color-primary)" }}>
                  {project.tagline}
                </p>
                <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </FadeInSection>
            </div>

            <div className="lg:col-span-4">
              <FadeInSection delay={0.2}>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-[var(--color-divider)] p-4"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      <div className="font-display text-3xl font-bold" style={{ color: "var(--color-primary)" }}>
                        {m.value}
                      </div>
                      <div className="text-sm font-medium text-[var(--color-text)] mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container-x">
          <FadeInSection delay={0.3}><ProjectHeroImage slug={project.slug} /></FadeInSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeInSection delay={0.1}>
              <div>
                <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-6">
                  About this project
                </h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  {project.longDescription.split("\n\n").map((para, i) => (
                    <p key={i} className="text-base">
                      {para}
                    </p>
                  ))}
                </div>

                {project.testimonial && (
                  <blockquote
                    className="mt-10 rounded-xl border-l-4 pl-6 py-4"
                    style={{
                      borderColor: "var(--color-primary)",
                      background: "rgba(var(--color-primary-rgb),0.05)",
                    }}
                  >
                    <p className="text-base italic text-[var(--color-text)] leading-relaxed">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-4">
                      <cite className="not-italic">
                        <span className="text-sm font-semibold text-[var(--color-text)]">
                          {project.testimonial.author}
                        </span>
                        <span className="text-sm text-faint ml-2">
                          {project.testimonial.role}
                        </span>
                      </cite>
                    </footer>
                  </blockquote>
                )}
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="sticky top-24">
                <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-6">
                  Tech stack
                </h2>
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-muted"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-6">
                  Architecture
                </h2>
                <div
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background:
                      "linear-gradient(180deg, var(--color-surface), var(--color-surface-2))",
                    boxShadow:
                      "0 25px 60px rgba(var(--color-shadow-rgb),0.3), 0 0 40px rgba(var(--color-primary-rgb),0.05)",
                  }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-auto text-[0.6rem] font-medium text-faint">
                      architecture.yml
                    </span>
                  </div>
                  <div className="p-5 md:p-6">
                    <pre
                      className="whitespace-pre font-mono text-[0.75rem] leading-relaxed md:text-[0.8rem]"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {project.architecture}
                    </pre>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-x">
          <FadeInSection delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-8">
              Screenshots & previews
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.15}><ProjectGallery slug={project.slug} /></FadeInSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-x">
          <FadeInSection delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-8">
              System architecture
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}><ProjectFeatureImage slug={project.slug} /></FadeInSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-x">
          <FadeInSection delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-8">
              Outcomes & results
            </h2>
          </FadeInSection>
          <div className="grid gap-4 md:grid-cols-2">
            {project.outcomes.map((outcome, i) => (
              <FadeInSection key={i} delay={0.1 + i * 0.08}>
                <div
                  className="flex items-start gap-4 rounded-xl border border-[var(--color-divider)] p-5"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "var(--color-primary)", opacity: 0.2 }}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      style={{ color: "var(--color-primary)" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm text-[var(--color-text)] leading-relaxed">
                    {outcome}
                  </span>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <FadeInSection delay={0.1}>
            <div
              className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-[var(--color-divider)] p-8 md:p-12"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-surface), var(--color-surface-2))",
              }}
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">
                  Ready to build something similar?
                </h2>
                <p className="mt-2 text-muted">
                  Let&apos;s discuss how we can apply these patterns to your product.
                </p>
              </div>
              <Link href="/#contact" className="btn btn-primary flex-shrink-0">
                Start a conversation
                <svg
                  className="h-4 w-4 ml-2"
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
          </FadeInSection>
        </div>
      </section>

      <section
        className="border-t py-16 md:py-20"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-x">
          <FadeInSection delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-10">
              Other projects
            </h2>
          </FadeInSection>

          <div className="grid gap-6 md:grid-cols-2">
            {prevProject && (
              <FadeInSection delay={0.15}>
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group card-3d interactive-card block"
                >
                  <article className="h-full flex flex-col p-6">
                    <span className="text-xs text-faint uppercase tracking-wider mb-2">Previous</span>
                    <h3 className="font-display text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                      {prevProject.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2">{prevProject.description}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Previous project
                    </div>
                  </article>
                </Link>
              </FadeInSection>
            )}

            {nextProject && (
              <FadeInSection delay={0.2}>
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group card-3d interactive-card block"
                >
                  <article className="h-full flex flex-col p-6">
                    <span className="text-xs text-faint uppercase tracking-wider mb-2 text-right">Next</span>
                    <h3 className="font-display text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors text-right">
                      {nextProject.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2 text-right">{nextProject.description}</p>
                    <div className="mt-4 flex items-center justify-end gap-1.5 text-sm font-medium text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Next project
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </article>
                </Link>
              </FadeInSection>
            )}
          </div>
        </div>
      </section>
    </article>
  )
}
