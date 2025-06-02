
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'  
import AboutSection from '@/components/Aboutus'
import Projects from '@/components/Projects'
import ContactSection from '@/components/contact'
import ProcessSection from '@/components/process'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection/>
      <AboutSection />
      <Projects/>
      <ProcessSection/>
      <ContactSection/>
      <Footer />
      {/* Add more sections as needed */}

    </div>
  )
}
