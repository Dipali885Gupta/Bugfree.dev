"use client"

import { useEffect, useRef, useState } from "react"

interface ProductCard {
  name: string
  type: string
  accent: string
  gradientFrom: string
  gradientTo: string
}

const PRODUCTS: ProductCard[] = [
  { name: "KPI Dashboard", type: "App UI", accent: "#19d3c5", gradientFrom: "#0d3d3a", gradientTo: "#10161c" },
  { name: "Mobile Onboarding", type: "App UI", accent: "#6f8cff", gradientFrom: "#1a2240", gradientTo: "#10161c" },
  { name: "Analytics Platform", type: "Dashboard", accent: "#19d3c5", gradientFrom: "#0f2d30", gradientTo: "#10161c" },
  { name: "Control Panel", type: "Dashboard", accent: "#ffb44c", gradientFrom: "#2d2010", gradientTo: "#10161c" },
  { name: "Transaction Feed", type: "Dashboard", accent: "#a78bfa", gradientFrom: "#1e1535", gradientTo: "#10161c" },
  { name: "CRM Overview", type: "Dashboard", accent: "#19d3c5", gradientFrom: "#0d3d3a", gradientTo: "#10161c" },
  { name: "Chat Interface", type: "App UI", accent: "#6f8cff", gradientFrom: "#1a2240", gradientTo: "#10161c" },
  { name: "Settings Panel", type: "Dashboard", accent: "#34d399", gradientFrom: "#0f2d20", gradientTo: "#10161c" },
]

const MiniBar = ({ width, color }: { width: string; color: string }) => (
  <div className="h-2 rounded-full" style={{ width, background: color, opacity: 0.6 }} />
)

const DashboardMock = ({ accent, gradientFrom }: { accent: string; gradientFrom: string }) => (
  <div className="w-full h-full p-3 flex flex-col gap-2 overflow-hidden" style={{ background: `linear-gradient(180deg, ${gradientFrom}, var(--color-surface-2))` }}>
    <div className="flex items-center justify-between">
      <div className="h-3 w-20 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="flex gap-1">
        {[accent, "rgba(255,255,255,0.15)", "rgba(255,255,255,0.1)"].map((c, i) => (
          <div key={i} className="h-5 px-1.5 rounded text-[0.45rem] flex items-center" style={{ background: i === 0 ? `${accent}18` : "rgba(255,255,255,0.04)", color: i === 0 ? accent : "rgba(255,255,255,0.4)" }}>
            {i === 0 ? "30D" : i === 1 ? "7D" : "1D"}
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      {[
        { label: "Revenue", val: "48.2K", change: "+24%", changeColor: "#34d399" },
        { label: "Users", val: "12.8K", change: "+18%", changeColor: accent },
        { label: "Conv.", val: "3.8%", change: "+5%", changeColor: "#6f8cff" },
      ].map((m) => (
        <div key={m.label} className="rounded-lg p-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>
          <p className="text-[0.35rem] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{m.label}</p>
          <p className="text-[0.65rem] font-bold" style={{ color: "var(--color-text)" }}>{m.val}</p>
          <p className="text-[0.35rem]" style={{ color: m.changeColor }}>{m.change}</p>
        </div>
      ))}
    </div>
    <div className="flex-1 rounded-lg relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
      <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`chartFill-${accent.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 50 L15 42 L30 45 L45 35 L55 38 L70 28 L85 25 L100 30 L115 20 L130 15 L145 22 L160 10 L175 12 L190 8 L200 5" fill="none" stroke={accent} strokeWidth="2" />
        <path d="M0 50 L15 42 L30 45 L45 35 L55 38 L70 28 L85 25 L100 30 L115 20 L130 15 L145 22 L160 10 L175 12 L190 8 L200 5 L200 60 L0 60 Z" fill={`url(#chartFill-${accent.replace("#", "")})`} />
      </svg>
    </div>
    <div className="flex gap-1.5">
      <div className="flex-1 rounded-lg p-1.5" style={{ background: "rgba(255,255,255,0.03)" }}>
        <MiniBar width="70%" color={accent} />
        <MiniBar width="50%" color="rgba(255,255,255,0.15)" />
      </div>
      <div className="flex-1 rounded-lg p-1.5" style={{ background: "rgba(255,255,255,0.03)" }}>
        <MiniBar width="55%" color="#6f8cff" />
        <MiniBar width="40%" color="rgba(255,255,255,0.15)" />
      </div>
    </div>
  </div>
)

const MobileMock = ({ accent, gradientFrom }: { accent: string; gradientFrom: string }) => (
  <div className="w-full h-full p-2.5 flex flex-col gap-1.5 overflow-hidden" style={{ background: `linear-gradient(180deg, ${gradientFrom}, var(--color-surface-2))` }}>
    <div className="flex items-center justify-between">
      <div className="h-2 w-10 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="flex gap-1">
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
      </div>
    </div>
    <p className="text-[0.4rem] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Good morning</p>
    <p className="text-[0.65rem] font-bold" style={{ color: "var(--color-text)" }}>Dashboard</p>
    <div className="rounded-lg p-2" style={{ background: `linear-gradient(135deg, ${accent}, #6f8cff)` }}>
      <p className="text-[0.4rem]" style={{ color: "rgba(255,255,255,0.7)" }}>Total Balance</p>
      <p className="text-[0.95rem] font-bold text-white">{"$"}12,847</p>
    </div>
    <div className="grid grid-cols-2 gap-1">
      <div className="rounded p-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>
        <p className="text-[0.35rem]" style={{ color: "rgba(255,255,255,0.4)" }}>Users</p>
        <p className="text-[0.55rem] font-bold" style={{ color: "var(--color-text)" }}>847</p>
      </div>
      <div className="rounded p-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>
        <p className="text-[0.35rem]" style={{ color: "rgba(255,255,255,0.4)" }}>MRR</p>
        <p className="text-[0.55rem] font-bold" style={{ color: accent }}>{"$"}4.2K</p>
      </div>
    </div>
    {[["Alex K.", "Upgraded", accent], ["Sarah M.", "New signup", "#6f8cff"], ["Jake R.", "Referral", "#34d399"]].map(([name, action, dotColor]) => (
      <div key={name} className="flex items-center gap-1.5 py-0.5">
        <div className="h-4 w-4 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${dotColor}, ${accent})` }} />
        <div className="flex-1 min-w-0">
          <p className="text-[0.4rem] font-medium truncate" style={{ color: "var(--color-text)" }}>{name}</p>
          <p className="text-[0.3rem]" style={{ color: "rgba(255,255,255,0.4)" }}>{action}</p>
        </div>
      </div>
    ))}
  </div>
)

const ProductCard = ({ product }: { product: ProductCard }) => (
  <div
    className="flex-shrink-0 overflow-hidden"
    style={{
      width: "clamp(280px, 30vw, 420px)",
      borderRadius: "1.25rem",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 25px 60px rgba(var(--color-shadow-rgb),0.4), 0 0 40px rgba(var(--color-primary-rgb),0.05)",
    }}
  >
    <div style={{ height: "clamp(220px, 22vw, 300px)" }}>
      {product.type === "Dashboard" ? (
        <DashboardMock accent={product.accent} gradientFrom={product.gradientFrom} />
      ) : (
        <MobileMock accent={product.accent} gradientFrom={product.gradientFrom} />
      )}
    </div>
    <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg, var(--color-surface), var(--color-surface-2))" }}>
      <div>
        <p className="text-xs font-bold" style={{ color: "var(--color-text)" }}>{product.name}</p>
        <p className="text-[0.6rem]" style={{ color: "rgba(255,255,255,0.4)" }}>{product.type}</p>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#34d399" }} />
        <span className="text-[0.55rem]" style={{ color: "#34d399" }}>Live</span>
      </div>
    </div>
  </div>
)

const ProductPreview = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const allProducts = [...PRODUCTS, ...PRODUCTS]

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-4 md:py-10">
      <div className="container-x">
        <div className="text-center mb-8 reveal-up">
          <span className="eyebrow">What we ship</span>
          <h2 className="section-title mt-4">
            Real products. <span className="hl-grad">Real dashboards.</span>
          </h2>
          <p className="section-sub mt-3 mx-auto max-w-xl">
            Production-grade apps with real UI — not wireframes, not prototypes. Every build ships with a live dashboard.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40" style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }} />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40" style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }} />

        <div className={`ticker ${visible ? "" : "opacity-0"}`}>
          <div className="ticker-track" style={{ animationDuration: "40s" }}>
            {allProducts.map((product, i) => (
              <div key={`${product.name}-${i}`} style={{ perspective: "1200px" }}>
                <div
                  style={{
                    transform: "rotateY(-2deg) rotateX(1deg)",
                    transition: "transform 0.4s var(--ease-enter)",
                  }}
                  className="hover:scale-[1.02]"
                >
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-6">
        <p className="text-center text-xs text-[var(--color-text-faint)]">
          These are real production UIs — every project ships with analytics, auth, and live dashboards.
        </p>
      </div>
    </section>
  )
}

export default ProductPreview