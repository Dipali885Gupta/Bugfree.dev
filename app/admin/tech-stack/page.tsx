'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface TechRow {
  id: string
  label: string
  row_number: number
  display_order: number
}

export default function TechStackAdminPage() {
  const [items, setItems] = useState<TechRow[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { void load() }, [])

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('tech_stack_items').select('*').order('display_order')
    setItems(data ?? [])
    setLoading(false)
  }

  const add = async (row: number) => {
    const { data, error } = await supabase.from('tech_stack_items').insert({ label: 'New tech', row_number: row, display_order: items.length + 1 }).select().single()
    if (error) return toast.error('Run cms-landing-v2.sql migration')
    if (data) setItems((p) => [...p, data])
  }

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>

  const save = async (item: TechRow) => {
    const { error } = await supabase.from('tech_stack_items').update(item).eq('id', item.id)
    if (error) toast.error('Save failed')
    else toast.success('Saved')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tech Stack</h1>
      {[1, 2].map((row) => (
        <div key={row} className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Row {row}</h2>
            <Button size="sm" variant="outline" onClick={() => add(row)}><Plus className="h-4 w-4 mr-1" />Add pill</Button>
          </div>
          {items.filter((i) => i.row_number === row).map((item, idx) => (
            <div key={item.id} className="flex gap-2 items-center">
              <Input value={item.label} onChange={(e) => setItems((p) => p.map((x) => x.id === item.id ? { ...x, label: e.target.value } : x))} />
              <Button size="sm" onClick={() => save({ ...item, display_order: idx + 1 })}><Save className="h-4 w-4" /></Button>
              <Button size="sm" variant="destructive" onClick={async () => { await supabase.from('tech_stack_items').delete().eq('id', item.id); setItems((p) => p.filter((x) => x.id !== item.id)) }}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
