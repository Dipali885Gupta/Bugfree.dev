"use client"

import { useEffect, useRef } from "react"
import { Rocket, ShieldCheck, Cpu, ArrowRight, X, Check, Layers, Brain, Palette } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SITE } from "@/lib/site"

interface ServiceDetail {
  label: string
  value: string
}

interface Service {
  id: string
  icon: LucideIcon
  title: string
  badge: string
  description: string
  bullets: string[]
  details: ServiceDetail[]
}

const SERVICES: Service[] = [
  {
    id: "mvp",
    icon: Rocket,
    title: "MVP Launch Sprint",
    badge: "~3 weeks",
    description:
      "Launch a mobile or web app fast enough for user validation, investor demos, or fundraising rounds.",
    bullets: [
      "Product scoping, UX flows, frontend, backend, auth, admin panel",
      "React / Next.js / React Native builds",
      "Deployment on Vercel, Railway, or AWS",
      "Clean codebase with handoff documentation",
    ],
    details: [
      { label: "Included", value: "Scoping workshop, UX direction, full-stack build, deployment, handoff docs" },
      { label: "Best fit", value: "Startup founders, pre-seed teams, investor demo builds, pilot launches" },
      { label: "Deliverables", value: "Working app, admin panel, user auth, deployment, clean repo" },
      { label: "Timeline", value: "~3 weeks" },
      { label: "Not for", value: "Teams with no clarity on what to build" },
      { label: "Projects", value: "NativeNest, Photobytes" },
    ],
  },
  {
    id: "full-product",
    icon: Layers,
    title: "Full Product Development",
    badge: "Scratch → Production",
    description:
      "From zero to production-ready — complete product design, build, deployment, and ongoing monthly support.",
    bullets: [
      "Product strategy, UX design, full-stack build from scratch",
      "Admin dashboard, analytics, user management, payments",
      "Production deployment with CI/CD, monitoring, SSL",
      "Monthly support and iteration retainer included",
    ],
    details: [
      { label: "Included", value: "Strategy, UX, full-stack build, admin panel, deployment, monthly support" },
      { label: "Best fit", value: "Founders with a validated idea, companies building a flagship product" },
      { label: "Deliverables", value: "Full production app, admin dashboard, monitoring, support SLA" },
      { label: "Timeline", value: "8–16 weeks depending on scope" },
      { label: "Not for", value: "Tight budgets under $15K, single-page projects" },
      { label: "Projects", value: "AccountSaathi, InsureFlow" },
    ],
  },
  {
    id: "production",
    icon: ShieldCheck,
    title: "Production Upgrade & Support",
    badge: "Scale-ready",
    description:
      "Take a rough MVP to production-grade — stronger architecture, performance, observability, ongoing support.",
    bullets: [
      "Code audit, architecture cleanup, CI/CD, infra, QA hardening",
      "Monitoring, alerting, security review",
      "Ongoing feature delivery and bug fix SLA",
    ],
    details: [
      { label: "Included", value: "Code audit, refactor, monitoring, CI/CD, infra setup, QA" },
      { label: "Best fit", value: "Teams with traction, post-fundraise build-out, messy MVP code" },
      { label: "Deliverables", value: "Clean architecture, monitoring dashboard, release process" },
      { label: "Timeline", value: "4–12 weeks typical" },
      { label: "Not for", value: "Products with no existing codebase" },
      { label: "Projects", value: "AccountSaathi" },
    ],
  },
  {
    id: "ai-setup",
    icon: Brain,
    title: "AI Setups & Integrations",
    badge: "1–2 weeks",
    description:
      "Add AI capabilities to your existing product — LLM integration, RAG pipelines, chatbots, and AI agents.",
    bullets: [
      "LLM integration (GPT-4o, Claude, Gemini) into your product",
      "RAG pipelines for document Q&A and knowledge retrieval",
      "Custom AI agents, chatbots, and copilots",
      "Fine-tuning, prompt engineering, and evaluation",
    ],
    details: [
      { label: "Included", value: "AI architecture, integration, prompt engineering, testing, deployment" },
      { label: "Use cases", value: "Chatbots, document search, content generation, data extraction, copilots" },
      { label: "Best fit", value: "Products that need AI features without hiring a dedicated ML team" },
      { label: "Timeline", value: "1–2 weeks per integration" },
      { label: "Not for", value: "Training foundation models from scratch" },
      { label: "Projects", value: "AccountSaathi AI, Outbound AI Engine" },
    ],
  },
  {
    id: "ai-automation",
    icon: Cpu,
    title: "AI Workflow Automation",
    badge: "Within 5 days",
    description:
      "Install AI into your operations — lead gen to content to internal copilots. Live in 5 days.",
    bullets: [
      "Lead capture, outbound personalization, content pipelines",
      "CRM automation, reporting, invoice/doc processing",
      "Internal support copilots and ops assistants",
      "Powered by LLMs, LangChain, Python agent systems",
    ],
    details: [
      { label: "Included", value: "Workflow mapping, tool integrations, prompt engineering, testing, handover" },
      { label: "Use cases", value: "Lead gen, content pipelines, CRM sync, ops copilots, support agents" },
      { label: "Best fit", value: "D2C brands, SaaS ops teams, service businesses, founders who want leverage" },
      { label: "Timeline", value: "3–7 days per workflow" },
      { label: "Not for", value: "Companies with no defined operations or data yet" },
      { label: "Projects", value: "Outbound AI Engine" },
    ],
  },
  {
    id: "landing",
    icon: Palette,
    title: "Landing Pages & Small Projects",
    badge: "1–2 weeks",
    description:
      "High-impact landing pages, marketing sites, and small web projects with custom admin panels baked in.",
    bullets: [
      "Pixel-perfect landing pages with modern animations",
      "Custom admin dashboard for content management",
      "Form integrations, analytics, SEO setup",
      "Deployment with hosting configuration",
    ],
    details: [
      { label: "Included", value: "Design, build, admin panel, form handling, deployment" },
      { label: "Best fit", value: "Marketing sites, agency pages, small business web presence" },
      { label: "Deliverables", value: "Live site, admin panel, analytics, deployment" },
      { label: "Timeline", value: "1–2 weeks" },
      { label: "Not for", value: "Complex web apps or marketplaces" },
      { label: "Projects", value: "HotelSupply, FixiSecurity landing pages" },
    ],
  },
]

const ServiceModal = ({ service }: { service: Service }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClick = (e: MouseEvent) => {
      const r = dialog.getBoundingClientRect()
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        dialog.close()
      }
    }
    dialog.addEventListener("click", onClick)
    return () => dialog.removeEventListener("click", onClick)
  }, [])

  const Icon = service.icon

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

        <a
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-6 w-full"
        >
          Book a scoping call
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </dialog>
  )
}

const Services = () => {
  const openModal = (id: string) => {
    const dialog = document.getElementById(`service-modal-${id}`) as HTMLDialogElement | null
    dialog?.showModal()
  }

  return (
    <section id="services" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">Services</span>
          <h2 className="section-title mt-4">Six offers. Very clear outcomes.</h2>
          <p className="section-sub mt-4">
            From a quick landing page to a full AI product — pick the service that fits your stage.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon
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

      {SERVICES.map((service) => (
        <ServiceModal key={service.id} service={service} />
      ))}
    </section>
  )
}

export default Services
