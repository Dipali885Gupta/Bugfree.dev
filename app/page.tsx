import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProductPreview from "@/components/ProductPreview"
import SocialProof from "@/components/SocialProof"
import Showcase from "@/components/Showcase"
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductPreview />
      <SocialProof />
      <Showcase />
      <Services />
      <MetricsSection />
      <Projects />
      <AboutSection />
      <ProcessSection />
      <TechStack />
      <DeveloperCredibility />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
