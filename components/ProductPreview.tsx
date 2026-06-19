"use client"

import { useState, useEffect } from "react"

const BUILD_STEPS = [
  { id: 1, label: "Product scope defined", delay: 0 },
  { id: 2, label: "User flows & wireframes", delay: 400 },
  { id: 3, label: "Frontend build (React / Next.js)", delay: 900 },
  { id: 4, label: "Backend API & database", delay: 1400 },
  { id: 5, label: "Auth & admin dashboard", delay: 1900 },
  { id: 6, label: "Deploy to production", delay: 2400 },
]

const CODE_LINES = [
  { indent: 0, text: 'const mvp = await build({', color: "var(--color-text-faint)" },
  { indent: 2, text: 'name: "your-product",', color: "var(--color-primary)" },
  { indent: 2, text: 'stack: ["Next.js", "Node.js", "Supabase"],', color: "var(--color-blue)" },
  { indent: 2, text: 'timeline: "< 3 weeks",', color: "var(--color-primary)" },
  { indent: 2, text: 'quality: "production-grade",', color: "var(--color-blue)" },
  { indent: 0, text: '})', color: "var(--color-text-faint)" },
]

const ProductPreview = () => {
  const [visibleLines, setVisibleLines] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(0)
  const [progress, setProgress] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleLines((prev) => (prev < CODE_LINES.length ? prev + 1 : prev))
    }, 300)
    return () => clearTimeout(timer)
  }, [cycle])

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) {
      const stepInterval = setInterval(() => {
        setCompletedSteps((prev) => {
          if (prev < BUILD_STEPS.length) return prev + 1
          return prev
        })
      }, 500)
      return () => clearInterval(stepInterval)
    }
  }, [visibleLines, cycle])

  useEffect(() => {
    if (completedSteps > 0) {
      const pct = Math.min((completedSteps / BUILD_STEPS.length) * 100, 100)
      setProgress(pct)
    }
  }, [completedSteps])

  useEffect(() => {
    if (completedSteps >= BUILD_STEPS.length) {
      const timer = setTimeout(() => {
        setVisibleLines(0)
        setCompletedSteps(0)
        setProgress(0)
        setCycle((c) => c + 1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [completedSteps])

  return (
    <section className="relative overflow-hidden py-6 md:py-10">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <div className="card-3d overflow-hidden" style={{ borderRadius: "1.5rem" }}>
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3 md:px-5 md:py-3.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[0.7rem] text-[var(--color-text-faint)]">
                getcodefree.dev
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                <span className="text-[0.7rem] font-medium text-[var(--color-primary)]">
                  {progress < 100 ? "Building..." : "Deployed!"}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left — Code panel */}
              <div className="border-b border-[var(--color-border)] md:border-b-0 md:border-r border-[var(--color-border)] p-4 md:p-5" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="mb-3 flex items-center gap-1.5">
                  <span className="icon-pill !h-6 !w-6 !rounded-md">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
                    build
                  </span>
                </div>
                <pre className="font-mono text-[0.68rem] leading-relaxed md:text-xs" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                  {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                    <div
                      key={`${cycle}-${i}`}
                      className="animate-fade-in-up opacity-0"
                      style={{ animationDelay: `${i * 60}ms`, paddingLeft: `${line.indent * 12}px` }}
                    >
                      <span style={{ color: line.color }}>{line.text}</span>
                    </div>
                  ))}
                  {visibleLines < CODE_LINES.length && (
                    <span className="inline-block h-4 w-2 animate-pulse bg-[var(--color-primary)]" />
                  )}
                </pre>
              </div>

              {/* Right — Checklist */}
              <div className="p-4 md:p-5">
                <div className="mb-3 flex items-center gap-1.5">
                  <span className="icon-pill !h-6 !w-6 !rounded-md">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
                    progress
                  </span>
                </div>

                <div className="space-y-2.5">
                  {BUILD_STEPS.map((step, i) => {
                    const isDone = i < completedSteps
                    const isActive = i === completedSteps
                    return (
                      <div
                        key={step.id}
                        className="flex items-center gap-2.5 transition-all duration-300"
                        style={{ opacity: i <= completedSteps ? 1 : 0.3 }}
                      >
                        <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isDone
                            ? "bg-[var(--color-primary)]"
                            : isActive
                              ? "border-2 border-[var(--color-primary)]"
                              : "border border-[var(--color-border)]"
                        }`}>
                          {isDone && (
                            <svg className="h-3 w-3 text-[var(--color-text-inverse)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs transition-colors duration-300 ${isDone ? "text-[var(--color-text)]" : "text-[var(--color-text-faint)]"}`}>
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[0.65rem] text-[var(--color-text-faint)]">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, var(--color-primary), var(--color-blue))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="mt-4 text-center text-xs text-[var(--color-text-faint)]">
            This is how a real MVP gets built — not a prototype, not a wireframe. Production-grade code, shipped in weeks.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProductPreview