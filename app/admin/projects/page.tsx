'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, Plus, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import type { Project } from '@/lib/supabase/types'
import Image from 'next/image'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

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
            display_order: editingProject.display_order,
          })
          .select()
          .single()

        if (error) throw error
        if (data) {
          setProjects([...projects, data])
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
                <label className="text-sm font-medium text-foreground">Image URL</label>
                <Input
                  value={editingProject.image_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
                {editingProject.image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={editingProject.image_url}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
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
                <label className="text-sm font-medium text-foreground">Project URL</label>
                <Input
                  value={editingProject.project_url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                  placeholder="https://example.com"
                />
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
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
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
