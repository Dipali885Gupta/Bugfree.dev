import { Linkedin, Github, Mail } from "lucide-react"
import { SITE } from "@/lib/site"

const SERVICES = [
  { label: "MVP Sprint", href: "/#services" },
  { label: "Production Upgrade", href: "/#services" },
  { label: "AI Automation", href: "/#services" },
]

const COMPANY = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
]

const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-divider)] py-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_auto]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl font-display text-lg font-extrabold"
                style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}
              >
                G
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-[var(--color-text)]">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted" style={{ lineHeight: 1.6 }}>
              AI-native product engineering studio. We ship mobile apps, web platforms, and AI
              automations — fast.
            </p>
            <p className="mt-5 text-xs text-faint">© 2026 {SITE.name}. All rights reserved.</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-faint">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-[var(--color-primary)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-faint">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-[var(--color-primary)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex gap-3 md:flex-col">
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-muted transition-all hover:text-[var(--color-primary)] hover:border-[rgba(var(--color-primary-rgb),0.4)]"
            >
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-muted transition-all hover:text-[var(--color-primary)] hover:border-[rgba(var(--color-primary-rgb),0.4)]"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-muted transition-all hover:text-[var(--color-primary)] hover:border-[rgba(var(--color-primary-rgb),0.4)]"
            >
              <Mail className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
