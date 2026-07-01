import type { LucideIcon } from "lucide-react"
import { Brain, UserCheck, Award, Gauge, Rocket, Smartphone, Zap, Bot, Lock } from "lucide-react"
import { SITE, NAV_LINKS } from "@/lib/site"
import { getAllProjects } from "@/lib/projects"

export interface ChipItem {
  icon: LucideIcon
  label: string
}

export interface PanelCard {
  title: string
  body: string
  featured: boolean
}

export interface SectionHeader {
  eyebrow?: string
  title: string
  titleHighlight?: string
  subtitle?: string
}

export interface ServiceItem {
  id: string
  iconName: string
  title: string
  badge: string
  description: string
  bullets: string[]
  details: { label: string; value: string }[]
}

export interface MetricItem {
  iconName: string
  value: string
  label: string
  description: string
}

export interface ProcessPhase {
  iconName: string
  number: string
  title: string
  subtitle: string
  timeline: string
  body: string
  outcomes: string[]
  highlight: string
}

export interface ProductPreviewCard {
  name: string
  type: string
  accent: string
  gradientFrom: string
  gradientTo: string
  image?: string
}

export interface DeveloperHighlight {
  iconName: string
  label: string
}

export const DEFAULT_NAV = NAV_LINKS.map((l, i) => ({
  name: l.name,
  href: l.href,
  display_order: i + 1,
}))

export interface SiteConfig {
  name: string
  tagline: string
  email: string
  bookingEmail: string
  bookingUrl: string
  linkedin: string
  github: string
  description: string
}

export const DEFAULT_SITE: SiteConfig = {
  name: SITE.name,
  tagline: SITE.tagline,
  email: SITE.email,
  bookingEmail: SITE.bookingEmail,
  bookingUrl: SITE.bookingUrl,
  linkedin: SITE.social.linkedin,
  github: SITE.social.github,
  description:
    "AI-native product engineering studio. We ship mobile apps, web platforms, and AI automations — fast.",
}

export const DEFAULT_HERO = {
  badge: "For founders who ship — not just plan",
  headline: "Ship your MVP in ",
  headlineAccent1: "3 weeks.",
  headlineLine2: "Automate your ops in ",
  headlineAccent2: "5 days.",
  subheadline:
    "GetCodeFree builds mobile apps, web platforms, and AI automations for startups and growth-stage businesses — with a lean senior team, production-grade execution, and founder-level speed.",
  ctaPrimary: { text: "Start a project", href: "#contact" },
  ctaSecondary: { text: "See shipped work", href: "#projects" },
  panelLabel: "What we ship",
  panelBadge: "6 offers",
  metaChips: [
    { iconName: "Smartphone", label: "Mobile apps" },
    { iconName: "Monitor", label: "Web platforms" },
    { iconName: "Bot", label: "AI automations" },
    { iconName: "ShieldCheck", label: "Production support" },
  ],
  panelCards: [
    {
      title: "MVP Launch Sprint",
      body: "Scope, design, build, ship. One focused sprint — production-ready MVP in ~3 weeks.",
      featured: true,
    },
    {
      title: "Full Product Development",
      body: "From zero to production — design, build, deploy, and monthly support included.",
      featured: false,
    },
    {
      title: "AI Workflow Automation",
      body: "Lead gen, content pipelines, CRM sync, and internal copilots shipped in days — not months.",
      featured: false,
    },
  ] as PanelCard[],
  tickerItems: [
    "React Native builds",
    "Next.js product teams",
    "LangChain workflows",
    "Python automations",
    "Supabase + Node.js",
    "Founder-led execution",
    "AI agent systems",
  ],
}

export const DEFAULT_SECTION_HEADERS: Record<string, SectionHeader> = {
  product_preview: {
    eyebrow: "Product UI",
    title: "Interfaces we ship",
    subtitle: "Dashboards, mobile flows, and admin panels — production-grade from day one.",
  },
  services: {
    eyebrow: "What we build",
    title: "Six ways we ship",
    titleHighlight: "fast.",
    subtitle: "From MVP sprints to AI automations — pick the track that matches your stage.",
  },
  process: {
    eyebrow: "How we work",
    title: "Three phases.",
    titleHighlight: "One partner.",
    subtitle: "A tested delivery model — not a sales pitch.",
  },
  metrics: {
    eyebrow: "Why us",
    title: "No inflated logos.",
    titleHighlight: "Just real numbers.",
  },
  projects: {
    eyebrow: "Selected builds",
    title: "Shipped products.",
    titleHighlight: "Real results.",
  },
  about: {
    eyebrow: "The difference",
    title: "Built differently.",
    titleHighlight: "On purpose.",
  },
  tech: {
    eyebrow: "What we build with",
    title: "Frontend · Backend · Mobile · AI · Infrastructure",
  },
  developer: {
    eyebrow: "Who builds it",
    title: "Senior engineer. Founder-led.",
    titleHighlight: "No middlemen.",
    subtitle:
      "Every project is personally built and overseen by Amitav — a senior full-stack engineer with a decade of experience shipping production applications.",
  },
  testimonials: {
    eyebrow: "Client stories",
    title: "Founders who shipped",
    titleHighlight: "with us.",
  },
  contact: {
    eyebrow: "Get started",
    title: "Ready to ship?",
    subtitle: "Book a call or send a brief — we respond within 24 hours.",
  },
}

export const DEFAULT_SOCIAL_PROOF = [
  { iconName: "Rocket", label: "20+ products built" },
  { iconName: "Smartphone", label: "1 live App Store app" },
  { iconName: "Zap", label: "3-week average MVP delivery" },
  { iconName: "Bot", label: "AI-native team — not a headcount play" },
  { iconName: "Lock", label: "Senior engineers only" },
]

export const DEFAULT_ABOUT_CARDS = [
  {
    iconName: "Brain",
    title: "AI-native, not AI-adjacent",
    description:
      "Every workflow uses LLM-assisted development, automated QA, and agent-driven processes. Speed without sacrificing quality.",
  },
  {
    iconName: "UserCheck",
    title: "Founder-led execution",
    description:
      "You speak directly with the person building. No account managers, no PM layers, no handoff lag. What you describe is what gets shipped.",
  },
  {
    iconName: "Award",
    title: "Senior engineers only",
    description:
      "No juniors on your project. Every engineer has shipped production apps with real users and real scale.",
  },
  {
    iconName: "Gauge",
    title: "Speed as a system, not a promise",
    description:
      "The 5-week MVP timeline is a tested delivery model. It works because scope, tooling, and workflow are built around it.",
  },
]

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "mvp",
    iconName: "Rocket",
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
    iconName: "Layers",
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
    iconName: "ShieldCheck",
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
    iconName: "Brain",
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
    iconName: "Cpu",
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
    iconName: "Palette",
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

export const DEFAULT_METRICS: MetricItem[] = [
  { iconName: "Rocket", value: "20+", label: "Products built", description: "Web platforms, mobile apps, and AI automations shipped to production." },
  { iconName: "Clock", value: "~3 wk", label: "Average MVP delivery", description: "From scope to deployed product. Not months — weeks." },
  { iconName: "Bot", value: "AI-native", label: "Development approach", description: "Multi-agent workflows, LLM-assisted code review, automated testing. Not a headcount play." },
  { iconName: "Users", value: "10+ yr", label: "Senior engineer experience", description: "Every project is led by a senior full-stack engineer. No juniors on your product." },
  { iconName: "ShieldCheck", value: "Production-", label: "grade from day one", description: "Auth, CI/CD, monitoring, security. Not a prototype thrown over the wall." },
  { iconName: "Gauge", value: "1 team", label: "Direct partnership", description: "You speak directly with the person building. No PM layers, no account managers." },
]

export const DEFAULT_PROCESS: ProcessPhase[] = [
  {
    iconName: "Target",
    number: "01",
    title: "Build your MVP",
    subtitle: "Under 3 weeks",
    timeline: "Weeks 1–3",
    body: "We align on your vision, define the scope, and ship a production-grade MVP. No ambiguity, no scope creep — just a working product with real architecture.",
    outcomes: [
      "Clear spec with user flows and milestones",
      "Production-grade MVP deployed on your infra",
      "Admin dashboard and user auth included",
      "Clean codebase with full handoff docs",
    ],
    highlight: "From zero to deployed in weeks — not months",
  },
  {
    iconName: "Gauge",
    number: "02",
    title: "Iterate & Scale",
    subtitle: "Ongoing sprints",
    timeline: "Weekly",
    body: "Once the MVP is live, we run weekly sprints to ship features, improve UX, optimize performance, and prepare your product for growth.",
    outcomes: [
      "Feature sprints with clear priorities",
      "Performance optimization and scalability hardening",
      "User feedback integration and UX polish",
      "Architecture evolution as you grow",
    ],
    highlight: "Ship features every week — not every quarter",
  },
  {
    iconName: "Headphones",
    number: "03",
    title: "Support & Partner",
    subtitle: "Weekly calls",
    timeline: "Always on",
    body: "We stay with you. Weekly sync calls, async communication, ongoing maintenance, and strategic advice to keep your product ahead.",
    outcomes: [
      "Weekly strategy and progress calls",
      "Active communication on Slack / WhatsApp",
      "Bug fixes and hotfix SLA under 24 hours",
      "Ongoing product and growth consulting",
    ],
    highlight: "A partner who cares about outcomes — not just output",
  },
]

export const DEFAULT_TECH_STACK = {
  row1: ["React", "Next.js", "React Native", "Node.js", "Python"],
  row2: ["LangChain", "GPT-4o / Claude", "Supabase", "PostgreSQL", "Vercel", "AWS"],
}

export const DEFAULT_PRODUCT_PREVIEW: ProductPreviewCard[] = [
  { name: "KPI Dashboard", type: "App UI", accent: "#19d3c5", gradientFrom: "#0d3d3a", gradientTo: "#10161c" },
  { name: "Mobile Onboarding", type: "App UI", accent: "#6f8cff", gradientFrom: "#1a2240", gradientTo: "#10161c" },
  { name: "Analytics Platform", type: "Dashboard", accent: "#19d3c5", gradientFrom: "#0f2d30", gradientTo: "#10161c" },
  { name: "Control Panel", type: "Dashboard", accent: "#ffb44c", gradientFrom: "#2d2010", gradientTo: "#10161c" },
  { name: "Transaction Feed", type: "Dashboard", accent: "#a78bfa", gradientFrom: "#1e1535", gradientTo: "#10161c" },
  { name: "CRM Overview", type: "Dashboard", accent: "#19d3c5", gradientFrom: "#0d3d3a", gradientTo: "#10161c" },
  { name: "Chat Interface", type: "App UI", accent: "#6f8cff", gradientFrom: "#1a2240", gradientTo: "#10161c" },
  { name: "Settings Panel", type: "Dashboard", accent: "#34d399", gradientFrom: "#0f2d20", gradientTo: "#10161c" },
]

export const DEFAULT_DEVELOPER = {
  name: "Amitav Panda",
  role: "Founder & Senior Full-Stack Engineer",
  location: "Bengaluru, India",
  experience: "10+ years",
  tagline: "I lead every project personally. No account managers, no handoffs — just senior-level execution.",
  avatarInitials: "AP",
  avatarUrl: null as string | null,
  highlights: [
    { iconName: "Briefcase", label: "10+ years full-stack development" },
    { iconName: "Code", label: "React, Next.js, Node.js, React Native, Python" },
    { iconName: "Award", label: "AI/ML: LLMs, LangChain, agents, RAG pipelines" },
    { iconName: "GraduationCap", label: "Shipped 20+ products from zero to production" },
  ] as DeveloperHighlight[],
  approach: [
    "Every line of code I ship is production-grade — not prototype quality",
    "I use AI workflows to deliver 3x faster without cutting corners",
    "You get direct access. No project manager buffer, no communication lag",
    "I only take projects where I can personally guarantee the outcome",
  ],
}

export const DEFAULT_FOOTER_SERVICES = [
  { label: "MVP Sprint", href: "/#services" },
  { label: "Production Upgrade", href: "/#services" },
  { label: "AI Automation", href: "/#services" },
]

export const DEFAULT_FOOTER_COMPANY = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
]

export const DEFAULT_PROJECTS = getAllProjects()

// Static icon refs for about (client components that need LucideIcon)
export const ABOUT_ICON_ITEMS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Brain, title: DEFAULT_ABOUT_CARDS[0].title, body: DEFAULT_ABOUT_CARDS[0].description ?? "" },
  { icon: UserCheck, title: DEFAULT_ABOUT_CARDS[1].title, body: DEFAULT_ABOUT_CARDS[1].description ?? "" },
  { icon: Award, title: DEFAULT_ABOUT_CARDS[2].title, body: DEFAULT_ABOUT_CARDS[2].description ?? "" },
  { icon: Gauge, title: DEFAULT_ABOUT_CARDS[3].title, body: DEFAULT_ABOUT_CARDS[3].description ?? "" },
]

export const SOCIAL_PROOF_ICON_ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: Rocket, label: DEFAULT_SOCIAL_PROOF[0].label },
  { icon: Smartphone, label: DEFAULT_SOCIAL_PROOF[1].label },
  { icon: Zap, label: DEFAULT_SOCIAL_PROOF[2].label },
  { icon: Bot, label: DEFAULT_SOCIAL_PROOF[3].label },
  { icon: Lock, label: DEFAULT_SOCIAL_PROOF[4].label },
]
