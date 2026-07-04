'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, EyeOff, Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { ICON_OPTIONS } from '@/lib/cms/icons'

type ProcessRow = {
  id: string
  icon_name: string
  title: string
  description: string | null
  display_order: number
  is_active: boolean
  phase_number?: string | null
  subtitle?: string | null
  timeline?: string | null
  outcomes?: string[] | null
  highlight?: string | null
}

const ICON_OPTIONS_LIST = ICON_OPTIONS

export default function ProcessPage() {
  const [steps, setSteps] = useState<ProcessRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    void fetchSteps()
  }, [])

  const fetchSteps = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('display_order')

    if (error) {
      console.error('[ProcessAdmin] fetch error:', error)
      toast.error(`Load failed: ${error.message}`)
      setSteps([])
    } else {
      const rows = (data as unknown as ProcessRow[]) ?? []
      console.log('[ProcessAdmin] rows:', rows.length, rows.map((r) => ({ id: r.id.slice(0, 8), title: r.title })))
      setSteps(rows.map((s) => ({ ...s, is_active: s.is_active ?? true })))
      if (!error && rows.length === 0) {
        toast.error('process_steps table is empty — run schema.sql seed to add default phases')
      }
    }
    setIsLoading(false)
  }

  const handleAddStep = async () => {
    const maxOrder = steps.reduce((max, s) => Math.max(max, s.display_order), 0)
    const newStep: Omit<ProcessRow, 'id'> = {
      icon_name: 'Target',
      title: 'New Phase',
      subtitle: 'Phase subtitle',
      description: 'Describe what happens in this phase.',
      timeline: 'Weeks 1–2',
      outcomes: ['Outcome 1', 'Outcome 2'],
      highlight: 'Key takeaway for this phase.',
      display_order: maxOrder + 1,
      is_active: true,
    }

    const { data, error } = await supabase
      .from('process_steps')
      .insert(newStep as never)
      .select()
      .single()

    if (error) {
      toast.error(`Add failed: ${error.message}`)
      return
    }

    if (data) {
      setSteps((prev) => [...prev, data as unknown as ProcessRow])
      toast.success('Phase added')
    }
  }

  const handleSaveStep = async (step: ProcessRow) => {
    setSavingId(step.id)
    const { error } = await supabase
      .from('process_steps')
      .update({
        icon_name: step.icon_name,
        title: step.title,
        subtitle: step.subtitle || null,
        description: step.description || null,
        phase_number: step.phase_number || null,
        timeline: step.timeline || null,
        outcomes: step.outcomes || null,
        highlight: step.highlight || null,
        display_order: step.display_order,
        is_active: step.is_active,
      } as never)
      .eq('id', step.id)

    setSavingId(null)
    if (error) {
      toast.error(`Save failed: ${error.message}`)
    } else {
      toast.success('Phase saved')
    }
  }

  const handleDeleteStep = async (id: string) => {
    if (!confirm('Delete this phase?')) return
    const { error } = await supabase.from('process_steps').delete().eq('id', id)
    if (error) {
      toast.error(`Delete failed: ${error.message}`)
      return
    }
    setSteps((prev) => prev.filter((s) => s.id !== id))
    toast.success('Phase deleted')
  }

  const toggleActive = async (step: ProcessRow) => {
    const updated = { ...step, is_active: !step.is_active }
    setSteps((prev) => prev.map((s) => (s.id === step.id ? updated : s)))
    const { error } = await supabase
      .from('process_steps')
      .update({ is_active: updated.is_active } as never)
      .eq('id', step.id)
    if (error) {
      setSteps((prev) => prev.map((s) => (s.id === step.id ? step : s)))
      toast.error('Toggle failed')
    } else {
      toast.success(updated.is_active ? 'Visible on landing' : 'Hidden from landing')
    }
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const updated = [...steps]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    updated[index] = { ...updated[index], display_order: index + 1 }
    updated[index - 1] = { ...updated[index - 1], display_order: index }
    setSteps(updated)
  }

  const moveDown = (index: number) => {
    if (index === steps.length - 1) return
    const updated = [...steps]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    updated[index] = { ...updated[index], display_order: index + 1 }
    updated[index + 1] = { ...updated[index + 1], display_order: index + 2 }
    setSteps(updated)
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Process Phases</h1>
          <p className="text-sm text-muted">
            {steps.length} phase{steps.length !== 1 ? 's' : ''} — edit below. Use Eye to show/hide on landing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/#process"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-sm"
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Preview landing
          </a>
          <Button onClick={handleAddStep} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add phase
          </Button>
        </div>
      </div>

      {steps.length === 0 && (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
          <p className="text-muted">No phases yet. Click &quot;Add phase&quot; to get started.</p>
        </div>
      )}

      {steps.map((step, i) => (
        <div
          key={step.id}
          className={`rounded-xl border p-5 space-y-3 transition-colors ${
            step.is_active
              ? 'border-[var(--color-border)] bg-[var(--color-card)]'
              : 'border-dashed border-muted bg-muted/10 opacity-75'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="cursor-pointer text-muted"
                onClick={() => moveUp(i)}
                title="Move up"
              >
                <GripVertical className="h-4 w-4" />
              </span>
              <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-muted">
                #{i + 1}
              </span>
              <span className="font-medium text-sm">{step.title || 'Untitled'}</span>
              {!step.is_active && (
                <span className="badge bg-muted text-muted">Hidden</span>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => toggleActive(step)}
              title={step.is_active ? 'Hide from landing' : 'Show on landing'}
            >
              {step.is_active ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted" />
              )}
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-faint">Title</label>
              <Input
                className="mt-1"
                placeholder="e.g. Build your MVP"
                value={step.title}
                onChange={(e) =>
                  setSteps((p) => p.map((s) => (s.id === step.id ? { ...s, title: e.target.value } : s)))
                }
              />
            </div>
            <div>
              <label className="text-xs text-faint">Subtitle (accent line under title)</label>
              <Input
                className="mt-1"
                placeholder="e.g. Under 3 weeks"
                value={step.subtitle ?? ''}
                onChange={(e) =>
                  setSteps((p) => p.map((s) => (s.id === step.id ? { ...s, subtitle: e.target.value } : s)))
                }
              />
            </div>
            <div>
              <label className="text-xs text-faint">Icon</label>
              <select
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                value={step.icon_name}
                onChange={(e) =>
                  setSteps((p) => p.map((s) => (s.id === step.id ? { ...s, icon_name: e.target.value } : s)))
                }
              >
                {ICON_OPTIONS_LIST.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-faint">Phase number (override)</label>
              <Input
                className="mt-1"
                placeholder="e.g. 01 — leave empty to auto-number"
                value={step.phase_number ?? ''}
                onChange={(e) =>
                  setSteps((p) => p.map((s) => (s.id === step.id ? { ...s, phase_number: e.target.value } : s)))
                }
              />
            </div>
            <div>
              <label className="text-xs text-faint">Timeline label</label>
              <Input
                className="mt-1"
                placeholder="e.g. Weeks 1–3"
                value={step.timeline ?? ''}
                onChange={(e) =>
                  setSteps((p) => p.map((s) => (s.id === step.id ? { ...s, timeline: e.target.value } : s)))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-faint">Body description</label>
            <Textarea
              className="mt-1"
              placeholder="Longer description of this phase"
              rows={3}
              value={step.description ?? ''}
              onChange={(e) =>
                setSteps((p) => p.map((s) => (s.id === step.id ? { ...s, description: e.target.value } : s)))
              }
            />
          </div>

          <div>
            <label className="text-xs text-faint">Outcomes (one per line)</label>
            <Textarea
              className="mt-1"
              placeholder={"Outcome 1\nOutcome 2\nOutcome 3"}
              rows={4}
              value={(step.outcomes ?? []).join('\n')}
              onChange={(e) =>
                setSteps((p) =>
                  p.map((s) =>
                    s.id === step.id
                      ? { ...s, outcomes: e.target.value.split('\n').filter(Boolean) }
                      : s
                  )
                )
              }
            />
          </div>

          <div>
            <label className="text-xs text-faint">Highlight (shown in gradient box on landing)</label>
            <Input
              className="mt-1"
              placeholder="e.g. From zero to deployed in weeks — not months"
              value={step.highlight ?? ''}
              onChange={(e) =>
                setSteps((p) => p.map((s) => (s.id === step.id ? { ...s, highlight: e.target.value } : s)))
              }
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={() => handleSaveStep({ ...step, display_order: i + 1 })}
              disabled={savingId === step.id}
            >
              {savingId === step.id ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-1 h-4 w-4" />
              )}
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => moveUp(i)} disabled={i === 0}>
              ↑ Up
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => moveDown(i)}
              disabled={i === steps.length - 1}
            >
              Down ↓
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDeleteStep(step.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
