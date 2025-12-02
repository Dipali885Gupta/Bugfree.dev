
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'  
import AboutSection from '@/components/Aboutus'
import Projects from '@/components/Projects'
import TestimonialsSection from '@/components/Testimonials'
import ContactSection from '@/components/contact'
import ProcessSection from '@/components/process'
import Footer from '@/components/footer'
import { getLandingPageData } from '@/lib/supabase/queries'

export default async function Home() {
  // Fetch all landing page data from Supabase
  const data = await getLandingPageData()
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        navItems={data.navItems} 
        logoText={data.siteSettings?.logo_text || 'getcodefree.tech'} 
      />
      <HeroSection heroData={data.heroSection} />
      <AboutSection 
        aboutData={data.aboutSection} 
        featureCards={data.featureCards} 
      />
      <Projects projects={data.projects} />
      <TestimonialsSection testimonials={data.testimonials} />
      <ProcessSection processSteps={data.processSteps} />
      <ContactSection 
        contactData={data.contactSection}
        siteSettings={data.siteSettings}
        faqItems={data.faqItems}
        budgetOptions={data.budgetOptions}
      />
      <Footer 
        siteSettings={data.siteSettings}
        footerLinks={data.footerLinks}
      />
    </div>
  )
}
