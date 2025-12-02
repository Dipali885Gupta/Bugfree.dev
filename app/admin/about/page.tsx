'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import type { AboutSection, FeatureCard } from '@/lib/supabase/types'

const ICON_OPTIONS = [
  'Zap', 'Rocket', 'Target', 'Shield', 'Clock', 'Users', 'Code', 'Cpu',
  'Globe', 'Sparkles', 'Lightbulb', 'TrendingUp', 'Award', 'Star', 'Heart'
]

export default function AboutSectionPage() {
  const [aboutData, setAboutData] = useState<AboutSection | null>(null)
  const [features, setFeatures] = useState<FeatureCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    
    const [aboutResult, featuresResult] = await Promise.all([
      supabase.from('about_section').select('*').single(),
      supabase.from('feature_cards').select('*').order('display_order'),
    ])

    if (aboutResult.error && aboutResult.error.code !== 'PGRST116') {
      toast.error('Failed to fetch about section data')
    }

    setAboutData(aboutResult.data || {
      id: '',
      section_title: 'Redefining Product Development',
      section_description: 'We merge cutting-edge AI technologies with proven development methodologies to deliver exceptional products.',
      secondary_title: 'Why Choose Our AI-Powered Approach?',
      secondary_description: 'Our unique combination of AI capabilities and human expertise ensures your project gets the best of both worlds.',
      image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      benefits: [
        '10x faster development cycles',
        'AI-assisted code review',
        'Automated testing and deployment',
      ],
      is_active: true,
      created_at: '',
      updated_at: '',
    })

    setFeatures(featuresResult.data || [])
    setIsLoading(false)
  }

  const handleSaveAbout = async () => {
    if (!aboutData) return
    setIsSaving(true)

    try {
      if (aboutData.id) {
        const { error } = await supabase
          .from('about_section')
          .update({
            section_title: aboutData.section_title,
            section_description: aboutData.section_description,
            secondary_title: aboutData.secondary_title,
            secondary_description: aboutData.secondary_description,
            image_url: aboutData.image_url,
            benefits: aboutData.benefits,
            updated_at: new Date().toISOString(),
          })
          .eq('id', aboutData.id)

        if (error) throw error
      } else {
        const { data: newData, error } = await supabase
          .from('about_section')
          .insert({
            section_title: aboutData.section_title,
            section_description: aboutData.section_description,
            secondary_title: aboutData.secondary_title,
            secondary_description: aboutData.secondary_description,
            image_url: aboutData.image_url,
            benefits: aboutData.benefits,
          })
          .select()
          .single()

        if (error) throw error
        if (newData) setAboutData(newData)
      }

      toast.success('About section saved successfully')
    } catch (error) {
      toast.error('Failed to save about section')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddFeature = async () => {
    const newFeature = {
      icon_name: 'Zap',
      title: 'New Feature',
      description: 'Feature description',
      display_order: features.length + 1,
      is_active: true,
    }

    const { data, error } = await supabase
      .from('feature_cards')
      .insert(newFeature)
      .select()
      .single()

    if (error) {
      toast.error('Failed to add feature')
      return
    }

    if (data) {
      setFeatures([...features, data])
      toast.success('Feature added')
    }
  }

  const handleUpdateFeature = async (id: string, updates: Partial<FeatureCard>) => {
    const { error } = await supabase
      .from('feature_cards')
      .update(updates)
      .eq('id', id)

    if (error) {
      toast.error('Failed to update feature')
      return
    }

    setFeatures(features.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const handleDeleteFeature = async (id: string) => {
    const { error } = await supabase
      .from('feature_cards')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete feature')
      return
    }

    setFeatures(features.filter(f => f.id !== id))
    toast.success('Feature deleted')
  }

  const updateBenefit = (index: number, value: string) => {
    if (!aboutData) return
    const newBenefits = [...(aboutData.benefits || [])]
    newBenefits[index] = value
    setAboutData({ ...aboutData, benefits: newBenefits })
  }

  const addBenefit = () => {
    if (!aboutData) return
    setAboutData({
      ...aboutData,
      benefits: [...(aboutData.benefits || []), 'New benefit'],
    })
  }

  const removeBenefit = (index: number) => {
    if (!aboutData) return
    const newBenefits = [...(aboutData.benefits || [])]
    newBenefits.splice(index, 1)
    setAboutData({ ...aboutData, benefits: newBenefits })
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
          <h1 className="text-3xl font-bold text-foreground">About Section</h1>
          <p className="text-muted-foreground mt-1">
            Manage the about section content and feature cards
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <a href="/#about" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </a>
          </Button>
          <Button onClick={handleSaveAbout} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Main Section</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Section Title</label>
            <Input
              value={aboutData?.section_title || ''}
              onChange={(e) => setAboutData(prev => prev ? { ...prev, section_title: e.target.value } : null)}
              placeholder="Redefining Product Development"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Image URL</label>
            <Input
              value={aboutData?.image_url || ''}
              onChange={(e) => setAboutData(prev => prev ? { ...prev, image_url: e.target.value } : null)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Section Description</label>
          <Textarea
            value={aboutData?.section_description || ''}
            onChange={(e) => setAboutData(prev => prev ? { ...prev, section_description: e.target.value } : null)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Secondary Title</label>
          <Input
            value={aboutData?.secondary_title || ''}
            onChange={(e) => setAboutData(prev => prev ? { ...prev, secondary_title: e.target.value } : null)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Secondary Description</label>
          <Textarea
            value={aboutData?.secondary_description || ''}
            onChange={(e) => setAboutData(prev => prev ? { ...prev, secondary_description: e.target.value } : null)}
            rows={4}
          />
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Benefits</label>
            <Button variant="outline" size="sm" onClick={addBenefit}>
              <Plus className="w-4 h-4 mr-1" />
              Add Benefit
            </Button>
          </div>
          <div className="space-y-2">
            {aboutData?.benefits?.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBenefit(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Feature Cards</h2>
          <Button onClick={handleAddFeature}>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>

        <div className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-background border border-border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Icon</label>
                    <select
                      value={feature.icon_name}
                      onChange={(e) => handleUpdateFeature(feature.id, { icon_name: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Title</label>
                    <Input
                      value={feature.title}
                      onChange={(e) => handleUpdateFeature(feature.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Description</label>
                    <Input
                      value={feature.description || ''}
                      onChange={(e) => handleUpdateFeature(feature.id, { description: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteFeature(feature.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {features.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No feature cards yet. Click &quot;Add Feature&quot; to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
