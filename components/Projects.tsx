"use client"

import { ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import type { Project as ProjectType } from '@/lib/supabase/types'

interface Project {
  id: string | number
  title: string
  description: string | null
  image: string
  tags: string[]
  url: string | null
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <div 
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] opacity-0 animate-fade-in-up delay-${index * 100}`}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
        <div className="relative w-full h-full">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ProjectsSectionProps {
  projects?: ProjectType[]
}

const ProjectsSection = ({ projects: dbProjects }: ProjectsSectionProps) => {
  // Map database projects to component format or use empty array
  const projects: Project[] = dbProjects && dbProjects.length > 0 
    ? dbProjects.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        image: p.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        tags: p.tags || [],
        url: p.project_url,
      }))
    : []
  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[5%] -right-[5%] w-[20%] h-[20%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -top-[5%] -left-[5%] w-[20%] h-[20%] rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up">Our Latest Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 opacity-0 animate-fade-in-up delay-100"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Explore our portfolio of innovative products built with cutting-edge technology and AI-powered solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              No projects available yet. Add projects from the admin dashboard.
            </div>
          )}
        </div>
{/*         
        <div className="mt-16 text-center opacity-0 animate-fade-in-up delay-500">
          <Button variant="outline" className="group">
            <span>View All Projects</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div> */}
      </div>
    </section>
  )
}

export default ProjectsSection
