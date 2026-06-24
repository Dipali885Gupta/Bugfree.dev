import Link from "next/link"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import ProjectDetailClient from "./client"
import { getAllProjects, getProjectBySlug } from "@/lib/projects"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.name} | Bugfree.dev`,
    description: project.description,
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProjectDetailClient
        project={project}
        prevProject={
          prevProject
            ? { name: prevProject.name, slug: prevProject.slug, description: prevProject.description }
            : null
        }
        nextProject={
          nextProject
            ? { name: nextProject.name, slug: nextProject.slug, description: nextProject.description }
            : null
        }
      />
      <Footer />
    </main>
  )
}
