'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import type { ProcessStep } from '@/lib/supabase/types'

const ICON_OPTIONS = [
  'MessageSquare', 'Palette', 'Code', 'Rocket', 'Headphones',
  'Zap', 'Target', 'Shield', 'Clock', 'Users', 'Cpu',
  'Globe', 'Sparkles', 'Lightbulb', 'TrendingUp', 'CheckCircle'
]

export default function ProcessPage() {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchSteps()
  }, [])

  const fetchSteps = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('display_order')

    if (error) {
      toast.error('Failed to fetch process steps')
    }

    setSteps(data || [])
    setIsLoading(false)
  }

  const handleAddStep = async () => {
    const newStep = {
      icon_name: 'Zap',
      title: 'New Step',
      description: 'Description of this step',
      display_order: steps.length + 1,
      is_active: true,
    }

    const { data, error } = await supabase
      .from('process_steps')
      .insert(newStep)
      .select()
      .single()

    if (error) {
      toast.error('Failed to add step')
      return
    }

    if (data) {
      setSteps([...steps, data])
      toast.success('Step added')
    }
  }

  const handleUpdateStep = async (id: string, updates: Partial<ProcessStep>) => {
    setSteps(steps.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const handleSaveStep = async (step: ProcessStep) => {
    setIsSaving(true)
    const { error } = await supabase
      .from('process_steps')
      .update({
        icon_name: step.icon_name,
        title: step.title,
        description: step.description,
        display_order: step.display_order,
      })
      .eq('id', step.id)

    if (error) {
      toast.error('Failed to save step')
    } else {
      toast.success('Step saved')
    }
    setIsSaving(false)
  }

  const handleDeleteStep = async (id: string) => {
    if (!confirm('Are you sure you want to delete this step?')) return

    const { error } = await supabase
      .from('process_steps')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete step')
      return
    }

    setSteps(steps.filter(s => s.id !== id))
    toast.success('Step deleted')
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        await supabase
          .from('process_steps')
          .update({
            icon_name: step.icon_name,
            title: step.title,
            description: step.description,
            display_order: i + 1,
          })
          .eq('id', step.id)
      }
      toast.success('All steps saved')
    } catch {
      toast.error('Failed to save steps')
    }
    setIsSaving(false)
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
          <h1 className="text-3xl font-bold text-foreground">Process Steps</h1>
          <p className="text-muted-foreground mt-1">
            Manage your development process workflow
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <a href="/#process" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </a>
          </Button>
          <Button onClick={handleSaveAll} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save All
          </Button>
          <Button onClick={handleAddStep}>
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </Button>
        </div>
      </div>

      {/* Process Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Icon</label>
                  <select
                    value={step.icon_name}
                    onChange={(e) => handleUpdateStep(step.id, { icon_name: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input
                    value={step.title}
                    onChange={(e) => handleUpdateStep(step.id, { title: e.target.value })}
                    placeholder="Step title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea
                    value={step.description || ''}
                    onChange={(e) => handleUpdateStep(step.id, { description: e.target.value })}
                    rows={2}
                    placeholder="Step description"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSaveStep(step)}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteStep(step.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {steps.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
            No process steps yet. Click &quot;Add Step&quot; to create your first one.
          </div>
        )}
      </div>

      {/* Timeline Preview */}
      {steps.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Timeline Preview</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-4 pl-12">
                  <div className="absolute left-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
