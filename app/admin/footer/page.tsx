'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Save, Eye, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { FooterLink, NavItem } from '@/lib/supabase/types'

const LINK_CATEGORIES = ['quick_links', 'services', 'legal', 'social']

const SOCIAL_ICONS = ['Twitter', 'Github', 'Linkedin', 'Facebook', 'Instagram', 'Youtube']

export default function FooterPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'nav' | 'quick_links' | 'services' | 'legal' | 'social'>('nav')
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    
    const [navResult, linksResult] = await Promise.all([
      supabase.from('nav_items').select('*').order('display_order'),
      supabase.from('footer_links').select('*').order('display_order'),
    ])

    setNavItems(navResult.data || [])
    setFooterLinks(linksResult.data || [])
    setIsLoading(false)
  }

  // Navigation Items
  const handleAddNavItem = async () => {
    const { data, error } = await supabase
      .from('nav_items')
      .insert({
        name: 'New Link',
        href: '#',
        display_order: navItems.length + 1,
      })
      .select()
      .single()

    if (error) {
      toast.error('Failed to add nav item')
      return
    }

    if (data) {
      setNavItems([...navItems, data])
      toast.success('Nav item added')
    }
  }

  const handleUpdateNavItem = async (id: string, updates: Partial<NavItem>) => {
    const { error } = await supabase
      .from('nav_items')
      .update(updates)
      .eq('id', id)

    if (error) {
      toast.error('Failed to update nav item')
      return
    }

    setNavItems(navItems.map(n => n.id === id ? { ...n, ...updates } : n))
  }

  const handleDeleteNavItem = async (id: string) => {
    const { error } = await supabase
      .from('nav_items')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete nav item')
      return
    }

    setNavItems(navItems.filter(n => n.id !== id))
    toast.success('Nav item deleted')
  }

  // Footer Links
  const handleAddFooterLink = async (category: string) => {
    const categoryLinks = footerLinks.filter(l => l.category === category)
    
    const { data, error } = await supabase
      .from('footer_links')
      .insert({
        category,
        name: 'New Link',
        href: '#',
        display_order: categoryLinks.length + 1,
      })
      .select()
      .single()

    if (error) {
      toast.error('Failed to add footer link')
      return
    }

    if (data) {
      setFooterLinks([...footerLinks, data])
      toast.success('Footer link added')
    }
  }

  const handleUpdateFooterLink = async (id: string, updates: Partial<FooterLink>) => {
    const { error } = await supabase
      .from('footer_links')
      .update(updates)
      .eq('id', id)

    if (error) {
      toast.error('Failed to update footer link')
      return
    }

    setFooterLinks(footerLinks.map(l => l.id === id ? { ...l, ...updates } : l))
  }

  const handleDeleteFooterLink = async (id: string) => {
    const { error } = await supabase
      .from('footer_links')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete footer link')
      return
    }

    setFooterLinks(footerLinks.filter(l => l.id !== id))
    toast.success('Footer link deleted')
  }

  const getLinksForCategory = (category: string) => {
    return footerLinks.filter(l => l.category === category)
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
          <h1 className="text-3xl font-bold text-foreground">Navigation & Footer</h1>
          <p className="text-muted-foreground mt-1">
            Manage navigation items and footer links
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/" target="_blank">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </a>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {(['nav', 'quick_links', 'services', 'legal', 'social'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'nav' ? 'Navigation' : 
             tab === 'quick_links' ? 'Quick Links' : 
             tab === 'services' ? 'Services' :
             tab === 'legal' ? 'Legal' : 'Social'}
          </button>
        ))}
      </div>

      {/* Navigation Tab */}
      {activeTab === 'nav' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              These links appear in the main navigation bar
            </p>
            <Button onClick={handleAddNavItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Nav Item
            </Button>
          </div>

          {navItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Input
                      value={item.name}
                      onChange={(e) => handleUpdateNavItem(item.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Link (href)</label>
                    <Input
                      value={item.href}
                      onChange={(e) => handleUpdateNavItem(item.id, { href: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteNavItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {navItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
              No navigation items yet.
            </div>
          )}
        </div>
      )}

      {/* Footer Link Categories */}
      {['quick_links', 'services', 'legal', 'social'].includes(activeTab) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {activeTab === 'social' 
                ? 'Social media links in the footer'
                : `Links in the "${activeTab.replace('_', ' ')}" section`}
            </p>
            <Button onClick={() => handleAddFooterLink(activeTab)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>

          {getLinksForCategory(activeTab).map((link) => (
            <div key={link.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className={`flex-1 grid grid-cols-1 ${activeTab === 'social' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Input
                      value={link.name}
                      onChange={(e) => handleUpdateFooterLink(link.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Link (href)</label>
                    <Input
                      value={link.href}
                      onChange={(e) => handleUpdateFooterLink(link.id, { href: e.target.value })}
                    />
                  </div>
                  {activeTab === 'social' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Icon</label>
                      <select
                        value={link.icon_name || ''}
                        onChange={(e) => handleUpdateFooterLink(link.id, { icon_name: e.target.value })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select icon</option>
                        {SOCIAL_ICONS.map((icon) => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteFooterLink(link.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {getLinksForCategory(activeTab).length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
              No links in this category yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
