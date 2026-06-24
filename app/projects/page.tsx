import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import ProjectCard from "@/components/ProjectCard"
import { getAllProjects } from "@/lib/projects"

export const metadata = {
  title: "Our Work | Bugfree.dev",
  description:
    "Explore the products we've built — mobile apps, web platforms, AI systems, and automation workflows that deliver real results.",
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "mobile", label: "Mobile" },
  { key: "web", label: "Web Apps" },
  { key: "ai", label: "AI Products" },
  { key: "automations", label: "Automations" },
]

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="eyebrow">Our work</span>
            <h1 className="section-title mt-4">
              Products we've shipped. <span className="hl-grad">Results we track.</span>
            </h1>
            <p className="section-sub mt-4 max-w-2xl">
              From mobile apps to AI engines, each project is built with production-ready architecture
              and measurable outcomes. Click any card to see the full breakdown.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
