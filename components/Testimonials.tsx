"use client"

import { Quote, Linkedin, Twitter, Globe } from "lucide-react"
import { DEFAULT_SECTION_HEADERS } from "@/lib/cms/defaults"
import type { SectionHeader } from "@/lib/cms/mappers"
import type { Testimonial } from "@/lib/supabase/types"

interface MappedTestimonial {
  quote: string
  name: string
  role: string
  initial: string
  linkedinUrl: string | null
  twitterUrl: string | null
  websiteUrl: string | null
}

const FALLBACK_TESTIMONIALS: MappedTestimonial[] = [
  {
    quote:
      "We had a half-built product that had been stuck for 3 months. GetCodeFree scoped it in a day, shipped it in 4 weeks. It's now our main demo for investors.",
    name: "Alex M.",
    role: "CTO at a fintech startup",
    initial: "A",
    linkedinUrl: null,
    twitterUrl: null,
    websiteUrl: null,
  },
  {
    quote:
      "I needed a lead generation workflow that didn't require a full-time ops hire. They built it in 4 days. It's been running without touching it for 2 months.",
    name: "Priya K.",
    role: "Founder at a D2C brand",
    initial: "P",
    linkedinUrl: null,
    twitterUrl: null,
    websiteUrl: null,
  },
]

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  header?: SectionHeader
}

function mapTestimonials(rows: Testimonial[]): MappedTestimonial[] {
  if (!rows.length) return FALLBACK_TESTIMONIALS
  return rows.map((t) => ({
    quote: t.testimonial_text,
    name: t.client_name,
    role: [t.client_title, t.client_company].filter(Boolean).join(" · ") || "Client",
    initial: t.client_name.charAt(0).toUpperCase(),
    linkedinUrl: t.linkedin_url,
    twitterUrl: t.twitter_url,
    websiteUrl: t.website_url,
  }))
}

const TestimonialsSection = ({
  testimonials = [],
  header = DEFAULT_SECTION_HEADERS.testimonials,
}: TestimonialsSectionProps) => {
  const items = mapTestimonials(testimonials)

  return (
    <section id="testimonials" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          {header.eyebrow && <span className="eyebrow">{header.eyebrow}</span>}
          <h2 className="section-title mt-4">
            {header.title}{" "}
            {header.titleHighlight && <span className="hl-grad">{header.titleHighlight}</span>}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((t) => (
            <figure key={t.name + t.quote.slice(0, 20)} className="card-3d interactive-card flex flex-col p-7 md:p-8">
              <Quote className="h-8 w-8 text-[var(--color-primary)] opacity-40" />
              <blockquote className="mt-4 flex-1 text-lg text-[var(--color-text)]" style={{ lineHeight: 1.55 }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg font-bold"
                  style={{ background: "var(--color-primary-highlight)", color: "var(--color-primary)" }}
                >
                  {t.initial}
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold text-[var(--color-text)]">{t.name}</span>
                  <span className="text-sm text-faint">{t.role}</span>
                  {(t.linkedinUrl || t.twitterUrl || t.websiteUrl) && (
                    <span className="mt-1 flex items-center gap-2">
                      {t.linkedinUrl && (
                        <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-faint hover:text-[var(--color-primary)] transition-colors" title="LinkedIn">
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {t.twitterUrl && (
                        <a href={t.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-faint hover:text-[var(--color-primary)] transition-colors" title="X (Twitter)">
                          <Twitter className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {t.websiteUrl && (
                        <a href={t.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-faint hover:text-[var(--color-primary)] transition-colors" title="Website">
                          <Globe className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
