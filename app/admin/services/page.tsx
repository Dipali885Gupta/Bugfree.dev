'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
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
      setItems([])
    } else {
      setItems((data as unknown as ServiceRow[]) ?? [])
    }
    setLoading(false)
  }

  const add = async () => {
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
        display_order: items.length + 1,
      } as never)
      .select()
      .single()
    if (error) return toast.error('Add failed — run cms-landing-v2.sql migration')
    if (data) setItems((prev) => [...prev, data as unknown as ServiceRow])
  }

  const save = async (item: ServiceRow) => {
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
      } as never)
      .eq('id', item.id)
    if (error) toast.error('Save failed')
    else toast.success('Service saved')
  }

  const remove = async (id: string) => {
    await supabase.from('feature_cards').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
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
          <p className="text-sm text-muted">Six service cards + modal details on landing page.</p>
        </div>
        <Button onClick={add} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add service
        </Button>
      </div>

      {items.map((item, i) => (
        <div key={item.id} className="rounded-xl border border-[var(--color-border)] p-5 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Title" value={item.title} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, title: e.target.value } : x))} />
            <Input placeholder="Badge" value={item.badge ?? ''} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, badge: e.target.value } : x))} />
            <select
              className="rounded-lg border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
              value={item.icon_name}
              onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, icon_name: e.target.value } : x))}
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            <Input placeholder="Key (modal id)" value={item.item_key ?? ''} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, item_key: e.target.value } : x))} />
          </div>
          <Textarea placeholder="Description" value={item.description ?? ''} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, description: e.target.value } : x))} />
          <Textarea
            placeholder="Bullets (one per line)"
            value={(item.bullets ?? []).join('\n')}
            onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, bullets: e.target.value.split('\n').filter(Boolean) } : x))}
          />
          <Textarea
            placeholder="Details JSON [{label,value}]"
            value={JSON.stringify(item.details ?? [], null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value)
                setItems((p) => p.map((x) => x.id === item.id ? { ...x, details: parsed } : x))
              } catch { /* ignore while typing */ }
            }}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => save({ ...item, display_order: i + 1 })}><Save className="mr-1 h-4 w-4" />Save</Button>
            <Button size="sm" variant="destructive" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  )
}
