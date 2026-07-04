'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { ICON_OPTIONS } from '@/lib/cms/icons'

interface SocialProofItem {
  id: string
  icon_name: string
  label: string
  display_order: number
  is_active: boolean
}

export default function SocialProofAdminPage() {
  const [items, setItems] = useState<SocialProofItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    void load()
  }, [])

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('social_proof_items')
      .select('*')
      .order('display_order')
    if (error) toast.error('Failed to load social proof chips')
    setItems(data ?? [])
    setLoading(false)
  }

  const addItem = async () => {
    const { data, error } = await supabase
      .from('social_proof_items')
      .insert({ icon_name: 'Rocket', label: 'New signal', display_order: items.length + 1 })
      .select()
      .single()
    if (error) return toast.error('Could not add item')
    if (data) setItems((prev) => [...prev, data])
  }

  const saveItem = async (item: SocialProofItem) => {
    setSaving(true)
    const { error } = await supabase
      .from('social_proof_items')
      .update({ icon_name: item.icon_name, label: item.label, display_order: item.display_order, is_active: item.is_active })
      .eq('id', item.id)
    setSaving(false)
    if (error) toast.error('Save failed')
    else toast.success('Saved')
  }

  const deleteItem = async (id: string) => {
    const { error } = await supabase.from('social_proof_items').delete().eq('id', id)
    if (error) toast.error('Delete failed')
    else setItems((prev) => prev.filter((i) => i.id !== id))
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
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Social Proof</h1>
          <p className="text-sm text-muted">Chip row below hero — icons + labels on landing page.</p>
        </div>
        <Button onClick={addItem} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add chip
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-[var(--color-border)] p-4 space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <label className="text-xs text-faint">Icon</label>
                <select
                  className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm"
                  value={item.icon_name}
                  onChange={(e) =>
                    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, icon_name: e.target.value } : i)))
                  }
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-faint">Label</label>
                <Input
                  className="mt-1"
                  value={item.label}
                  onChange={(e) =>
                    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, label: e.target.value } : i)))
                  }
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => saveItem({ ...item, display_order: index + 1 })} disabled={saving}>
                <Save className="mr-1 h-4 w-4" /> Save
              </Button>
              <Button size="sm" variant="destructive" onClick={() => deleteItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
