"use client"

const ROW_1 = ["React", "Next.js", "React Native", "Node.js", "Python"]
const ROW_2 = ["LangChain", "GPT-4o / Claude", "Supabase", "PostgreSQL", "Vercel", "AWS"]

const Pill = ({ label }: { label: string }) => (
  <span
    className="rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)]"
    style={{ background: "rgba(255,255,255,0.03)" }}
  >
    {label}
  </span>
)

const TechStack = () => {
  return (
    <section id="tech" className="section">
      <div className="container-x">
        <div className="max-w-2xl reveal-up">
          <span className="eyebrow">What we build with</span>
          <h2 className="section-title mt-4">Frontend · Backend · Mobile · AI · Infrastructure</h2>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2.5">
            {ROW_1.map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {ROW_2.map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack
