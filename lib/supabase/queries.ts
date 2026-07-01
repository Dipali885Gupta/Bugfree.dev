import { createClient } from './server'
import type {
  SiteSettings,
  NavItem,
  HeroSection,
  AboutSection,
  FeatureCard,
  Project,
  ProcessStep,
  ContactSection,
  FaqItem,
  BudgetOption,
  FooterLink,
  Testimonial,
} from './types'
import {
  mapSiteSettings,
  mapNavItems,
  mapHero,
  mapSocialProof,
  mapAboutCards,
  mapServices,
  mapMetrics,
  mapProcess,
  mapTechStack,
  mapProductPreview,
  mapDeveloper,
  mapProjects,
  mapFooterLinks,
  sectionHeader,
  type LandingSectionRow,
  type SocialProofRow,
  type MetricsRow,
  type TechStackRow,
  type DeveloperProfileRow,
  type ProductPreviewRow,
} from '@/lib/cms/mappers'

async function safeQuery<T>(
  fn: () => PromiseLike<{ data: T | null; error: unknown }>,
  fallback: T
): Promise<T> {
  try {
    const { data, error } = await fn()
    if (error) return fallback
    return data ?? fallback
  } catch {
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_settings').select('*').single()
  if (error) return null
  return data
}

export async function getNavItems(): Promise<NavItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('nav_items')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) return []
  return data || []
}

export async function getHeroSection(): Promise<HeroSection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('hero_section').select('*').eq('is_active', true).single()
  if (error) return null
  return data
}

export async function getAboutSection(): Promise<AboutSection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('about_section').select('*').eq('is_active', true).single()
  if (error) return null
  return data
}

export async function getFeatureCards(): Promise<FeatureCard[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('feature_cards')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) return []
  return data || []
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) return []
  return data || []
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('process_steps')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) return []
  return data || []
}

export async function getContactSection(): Promise<ContactSection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('contact_section').select('*').eq('is_active', true).single()
  if (error) return null
  return data
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) return []
  return data || []
}

export async function getBudgetOptions(): Promise<BudgetOption[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('budget_options')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) return []
  return data || []
}

export async function getFooterLinks(category?: string): Promise<FooterLink[]> {
  const supabase = await createClient()
  let query = supabase.from('footer_links').select('*').eq('is_active', true).order('display_order')
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) return []
  return data || []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  if (error) return []
  return data || []
}

export async function getLandingSections(): Promise<LandingSectionRow[]> {
  const supabase = await createClient()
  return safeQuery(
    () => supabase.from('landing_sections').select('*'),
    [] as LandingSectionRow[]
  )
}

export async function getSocialProofItems(): Promise<SocialProofRow[]> {
  const supabase = await createClient()
  return safeQuery(
    () =>
      supabase
        .from('social_proof_items')
        .select('icon_name, label')
        .eq('is_active', true)
        .order('display_order'),
    [] as SocialProofRow[]
  )
}

export async function getMetricsItems(): Promise<MetricsRow[]> {
  const supabase = await createClient()
  return safeQuery(
    () =>
      supabase
        .from('metrics_items')
        .select('icon_name, value, label, description')
        .eq('is_active', true)
        .order('display_order'),
    [] as MetricsRow[]
  )
}

export async function getTechStackItems(): Promise<TechStackRow[]> {
  const supabase = await createClient()
  return safeQuery(
    () =>
      supabase
        .from('tech_stack_items')
        .select('label, row_number')
        .eq('is_active', true)
        .order('display_order'),
    [] as TechStackRow[]
  )
}

export async function getDeveloperProfile(): Promise<DeveloperProfileRow | null> {
  const supabase = await createClient()
  return safeQuery(
    () => supabase.from('developer_profile').select('*').eq('is_active', true).single(),
    null
  )
}

export async function getProductPreviewCards(): Promise<ProductPreviewRow[]> {
  const supabase = await createClient()
  return safeQuery(
    () =>
      (supabase
        .from('product_preview_cards') as any)
        .select('name, card_type, accent_color, gradient_from, gradient_to, image_url')
        .eq('is_active', true)
        .order('display_order'),
    [] as ProductPreviewRow[]
  )
}

export async function getLandingPageData() {
  const [
    siteSettingsRaw,
    navItemsRaw,
    heroRaw,
    featureCardsRaw,
    projectsRaw,
    processStepsRaw,
    contactSectionRaw,
    faqItems,
    budgetOptions,
    footerLinksRaw,
    testimonials,
    landingSections,
    socialProofRaw,
    metricsRaw,
    techStackRaw,
    developerRaw,
    productPreviewRaw,
  ] = await Promise.all([
    getSiteSettings(),
    getNavItems(),
    getHeroSection(),
    getFeatureCards(),
    getProjects(),
    getProcessSteps(),
    getContactSection(),
    getFaqItems(),
    getBudgetOptions(),
    getFooterLinks(),
    getTestimonials(),
    getLandingSections(),
    getSocialProofItems(),
    getMetricsItems(),
    getTechStackItems(),
    getDeveloperProfile(),
    getProductPreviewCards(),
  ])

  const site = mapSiteSettings(siteSettingsRaw)
  const nav = mapNavItems(navItemsRaw)
  const hero = mapHero(heroRaw)
  const sections = landingSections

  return {
    site,
    nav,
    hero,
    socialProof: mapSocialProof(socialProofRaw),
    services: mapServices(featureCardsRaw),
    servicesHeader: sectionHeader('services', sections),
    process: mapProcess(processStepsRaw),
    processHeader: sectionHeader('process', sections),
    metrics: mapMetrics(metricsRaw),
    metricsHeader: sectionHeader('metrics', sections),
    projects: mapProjects(projectsRaw),
    projectsHeader: sectionHeader('projects', sections),
    about: mapAboutCards(featureCardsRaw),
    aboutHeader: sectionHeader('about', sections),
    techStack: mapTechStack(techStackRaw),
    techHeader: sectionHeader('tech', sections),
    developer: mapDeveloper(developerRaw, sectionHeader('developer', sections)),
    developerHeader: sectionHeader('developer', sections),
    productPreview: mapProductPreview(productPreviewRaw),
    productPreviewHeader: sectionHeader('product_preview', sections),
    testimonials,
    testimonialsHeader: sectionHeader('testimonials', sections),
    contactSection: contactSectionRaw,
    contactHeader: sectionHeader('contact', sections),
    faqItems,
    budgetOptions,
    footer: mapFooterLinks(footerLinksRaw),
    siteSettingsRaw,
    navItemsRaw,
    heroRaw,
    featureCardsRaw,
    projectsRaw,
    processStepsRaw,
  }
}

export type LandingPageData = Awaited<ReturnType<typeof getLandingPageData>>
