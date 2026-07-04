'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

interface LandingSection {
  key: string
  eyebrow: string | null
  title: string | null
  title_highlight: string | null
  subtitle: string | null
}

const SECTION_LABELS: Record<string, string> = {
  product_preview: 'Product Preview',
  services: 'Services',
  process: 'Process',
  metrics: 'Metrics',
  projects: 'Projects',
  about: 'About',
  tech: 'Tech Stack',
  developer: 'Developer',
  testimonials: 'Testimonials',
  contact: 'Contact',
}

export default function SectionsAdminPage() {
  const [sections, setSections] = useState<LandingSection[]>([])
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    void load()
  }, [])

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('landing_sections').select('*').order('key')
    if (error) toast.error('Run supabase/cms-landing-v2.sql first if table missing')
    setSections(data ?? [])
    setLoading(false)
  }

  const save = async (section: LandingSection) => {
    setSavingKey(section.key)
    const { error } = await supabase.from('landing_sections').upsert({
      ...section,
      updated_at: new Date().toISOString(),
    })
    setSavingKey(null)
    if (error) toast.error('Save failed')
    else toast.success(`${SECTION_LABELS[section.key] ?? section.key} saved`)
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Section Headers</h1>
        <p className="text-sm text-muted">Eyebrow, title, highlight, and subtitle for each landing block.</p>
      </div>

      {sections.map((section) => (
        <div key={section.key} className="rounded-xl border border-[var(--color-border)] p-5 space-y-3">
          <h2 className="font-semibold text-[var(--color-text)]">{SECTION_LABELS[section.key] ?? section.key}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-faint">Eyebrow</label>
              <Input
                className="mt-1"
                value={section.eyebrow ?? ''}
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s) => (s.key === section.key ? { ...s, eyebrow: e.target.value } : s))
                  )
                }
              />
            </div>
            <div>
              <label className="text-xs text-faint">Title highlight (gradient part)</label>
              <Input
                className="mt-1"
                value={section.title_highlight ?? ''}
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s) => (s.key === section.key ? { ...s, title_highlight: e.target.value } : s))
                  )
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-faint">Title</label>
              <Input
                className="mt-1"
                value={section.title ?? ''}
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s) => (s.key === section.key ? { ...s, title: e.target.value } : s))
                  )
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-faint">Subtitle</label>
              <Textarea
                className="mt-1"
                value={section.subtitle ?? ''}
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s) => (s.key === section.key ? { ...s, subtitle: e.target.value } : s))
                  )
                }
              />
            </div>
          </div>
          <Button size="sm" onClick={() => save(section)} disabled={savingKey === section.key}>
            {savingKey === section.key ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />}
            Save
          </Button>
        </div>
      ))}
    </div>
  )
}
