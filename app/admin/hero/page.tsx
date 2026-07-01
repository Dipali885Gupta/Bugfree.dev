'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { DEFAULT_HERO } from '@/lib/cms/defaults'

type ChipItemAdmin = { iconName: string; label: string }
type PanelCardAdmin = { title: string; body: string; featured: boolean }

type HeroAdminData = {
  id: string
  badge_text: string
  headline: string
  headline_highlight: string | null
  headline_line2: string | null
  headline_accent1: string | null
  headline_accent2: string | null
  subheadline: string | null
  cta_text: string
  cta_link: string
  secondary_cta_text: string | null
  secondary_cta_link: string | null
  panel_label: string | null
  panel_badge: string | null
  meta_chips: ChipItemAdmin[] | null
  panel_cards: PanelCardAdmin[] | null
  ticker_items: string[] | null
  is_active: boolean
  created_at: string
  updated_at: string
}

const ICON_OPTIONS = [
  'Smartphone', 'Monitor', 'Bot', 'ShieldCheck', 'Rocket', 'Code', 'Brain',
  'Layers', 'Cpu', 'Gauge', 'Clock', 'Users', 'Award', 'Target', 'Zap',
]

export default function HeroSectionPage() {
  const [data, setData] = useState<HeroAdminData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    void fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: heroData, error } = await (supabase
      .from('hero_section') as any)
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      toast.error('Failed to fetch hero section data')
    }

    const defaults: HeroAdminData = {
      id: '',
      badge_text: DEFAULT_HERO.badge,
      headline: DEFAULT_HERO.headline,
      headline_highlight: DEFAULT_HERO.headlineAccent1,
      headline_line2: DEFAULT_HERO.headlineLine2,
      headline_accent1: DEFAULT_HERO.headlineAccent1,
      headline_accent2: DEFAULT_HERO.headlineAccent2,
      subheadline: DEFAULT_HERO.subheadline,
      cta_text: DEFAULT_HERO.ctaPrimary.text,
      cta_link: DEFAULT_HERO.ctaPrimary.href,
      secondary_cta_text: DEFAULT_HERO.ctaSecondary.text,
      secondary_cta_link: DEFAULT_HERO.ctaSecondary.href,
      panel_label: DEFAULT_HERO.panelLabel,
      panel_badge: DEFAULT_HERO.panelBadge,
      meta_chips: DEFAULT_HERO.metaChips,
      panel_cards: DEFAULT_HERO.panelCards,
      ticker_items: DEFAULT_HERO.tickerItems,
      is_active: true,
      created_at: '',
      updated_at: '',
    }

    if (heroData) {
      setData({
        ...defaults,
        id: heroData.id || '',
        badge_text: heroData.badge_text ?? defaults.badge_text,
        headline: heroData.headline ?? defaults.headline,
        headline_highlight: heroData.headline_highlight ?? defaults.headline_highlight,
        headline_line2: heroData.headline_line2 ?? defaults.headline_line2,
        headline_accent1: heroData.headline_accent1 ?? defaults.headline_accent1,
        headline_accent2: heroData.headline_accent2 ?? defaults.headline_accent2,
        subheadline: heroData.subheadline ?? defaults.subheadline,
        cta_text: heroData.cta_text ?? defaults.cta_text,
        cta_link: heroData.cta_link ?? defaults.cta_link,
        secondary_cta_text: heroData.secondary_cta_text ?? defaults.secondary_cta_text,
        secondary_cta_link: heroData.secondary_cta_link ?? defaults.secondary_cta_link,
        panel_label: heroData.panel_label ?? defaults.panel_label,
        panel_badge: heroData.panel_badge ?? defaults.panel_badge,
        meta_chips: heroData.meta_chips ?? defaults.meta_chips,
        panel_cards: heroData.panel_cards ?? defaults.panel_cards,
        ticker_items: heroData.ticker_items ?? defaults.ticker_items,
        is_active: heroData.is_active ?? true,
        created_at: heroData.created_at ?? '',
        updated_at: heroData.updated_at ?? '',
      })
    } else {
      setData(defaults)
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!data) return
    setIsSaving(true)

    const payload = {
      badge_text: data.badge_text,
      headline: data.headline,
      headline_highlight: data.headline_accent1,
      headline_line2: data.headline_line2,
      headline_accent1: data.headline_accent1,
      headline_accent2: data.headline_accent2,
      subheadline: data.subheadline,
      cta_text: data.cta_text,
      cta_link: data.cta_link,
      secondary_cta_text: data.secondary_cta_text,
      secondary_cta_link: data.secondary_cta_link,
      panel_label: data.panel_label,
      panel_badge: data.panel_badge,
      meta_chips: data.meta_chips,
      panel_cards: data.panel_cards,
      ticker_items: data.ticker_items,
      updated_at: new Date().toISOString(),
    }

    try {
      if (data.id) {
        const { error } = await (supabase
          .from('hero_section') as any)
          .update(payload)
          .eq('id', data.id)
        if (error) throw error
      } else {
        const { data: newData, error } = await (supabase
          .from('hero_section') as any)
          .insert(payload)
          .select()
          .single()
        if (error) throw error
        if (newData) setData((prev) => prev ? { ...prev, id: newData.id } : prev)
      }
      toast.success('Hero section saved successfully')
    } catch (error) {
      toast.error('Failed to save hero section')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const updateChip = (index: number, field: keyof ChipItemAdmin, value: string) => {
    if (!data) return
    const chips = [...(data.meta_chips || [])]
    chips[index] = { ...chips[index], [field]: value }
    setData({ ...data, meta_chips: chips })
  }

  const addChip = () => {
    if (!data) return
    setData({
      ...data,
      meta_chips: [...(data.meta_chips || []), { iconName: 'Rocket', label: 'New chip' }],
    })
  }

  const removeChip = (index: number) => {
    if (!data) return
    const chips = (data.meta_chips || []).filter((_, i) => i !== index)
    setData({ ...data, meta_chips: chips })
  }

  const updatePanelCard = (index: number, field: keyof PanelCardAdmin, value: string | boolean) => {
    if (!data) return
    const cards = [...(data.panel_cards || [])]
    cards[index] = { ...cards[index], [field]: value }
    setData({ ...data, panel_cards: cards })
  }

  const addPanelCard = () => {
    if (!data) return
    setData({
      ...data,
      panel_cards: [
        ...(data.panel_cards || []),
        { title: 'New Card', body: 'Card description', featured: false },
      ],
    })
  }

  const removePanelCard = (index: number) => {
    if (!data) return
    const cards = (data.panel_cards || []).filter((_, i) => i !== index)
    setData({ ...data, panel_cards: cards })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-1">
            Manage the hero section — headline, CTAs, panel, chips, and ticker
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

      {/* Badge & Headline */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold">Badge &amp; Headline</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Badge Text</label>
          <Input
            value={data.badge_text}
            onChange={(e) => setData({ ...data, badge_text: e.target.value })}
            placeholder="For founders who ship — not just plan"
          />
          <p className="text-xs text-muted-foreground">The small text above the headline with sparkle icon</p>
        </div>

        {/* Line 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Headline Line 1 (before highlight)</label>
            <Input
              value={data.headline}
              onChange={(e) => setData({ ...data, headline: e.target.value })}
              placeholder="Ship your MVP in"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Line 1 Highlighted Word</label>
            <Input
              value={data.headline_accent1 || ''}
              onChange={(e) => setData({ ...data, headline_accent1: e.target.value })}
              placeholder="3 weeks."
            />
          </div>
        </div>

        {/* Line 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Headline Line 2 (before highlight)</label>
            <Input
              value={data.headline_line2 || ''}
              onChange={(e) => setData({ ...data, headline_line2: e.target.value })}
              placeholder="Automate your ops in"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Line 2 Highlighted Word</label>
            <Input
              value={data.headline_accent2 || ''}
              onChange={(e) => setData({ ...data, headline_accent2: e.target.value })}
              placeholder="5 days."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Subheadline</label>
          <Textarea
            value={data.subheadline || ''}
            onChange={(e) => setData({ ...data, subheadline: e.target.value })}
            rows={3}
            placeholder="GetCodeFree builds mobile apps..."
          />
        </div>
      </div>

      {/* CTAs */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold">Call-to-Action Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Primary CTA Text</label>
            <Input
              value={data.cta_text}
              onChange={(e) => setData({ ...data, cta_text: e.target.value })}
              placeholder="Start a project"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Primary CTA Link</label>
            <Input
              value={data.cta_link}
              onChange={(e) => setData({ ...data, cta_link: e.target.value })}
              placeholder="#contact"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Secondary CTA Text</label>
            <Input
              value={data.secondary_cta_text || ''}
              onChange={(e) => setData({ ...data, secondary_cta_text: e.target.value })}
              placeholder="See shipped work"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Secondary CTA Link</label>
            <Input
              value={data.secondary_cta_link || ''}
              onChange={(e) => setData({ ...data, secondary_cta_link: e.target.value })}
              placeholder="#projects"
            />
          </div>
        </div>
      </div>

      {/* Meta Chips */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Meta Chips</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Small pills shown below CTA buttons</p>
          </div>
          <Button size="sm" variant="outline" onClick={addChip}>
            <Plus className="w-4 h-4 mr-1" /> Add Chip
          </Button>
        </div>
        <div className="space-y-3">
          {(data.meta_chips || []).map((chip, i) => (
            <div key={i} className="flex items-center gap-3">
              <select
                className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm w-40"
                value={chip.iconName}
                onChange={(e) => updateChip(i, 'iconName', e.target.value)}
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <Input
                className="flex-1"
                value={chip.label}
                onChange={(e) => updateChip(i, 'label', e.target.value)}
                placeholder="Label"
              />
              <Button size="icon" variant="ghost" onClick={() => removeChip(i)} className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {(!data.meta_chips || data.meta_chips.length === 0) && (
            <p className="text-sm text-muted-foreground">No chips yet. Click &quot;Add Chip&quot; to create one.</p>
          )}
        </div>
      </div>

      {/* Glass Panel */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold">Glass Panel (Right Side)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Panel Label</label>
            <Input
              value={data.panel_label || ''}
              onChange={(e) => setData({ ...data, panel_label: e.target.value })}
              placeholder="What we ship"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Panel Badge</label>
            <Input
              value={data.panel_badge || ''}
              onChange={(e) => setData({ ...data, panel_badge: e.target.value })}
              placeholder="6 offers"
            />
          </div>
        </div>

        {/* Panel Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Panel Cards</label>
            <Button size="sm" variant="outline" onClick={addPanelCard}>
              <Plus className="w-4 h-4 mr-1" /> Add Card
            </Button>
          </div>
          {(data.panel_cards || []).map((card, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Card {i + 1}</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={card.featured}
                      onChange={(e) => updatePanelCard(i, 'featured', e.target.checked)}
                      className="rounded"
                    />
                    Featured
                  </label>
                  <Button size="icon" variant="ghost" onClick={() => removePanelCard(i)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={card.title}
                  onChange={(e) => updatePanelCard(i, 'title', e.target.value)}
                  placeholder="Card title"
                />
                <Input
                  value={card.body}
                  onChange={(e) => updatePanelCard(i, 'body', e.target.value)}
                  placeholder="Card description"
                />
              </div>
            </div>
          ))}
          {(!data.panel_cards || data.panel_cards.length === 0) && (
            <p className="text-sm text-muted-foreground">No cards yet. Click &quot;Add Card&quot; to create one.</p>
          )}
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Ticker (Bottom Bar)</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            One item per line. Shown in the animated ticker at the bottom of hero section.
          </p>
        </div>
        <Textarea
          value={(data.ticker_items || []).join('\n')}
          onChange={(e) =>
            setData({
              ...data,
              ticker_items: e.target.value.split('\n').filter(Boolean),
            })
          }
          rows={7}
          placeholder={"React Native builds\nNext.js product teams\nLangChain workflows"}
        />
      </div>
    </div>
  )
}
