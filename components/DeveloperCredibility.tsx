"use client"

import { MapPin, ArrowRight } from "lucide-react"
import { DEFAULT_DEVELOPER, DEFAULT_SECTION_HEADERS, DEFAULT_SITE } from "@/lib/cms/defaults"
import { getIcon } from "@/lib/cms/icons"
import type { SectionHeader } from "@/lib/cms/mappers"

type DeveloperProfile = typeof DEFAULT_DEVELOPER & { sectionSubtitle?: string }

interface DeveloperCredibilityProps {
  profile?: DeveloperProfile
  header?: SectionHeader
  bookingUrl?: string
}

const DeveloperCredibility = ({
  profile = DEFAULT_DEVELOPER,
  header = DEFAULT_SECTION_HEADERS.developer,
  bookingUrl = DEFAULT_SITE.bookingUrl,
}: DeveloperCredibilityProps) => {
  const subtitle = profile.sectionSubtitle ?? header.subtitle

  return (
    <section id="team" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          {header.eyebrow && <span className="eyebrow">{header.eyebrow}</span>}
          <h2 className="section-title mt-4">
            {header.title}{" "}
            {header.titleHighlight && <span className="hl-grad">{header.titleHighlight}</span>}
          </h2>
          {subtitle && <p className="section-sub mt-4">{subtitle}</p>}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="card-3d p-6 md:p-7">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="mx-auto h-24 w-24 rounded-2xl object-cover md:mx-0"
              />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--color-primary-highlight)] md:mx-0">
                <span className="font-display text-4xl font-extrabold text-[var(--color-primary)]">
                  {profile.avatarInitials}
                </span>
              </div>
            )}

            <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
              {profile.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-primary)]">{profile.role}</p>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </div>

            <div className="mt-5 space-y-2.5">
              {profile.highlights.map(({ iconName, label }) => {
                const Icon = getIcon(iconName)
                return (
                  <div key={label} className="flex items-center gap-2.5 text-sm text-muted">
                    <Icon className="h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                    <span>{label}</span>
                  </div>
                )
              })}
            </div>

            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
              Book a call with {profile.name.split(" ")[0]}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <p className="text-lg text-[var(--color-text)]" style={{ lineHeight: 1.65 }}>
              {profile.tagline}
            </p>

            <div className="grid gap-3">
              {profile.approach.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-primary)]/20"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                  </span>
                  <span className="text-sm text-muted">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeveloperCredibility
