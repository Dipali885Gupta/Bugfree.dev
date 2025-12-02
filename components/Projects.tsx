"use client"

import { useState } from 'react'
import { ExternalLink, Play, X, PlayCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import type { Project as ProjectType } from '@/lib/supabase/types'

interface Project {
  id: string | number
  title: string
  description: string | null
  image: string
  tags: string[]
  url: string | null
  videoUrl: string | null
}

// Check if URL is a valid direct video file
const isValidVideoUrl = (url: string): boolean => {
  // Check for direct video file extensions or Supabase storage URLs
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url) || 
         url.includes('supabase.co/storage')
}

// Video Modal Component - plays video directly
const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title 
}: { 
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string 
}) => {
  if (!isOpen) return null

  const isValid = isValidVideoUrl(videoUrl)

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {isValid ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center gap-4 text-white p-8 text-center">
              <AlertCircle className="w-16 h-16 text-yellow-500" />
              <h4 className="text-xl font-semibold">Video Not Available</h4>
              <p className="text-gray-400 max-w-md">
                This video needs to be uploaded directly. External links (Google Drive, YouTube, etc.) are not supported.
              </p>
              <p className="text-sm text-gray-500">
                Please upload a video file (MP4, WebM, OGG) through the admin dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProjectCard = ({ 
  project, 
  index,
  onWatchVideo 
}: { 
  project: Project
  index: number
  onWatchVideo: (videoUrl: string, title: string) => void
}) => {
  const hasLinks = project.url || project.videoUrl
  
  return (
    <div 
      className={`group glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/10 opacity-0 animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <div className="relative w-full h-full">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Play Button Overlay for Video */}
        {project.videoUrl && (
          <button
            onClick={() => onWatchVideo(project.videoUrl!, project.title)}
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          </button>
        )}
        
        {/* Tags on Image */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white font-medium"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white font-medium">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Action Buttons */}
        {hasLinks && (
          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
            {project.videoUrl && (
              <button
                onClick={() => onWatchVideo(project.videoUrl!, project.title)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-all hover:shadow-md"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground font-medium text-sm transition-all ${!project.videoUrl ? 'w-full' : ''}`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Preview</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface ProjectsSectionProps {
  projects?: ProjectType[]
}

const ProjectsSection = ({ projects: dbProjects }: ProjectsSectionProps) => {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; videoUrl: string; title: string }>({
    isOpen: false,
    videoUrl: '',
    title: ''
  })

  const handleWatchVideo = (videoUrl: string, title: string) => {
    setVideoModal({ isOpen: true, videoUrl, title })
  }

  const handleCloseVideo = () => {
    setVideoModal({ isOpen: false, videoUrl: '', title: '' })
  }

  // Map database projects to component format or use empty array
  const projects: Project[] = dbProjects && dbProjects.length > 0 
    ? dbProjects.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        image: p.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        tags: p.tags || [],
        url: p.project_url,
        videoUrl: p.video_url,
      }))
    : []

  return (
    <>
      <section id="projects" className="section-padding relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        
        <div className="container mx-auto container-padding relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 opacity-0 animate-fade-in-up">
              Our Work
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in-up delay-100">
              Latest <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mb-6 rounded-full opacity-0 animate-fade-in-up delay-200"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-300">
              Explore our portfolio of innovative products built with cutting-edge technology and AI-powered solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onWatchVideo={handleWatchVideo}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Play className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  No projects available yet. Add projects from the admin dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideo}
        videoUrl={videoModal.videoUrl}
        title={videoModal.title}
      />
    </>
  )
}

export default ProjectsSection
