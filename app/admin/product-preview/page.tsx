'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Save, Plus, Trash2, Eye, EyeOff, Upload, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface PreviewCard {
  id: string
  name: string
  card_type: string
  accent_color: string | null
  gradient_from: string | null
  gradient_to: string | null
  image_url: string | null
  display_order: number
  is_active: boolean
}

const CARD_TYPES = ['App UI', 'Dashboard']

const PRESETS = [
  { label: 'Teal', accent: '#19d3c5', gradientFrom: '#0d3d3a', gradientTo: '#10161c' },
  { label: 'Blue', accent: '#6f8cff', gradientFrom: '#1a2240', gradientTo: '#10161c' },
  { label: 'Orange', accent: '#ffb44c', gradientFrom: '#2d2010', gradientTo: '#10161c' },
  { label: 'Purple', accent: '#a78bfa', gradientFrom: '#1e1535', gradientTo: '#10161c' },
  { label: 'Green', accent: '#34d399', gradientFrom: '#0f2d20', gradientTo: '#10161c' },
]

export default function ProductPreviewAdminPage() {
  const [cards, setCards] = useState<PreviewCard[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { void load() }, [])

  const load = async () => {
    setLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from('product_preview_cards') as any)
      .select('*')
      .order('display_order')
    setCards((data ?? []) as PreviewCard[])
    setLoading(false)
  }

  const uploadImage = async (cardId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB')
      return
    }

    setUploadingId(cardId)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload-image', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed')

      setCards((p) => p.map((c) => (c.id === cardId ? { ...c, image_url: data.url } : c)))
      toast.success('Screenshot uploaded')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploadingId(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const add = async () => {
    const newCard = {
      name: 'New UI Card',
      card_type: 'App UI',
      accent_color: '#19d3c5',
      gradient_from: '#0d3d3a',
      gradient_to: '#10161c',
      image_url: null,
      display_order: cards.length + 1,
      is_active: true,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('product_preview_cards') as any)
      .insert(newCard)
      .select()
      .single()
    if (error) {
      toast.error('Run cms-landing-v2.sql + add-product-preview-image.sql — ' + error.message)
      return
    }
    if (data) setCards((p) => [...p, data as PreviewCard])
    toast.success('Card added')
  }

  const save = async (card: PreviewCard) => {
    setSavingId(card.id)
    const { error } = await supabase
      .from('product_preview_cards')
      .update({
        name: card.name,
        card_type: card.card_type,
        accent_color: card.accent_color,
        gradient_from: card.gradient_from,
        gradient_to: card.gradient_to,
        image_url: card.image_url,
        display_order: card.display_order,
        is_active: card.is_active,
      })
      .eq('id', card.id)
    setSavingId(null)
    if (error) toast.error('Save failed')
    else toast.success('Saved')
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this card?')) return
    await supabase.from('product_preview_cards').delete().eq('id', id)
    setCards((p) => p.filter((c) => c.id !== id))
    toast.success('Card deleted')
  }

  const toggleActive = async (card: PreviewCard) => {
    const updated = { ...card, is_active: !card.is_active }
    setCards((p) => p.map((c) => (c.id === card.id ? updated : c)))
    await supabase
      .from('product_preview_cards')
      .update({ is_active: updated.is_active })
      .eq('id', card.id)
    toast.success(updated.is_active ? 'Card visible' : 'Card hidden')
  }

  const applyPreset = (cardId: string, preset: (typeof PRESETS)[0]) => {
    setCards((p) =>
      p.map((c) =>
        c.id === cardId
          ? { ...c, accent_color: preset.accent, gradient_from: preset.gradientFrom, gradient_to: preset.gradientTo }
          : c,
      ),
    )
  }

  const CardPreview = ({ card }: { card: PreviewCard }) => {
    const [imgError, setImgError] = useState(false)
    const hasImage = card.image_url && !imgError

    return (
      <div
        className="relative rounded-xl overflow-hidden border border-border/50"
        style={{ height: 130, background: hasImage ? undefined : `linear-gradient(180deg, ${card.gradient_from ?? '#0d3d3a'}, ${card.gradient_to ?? '#10161c'})` }}
      >
        {hasImage ? (
          <Image
            src={card.image_url!}
            alt={card.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="h-2 w-16 rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="h-3 w-3 rounded-full" style={{ background: card.accent_color ?? '#19d3c5' }} />
            </div>
            <div className="flex-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="flex gap-1.5">
              <div className="flex-1 h-4 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex-1 h-4 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        )}
        {!card.is_active && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-xs text-white/60 font-medium">Hidden</span>
          </div>
        )}
      </div>
    )
  }

  const UploadZone = ({ cardId, imageUrl }: { cardId: string; imageUrl: string | null }) => {
    const inputId = `upload-${cardId}`
    const [dragging, setDragging] = useState(false)
    const localRef = useRef<HTMLInputElement>(null)

    return (
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Screenshot</label>
        <div
          className={`relative rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
            dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            const file = e.dataTransfer.files[0]
            if (file) uploadImage(cardId, file)
          }}
          onClick={() => {
            const input = document.getElementById(inputId) as HTMLInputElement
            input?.click()
          }}
        >
          <input
            id={inputId}
            ref={localRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) uploadImage(cardId, file)
            }}
          />
          {uploadingId === cardId ? (
            <div className="flex items-center justify-center h-20 gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </div>
          ) : imageUrl ? (
            <div className="relative h-20 rounded-lg overflow-hidden">
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="text-xs text-white bg-black/60 px-2 py-1 rounded">Replace</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-20 gap-1.5 text-sm text-muted-foreground">
              <Upload className="w-5 h-5" />
              <span>Drop screenshot or click</span>
              <span className="text-xs">PNG, JPG, WebP up to 10MB</span>
            </div>
          )}
        </div>
        {imageUrl && (
          <button
            className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors"
            onClick={() => {
              setCards((p) => p.map((c) => (c.id === cardId ? { ...c, image_url: null } : c)))
            }}
          >
            <X className="w-3 h-3" /> Remove image
          </button>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Preview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Upload screenshots — if empty, generated mockup is shown on site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <a href="/#product-preview" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </a>
          </Button>
          <Button onClick={add}>
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      </div>

      {/* Color presets reference */}
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Quick color presets — applied to mockup fallback and card accent</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-xs"
            >
              <div className="h-3 w-3 rounded-full" style={{ background: p.accent }} />
              <span>{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Migration notice */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-600">
        <strong>First time?</strong> Run <code className="bg-yellow-500/20 px-1 rounded">supabase/add-product-preview-image.sql</code> in your Supabase SQL editor, then refresh this page.
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`bg-card border border-border rounded-xl overflow-hidden ${!card.is_active ? 'opacity-60' : ''}`}
          >
            <div className="grid md:grid-cols-[160px_1fr]">
              {/* Left: preview + upload */}
              <div className="p-4 border-r border-border/50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">#{i + 1}</span>
                  <button
                    onClick={() => toggleActive(card)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {card.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {card.is_active ? 'Visible' : 'Hidden'}
                  </button>
                </div>
                <CardPreview card={card} />
                <UploadZone cardId={card.id} imageUrl={card.image_url} />
              </div>

              {/* Right: fields */}
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Card Name</label>
                    <Input
                      value={card.name}
                      onChange={(e) =>
                        setCards((p) => p.map((c) => (c.id === card.id ? { ...c, name: e.target.value } : c)))
                      }
                      placeholder="KPI Dashboard"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Card Type</label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={card.card_type}
                      onChange={(e) =>
                        setCards((p) => p.map((c) => (c.id === card.id ? { ...c, card_type: e.target.value } : c)))
                      }
                    >
                      {CARD_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={card.accent_color ?? '#19d3c5'}
                      onChange={(e) =>
                        setCards((p) => p.map((c) => (c.id === card.id ? { ...c, accent_color: e.target.value } : c)))
                      }
                      className="h-10 w-14 rounded-md border border-input cursor-pointer"
                    />
                    <Input
                      value={card.accent_color ?? ''}
                      onChange={(e) =>
                        setCards((p) => p.map((c) => (c.id === card.id ? { ...c, accent_color: e.target.value } : c)))
                      }
                      placeholder="#19d3c5"
                      className="flex-1 font-mono text-sm"
                    />
                    <div className="flex gap-1">
                      {PRESETS.map((p) => (
                        <button
                          key={p.label}
                          onClick={() => applyPreset(card.id, p)}
                          title={p.label}
                          className="h-8 w-8 rounded-md border border-border/50 hover:border-primary/50 transition-colors flex items-center justify-center"
                          style={{ background: p.accent }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Gradient From</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={card.gradient_from ?? '#0d3d3a'}
                        onChange={(e) =>
                          setCards((p) => p.map((c) => (c.id === card.id ? { ...c, gradient_from: e.target.value } : c)))
                        }
                        className="h-10 w-14 rounded-md border border-input cursor-pointer"
                      />
                      <Input
                        value={card.gradient_from ?? ''}
                        onChange={(e) =>
                          setCards((p) => p.map((c) => (c.id === card.id ? { ...c, gradient_from: e.target.value } : c)))
                        }
                        placeholder="#0d3d3a"
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Gradient To</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={card.gradient_to ?? '#10161c'}
                        onChange={(e) =>
                          setCards((p) => p.map((c) => (c.id === card.id ? { ...c, gradient_to: e.target.value } : c)))
                        }
                        className="h-10 w-14 rounded-md border border-input cursor-pointer"
                      />
                      <Input
                        value={card.gradient_to ?? ''}
                        onChange={(e) =>
                          setCards((p) => p.map((c) => (c.id === card.id ? { ...c, gradient_to: e.target.value } : c)))
                        }
                        placeholder="#10161c"
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={card.display_order}
                      onChange={(e) =>
                        setCards((p) =>
                          p.map((c) =>
                            c.id === card.id ? { ...c, display_order: parseInt(e.target.value) || 1 } : c,
                          ),
                        )
                      }
                      className="w-20 text-sm"
                    />
                    <span className="text-xs text-muted-foreground">Order</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => save(card)}
                      disabled={savingId === card.id}
                    >
                      {savingId === card.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(card.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-xl">
          <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No product preview cards yet.</p>
          <Button onClick={add} className="mt-3">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Card
          </Button>
        </div>
      )}
    </div>
  )
}
