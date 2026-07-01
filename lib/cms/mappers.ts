import type {
  SiteSettings,
  NavItem,
  HeroSection,
  FeatureCard,
  Project,
  ProcessStep,
  ContactSection,
  FaqItem,
  BudgetOption,
  FooterLink,
  Testimonial,
} from "@/lib/supabase/types"
import {
  DEFAULT_HERO,
  DEFAULT_SECTION_HEADERS,
  DEFAULT_SOCIAL_PROOF,
  DEFAULT_ABOUT_CARDS,
  DEFAULT_SERVICES,
  DEFAULT_METRICS,
  DEFAULT_PROCESS,
  DEFAULT_TECH_STACK,
  DEFAULT_PRODUCT_PREVIEW,
  DEFAULT_DEVELOPER,
  DEFAULT_SITE,
  DEFAULT_NAV,
  DEFAULT_FOOTER_SERVICES,
  DEFAULT_FOOTER_COMPANY,
  DEFAULT_PROJECTS,
  type SectionHeader,
  type ServiceItem,
  type MetricItem,
  type ProcessPhase,
  type ProductPreviewCard,
  type SiteConfig,
} from "./defaults"
import type { Project as LandingProject } from "@/lib/projects"

// Extended DB row shapes (columns added in cms-landing-v2.sql)
export interface LandingSectionRow {
  key: string
  eyebrow: string | null
  title: string | null
  title_highlight: string | null
  subtitle: string | null
  extra?: Record<string, unknown> | null
}

export interface SocialProofRow {
  icon_name: string
  label: string
}

export interface MetricsRow {
  icon_name: string
  value: string
  label: string
  description: string | null
}

export interface TechStackRow {
  label: string
  row_number: number
}

export interface DeveloperProfileRow {
  name: string
  role: string | null
  location: string | null
  experience: string | null
  tagline: string | null
  avatar_initials: string | null
  avatar_url: string | null
  section_subtitle: string | null
  highlights: { icon_name: string; label: string }[] | null
  approach: string[] | null
}

export interface ProductPreviewRow {
  name: string
  card_type: string
  accent_color: string | null
  gradient_from: string | null
  gradient_to: string | null
  image_url?: string | null
}

export interface HeroExtended extends HeroSection {
  headline_line2?: string | null
  headline_accent1?: string | null
  headline_accent2?: string | null
  secondary_cta_text?: string | null
  secondary_cta_link?: string | null
  panel_label?: string | null
  panel_badge?: string | null
  meta_chips?: { icon_name: string; label: string }[] | null
  panel_cards?: { title: string; body: string; featured: boolean }[] | null
  ticker_items?: string[] | null
}

export interface FeatureCardExtended extends FeatureCard {
  section?: string | null
  badge?: string | null
  bullets?: string[] | null
  item_key?: string | null
  details?: { label: string; value: string }[] | null
}

export interface ProcessStepExtended extends ProcessStep {
  subtitle?: string | null
  timeline?: string | null
  outcomes?: string[] | null
  highlight?: string | null
  phase_number?: string | null
}

export interface ProjectExtended extends Project {
  slug?: string | null
  industry?: string | null
  categories?: string[] | null
  tagline?: string | null
}

export interface SiteSettingsExtended extends SiteSettings {
  tagline?: string | null
  booking_url?: string | null
  booking_email?: string | null
  linkedin_url?: string | null
  github_url?: string | null
  logo_url?: string | null
}

function sectionHeader(key: string, rows: LandingSectionRow[]): SectionHeader {
  const row = rows.find((r) => r.key === key)
  const fallback = DEFAULT_SECTION_HEADERS[key]
  if (!row) return fallback
  return {
    eyebrow: row.eyebrow ?? fallback.eyebrow,
    title: row.title ?? fallback.title,
    titleHighlight: row.title_highlight ?? fallback.titleHighlight,
    subtitle: row.subtitle ?? fallback.subtitle,
  }
}

export function mapSiteSettings(raw: SiteSettings | null): SiteConfig {
  if (!raw) return DEFAULT_SITE
  const s = raw as SiteSettingsExtended
  return {
    name: s.company_name || DEFAULT_SITE.name,
    tagline: s.tagline || DEFAULT_SITE.tagline,
    email: s.primary_email || DEFAULT_SITE.email,
    bookingEmail: s.booking_email || DEFAULT_SITE.bookingEmail,
    bookingUrl: s.booking_url || DEFAULT_SITE.bookingUrl,
    linkedin: s.linkedin_url || DEFAULT_SITE.linkedin,
    github: s.github_url || DEFAULT_SITE.github,
    description: s.company_description || DEFAULT_SITE.description,
  }
}

export function mapNavItems(items: NavItem[]) {
  if (!items.length) return DEFAULT_NAV
  return items.map((n) => ({ name: n.name, href: n.href, display_order: n.display_order }))
}

export function mapHero(raw: HeroSection | null) {
  if (!raw) return DEFAULT_HERO
  const h = raw as HeroExtended
  return {
    badge: h.badge_text || DEFAULT_HERO.badge,
    headline: h.headline || DEFAULT_HERO.headline,
    headlineAccent1: h.headline_accent1 || h.headline_highlight || DEFAULT_HERO.headlineAccent1,
    headlineLine2: h.headline_line2 || DEFAULT_HERO.headlineLine2,
    headlineAccent2: h.headline_accent2 || DEFAULT_HERO.headlineAccent2,
    subheadline: h.subheadline || DEFAULT_HERO.subheadline,
    ctaPrimary: { text: h.cta_text || DEFAULT_HERO.ctaPrimary.text, href: h.cta_link || DEFAULT_HERO.ctaPrimary.href },
    ctaSecondary: {
      text: h.secondary_cta_text || DEFAULT_HERO.ctaSecondary.text,
      href: h.secondary_cta_link || DEFAULT_HERO.ctaSecondary.href,
    },
    panelLabel: h.panel_label || DEFAULT_HERO.panelLabel,
    panelBadge: h.panel_badge || DEFAULT_HERO.panelBadge,
    metaChips: h.meta_chips?.length
      ? (h.meta_chips as { icon_name?: string; iconName?: string; label: string }[]).map((c) => ({
          iconName: c.icon_name ?? c.iconName ?? "Sparkles",
          label: c.label,
        }))
      : DEFAULT_HERO.metaChips,
    panelCards: h.panel_cards?.length ? h.panel_cards : DEFAULT_HERO.panelCards,
    tickerItems: h.ticker_items?.length ? h.ticker_items : DEFAULT_HERO.tickerItems,
  }
}

export function mapSocialProof(rows: SocialProofRow[]) {
  if (!rows.length) return DEFAULT_SOCIAL_PROOF
  return rows.map((r) => ({ iconName: r.icon_name, label: r.label }))
}

export function mapAboutCards(cards: FeatureCard[]) {
  const about = (cards as FeatureCardExtended[]).filter((c) => !c.section || c.section === "about")
  if (!about.length) return DEFAULT_ABOUT_CARDS
  return about.map((c) => ({
    iconName: c.icon_name,
    title: c.title,
    description: c.description ?? "",
  }))
}

export function mapServices(cards: FeatureCard[]): ServiceItem[] {
  const services = (cards as FeatureCardExtended[]).filter(
    (c) => c.section === "services" || c.section == null
  )
  if (!services.length) return DEFAULT_SERVICES
  return services.map((c) => ({
    id: (c as FeatureCardExtended).item_key || c.id,
    iconName: c.icon_name,
    title: c.title,
    badge: (c as FeatureCardExtended).badge || "",
    description: c.description ?? "",
    bullets: ((c as FeatureCardExtended).bullets) ?? [],
    details: (((c as FeatureCardExtended).details) as { label: string; value: string }[]) ?? [],
  }))
}

export function mapMetrics(rows: MetricsRow[]): MetricItem[] {
  if (!rows.length) return DEFAULT_METRICS
  return rows.map((r) => ({
    iconName: r.icon_name,
    value: r.value,
    label: r.label,
    description: r.description ?? "",
  }))
}

export function mapProcess(steps: ProcessStep[]): ProcessPhase[] {
  if (!steps.length) return DEFAULT_PROCESS
  return (steps as ProcessStepExtended[]).map((s, i) => ({
    iconName: s.icon_name,
    number: s.phase_number || String(i + 1).padStart(2, "0"),
    title: s.title,
    subtitle: s.subtitle || "",
    timeline: s.timeline || "",
    body: s.description || "",
    outcomes: s.outcomes ?? [],
    highlight: s.highlight || "",
  }))
}

export function mapTechStack(rows: TechStackRow[]) {
  if (!rows.length) return DEFAULT_TECH_STACK
  const row1 = rows.filter((r) => r.row_number === 1).map((r) => r.label)
  const row2 = rows.filter((r) => r.row_number === 2).map((r) => r.label)
  return {
    row1: row1.length ? row1 : DEFAULT_TECH_STACK.row1,
    row2: row2.length ? row2 : DEFAULT_TECH_STACK.row2,
  }
}

export function mapProductPreview(rows: ProductPreviewRow[]): ProductPreviewCard[] {
  if (!rows.length) return DEFAULT_PRODUCT_PREVIEW
  return rows.map((r) => ({
    name: r.name,
    type: r.card_type,
    accent: r.accent_color || "#19d3c5",
    gradientFrom: r.gradient_from || "#0d3d3a",
    gradientTo: r.gradient_to || "#10161c",
    image: r.image_url || undefined,
  }))
}

export function mapDeveloper(raw: DeveloperProfileRow | null, header: SectionHeader) {
  const base = DEFAULT_DEVELOPER
  if (!raw) return { ...base, sectionSubtitle: header.subtitle }
  return {
    name: raw.name,
    role: raw.role || base.role,
    location: raw.location || base.location,
    experience: raw.experience || base.experience,
    tagline: raw.tagline || base.tagline,
    avatarInitials: raw.avatar_initials || base.avatarInitials,
    avatarUrl: raw.avatar_url,
    sectionSubtitle: raw.section_subtitle || header.subtitle,
    highlights: raw.highlights?.length
      ? (raw.highlights as { icon_name?: string; iconName?: string; label: string }[]).map((h) => ({
          iconName: h.icon_name ?? h.iconName ?? "Briefcase",
          label: h.label,
        }))
      : base.highlights,
    approach: raw.approach?.length ? raw.approach : base.approach,
  }
}

export function mapDbProjectToLanding(p: ProjectExtended): LandingProject | null {
  if (!p.slug) return null
  return {
    slug: p.slug,
    name: p.title,
    tagline: p.tagline || "",
    status: p.status || "Live",
    industry: p.industry || "",
    description: p.description || "",
    longDescription: p.description || "",
    image: p.image_url || "",
    stack: p.tags || [],
    metrics: [],
    architecture: "",
    outcomes: [],
    categories: p.categories || ["all"],
    featured: false,
    order: p.display_order,
  }
}

export function mapProjects(dbProjects: Project[]): LandingProject[] {
  const mapped = (dbProjects as ProjectExtended[])
    .map(mapDbProjectToLanding)
    .filter(Boolean) as LandingProject[]
  return mapped.length ? mapped : DEFAULT_PROJECTS
}

export function mapFooterLinks(links: FooterLink[]) {
  const services = links.filter((l) => l.category === "services")
  const company = links.filter((l) => l.category === "quick_links")
  return {
    services: services.length
      ? services.map((l) => ({ label: l.name, href: l.href }))
      : DEFAULT_FOOTER_SERVICES,
    company: company.length
      ? company.map((l) => ({ label: l.name, href: l.href }))
      : DEFAULT_FOOTER_COMPANY,
  }
}

export type { SectionHeader }

export { sectionHeader }
