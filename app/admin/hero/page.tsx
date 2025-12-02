'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye } from 'lucide-react'
import { toast } from 'sonner'
import type { HeroSection } from '@/lib/supabase/types'

export default function HeroSectionPage() {
  const [data, setData] = useState<HeroSection | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    const { data: heroData, error } = await supabase
      .from('hero_section')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      toast.error('Failed to fetch hero section data')
    }
    
    setData(heroData || {
      id: '',
      badge_text: 'Next Generation Tech Agency',
      headline: 'Building & Shipping Products Faster with AI',
      headline_highlight: 'Faster',
      subheadline: 'Building and shipping products faster with AI',
      cta_text: 'Get Started',
      cta_link: '#contact',
      is_active: true,
      created_at: '',
      updated_at: '',
    })
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!data) return
    setIsSaving(true)

    try {
      if (data.id) {
        const { error } = await supabase
          .from('hero_section')
          .update({
            badge_text: data.badge_text,
            headline: data.headline,
            headline_highlight: data.headline_highlight,
            subheadline: data.subheadline,
            cta_text: data.cta_text,
            cta_link: data.cta_link,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id)

        if (error) throw error
      } else {
        const { data: newData, error } = await supabase
          .from('hero_section')
          .insert({
            badge_text: data.badge_text,
            headline: data.headline,
            headline_highlight: data.headline_highlight,
            subheadline: data.subheadline,
            cta_text: data.cta_text,
            cta_link: data.cta_link,
          })
          .select()
          .single()

        if (error) throw error
        if (newData) setData(newData)
      }

      toast.success('Hero section saved successfully')
    } catch (error) {
      toast.error('Failed to save hero section')
      console.error(error)
    } finally {
      setIsSaving(false)
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
          <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-1">
            Manage the hero section of your landing page
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <a href="/#home" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </a>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Badge Text</label>
            <Input
              value={data?.badge_text || ''}
              onChange={(e) => setData(prev => prev ? { ...prev, badge_text: e.target.value } : null)}
              placeholder="Next Generation Tech Agency"
            />
            <p className="text-xs text-muted-foreground">
              The small text above the main headline
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Headline Highlight</label>
            <Input
              value={data?.headline_highlight || ''}
              onChange={(e) => setData(prev => prev ? { ...prev, headline_highlight: e.target.value } : null)}
              placeholder="Faster"
            />
            <p className="text-xs text-muted-foreground">
              The word in the headline that gets highlighted with gradient
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Main Headline</label>
          <Input
            value={data?.headline || ''}
            onChange={(e) => setData(prev => prev ? { ...prev, headline: e.target.value } : null)}
            placeholder="Building & Shipping Products Faster with AI"
          />
          <p className="text-xs text-muted-foreground">
            The main headline text. The highlight word will be automatically styled.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Subheadline</label>
          <Textarea
            value={data?.subheadline || ''}
            onChange={(e) => setData(prev => prev ? { ...prev, subheadline: e.target.value } : null)}
            placeholder="Building and shipping products faster with AI"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">CTA Button Text</label>
            <Input
              value={data?.cta_text || ''}
              onChange={(e) => setData(prev => prev ? { ...prev, cta_text: e.target.value } : null)}
              placeholder="Get Started"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">CTA Button Link</label>
            <Input
              value={data?.cta_link || ''}
              onChange={(e) => setData(prev => prev ? { ...prev, cta_link: e.target.value } : null)}
              placeholder="#contact"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Preview</h2>
        <div className="bg-background rounded-lg p-8 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
            {data?.badge_text}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {data?.headline?.split(data?.headline_highlight || '').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-primary">{data?.headline_highlight}</span>
                )}
              </span>
            ))}
          </h1>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{data?.subheadline}</p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg">
            {data?.cta_text}
          </button>
        </div>
      </div>
    </div>
  )
}
