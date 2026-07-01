"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, Calendar } from "lucide-react"
import { DEFAULT_NAV, DEFAULT_SITE, type SiteConfig } from "@/lib/cms/defaults"

interface NavbarProps {
  site?: SiteConfig
  nav?: { name: string; href: string }[]
}

const Navbar = ({ site = DEFAULT_SITE, nav = DEFAULT_NAV }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const stored = (localStorage.getItem("gcf-theme") as "dark" | "light") || "dark"
    setTheme(stored)
    document.documentElement.setAttribute("data-theme", stored)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark"
      document.documentElement.setAttribute("data-theme", next)
      try {
        localStorage.setItem("gcf-theme", next)
      } catch {}
      return next
    })
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-[18px] bg-[var(--color-bg)]/70 border-b border-[var(--color-divider)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "py-3" : "py-5"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
              <span
                className="grid h-9 w-9 place-items-center rounded-xl font-display text-lg font-extrabold"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                  boxShadow: "0 8px 22px rgba(var(--color-primary-rgb),0.35)",
                }}
              >
                G
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-extrabold tracking-tight text-[var(--color-text)]">
                  {site.name}
                </span>
                <span className="text-[0.7rem] text-faint">{site.tagline}</span>
              </span>
            </Link>

            {/* Center links */}
            <nav className="hidden items-center gap-8 md:flex">
              {nav.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-[var(--color-primary)]"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-muted transition-all hover:text-[var(--color-primary)] hover:border-[rgba(var(--color-primary-rgb),0.4)]"
              >
                {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>

              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary hidden sm:inline-flex"
              >
                <Calendar className="h-4 w-4" />
                Book a strategy call
              </a>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 p-6 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background: "linear-gradient(180deg, var(--color-surface), var(--color-surface-2))",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-lg font-extrabold text-[var(--color-text)]">{site.name}</span>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text)]"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {nav.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-[var(--color-text)] transition-colors hover:bg-white/5 hover:text-[var(--color-primary)]"
            >
              {link.name}
            </a>
          ))}

          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary mt-4 w-full"
          >
            <Calendar className="h-4 w-4" />
            Book a strategy call
          </a>
        </aside>
      </div>
    </>
  )
}

export default Navbar
