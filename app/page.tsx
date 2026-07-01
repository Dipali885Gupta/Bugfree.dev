import { getLandingPageData } from "@/lib/supabase/queries"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProductPreview from "@/components/ProductPreview"
import SocialProof from "@/components/SocialProof"
import Services from "@/components/Services"
import MetricsSection from "@/components/MetricsSection"
import Projects from "@/components/Projects"
import AboutSection from "@/components/Aboutus"
import ProcessSection from "@/components/process"
import TechStack from "@/components/TechStack"
import DeveloperCredibility from "@/components/DeveloperCredibility"
import TestimonialsSection from "@/components/Testimonials"
import ContactSection from "@/components/contact"
import Footer from "@/components/footer"

export default async function Home() {
  const data = await getLandingPageData()

  return (
    <main className="min-h-screen">
      <Navbar site={data.site} nav={data.nav} />
      <HeroSection hero={data.hero} />
      <ProductPreview cards={data.productPreview} header={data.productPreviewHeader} />
      <SocialProof items={data.socialProof} />
      <Services services={data.services} header={data.servicesHeader} bookingUrl={data.site.bookingUrl} />
      <ProcessSection phases={data.process} header={data.processHeader} />
      <MetricsSection metrics={data.metrics} header={data.metricsHeader} />
      <Projects projects={data.projects} header={data.projectsHeader} />
      <AboutSection items={data.about} header={data.aboutHeader} />
      <TechStack rows={data.techStack} header={data.techHeader} />
      <DeveloperCredibility profile={data.developer} header={data.developerHeader} bookingUrl={data.site.bookingUrl} />
      <TestimonialsSection testimonials={data.testimonials} header={data.testimonialsHeader} />
      <ContactSection
        site={data.site}
        header={data.contactHeader}
        faqItems={data.faqItems}
        budgetOptions={data.budgetOptions}
      />
      <Footer site={data.site} footer={data.footer} />
    </main>
  )
}
