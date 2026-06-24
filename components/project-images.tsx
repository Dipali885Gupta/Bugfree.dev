"use client"

import type { ReactNode } from "react"

interface VisualConfig {
  primary: string
  secondary: string
  name: string
}

const CONFIGS: Record<string, VisualConfig> = {
  nativenest: { primary: "#34d399", secondary: "#0f172a", name: "NativeNest" },
  accounsaathi: { primary: "#6F8CFF", secondary: "#0f172a", name: "AccounSaathi" },
  "outbound-ai": { primary: "#a78bfa", secondary: "#0f172a", name: "Outbound AI" },
  medtracker: { primary: "#f97316", secondary: "#0f172a", name: "MedTracker" },
  "inventory-pro": { primary: "#fbbf24", secondary: "#0f172a", name: "Inventory Pro" },
}

export function ProjectHeroImage({ slug }: { slug: string }) {
  const config = CONFIGS[slug] || CONFIGS.nativenest
  const { primary, secondary } = config

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: `linear-gradient(180deg, ${secondary}, #0a0a0f)`,
        boxShadow: "0 25px 60px rgba(var(--color-shadow-rgb),0.4), 0 0 40px rgba(var(--color-primary-rgb),0.06)",
      }}
    >
      <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-4 rounded-lg px-4 py-1.5 text-[0.7rem] font-medium text-[var(--color-text-faint)] flex-1 max-w-[50%]" style={{ background: "rgba(255,255,255,0.06)" }}>
          app.getcodefreetech.com
        </div>
      </div>
      <div style={{ height: "28rem", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-3 w-3 rounded-full" style={{ background: primary, boxShadow: `0 0 16px ${primary}` }} />
              <span className="text-[0.7rem] font-medium text-faint uppercase tracking-wider">Product Dashboard Preview</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl p-4 border" style={{ borderColor: `${primary}20`, background: `linear-gradient(135deg, ${primary}08, transparent)` }}>
                <div className="font-display text-2xl font-bold" style={{ color: primary }}>10k+</div>
                <div className="text-[0.65rem] font-medium text-muted uppercase tracking-wider mt-1">Active Users</div>
              </div>
              <div className="rounded-xl p-4 border" style={{ borderColor: `${primary}20`, background: `linear-gradient(135deg, ${primary}08, transparent)` }}>
                <div className="font-display text-2xl font-bold" style={{ color: primary }}>85%</div>
                <div className="text-[0.65rem] font-medium text-muted uppercase tracking-wider mt-1">Retention</div>
              </div>
              <div className="rounded-xl p-4 border" style={{ borderColor: `${primary}20`, background: `linear-gradient(135deg, ${primary}08, transparent)` }}>
                <div className="font-display text-2xl font-bold" style={{ color: primary }}>4.8</div>
                <div className="text-[0.65rem] font-medium text-muted uppercase tracking-wider mt-1">Rating</div>
              </div>
            </div>
            <div className="flex items-end gap-2 h-32 rounded-xl p-4 border" style={{ borderColor: `${primary}20`, background: `${primary}06` }}>
              {[35, 55, 42, 78, 60, 90, 72, 95, 82, 65, 45, 88, 70, 50].map((h, i) => (
                <div key={i} className="w-full rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, ${primary}, ${primary}60)`, animation: `chartRise 0.6s ease-out ${i * 0.04}s both` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectGallery({ slug }: { slug: string }) {
  const config = CONFIGS[slug] || CONFIGS.nativenest
  const { primary, secondary } = config

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)", background: `linear-gradient(180deg, ${secondary}, #0a0a0f)`, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
        <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <div className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-auto text-[0.55rem] font-medium text-faint uppercase">Analytics</span>
        </div>
        <div className="p-5 flex flex-col items-center justify-center" style={{ minHeight: "16rem" }}>
          <div className="grid grid-cols-2 gap-3 w-full mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg p-3" style={{ background: `${primary}08`, border: `1px solid ${primary}20` }}>
                <div className="h-2 rounded-full w-3/4 mb-2" style={{ background: `${primary}40` }} />
                <div className="h-4 rounded w-1/2" style={{ background: primary }} />
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1.5 w-full h-20">
            {[40, 55, 35, 70, 50, 85, 65, 45, 60, 75, 55, 40].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, ${primary}, ${primary}50)` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)", background: `linear-gradient(180deg, ${secondary}, #0a0a0f)`, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
        <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <div className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-auto text-[0.55rem] font-medium text-faint uppercase">Features</span>
        </div>
        <div className="p-5 flex flex-col justify-center" style={{ minHeight: "16rem" }}>
          <div className="space-y-3">
            {["User Management", "Real-time Sync", "Analytics Dashboard", "API Integrations"].map((feat) => (
              <div key={feat} className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ background: `linear-gradient(90deg, ${primary}10, transparent)`, borderLeft: `3px solid ${primary}` }}>
                <div className="h-2 w-2 rounded-full" style={{ background: primary, boxShadow: `0 0 8px ${primary}` }} />
                <span className="text-sm font-medium text-[var(--color-text)]">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectFeatureImage({ slug }: { slug: string }) {
  const config = CONFIGS[slug] || CONFIGS.nativenest
  const { primary, secondary, name } = config

  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.08)", background: `linear-gradient(180deg, ${secondary}, #0a0a0f)`, boxShadow: "0 25px 60px rgba(var(--color-shadow-rgb),0.4), 0 0 40px rgba(var(--color-primary-rgb),0.06)" }}>
      <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-4 rounded-lg px-4 py-1.5 text-[0.7rem] font-medium text-[var(--color-text-faint)] flex-1 max-w-[50%]" style={{ background: "rgba(255,255,255,0.06)" }}>
          app.getcodefreetech.com
        </div>
      </div>
      <div style={{ height: "26rem", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 flex items-center justify-center px-16">
          <div className="w-full max-w-4xl">
            <div className="rounded-2xl p-8 border" style={{ borderColor: `${primary}20`, background: `linear-gradient(135deg, ${primary}08, transparent)` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center font-display font-bold" style={{ background: primary, color: "#000" }}>
                  {name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text)]">{name}</div>
                  <div className="text-xs text-muted">System Architecture Overview</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between gap-4">
                {["Frontend", "API", "Database", "Cache", "Infra"].map((layer) => (
                  <div key={layer} className="flex-1 rounded-xl p-4 text-center border" style={{ borderColor: `${primary}30`, background: `${primary}08` }}>
                    <div className="h-2 w-8 rounded-full mx-auto mb-2" style={{ background: primary }} />
                    <div className="text-[0.6rem] font-semibold text-muted uppercase">{layer}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${primary}, transparent)` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
