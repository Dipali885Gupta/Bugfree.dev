'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { SiteSettings } from '@/lib/supabase/types'

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      toast.error('Failed to fetch settings')
    }

    setSettings(data || {
      id: '',
      logo_text: 'getcodefree.tech',
      company_name: 'BugFree.dev',
      company_description: 'Building and shipping products faster with AI',
      primary_email: 'contact@bugfree.dev',
      phone_numbers: ['+91 7077404655'],
      location: 'FortuneTower, Chandrasekharpur, Bhubaneswar',
      created_at: '',
      updated_at: '',
    })
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!settings) return
    setIsSaving(true)

    try {
      if (settings.id) {
        const { error } = await supabase
          .from('site_settings')
          .update({
            logo_text: settings.logo_text,
            company_name: settings.company_name,
            company_description: settings.company_description,
            primary_email: settings.primary_email,
            phone_numbers: settings.phone_numbers,
            location: settings.location,
            updated_at: new Date().toISOString(),
          })
          .eq('id', settings.id)

        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('site_settings')
          .insert({
            logo_text: settings.logo_text,
            company_name: settings.company_name,
            company_description: settings.company_description,
            primary_email: settings.primary_email,
            phone_numbers: settings.phone_numbers,
            location: settings.location,
          })
          .select()
          .single()

        if (error) throw error
        if (data) setSettings(data)
      }

      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const addPhoneNumber = () => {
    if (!settings) return
    setSettings({
      ...settings,
      phone_numbers: [...(settings.phone_numbers || []), ''],
    })
  }

  const updatePhoneNumber = (index: number, value: string) => {
    if (!settings) return
    const newNumbers = [...(settings.phone_numbers || [])]
    newNumbers[index] = value
    setSettings({ ...settings, phone_numbers: newNumbers })
  }

  const removePhoneNumber = (index: number) => {
    if (!settings) return
    const newNumbers = [...(settings.phone_numbers || [])]
    newNumbers.splice(index, 1)
    setSettings({ ...settings, phone_numbers: newNumbers })
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
          <h1 className="text-3xl font-bold text-foreground">Site Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure global site settings and contact information
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Branding */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Branding</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Logo Text</label>
            <Input
              value={settings?.logo_text || ''}
              onChange={(e) => setSettings(prev => prev ? { ...prev, logo_text: e.target.value } : null)}
              placeholder="getcodefree.tech"
            />
            <p className="text-xs text-muted-foreground">
              Displayed in the navbar
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Company Name</label>
            <Input
              value={settings?.company_name || ''}
              onChange={(e) => setSettings(prev => prev ? { ...prev, company_name: e.target.value } : null)}
              placeholder="BugFree.dev"
            />
            <p className="text-xs text-muted-foreground">
              Displayed in the footer
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Company Description</label>
          <Textarea
            value={settings?.company_description || ''}
            onChange={(e) => setSettings(prev => prev ? { ...prev, company_description: e.target.value } : null)}
            rows={3}
            placeholder="Building and shipping products faster with AI"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Primary Email</label>
          <Input
            type="email"
            value={settings?.primary_email || ''}
            onChange={(e) => setSettings(prev => prev ? { ...prev, primary_email: e.target.value } : null)}
            placeholder="contact@bugfree.dev"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Phone Numbers</label>
            <Button variant="outline" size="sm" onClick={addPhoneNumber}>
              <Plus className="w-4 h-4 mr-1" />
              Add Phone
            </Button>
          </div>
          <div className="space-y-2">
            {settings?.phone_numbers?.map((phone, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={phone}
                  onChange={(e) => updatePhoneNumber(index, e.target.value)}
                  placeholder="+91 1234567890"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePhoneNumber(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {(!settings?.phone_numbers || settings.phone_numbers.length === 0) && (
              <p className="text-sm text-muted-foreground">No phone numbers added</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location / Address</label>
          <Textarea
            value={settings?.location || ''}
            onChange={(e) => setSettings(prev => prev ? { ...prev, location: e.target.value } : null)}
            rows={2}
            placeholder="FortuneTower, Chandrasekharpur, Bhubaneswar"
          />
        </div>
      </div>

      {/* Environment Variables Info */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Environment Variables</h2>
        <p className="text-sm text-muted-foreground">
          Make sure you have the following environment variables configured:
        </p>
        <div className="bg-background rounded-lg p-4 font-mono text-sm">
          <p className="text-muted-foreground"># Supabase</p>
          <p>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key</p>
          <p className="mt-4 text-muted-foreground"># EmailJS (for contact form)</p>
          <p>NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id</p>
          <p>NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id</p>
          <p>NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key</p>
        </div>
      </div>
    </div>
  )
}
