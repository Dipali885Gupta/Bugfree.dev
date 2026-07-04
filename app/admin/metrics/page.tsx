'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { ICON_OPTIONS } from '@/lib/cms/icons'

interface MetricRow {
  id: string
  icon_name: string
  value: string
  label: string
  description: string | null
  display_order: number
}

export default function MetricsAdminPage() {
  const [items, setItems] = useState<MetricRow[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { void load() }, [])

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('metrics_items').select('*').order('display_order')
    setItems(data ?? [])
    setLoading(false)
  }

  const add = async () => {
    const { data, error } = await supabase.from('metrics_items').insert({ icon_name: 'Rocket', value: '10+', label: 'Label', description: 'Description', display_order: items.length + 1 }).select().single()
    if (error) return toast.error('Run cms-landing-v2.sql migration')
    if (data) setItems((p) => [...p, data])
  }

  const save = async (item: MetricRow) => {
    const { error } = await supabase.from('metrics_items').update(item).eq('id', item.id)
    if (error) toast.error('Save failed')
    else toast.success('Saved')
  }

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Metrics</h1>
        <Button onClick={add} variant="outline"><Plus className="mr-2 h-4 w-4" />Add</Button>
      </div>
      {items.map((item, i) => (
        <div key={item.id} className="rounded-xl border border-[var(--color-border)] p-4 space-y-2">
          <div className="grid md:grid-cols-4 gap-2">
            <select className="rounded-lg border border-[var(--color-border)] bg-transparent px-2 py-2 text-sm" value={item.icon_name} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, icon_name: e.target.value } : x))}>
              {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
            </select>
            <Input value={item.value} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, value: e.target.value } : x))} placeholder="Value" />
            <Input value={item.label} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, label: e.target.value } : x))} placeholder="Label" className="md:col-span-2" />
          </div>
          <Textarea value={item.description ?? ''} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, description: e.target.value } : x))} />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => save({ ...item, display_order: i + 1 })}><Save className="h-4 w-4 mr-1" />Save</Button>
            <Button size="sm" variant="destructive" onClick={async () => { await supabase.from('metrics_items').delete().eq('id', item.id); setItems((p) => p.filter((x) => x.id !== item.id)) }}><Trash2 className="h-4 w-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  )
}
