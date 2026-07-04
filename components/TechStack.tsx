"use client"

import { DEFAULT_TECH_STACK, DEFAULT_SECTION_HEADERS } from "@/lib/cms/defaults"
import type { SectionHeader } from "@/lib/cms/mappers"

interface TechStackProps {
  rows?: { row1: string[]; row2: string[] }
  header?: SectionHeader
}

const Pill = ({ label }: { label: string }) => (
  <span
    className="rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)]"
    style={{ background: "rgba(255,255,255,0.03)" }}
  >
    {label}
  </span>
)

const TechStack = ({ rows = DEFAULT_TECH_STACK, header = DEFAULT_SECTION_HEADERS.tech }: TechStackProps) => {
  return (
    <section id="tech" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          {header.eyebrow && <span className="eyebrow">{header.eyebrow}</span>}
          <h2 className="section-title mt-4">{header.title}</h2>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2.5">
            {rows.row1.map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {rows.row2.map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack
