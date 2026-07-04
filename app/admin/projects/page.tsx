'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, Plus, Trash2, ExternalLink, Image as ImageIcon, Upload, Play, Video, EyeOff, ArrowUp, ArrowDown } from 'lucide-react'
import { toast } from 'sonner'
import type { Project } from '@/lib/supabase/types'
import Image from 'next/image'

type ProjectRow = Project & {
  slug?: string | null
  industry?: string | null
  categories?: string[] | null
  tagline?: string | null
  long_description?: string | null
  architecture?: string | null
  outcomes?: string[] | null
  testimonial_quote?: string | null
  testimonial_author?: string | null
  testimonial_role?: string | null
  featured?: boolean | null
  metrics?: MetricItem[]
  hero_image_url?: string | null
  gallery_images?: string[] | null
}

type MetricItem = { value: string; label: string }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const [tagsInputValue, setTagsInputValue] = useState('')
  const [categoriesInputValue, setCategoriesInputValue] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const supabase = useMemo(() => createClient() as any, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  // Sync tags and categories input value ONLY when a different project is opened for editing
  const lastEditingProjectId = useRef<string | null>(null)
  useEffect(() => {
    const currentId = editingProject?.id ?? null
    if (currentId !== lastEditingProjectId.current) {
      lastEditingProjectId.current = currentId
      if (editingProject) {
        setTagsInputValue(editingProject.tags?.join(', ') || '')
        setCategoriesInputValue(editingProject.categories?.join(', ') || '')
      } else {
        setTagsInputValue('')
        setCategoriesInputValue('')
      }
    }
  }, [editingProject])

  const fetchProjects = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order')

    if (error) {
      console.error('[ProjectsAdmin] fetch error:', error)
      toast.error(`Load failed: ${error.message}`)
      setProjects([])
    } else {
      const rows = (data as unknown as ProjectRow[]) ?? []
      console.log('[ProjectsAdmin] rows:', rows.length, rows.map((r) => ({ id: r.id?.slice(0, 8), title: r.title, slug: r.slug })))
      setProjects(rows)
      if (!error && rows.length === 0) {
        toast.error('projects table is empty — no DB rows found')
      }
    }
    setIsLoading(false)
  }

  const handleAddProject = () => {
    setEditingProject({
      id: '',
      title: '',
      slug: '',
      tagline: '',
      description: '',
      long_description: '',
      image_url: '',
      tags: [],
      categories: [],
      industry: '',
      project_url: '',
      video_url: '',
      status: 'In Progress',
      display_order: projects.length + 1,
      is_active: true,
      featured: false,
      architecture: '',
      outcomes: [],
      testimonial_quote: '',
      testimonial_author: '',
      testimonial_role: '',
      metrics: [],
      hero_image_url: '',
      gallery_images: [],
      created_at: '',
      updated_at: '',
    })
  }

  const handleSaveProject = async () => {
    if (!editingProject) return
    setIsSaving(true)

    try {
      const extendedData = {
        title: editingProject.title,
        slug: editingProject.slug || null,
        tagline: editingProject.tagline || null,
        description: editingProject.description || null,
        long_description: editingProject.long_description || null,
        image_url: editingProject.image_url || null,
        tags: editingProject.tags || null,
        categories: editingProject.categories || null,
        industry: editingProject.industry || null,
        project_url: editingProject.project_url || null,
        video_url: editingProject.video_url || null,
        status: editingProject.status || null,
        display_order: editingProject.display_order,
        is_active: editingProject.is_active,
        featured: editingProject.featured ?? false,
        architecture: editingProject.architecture || null,
        outcomes: editingProject.outcomes || null,
        testimonial_quote: editingProject.testimonial_quote || null,
        testimonial_author: editingProject.testimonial_author || null,
        testimonial_role: editingProject.testimonial_role || null,
        hero_image_url: editingProject.hero_image_url || null,
        gallery_images: editingProject.gallery_images || null,
      }

      if (editingProject.id) {
        const { error } = await supabase
          .from('projects')
          .update({
            ...extendedData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingProject.id)

        if (error) throw error

        setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p))
        toast.success('Project updated successfully')
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert(extendedData)
          .select()
          .single()

        if (error) throw error
        if (data) {
          setProjects([...projects, data as unknown as ProjectRow])
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
    setTagsInputValue(value) // Keep raw input for natural typing
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean)
    setEditingProject({ ...editingProject, tags })
  }

  const handleCategoriesChange = (value: string) => {
    if (!editingProject) return
    setCategoriesInputValue(value)
    const categories = value.split(',').map(c => c.trim()).filter(Boolean)
    setEditingProject({ ...editingProject, categories })
  }

  const handleMoveProject = async (projectId: string, direction: 'up' | 'down') => {
    const currentIndex = projects.findIndex(p => p.id === projectId)
    if (currentIndex === -1) return
    
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= projects.length) return
    
    const currentProject = projects[currentIndex]
    const targetProject = projects[targetIndex]
    
    // Swap display orders
    const newProjects = [...projects]
    const tempOrder = currentProject.display_order
    newProjects[currentIndex] = { ...currentProject, display_order: targetProject.display_order }
    newProjects[targetIndex] = { ...targetProject, display_order: tempOrder }
    
    // Sort by display_order
    newProjects.sort((a, b) => a.display_order - b.display_order)
    setProjects(newProjects)
    
    // Update in database
    try {
      await supabase.from('projects').update({ display_order: targetProject.display_order }).eq('id', currentProject.id)
      await supabase.from('projects').update({ display_order: tempOrder }).eq('id', targetProject.id)
      toast.success('Order updated')
    } catch {
      toast.error('Failed to update order')
      fetchProjects() // Revert on error
    }
  }

  const handleToggleVisibility = async (project: Project) => {
    const newIsActive = !project.is_active
    
    // Optimistic update
    setProjects(projects.map(p => p.id === project.id ? { ...p, is_active: newIsActive } : p))
    
    const { error } = await supabase
      .from('projects')
      .update({ is_active: newIsActive })
      .eq('id', project.id)
    
    if (error) {
      toast.error('Failed to update visibility')
      fetchProjects() // Revert on error
    } else {
      toast.success(newIsActive ? 'Project is now visible' : 'Project is now hidden')
    }
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
      toast.error('Please select a valid video file (MP4, WebM, OGG, MOV)')
      return
    }

    // Validate file size (500MB limit)
    const maxSize = 500 * 1024 * 1024 // 500MB in bytes
    if (file.size > maxSize) {
      toast.error('Video file size must be less than 500MB. Please compress your video or select a smaller file.')
      return
    }

    setIsUploadingVideo(true)

    try {
      // Upload to Cloudinary via API route
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setEditingProject({ ...editingProject, video_url: data.url })
      toast.success('Video uploaded successfully! It will be auto-optimized for fast loading.')
    } catch (error) {
      console.error('Video upload error:', error)
      toast.error('Failed to upload video. Please try again.')
    } finally {
      setIsUploadingVideo(false)
      // Reset file input
      if (videoInputRef.current) {
        videoInputRef.current.value = ''
      }
    }
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !editingProject) return

    setIsUploading(true)

    try {
      const newUrls: string[] = []
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 5MB limit`)
          continue
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName)

        newUrls.push(publicUrl)
      }

      if (newUrls.length > 0) {
        const existing = (editingProject as ProjectRow).gallery_images ?? []
        setEditingProject({
          ...editingProject,
          gallery_images: [...existing, ...newUrls],
        } as ProjectRow)
        toast.success(`${newUrls.length} image(s) added to gallery`)
      }
    } catch (error) {
      console.error('Gallery upload error:', error)
      toast.error('Failed to upload gallery images')
    } finally {
      setIsUploading(false)
      if (galleryInputRef.current) galleryInputRef.current.value = ''
    }
  }

  const handleAddGalleryUrl = (url: string) => {
    if (!url.trim() || !editingProject) return
    const existing = (editingProject as ProjectRow).gallery_images ?? []
    setEditingProject({
      ...editingProject,
      gallery_images: [...existing, url.trim()],
    } as ProjectRow)
  }

  const handleRemoveGalleryImage = (index: number) => {
    if (!editingProject) return
    const existing = (editingProject as ProjectRow).gallery_images ?? []
    setEditingProject({
      ...editingProject,
      gallery_images: existing.filter((_, i) => i !== index),
    } as ProjectRow)
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Project Title</label>
                  <Input
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="My Awesome Project"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Slug (URL key)</label>
                  <Input
                    value={editingProject.slug ?? ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="my-awesome-project"
                  />
                  <p className="text-xs text-muted-foreground">Used in URL: /projects/[slug]. Must be unique.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tagline (short headline)</label>
                  <Input
                    value={editingProject.tagline ?? ''}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    placeholder="One-line description shown on card"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry</label>
                  <Input
                    value={editingProject.industry ?? ''}
                    onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                    placeholder="e.g. Mobile · EdTech"
                  />
                </div>
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
                <label className="text-sm font-medium text-foreground">Categories (comma separated)</label>
                <Input
                  value={categoriesInputValue}
                  onChange={(e) => handleCategoriesChange(e.target.value)}
                  placeholder="mobile, web, ai, automations, featured"
                />
                <p className="text-xs text-muted-foreground">Used for filtering on landing page. Options: mobile, web, ai, automations, featured</p>
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

              {/* Hero Image (used in project detail header) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Hero Image (project detail page)</label>
                <Input
                  value={(editingProject as ProjectRow).hero_image_url ?? ''}
                  onChange={(e) => setEditingProject({ ...editingProject, hero_image_url: e.target.value } as ProjectRow)}
                  placeholder="https://images.unsplash.com/..."
                />
                {(editingProject as ProjectRow).hero_image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-border relative">
                    <Image
                      src={(editingProject as ProjectRow).hero_image_url!}
                      alt="Hero preview"
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingProject({ ...editingProject, hero_image_url: '' } as ProjectRow)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Optional: Large hero image shown at top of project detail page</p>
              </div>

              {/* Gallery Images */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Gallery Images (shown in project detail)</label>

                {/* Upload Area */}
                <div
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => galleryInputRef.current?.click()}
                >
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to add multiple images</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB each</span>
                    </div>
                  )}
                </div>

                {/* Add via URL */}
                <div className="flex gap-2">
                  <Input
                    id="gallery-url-input"
                    placeholder="Paste image URL to add..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.currentTarget as HTMLInputElement
                        handleAddGalleryUrl(input.value)
                        input.value = ''
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById('gallery-url-input') as HTMLInputElement
                      if (input?.value) {
                        handleAddGalleryUrl(input.value)
                        input.value = ''
                      }
                    }}
                  >
                    Add URL
                  </Button>
                </div>

                {/* Gallery Grid */}
                {((editingProject as ProjectRow).gallery_images ?? []).length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {(editingProject as ProjectRow).gallery_images!.map((url, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden border border-border group">
                        <Image
                          src={url}
                          alt={`Gallery ${index + 1}`}
                          width={200}
                          height={120}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        >
                          <Trash2 className="w-3 h-3 text-white" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/50 rounded text-[0.6rem] text-white">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {(editingProject as ProjectRow).gallery_images?.length ?? 0} image(s) — shown in project detail gallery
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tags (comma separated)</label>
                <Input
                  value={tagsInputValue}
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
                        MP4, WebM, OGG up to 500MB
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

              {/* Status - below links/video */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status</label>
                <Input
                  value={editingProject.status || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                  placeholder="In Progress, Completed, Beta..."
                />
                <p className="text-xs text-muted-foreground">e.g., In Progress, Completed, Beta, Coming Soon</p>
              </div>

              {/* Display Order */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Display Order</label>
                <Input
                  type="number"
                  min="1"
                  value={editingProject.display_order}
                  onChange={(e) => setEditingProject({ ...editingProject, display_order: parseInt(e.target.value) || 1 })}
                  placeholder="1"
                />
                <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div>
                  <label className="text-sm font-medium text-foreground">Featured</label>
                  <p className="text-xs text-muted-foreground">Featured projects appear on the landing page grid</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProject({ ...editingProject, featured: !editingProject.featured })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingProject.featured ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingProject.featured ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Metrics (value | label per line) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Metrics (value | label per line)</label>
                <Textarea
                  className="font-mono text-xs"
                  placeholder={"10k+ | Downloads\n85% | Retention\n4.8 | App Rating"}
                  rows={4}
                  value={(
                    (editingProject as ProjectRow).metrics ?? []
                  )
                    .map((m) => `${m.value} | ${m.label}`)
                    .join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter(Boolean)
                    const metrics = lines.map((line) => {
                      const [value, ...rest] = line.split('|')
                      return { value: value.trim(), label: rest.join('|').trim() }
                    })
                    setEditingProject({ ...editingProject, metrics } as ProjectRow)
                  }}
                />
                <p className="text-xs text-muted-foreground">Shown in the top-right metric cards on the project detail page</p>
              </div>

              {/* Outcomes (one per line) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Outcomes (one per line)</label>
                <Textarea
                  placeholder={"Achieved 85% user retention through engagement-first design\nReached 4.8 star rating on App Store"}
                  rows={4}
                  value={((editingProject as ProjectRow).outcomes ?? []).join('\n')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      outcomes: e.target.value.split('\n').filter(Boolean),
                    } as ProjectRow)
                  }
                />
                <p className="text-xs text-muted-foreground">Shown in the "Outcomes & results" section on the project detail page</p>
              </div>

              {/* Long Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Long Description</label>
                <Textarea
                  placeholder="Full project description with multiple paragraphs (separate paragraphs with a blank line)..."
                  rows={6}
                  value={(editingProject as ProjectRow).long_description ?? ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, long_description: e.target.value } as ProjectRow)
                  }
                />
                <p className="text-xs text-muted-foreground">Shown in the "About this project" section on the detail page. Use blank lines to separate paragraphs.</p>
              </div>

              {/* Architecture */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Architecture (monospace)</label>
                <Textarea
                  className="font-mono text-xs"
                  placeholder={"React Native App\n  ↓\nNode.js REST API\n  ↓\nSupabase (Auth + PostgreSQL)"}
                  rows={6}
                  value={(editingProject as ProjectRow).architecture ?? ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, architecture: e.target.value } as ProjectRow)
                  }
                />
                <p className="text-xs text-muted-foreground">Shown in the "Architecture" code block on the detail page</p>
              </div>

              {/* Testimonial */}
              <div className="space-y-3 rounded-lg border border-border p-4 bg-muted/10">
                <label className="text-sm font-medium text-foreground">Client Testimonial</label>
                <Input
                  placeholder="Quote from the client"
                  value={(editingProject as ProjectRow).testimonial_quote ?? ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, testimonial_quote: e.target.value } as ProjectRow)
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Author name"
                    value={(editingProject as ProjectRow).testimonial_author ?? ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, testimonial_author: e.target.value } as ProjectRow)
                    }
                  />
                  <Input
                    placeholder="Role / Company"
                    value={(editingProject as ProjectRow).testimonial_role ?? ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, testimonial_role: e.target.value } as ProjectRow)
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">Optional client quote shown on the detail page</p>
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div>
                  <label className="text-sm font-medium text-foreground">Visibility</label>
                  <p className="text-xs text-muted-foreground">Hidden projects won&apos;t appear on the website</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProject({ ...editingProject, is_active: !editingProject.is_active })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingProject.is_active ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingProject.is_active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
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
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors ${
              !project.is_active ? 'opacity-60' : ''
            }`}
          >
            {/* Hidden badge */}
            {!project.is_active && (
              <div className="bg-muted-foreground/20 px-3 py-1 flex items-center gap-1.5">
                <EyeOff className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">Hidden</span>
              </div>
            )}
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
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                {(project as ProjectRow).slug && (
                  <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-muted">
                    /{(project as ProjectRow).slug}
                  </span>
                )}
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => handleMoveProject(project.id, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleMoveProject(project.id, 'down')}
                    disabled={index === projects.length - 1}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
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
              {project.status && (
                <span className="inline-block px-2 py-0.5 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                  {project.status}
                </span>
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
                    onClick={() => handleToggleVisibility(project)}
                    title={project.is_active ? 'Hide project' : 'Show project'}
                  >
                    {project.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
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
