'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Plus, Trash2, ExternalLink, Eye, EyeOff, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import { ICON_OPTIONS } from '@/lib/cms/icons'

type ServiceRow = {
  id: string
  section: string
  item_key: string | null
  icon_name: string
  title: string
  badge: string | null
  description: string | null
  bullets: string[] | null
  details: { label: string; value: string }[] | null
  display_order: number
  is_active: boolean
}

export default function ServicesAdminPage() {
  const [items, setItems] = useState<ServiceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    void load()
  }, [])

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('feature_cards')
      .select('*')
      .eq('section', 'services')
      .order('display_order')
    if (error) {
      toast.error('Load failed — run cms-landing-v2.sql migration')
      setItems([])
    } else {
      setItems((data as unknown as ServiceRow[]) ?? [])
    }
    setLoading(false)
  }

  const add = async () => {
    const maxOrder = items.reduce((max, i) => Math.max(max, i.display_order), 0)
    const { data, error } = await supabase
      .from('feature_cards')
      .insert({
        section: 'services',
        item_key: `service-${Date.now()}`,
        icon_name: 'Rocket',
        title: 'New service',
        badge: 'Timeline',
        description: 'Description',
        bullets: ['Bullet 1'],
        details: [{ label: 'Included', value: 'Scope' }],
        display_order: maxOrder + 1,
        is_active: true,
      } as never)
      .select()
      .single()
    if (error) return toast.error('Add failed — run cms-landing-v2.sql migration')
    if (data) setItems((prev) => [...prev, data as unknown as ServiceRow])
  }

  const save = async (item: ServiceRow) => {
    setSavingId(item.id)
    const { error } = await supabase
      .from('feature_cards')
      .update({
        section: 'services',
        item_key: item.item_key,
        icon_name: item.icon_name,
        title: item.title,
        badge: item.badge,
        description: item.description,
        bullets: item.bullets,
        details: item.details,
        display_order: item.display_order,
        is_active: item.is_active,
      } as never)
      .eq('id', item.id)
    setSavingId(null)
    if (error) toast.error('Save failed')
    else toast.success('Service saved')
  }

  const remove = async (id: string) => {
    await supabase.from('feature_cards').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const toggleActive = async (item: ServiceRow) => {
    const updated = { ...item, is_active: !item.is_active }
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)))
    const { error } = await supabase
      .from('feature_cards')
      .update({ is_active: updated.is_active } as never)
      .eq('id', item.id)
    if (error) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)))
      toast.error('Toggle failed')
    } else {
      toast.success(updated.is_active ? 'Service visible on landing' : 'Service hidden from landing')
    }
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const updated = [...items]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    updated[index] = { ...updated[index], display_order: index + 1 }
    updated[index - 1] = { ...updated[index - 1], display_order: index }
    setItems(updated)
  }

  const moveDown = (index: number) => {
    if (index === items.length - 1) return
    const updated = [...items]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    updated[index] = { ...updated[index], display_order: index + 1 }
    updated[index + 1] = { ...updated[index + 1], display_order: index + 2 }
    setItems(updated)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-muted">
            {items.length} service{items.length !== 1 ? 's' : ''} — edit cards below. Use &quot;Eye&quot; to show/hide on landing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/#services"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-sm"
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Preview landing
          </a>
          <Button onClick={add} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add service
          </Button>
        </div>
      </div>

      {items.length === 0 && (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] p-12 text-center">
          <p className="text-muted">No services yet. Click &quot;Add service&quot; to get started.</p>
        </div>
      )}

      {items.map((item, i) => (
        <div
          key={item.id}
          className={`rounded-xl border p-5 space-y-3 transition-colors ${
            item.is_active
              ? 'border-[var(--color-border)] bg-[var(--color-card)]'
              : 'border-dashed border-muted bg-muted/10 opacity-75'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted cursor-pointer" onClick={() => moveUp(i)} title="Move up">
                <GripVertical className="h-4 w-4" />
              </span>
              <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-muted">
                #{i + 1}
              </span>
              <span className="font-medium text-sm">{item.title || 'Untitled'}</span>
              {!item.is_active && (
                <span className="badge bg-muted text-muted">Hidden</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleActive(item)}
                title={item.is_active ? 'Hide from landing' : 'Show on landing'}
              >
                {item.is_active ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted" />
                )}
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs text-faint">Title</label>
              <Input
                className="mt-1"
                placeholder="e.g. MVP Launch Sprint"
                value={item.title}
                onChange={(e) =>
                  setItems((p) => p.map((x) => (x.id === item.id ? { ...x, title: e.target.value } : x)))
                }
              />
            </div>
            <div>
              <label className="text-xs text-faint">Badge</label>
              <Input
                className="mt-1"
                placeholder="e.g. ~3 weeks"
                value={item.badge ?? ''}
                onChange={(e) =>
                  setItems((p) => p.map((x) => (x.id === item.id ? { ...x, badge: e.target.value } : x)))
                }
              />
            </div>
            <div>
              <label className="text-xs text-faint">Icon</label>
              <select
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                value={item.icon_name}
                onChange={(e) =>
                  setItems((p) => p.map((x) => (x.id === item.id ? { ...x, icon_name: e.target.value } : x)))
                }
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-faint">Modal ID (unique key)</label>
              <Input
                className="mt-1"
                placeholder="e.g. mvp, full-product"
                value={item.item_key ?? ''}
                onChange={(e) =>
                  setItems((p) => p.map((x) => (x.id === item.id ? { ...x, item_key: e.target.value } : x)))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-faint">Description</label>
            <Textarea
              className="mt-1"
              placeholder="Short description shown on the card"
              rows={2}
              value={item.description ?? ''}
              onChange={(e) =>
                setItems((p) => p.map((x) => (x.id === item.id ? { ...x, description: e.target.value } : x)))
              }
            />
          </div>

          <div>
            <label className="text-xs text-faint">Bullets (one per line)</label>
            <Textarea
              className="mt-1"
              placeholder={"Line 1\nLine 2\nLine 3"}
              rows={4}
              value={(item.bullets ?? []).join('\n')}
              onChange={(e) =>
                setItems((p) =>
                  p.map((x) =>
                    x.id === item.id ? { ...x, bullets: e.target.value.split('\n').filter(Boolean) } : x
                  )
                )
              }
            />
          </div>

          <div>
            <label className="text-xs text-faint">Modal Details (label | value per line, or JSON)</label>
            <Textarea
              className="mt-1 font-mono text-xs"
              placeholder={'Included | Full-stack build\nTimeline | ~3 weeks'}
              rows={4}
              value={(item.details ?? [])
                .map((d) => `${d.label} | ${d.value}`)
                .join('\n')}
              onChange={(e) => {
                const lines = e.target.value.split('\n').filter(Boolean)
                const parsed = lines.map((line) => {
                  const [label, ...rest] = line.split('|')
                  return { label: label.trim(), value: rest.join('|').trim() }
                })
                setItems((p) => p.map((x) => (x.id === item.id ? { ...x, details: parsed } : x)))
              }}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={() => save({ ...item, display_order: i + 1 })}
              disabled={savingId === item.id}
            >
              {savingId === item.id ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-1 h-4 w-4" />
              )}
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => moveUp(i)} disabled={i === 0}>
              ↑ Up
            </Button>
            <Button size="sm" variant="ghost" onClick={() => moveDown(i)} disabled={i === items.length - 1}>
              Down ↓
            </Button>
            <Button size="sm" variant="destructive" onClick={() => remove(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
