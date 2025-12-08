"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Play, X, PlayCircle, AlertCircle, ExternalLink } from 'lucide-react'
import type { Project as ProjectType } from '@/lib/supabase/types'

interface Project {
  id: string | number
  title: string
  description: string | null
  image: string
  tags: string[]
  url: string | null
  videoUrl: string | null
  status: string | null
}

// Hook for scroll-triggered animations
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin: '50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Check if URL is a valid direct video file
const isValidVideoUrl = (url: string): boolean => {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url) || 
         url.includes('supabase.co/storage') ||
         url.includes('cloudinary.com')
}

// Video Modal Component
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
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {isValid ? (
            <video src={videoUrl} controls autoPlay className="w-full h-full">
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center gap-4 text-white p-8 text-center">
              <AlertCircle className="w-16 h-16 text-yellow-500" />
              <h4 className="text-xl font-semibold">Video Not Available</h4>
              <p className="text-gray-400 max-w-md">Please upload a video file through the admin dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Status color mapping
const getStatusColor = (status: string | null) => {
  if (!status) return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  const s = status.toLowerCase()
  if (s.includes('completed') || s.includes('live')) return 'bg-green-500/20 text-green-400 border-green-500/30'
  if (s.includes('progress')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  if (s.includes('beta')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  return 'bg-primary/20 text-primary border-primary/30'
}

// Image Section Component
const ImageSection = ({ 
  project, 
  onWatchVideo,
  isVisible,
  fromLeft
}: { 
  project: Project
  onWatchVideo: (videoUrl: string, title: string) => void
  isVisible: boolean
  fromLeft: boolean
}) => {
  const hasImage = project.image && project.image.length > 0
  
  return (
    <div 
      className={`relative group transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : `opacity-0 ${fromLeft ? '-translate-x-16' : 'translate-x-16'}`
      }`}
    >
      {/* Image Container with rounded corners and shadow */}
      <div className="relative aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 shadow-2xl shadow-black/20">
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">No preview available</p>
            </div>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Play button overlay for video */}
        {project.videoUrl && (
          <button
            onClick={() => onWatchVideo(project.videoUrl!, project.title)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
            </div>
          </button>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10" />
    </div>
  )
}

// Content Section Component
const ContentSection = ({ 
  project, 
  onWatchVideo,
  isVisible,
  fromLeft
}: { 
  project: Project
  onWatchVideo: (videoUrl: string, title: string) => void
  isVisible: boolean
  fromLeft: boolean
}) => {
  const hasLinks = project.url || project.videoUrl
  
  return (
    <div 
      className={`flex flex-col justify-center py-4 lg:py-8 transition-all duration-1000 ease-out delay-200 ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : `opacity-0 ${fromLeft ? '-translate-x-16' : 'translate-x-16'}`
      }`}
    >
      {/* Status Badge */}
      {project.status && (
        <div className={`mb-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className={`inline-flex items-center text-xs px-3 py-1.5 rounded-full font-semibold border ${getStatusColor(project.status)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
            {project.status}
          </span>
        </div>
      )}
      
      {/* Title */}
      <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight transition-all duration-700 delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {project.title}
      </h3>
      
      {/* Description */}
      <p className={`text-muted-foreground text-base md:text-lg leading-relaxed mb-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {project.description}
      </p>
      
      {/* Tags */}
      {project.tags.length > 0 && (
        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground font-medium border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Action Buttons */}
      {hasLinks && (
        <div className={`flex flex-wrap items-center gap-3 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {project.videoUrl && (
            <button
              onClick={() => onWatchVideo(project.videoUrl!, project.title)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 text-foreground font-semibold text-sm transition-all duration-300 group/link"
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

// Project Card - Ignyt Labs style: Full-width stacked card with scroll animations
const ProjectCard = ({ 
  project, 
  index,
  onWatchVideo 
}: { 
  project: Project
  index: number
  onWatchVideo: (videoUrl: string, title: string) => void
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1)
  const hasImage = project.image && project.image.length > 0
  const hasLinks = project.url || project.videoUrl
  
  return (
    <div 
      ref={ref}
      className={`group transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl lg:rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
        
        {/* Image Section - Full width at top */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
          {hasImage ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">No preview available</p>
              </div>
            </div>
          )}
          
          {/* Play button overlay for video */}
          {project.videoUrl && (
            <button
              onClick={() => onWatchVideo(project.videoUrl!, project.title)}
              className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-all duration-500"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-primary/30 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
              </div>
            </button>
          )}
        </div>
        
        {/* Content Section - Below image */}
        <div className="p-6 md:p-8">
          {/* Status Badge - moved below image */}
          {project.status && (
            <div className="mb-3">
              <span className={`inline-flex items-center text-xs px-3 py-1.5 rounded-full font-semibold border ${getStatusColor(project.status)}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                {project.status}
              </span>
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
            {project.description}
          </p>
          
          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground font-medium border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Action Buttons */}
          {hasLinks && (
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/30">
              {project.videoUrl && (
                <button
                  onClick={() => onWatchVideo(project.videoUrl!, project.title)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground font-semibold text-sm transition-all duration-300 group/link"
                >
                  <span>View Project</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                </a>
              )}
            </div>
          )}
        </div>
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

  // Map database projects to component format
  const projects: Project[] = dbProjects && dbProjects.length > 0 
    ? dbProjects.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        image: p.image_url || '',
        tags: p.tags || [],
        url: p.project_url,
        videoUrl: p.video_url,
        status: p.status,
      }))
    : []

  return (
    <>
      <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 -right-[20%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 opacity-0 animate-fade-in-up">
              Our Projects
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in-up delay-100">
              <span className="text-gradient">MVPs</span> we&apos;ve launched so far
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
              Your MVP team behind successful product launches
            </p>
          </div>
          
          {/* Projects Grid - Ignyt Labs style */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onWatchVideo={handleWatchVideo}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Play className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                No projects available yet. Add projects from the admin dashboard.
              </p>
            </div>
          )}
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
