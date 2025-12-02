'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, Plus, Trash2, ExternalLink, Image as ImageIcon, Upload, Play, Video } from 'lucide-react'
import { toast } from 'sonner'
import type { Project } from '@/lib/supabase/types'
import Image from 'next/image'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = useMemo(() => createClient() as any, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order')

    if (error) {
      toast.error('Failed to fetch projects')
    }

    setProjects(data || [])
    setIsLoading(false)
  }

  const handleAddProject = () => {
    setEditingProject({
      id: '',
      title: '',
      description: '',
      image_url: '',
      tags: [],
      project_url: '',
      video_url: '',
      display_order: projects.length + 1,
      is_active: true,
      created_at: '',
      updated_at: '',
    })
  }

  const handleSaveProject = async () => {
    if (!editingProject) return
    setIsSaving(true)

    try {
      if (editingProject.id) {
        const { error } = await supabase
          .from('projects')
          .update({
            title: editingProject.title,
            description: editingProject.description,
            image_url: editingProject.image_url,
            tags: editingProject.tags,
            project_url: editingProject.project_url,
            video_url: editingProject.video_url,
            display_order: editingProject.display_order,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingProject.id)

        if (error) throw error
        
        setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p))
        toast.success('Project updated successfully')
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert({
            title: editingProject.title,
            description: editingProject.description,
            image_url: editingProject.image_url,
            tags: editingProject.tags,
            project_url: editingProject.project_url,
            video_url: editingProject.video_url,
            display_order: editingProject.display_order,
          })
          .select()
          .single()

        if (error) throw error
        if (data) {
          setProjects([...projects, data as Project])
          toast.success('Project created successfully')
        }
      }
      setEditingProject(null)
    } catch (error) {
      toast.error('Failed to save project')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete project')
      return
    }

    setProjects(projects.filter(p => p.id !== id))
    toast.success('Project deleted')
  }

  const handleTagsChange = (value: string) => {
    if (!editingProject) return
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean)
    setEditingProject({ ...editingProject, tags })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingProject) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)

      setEditingProject({ ...editingProject, image_url: publicUrl })
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image. Make sure storage bucket is set up.')
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingProject) return

    // Validate file type
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
    if (!validVideoTypes.includes(file.type)) {
      toast.error('Please select a valid video file (MP4, WebM, OGG)')
      return
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video size must be less than 100MB')
      return
    }

    setIsUploadingVideo(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('project-videos')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('project-videos')
        .getPublicUrl(fileName)

      setEditingProject({ ...editingProject, video_url: publicUrl })
      toast.success('Video uploaded successfully')
    } catch (error) {
      console.error('Video upload error:', error)
      toast.error('Failed to upload video. Make sure storage bucket is set up.')
    } finally {
      setIsUploadingVideo(false)
      // Reset file input
      if (videoInputRef.current) {
        videoInputRef.current.value = ''
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <a href="/#projects" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </a>
          </Button>
          <Button onClick={handleAddProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Project Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {editingProject.id ? 'Edit Project' : 'New Project'}
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project Title</label>
                <Input
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="My Awesome Project"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={3}
                  placeholder="A brief description of the project..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project Image</label>
                
                {/* File Upload Area */}
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload image
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </div>
                  )}
                </div>

                {/* Or use URL */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or paste URL</span>
                  </div>
                </div>

                <Input
                  value={editingProject.image_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />

                {/* Image Preview */}
                {editingProject.image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-border relative">
                    <Image
                      src={editingProject.image_url}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingProject({ ...editingProject, image_url: '' })}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tags (comma separated)</label>
                <Input
                  value={editingProject.tags?.join(', ') || ''}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="React, Next.js, TypeScript"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project URL (Live Link)</label>
                <Input
                  value={editingProject.project_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                  placeholder="https://example.com"
                />
                <p className="text-xs text-muted-foreground">Leave empty if not available</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project Video (Demo/Walkthrough)</label>
                
                {/* Video Upload Area */}
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  {isUploadingVideo ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Uploading video...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Video className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload video
                      </span>
                      <span className="text-xs text-muted-foreground">
                        MP4, WebM, OGG up to 100MB
                      </span>
                    </div>
                  )}
                </div>

                {/* Video Preview */}
                {editingProject.video_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-border relative">
                    <video
                      src={editingProject.video_url}
                      className="w-full h-40 object-cover"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => setEditingProject({ ...editingProject, video_url: '' })}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Leave empty if not available</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProject} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
          >
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-muted flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingProject(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  {project.video_url && (
                    <a
                      href={project.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                      title="Watch Video"
                    >
                      <Play className="w-4 h-4" />
                    </a>
                  )}
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                      title="View Project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No projects yet. Click &quot;Add Project&quot; to create your first one.
          </div>
        )}
      </div>
    </div>
  )
}
