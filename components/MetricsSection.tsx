"use client"

import { DEFAULT_METRICS, DEFAULT_SECTION_HEADERS } from "@/lib/cms/defaults"
import { getIcon } from "@/lib/cms/icons"
import type { SectionHeader } from "@/lib/cms/mappers"
import type { MetricItem } from "@/lib/cms/defaults"

interface MetricsSectionProps {
  metrics?: MetricItem[]
  header?: SectionHeader
}

const MetricsSection = ({
  metrics = DEFAULT_METRICS,
  header = DEFAULT_SECTION_HEADERS.metrics,
}: MetricsSectionProps) => {
  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          {header.eyebrow && <span className="eyebrow">{header.eyebrow}</span>}
          <h2 className="section-title mt-4">
            {header.title}{" "}
            {header.titleHighlight && <span className="hl-grad">{header.titleHighlight}</span>}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map(({ iconName, value, label, description }) => {
            const Icon = getIcon(iconName)
            return (
              <div key={label + value} className="card-3d interactive-card p-6 md:p-7">
                <span className="icon-pill">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 font-display text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
                  {value}
                  <span className="block text-base font-semibold text-muted">{label}</span>
                </p>
                <p className="mt-3 text-sm text-muted" style={{ lineHeight: 1.6 }}>
                  {description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MetricsSection
