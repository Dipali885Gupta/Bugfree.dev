import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import PartnersContent from "@/components/partners/PartnersContent"

export const metadata: Metadata = {
  title: "Partner Network | GetCodeFree",
  description:
    "Become a GetCodeFree partner. Bring client opportunities — especially US & international — and we deliver software, AI and automation. Built for consultants, agencies, IT sales and BDRs.",
}

export default function PartnersPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PartnersContent />
      <Footer />
    </main>
  )
}
