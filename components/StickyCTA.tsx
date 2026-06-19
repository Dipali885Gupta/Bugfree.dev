"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Calendar, X } from "lucide-react"
import { SITE } from "@/lib/site"

const StickyCTA = () => {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] backdrop-blur-xl transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      style={{ background: "rgba(9, 13, 17, 0.92)" }}
    >
      <div className="container-x flex items-center justify-between gap-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <span className="hidden h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-sm font-extrabold text-[var(--color-text-inverse)] md:flex">
            G
          </span>
          <p className="text-sm text-[var(--color-text)]">
            <span className="hidden md:inline">Ship your MVP in </span>
            <span className="font-bold text-[var(--color-primary)]">~3 weeks</span>
            <span className="hidden md:inline"> — production-ready, senior-built, AI-native</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !min-h-[36px] !px-4 !py-2 text-xs md:!px-5 md:!py-2.5 md:text-sm"
          >
            <Calendar className="h-3.5 w-3.5" />
            Book a strategy call
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-[var(--color-text)]"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StickyCTA
