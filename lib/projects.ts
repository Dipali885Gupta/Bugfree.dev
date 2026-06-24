export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  status: string
  industry: string
  description: string
  longDescription: string
  image: string
  stack: string[]
  metrics: ProjectMetric[]
  architecture: string
  outcomes: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  categories: string[]
  featured: boolean
  order: number
}

export const PROJECTS: Project[] = [
  {
    slug: "nativenest",
    name: "NativeNest",
    tagline: "Language learning that actually sticks",
    status: "Live — App Store",
    industry: "Mobile · EdTech",
    description:
      "Language-learning mobile app built for engagement-first onboarding and daily practice loops.",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
    longDescription:
      "NativeNest is a comprehensive language-learning platform that transforms how users approach new languages. The app features adaptive lesson pacing based on spaced repetition algorithms, real-time fluency tracking, and a social component that connects language learners for peer practice sessions. Built with React Native for cross-platform deployment, the app delivers near-native performance while maintaining a single codebase for iOS and Android.\n\nThe onboarding flow uses gamification principles to drive daily active usage, with streaks, achievements, and personalized review sessions that adapt to each learner's forgetting curve. Integration with speech recognition APIs enables pronunciation practice with instant feedback.",
    stack: ["React Native", "Expo", "Node.js", "Supabase", "PostgreSQL", "Redis"],
    metrics: [
      { value: "10k+", label: "Downloads" },
      { value: "85%", label: "Retention" },
      { value: "4.8", label: "App Rating" },
      { value: "40min", label: "Daily Session" },
    ],
    architecture: `React Native App (Expo)
       ↓
Node.js REST API
       ↓
Supabase (Auth + PostgreSQL)
       ↓
Redis Cache Layer
       ↓
Push Notifications + Analytics
       ↓
App Store & Play Store Deployment`,
    outcomes: [
      "Achieved 85% user retention through engagement-first design",
      "Reached 4.8 star rating on App Store with 500+ reviews",
      "Generated 10k+ downloads within first quarter",
      "Built scalable architecture supporting 50k+ daily active users",
    ],
    categories: ["mobile", "featured"],
    featured: true,
    order: 1,
  },
  {
    slug: "accounsaathi",
    name: "AccounSaathi",
    tagline: "Accounting ops, simplified",
    status: "Beta — Web App",
    industry: "Web App · FinOps",
    description:
      "Accounting workflow platform for small businesses — simplifying internal ops and financial process management.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
    longDescription:
      "AccounSaathi is a purpose-built accounting operations platform designed specifically for small businesses managing complex financial workflows. The platform provides real-time dashboards that consolidate cash flow, invoices, expenses, and tax obligations into a single view, eliminating the need for multiple disconnected tools.\n\nThe role-based access control system enables business owners to give limited access to accountants, bookkeepers, and team members while maintaining security. Automated bank reconciliation and invoice generation save hours of manual work each week. The platform integrates with popular accounting software and banking APIs for seamless data flow.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    metrics: [
      { value: "500+", label: "Businesses" },
      { value: "40+", label: "Integrations" },
      { value: "99.9%", label: "Uptime" },
      { value: "12hrs", label: "Weekly Savings" },
    ],
    architecture: `Next.js Dashboard (SSR + ISR)
       ↓
Node.js API Layer
       ↓
PostgreSQL via Prisma ORM
       ↓
Redis Cache + Session Store
       ↓
Admin Ops + Role-based Access Control`,
    outcomes: [
      "Onboarded 500+ small businesses within first year",
      "Integrated with 40+ accounting and banking platforms",
      "Achieved 99.9% uptime with auto-scaling infrastructure",
      "Saved businesses an average of 12 hours per week on accounting tasks",
    ],
    categories: ["web", "featured"],
    featured: true,
    order: 2,
  },
  {
    slug: "outbound-ai",
    name: "Outbound AI Engine",
    tagline: "AI-powered sales at scale",
    status: "Internal Tool",
    industry: "AI Automation · Sales Ops",
    description:
      "AI-assisted outbound workflow for prospect research, personalisation at scale, and CRM-ready campaigns.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    longDescription:
      "The Outbound AI Engine is a comprehensive sales automation platform that leverages large language models to transform cold outreach. The system intake hundreds of prospect companies, enriches them with firmographic and technographic data, and uses AI agents to generate highly personalized email sequences tailored to each prospect's industry, role, and recent company news.\n\nThe platform maintains a full audit trail for compliance, manages unsubscribe requests automatically, and syncs all activities back to the CRM. Machine learning models continuously optimize send times, subject lines, and content variations based on engagement metrics.",
    stack: ["Python", "FastAPI", "LangChain", "GPT-4o", "PostgreSQL", "Redis"],
    metrics: [
      { value: "10k+", label: "Campaigns" },
      { value: "60%", label: "Reply Rate" },
      { value: "3x", label: "Pipeline Growth" },
      { value: "100%", label: "CRM Sync" },
    ],
    architecture: `Prospect Data Intake
       ↓
Enrichment + Research Agent (LangChain)
       ↓
LLM Personalization Layer (GPT-4o)
       ↓
Campaign Content Generator
       ↓
CRM Sync + Delivery Pipeline
       ↓
Analytics + Optimization Loop`,
    outcomes: [
      "Achieved 60% average reply rate across campaigns",
      "Generated 3x pipeline growth for sales teams",
      "Processed 10k+ campaigns with 99.9% delivery rate",
      "Integrated seamlessly with Salesforce, HubSpot, and Pipedrive",
    ],
    categories: ["ai", "automations", "featured"],
    featured: true,
    order: 3,
  },
  {
    slug: "medtracker",
    name: "MedTracker",
    tagline: "Healthcare scheduling made simple",
    status: "Live — Web + Mobile",
    industry: "Healthcare · SaaS",
    description:
      "Patient scheduling and medication tracking platform for clinics and pharmacies.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    longDescription:
      "MedTracker is a HIPAA-compliant healthcare management platform that streamlines patient scheduling, medication tracking, and clinical workflow management. The platform serves both patients and healthcare providers with a unified experience that reduces no-shows and improves medication adherence.\n\nFeatures include automated appointment reminders via SMS and email, real-time availability calendar sync with Google and Apple calendars, e-prescription integration, and comprehensive reporting for clinic managers. The mobile-first design ensures healthcare workers can manage their schedules from any device.",
    stack: ["React Native", "Node.js", "PostgreSQL", "AWS SES", "Twilio"],
    metrics: [
      { value: "95%", label: "Appt. Show Rate" },
      { value: "60%", label: "No-Show Reduction" },
      { value: "3days", label: "Avg. Setup Time" },
    ],
    architecture: `React Native App
       ↓
Node.js Backend API
       ↓
PostgreSQL Database
       ↓
AWS Services (SES, SQS)
       ↓
Twilio SMS Integration
       ↓
HIPAA-compliant Cloud Infrastructure`,
    outcomes: [
      "Reduced no-show rates by 60% through automated reminders",
      "Achieved 95% appointment show rate with reminder system",
      "Deployed to 50+ clinics across 3 states",
    ],
    categories: ["mobile", "web"],
    featured: false,
    order: 4,
  },
  {
    slug: "inventory-pro",
    name: "Inventory Pro",
    tagline: "Real-time stock intelligence",
    status: "Live — Enterprise",
    industry: "Enterprise · Logistics",
    description:
      "Real-time inventory management system with predictive restocking and multi-warehouse support.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    longDescription:
      "Inventory Pro is an enterprise-grade inventory management system designed for businesses with complex supply chain needs. The platform provides real-time visibility into stock levels across multiple warehouses, predictive analytics for restocking decisions, and seamless integration with popular e-commerce platforms and ERP systems.\n\nAdvanced features include barcode scanning via mobile app, automated purchase order generation based on reorder points, and comprehensive reporting that helps businesses optimize their working capital tied up in inventory. The system handles millions of SKUs with sub-second query performance.",
    stack: ["Next.js", "Python", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    metrics: [
      { value: "2M+", label: "SKUs Managed" },
      { value: "30%", label: "Inventory Reduction" },
      { value: "99.99%", label: "System Uptime" },
    ],
    architecture: `Next.js Dashboard (Web App)
       ↓
Python Microservices
       ↓
PostgreSQL + TimescaleDB
       ↓
Redis Cache Layer
       ↓
Kubernetes Orchestration
       ↓
Multi-warehouse IoT Sensors`,
    outcomes: [
      "Reduced excess inventory by 30% through predictive analytics",
      "Managed 2M+ SKUs across 8 warehouse locations",
      "Achieved 99.99% uptime with auto-healing infrastructure",
    ],
    categories: ["web", "featured"],
    featured: true,
    order: 5,
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured).sort((a, b) => a.order - b.order)

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getAllProjects(): Project[] {
  return PROJECTS.sort((a, b) => a.order - b.order)
}
