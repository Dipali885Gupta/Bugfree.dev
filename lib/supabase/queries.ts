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

// Default data for when database is empty (fallback to original static content)
const defaultHeroSection: Omit<HeroSection, 'id' | 'created_at' | 'updated_at'> = {
  badge_text: 'Next Generation Tech Agency',
  headline: 'Building & Shipping Products Faster with AI',
  headline_highlight: 'Faster',
  subheadline: 'Building and shipping products faster with cutting-edge AI technologies and proven development methodologies to deliver exceptional digital products.',
  cta_text: 'Get Started',
  cta_link: '#contact',
  is_active: true,
}

const defaultAboutSection: Omit<AboutSection, 'id' | 'created_at' | 'updated_at'> = {
  section_title: 'Redefining Product Development',
  section_description: 'We merge cutting-edge AI technologies with proven development methodologies to deliver exceptional products faster than traditional agencies.',
  secondary_title: 'Why Choose Our AI-Powered Approach?',
  secondary_description: 'Our unique combination of AI capabilities and human expertise ensures your project benefits from the best of both worlds. We leverage AI to handle repetitive tasks, analyze data patterns, and optimize code, while our experienced developers focus on creative problem-solving and strategic decisions.',
  image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  benefits: [
    '10x faster development cycles with AI-assisted coding',
    'Reduced bugs through AI-powered code review and testing',
    'Automated deployment pipelines for rapid iteration',
  ],
  is_active: true,
}

const defaultSiteSettings: Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'> = {
  logo_text: 'getcodefree.tech',
  company_name: 'BugFree.dev',
  company_description: 'Building and shipping products faster with AI. We combine cutting-edge technology with expert development to deliver exceptional digital products.',
  primary_email: 'pandaamitav01@gmail.com',
  phone_numbers: ['+91 7077404655', '+91 7735490979'],
  location: 'FortuneTower, Chandrasekharpur, Bhubaneswar',
}

const defaultContactSection: Omit<ContactSection, 'id' | 'created_at' | 'updated_at'> = {
  section_title: 'Get In Touch',
  section_description: 'Get in touch with us to discuss your project or any questions you may have.',
  form_title: 'Send Us a Message',
  contact_description: 'Ready to transform your idea into reality? Fill out the form and we\'ll get back to you within 24 hours.',
  is_active: true,
}

// Fetch functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching site settings:', error)
    return defaultSiteSettings as SiteSettings
  }
  return data
}

export async function getNavItems(): Promise<NavItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('nav_items')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching nav items:', error)
    return []
  }
  return data || []
}

export async function getHeroSection(): Promise<HeroSection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_section')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching hero section:', error)
    return defaultHeroSection as HeroSection
  }
  return data
}

export async function getAboutSection(): Promise<AboutSection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('about_section')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching about section:', error)
    return defaultAboutSection as AboutSection
  }
  return data
}

export async function getFeatureCards(): Promise<FeatureCard[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('feature_cards')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching feature cards:', error)
    return []
  }
  return data || []
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data || []
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('process_steps')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching process steps:', error)
    return []
  }
  return data || []
}

export async function getContactSection(): Promise<ContactSection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('contact_section')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching contact section:', error)
    return defaultContactSection as ContactSection
  }
  return data
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching FAQ items:', error)
    return []
  }
  return data || []
}

export async function getBudgetOptions(): Promise<BudgetOption[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('budget_options')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching budget options:', error)
    return []
  }
  return data || []
}

export async function getFooterLinks(category?: string): Promise<FooterLink[]> {
  const supabase = await createClient()
  let query = supabase
    .from('footer_links')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching footer links:', error)
    return []
  }
  return data || []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data || []
}

// Get all data for the landing page in one call
export async function getLandingPageData() {
  const [
    siteSettings,
    navItems,
    heroSection,
    aboutSection,
    featureCards,
    projects,
    processSteps,
    contactSection,
    faqItems,
    budgetOptions,
    footerLinks,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getNavItems(),
    getHeroSection(),
    getAboutSection(),
    getFeatureCards(),
    getProjects(),
    getProcessSteps(),
    getContactSection(),
    getFaqItems(),
    getBudgetOptions(),
    getFooterLinks(),
    getTestimonials(),
  ])

  return {
    siteSettings,
    navItems,
    heroSection,
    aboutSection,
    featureCards,
    projects,
    processSteps,
    contactSection,
    faqItems,
    budgetOptions,
    footerLinks,
    testimonials,
  }
}
