"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, X, Check } from "lucide-react"
import { DEFAULT_SERVICES, DEFAULT_SECTION_HEADERS, DEFAULT_SITE } from "@/lib/cms/defaults"
import { getIcon } from "@/lib/cms/icons"
import type { SectionHeader } from "@/lib/cms/mappers"
import type { ServiceItem } from "@/lib/cms/defaults"

interface ServicesProps {
  services?: ServiceItem[]
  header?: SectionHeader
  bookingUrl?: string
}

const ServiceModal = ({ service, bookingUrl }: { service: ServiceItem; bookingUrl: string }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClick = (e: MouseEvent) => {
      const r = dialog.getBoundingClientRect()
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        dialog.close()
      }
    }
    dialog.addEventListener("click", onClick)
    return () => dialog.removeEventListener("click", onClick)
  }, [])

  const Icon = getIcon(service.iconName)

  return (
    <dialog ref={dialogRef} id={`service-modal-${service.id}`} aria-label={service.title}>
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="icon-pill">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                {service.title}
              </h3>
              <span className="badge mt-1">{service.badge}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-muted transition-colors hover:text-[var(--color-text)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-sm text-muted" style={{ lineHeight: 1.6 }}>
          {service.description}
        </p>

        <dl className="mt-5 space-y-3 border-t border-[var(--color-divider)] pt-5">
          {service.details.map((d) => (
            <div key={d.label} className="grid grid-cols-[110px_1fr] gap-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">{d.label}</dt>
              <dd className="text-sm text-[var(--color-text)]">{d.value}</dd>
            </div>
          ))}
        </dl>

        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
          Book a scoping call
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </dialog>
  )
}

const Services = ({
  services = DEFAULT_SERVICES,
  header = DEFAULT_SECTION_HEADERS.services,
  bookingUrl = DEFAULT_SITE.bookingUrl,
}: ServicesProps) => {
  const openModal = (id: string) => {
    const dialog = document.getElementById(`service-modal-${id}`) as HTMLDialogElement | null
    dialog?.showModal()
  }

  return (
    <section id="services" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          {header.eyebrow && <span className="eyebrow">{header.eyebrow}</span>}
          <h2 className="section-title mt-4">
            {header.title}{" "}
            {header.titleHighlight && <span className="hl-grad">{header.titleHighlight}</span>}
          </h2>
          {header.subtitle && <p className="section-sub mt-4">{header.subtitle}</p>}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = getIcon(service.iconName)
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => openModal(service.id)}
                className="card-3d interactive-card group flex flex-col p-6 text-left"
                aria-haspopup="dialog"
              >
                <div className="flex items-center justify-between">
                  <span className="icon-pill">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="badge">{service.badge}</span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted" style={{ lineHeight: 1.6 }}>
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]">
                  View full scope
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {services.map((service) => (
        <ServiceModal key={service.id} service={service} bookingUrl={bookingUrl} />
      ))}
    </section>
  )
}

export default Services
