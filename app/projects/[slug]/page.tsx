import Link from "next/link"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import ProjectDetailClient from "./client"
import { getAllProjectsDB, getProjectBySlugDB } from "@/lib/supabase/queries"
import { mapProjects, mapDbProjectToLanding } from "@/lib/cms/mappers"
import type { Project } from "@/lib/projects"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<import("next").Metadata> {
  const { slug } = await params
  const dbProject = await getProjectBySlugDB(slug)
  if (!dbProject) return { title: "Project Not Found" }
  const project = mapDbProjectToLanding(dbProject as any)
  if (!project) return { title: "Project Not Found" }
  return {
    title: `${project.name} | Bugfree.dev`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const dbProject = await getProjectBySlugDB(slug)
  if (!dbProject) notFound()

  const project = mapDbProjectToLanding(dbProject as any) as Project

  const allDbProjects = await getAllProjectsDB()
  const allProjects = mapProjects(allDbProjects as any)
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
