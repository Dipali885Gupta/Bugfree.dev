"use client"

import { DEFAULT_ABOUT_CARDS, DEFAULT_SECTION_HEADERS } from "@/lib/cms/defaults"
import { getIcon } from "@/lib/cms/icons"
import type { SectionHeader } from "@/lib/cms/mappers"

interface AboutItem {
  iconName: string
  title: string
  description: string
}

interface AboutSectionProps {
  items?: AboutItem[]
  header?: SectionHeader
}

const AboutSection = ({
  items = DEFAULT_ABOUT_CARDS,
  header = DEFAULT_SECTION_HEADERS.about,
}: AboutSectionProps) => {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          {header.eyebrow && <span className="eyebrow">{header.eyebrow}</span>}
          <h2 className="section-title mt-4">
            {header.title}{" "}
            {header.titleHighlight && <span className="hl-grad">{header.titleHighlight}</span>}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map(({ iconName, title, description }) => {
            const Icon = getIcon(iconName)
            return (
              <div key={title} className="card-3d interactive-card p-6 md:p-7">
                <span className="icon-pill">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-muted" style={{ lineHeight: 1.65 }}>
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

export default AboutSection
