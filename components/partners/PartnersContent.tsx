import {
  ArrowRight,
  Check,
  Globe2,
  Handshake,
  Layers,
  Rocket,
  Users,
  Bot,
  Briefcase,
  Megaphone,
  Palette,
  LineChart,
  Code2,
} from "lucide-react"
import PartnerForm from "@/components/partners/PartnerForm"
import {
  HandshakeIllustration,
  RocketIllustration,
  BotWorkflowIllustration,
  GlobeDealIllustration,
} from "@/components/partners/PartnerIllustrations"

const OUTCOMES = [
  {
    num: "01",
    title: "Idea → MVP",
    subtitle: "From an idea to a product your client can actually launch.",
    bullets: [
      "Launch their first version",
      "Validate the business idea",
      "Get the product in front of real users",
      "Start collecting feedback",
      "Move from idea to a real business",
    ],
    target: "Target: ~4–5 weeks for a clearly scoped MVP.",
    Illustration: RocketIllustration,
  },
  {
    num: "02",
    title: "MVP → Production",
    subtitle: "From an early product to something ready for real customers and growth.",
    bullets: [
      "Move beyond a prototype",
      "Improve reliability",
      "Support more users",
      "Prepare for growth",
      "Continue building without starting over",
    ],
    target: null,
    Illustration: HandshakeIllustration,
  },
  {
    num: "03",
    title: "Manual process → AI-powered system",
    subtitle: "Turn repetitive work into automated business workflows.",
    bullets: [
      "Lead generation — find and qualify faster",
      "Sales follow-ups — less manual chase",
      "Customer engagement — without full manual load",
      "Collections — automate payment follow-ups",
      "Operations — cut repetitive admin work",
    ],
    target: "Goal isn't “add AI.” Goal is save time, improve execution, help businesses grow.",
    Illustration: BotWorkflowIllustration,
  },
]

const AUDIENCES = [
  {
    icon: Briefcase,
    title: "Business Consultants",
    body: "Clients ask you for technology solutions.",
  },
  {
    icon: LineChart,
    title: "IT Sales · BDRs · Account Execs",
    body: "You surface software / AI demand — we deliver. Strong fit for IT sales, export-oriented sales, and BDRs bringing US & international deals.",
  },
  {
    icon: Megaphone,
    title: "Digital & Marketing Agencies",
    body: "Clients need products, automation or AI beyond your current services.",
  },
  {
    icon: Palette,
    title: "Web & Design Agencies",
    body: "You own the client and design relationship — need a strong technology partner.",
  },
  {
    icon: Rocket,
    title: "Startup Consultants",
    body: "Founders need someone who turns ideas into products.",
  },
  {
    icon: Code2,
    title: "Technology Consultants",
    body: "You need a reliable engineering team behind your recommendations.",
  },
]

const STEPS = [
  { n: "01", t: "You find the opportunity", d: "A client has a product, software, AI or automation requirement." },
  { n: "02", t: "We explore it together", d: "We understand what the client is trying to achieve." },
  { n: "03", t: "We define the right solution", d: "MVP, scope and path to delivery — clear and realistic." },
  { n: "04", t: "We build and deliver", d: "GetCodeFree owns technology execution end to end." },
  { n: "05", t: "You grow the relationship", d: "One win can become a long-term technology partnership." },
]

const WHY = [
  "Senior technical leadership",
  "Direct communication",
  "Product-focused thinking",
  "AI + software expertise",
  "Ownership from idea to delivery",
]

export default function PartnersContent() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute -left-[12%] top-[8%] h-[42%] w-[46%] rounded-full blur-3xl"
            style={{ background: "var(--color-primary-glow)" }}
          />
          <div
            className="absolute right-[0%] top-[4%] h-[38%] w-[40%] rounded-full blur-3xl"
            style={{ background: "var(--color-blue-glow)" }}
          />
        </div>

        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="eyebrow">
                <Handshake className="h-3.5 w-3.5" />
                Partner Network
              </span>
              <h1
                className="mt-5 font-display font-extrabold text-[var(--color-text)]"
                style={{ fontSize: "var(--text-hero)", letterSpacing: "-0.05em", lineHeight: 0.94 }}
              >
                You bring the opportunity.
                <br />
                <span className="hl-grad">We make it happen.</span>
              </h1>
              <p className="mt-6 max-w-xl text-muted" style={{ fontSize: "var(--text-base)", lineHeight: 1.65 }}>
                Help clients turn ideas, business problems and repetitive processes into working
                software and AI-powered systems — without building your own technology team.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#partner-form" className="btn btn-primary">
                  Become a Partner
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#how-it-works" className="btn btn-ghost">
                  How it works
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-faint">
                <Globe2 className="h-4 w-4 text-[var(--color-primary)]" />
                Especially strong when you bring US & international clients.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <HandshakeIllustration className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* RELATIONSHIP */}
      <section className="section pt-0">
        <div className="container-x">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-blue-rgb),0.08) 55%, transparent)",
            }}
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <span className="eyebrow">The split</span>
                <h2 className="section-title mt-4">
                  Your client has the problem.
                  <br />
                  <span className="hl-grad">You have the relationship.</span>
                </h2>
                <p className="section-sub mt-4 max-w-md">
                  You bring the opportunity. We bring the technology team to make it happen.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  { t: "A new product?", d: "Turn the idea into an MVP they can launch and validate." },
                  {
                    t: "An existing product that needs to grow?",
                    d: "Take it from early MVP to a reliable production product.",
                  },
                  {
                    t: "Too much repetitive manual work?",
                    d: "Automate lead gen, sales follow-ups, customer follow-ups and collections.",
                  },
                  {
                    t: "Want to use AI in the business?",
                    d: "Turn practical business processes into AI-powered systems.",
                  },
                ].map((item) => (
                  <li key={item.t} className="flex gap-3">
                    <span className="icon-pill mt-0.5 h-7 w-7 shrink-0 rounded-lg">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">{item.t}</p>
                      <p className="mt-1 text-sm text-muted">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Outcomes</span>
            <h2 className="section-title mt-4">
              Three outcomes we help you <span className="hl-grad">deliver</span>
            </h2>
          </div>

          <div className="mt-12 space-y-8">
            {OUTCOMES.map((o) => (
              <div
                key={o.num}
                className="grid gap-8 rounded-[1.75rem] border border-[var(--color-border)] p-6 md:grid-cols-[1fr_auto] md:p-8"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div>
                  <p className="font-display text-sm font-bold tracking-widest text-[var(--color-primary)]">
                    {o.num}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-text)]">
                    {o.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-muted">{o.subtitle}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {o.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-[var(--color-text)]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {o.target && <p className="mt-5 text-sm font-medium text-[var(--color-primary)]">{o.target}</p>}
                </div>
                <div className="hidden w-44 shrink-0 items-center justify-center md:flex">
                  <o.Illustration className="w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY + INTERNATIONAL */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="eyebrow">Why GetCodeFree</span>
              <h2 className="section-title mt-4">
                Senior technical leadership behind{" "}
                <span className="hl-grad">every opportunity</span>
              </h2>
              <p className="section-sub mt-4 max-w-xl">
                Your client&apos;s reputation is connected to the partner you introduce. GetCodeFree
                is founder-led — senior engineering experience with US-based startups, hands-on SaaS,
                AI systems and business applications.
              </p>
              <ul className="mt-7 space-y-3">
                {WHY.map((w) => (
                  <li key={w} className="flex items-center gap-3 text-sm text-[var(--color-text)]">
                    <span className="icon-pill h-7 w-7 rounded-lg">
                      <Check className="h-4 w-4" />
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-muted">
                You don&apos;t need to become the technology company.
                <br />
                <span className="font-semibold text-[var(--color-text)]">
                  We become the technology team behind you.
                </span>
              </p>
            </div>
            <div
              className="rounded-[1.75rem] border border-[var(--color-border)] p-7 md:p-8"
              style={{
                background:
                  "linear-gradient(160deg, rgba(var(--color-blue-rgb),0.14), rgba(var(--color-primary-rgb),0.08))",
              }}
            >
              <GlobeDealIllustration className="mx-auto mb-4 w-48" />
              <h3 className="font-display text-xl font-bold text-[var(--color-text)]">
                US & international clients welcome
              </h3>
              <p className="mt-3 text-sm text-muted" style={{ lineHeight: 1.6 }}>
                Partners who open doors to US and global businesses are a priority. If you work in IT
                sales, BDR, channel / export sales, or agency BD — and your clients need software, AI
                or automation — we want to talk.
              </p>
              <p className="mt-4 text-sm font-medium text-[var(--color-primary)]">
                Software · AI · Automation · SaaS · Mobile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Proof</span>
            <h2 className="section-title mt-4">
              We build products <span className="hl-grad">ourselves</span>
            </h2>
            <p className="section-sub mt-4">Real products. Not just development services.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card-3d p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-faint">Platform</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[var(--color-text)]">
                    EcomAI
                  </h3>
                </div>
                <span className="icon-pill h-11 w-11 rounded-xl">
                  <Bot className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm text-muted" style={{ lineHeight: 1.6 }}>
                Our AI-powered business platform — AI Business Assistant, AI Sales Agent, AI Collection
                Agent. Shows how we turn business workflows into practical AI systems.
              </p>
              <a
                href="https://ecombharatai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-6"
              >
                Explore EcomAI
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="card-3d p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-faint">Mobile</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[var(--color-text)]">
                    Ceren One
                  </h3>
                </div>
                <span className="icon-pill h-11 w-11 rounded-xl">
                  <Layers className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm text-muted" style={{ lineHeight: 1.6 }}>
                A mobile product built for a Bangalore-based startup — another example of taking a
                product from concept to a working application.
              </p>
              <a
                href="https://apps.apple.com/us/app/cerenone/id6758958090"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-6"
              >
                View product
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Users className="h-3.5 w-3.5" />
              Who this is for
            </span>
            <h2 className="section-title mt-4">
              You already work with businesses.{" "}
              <span className="hl-grad">We add the technology layer.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-[var(--color-border)] p-5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <span className="icon-pill h-10 w-10 rounded-xl">
                  <a.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-[var(--color-text)]">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted" style={{ lineHeight: 1.55 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how-it-works" className="section scroll-mt-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Process</span>
            <h2 className="section-title mt-4">
              How it <span className="hl-grad">works</span>
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-[var(--color-border)] p-5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <p className="font-display text-sm font-bold text-[var(--color-primary)]">{s.n}</p>
                <h3 className="mt-2 font-semibold text-[var(--color-text)]">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PARTNERSHIP NOT REFERRAL */}
      <section className="section">
        <div className="container-x">
          <div
            className="rounded-[2rem] border border-[var(--color-border)] p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), transparent 60%)",
            }}
          >
            <span className="eyebrow">Partnership</span>
            <h2 className="section-title mt-4 max-w-2xl">
              A partnership, <span className="hl-grad">not just a referral</span>
            </h2>
            <p className="section-sub mt-4 max-w-2xl">
              We&apos;re not looking for people to simply send leads. We want people with real
              relationships with businesses — including IT sales / BDRs and partners who can open US
              & international doors — who want to give clients access to a strong technology team.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-faint">You bring</p>
                <p className="mt-2 text-[var(--color-text)]">
                  The relationship + business context + opportunity
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-faint">We bring</p>
                <p className="mt-2 text-[var(--color-text)]">
                  The technology + AI expertise + execution
                </p>
              </div>
            </div>
            <p className="mt-8 font-display text-xl font-bold text-[var(--color-text)]">
              Together, we create more value for the client.
            </p>
          </div>
        </div>
      </section>

      {/* FORM CTA */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="eyebrow">Ready</span>
              <h2 className="section-title mt-4">
                Have a client who needs <span className="hl-grad">technology?</span>
              </h2>
              <p className="section-sub mt-4">
                You bring the opportunity. We bring the technology team.
              </p>
              <p className="mt-6 text-sm font-medium text-[var(--color-primary)]">
                Software · AI · Automation · SaaS · Mobile
              </p>
              <BotWorkflowIllustration className="mt-8 hidden w-48 lg:block" />
            </div>

            <div className="card-3d p-6 md:p-8">
              <h3 className="font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                Become a GetCodeFree Partner
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Tell us about yourself — we reply on email (same as project enquiries).
              </p>
              <div className="mt-6">
                <PartnerForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
