'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { DEFAULT_DEVELOPER } from '@/lib/cms/defaults'

type DevProfile = {
  id: string
  name: string
  role: string | null
  location: string | null
  experience: string | null
  tagline: string | null
  avatar_initials: string | null
  avatar_url: string | null
  section_subtitle: string | null
  highlights: { icon_name: string; label: string }[] | null
  approach: string[] | null
}

export default function DeveloperAdminPage() {
  const [profile, setProfile] = useState<DevProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { void load() }, [])

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('developer_profile').select('*').single()
    setProfile(
      (data as DevProfile) ?? {
        id: '',
        name: DEFAULT_DEVELOPER.name,
        role: DEFAULT_DEVELOPER.role,
        location: DEFAULT_DEVELOPER.location,
        experience: DEFAULT_DEVELOPER.experience,
        tagline: DEFAULT_DEVELOPER.tagline,
        avatar_initials: DEFAULT_DEVELOPER.avatarInitials,
        avatar_url: null,
        section_subtitle: null,
        highlights: DEFAULT_DEVELOPER.highlights.map((h) => ({ icon_name: h.iconName, label: h.label })),
        approach: DEFAULT_DEVELOPER.approach,
      }
    )
    setLoading(false)
  }

  const save = async () => {
    if (!profile) return
    const payload = { ...profile, updated_at: new Date().toISOString() }
    const { error } = profile.id
      ? await supabase.from('developer_profile').update(payload).eq('id', profile.id)
      : await supabase.from('developer_profile').insert(payload).select().single().then(({ data, error }) => {
          if (data) setProfile(data as DevProfile)
          return { error }
        })
    if (error) toast.error('Save failed — run cms-landing-v2.sql')
    else toast.success('Profile saved')
  }

  if (loading || !profile) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-bold">Developer Profile</h1>
      {(['name', 'role', 'location', 'experience', 'tagline', 'avatar_initials', 'avatar_url'] as const).map((field) => (
        <div key={field}>
          <label className="text-xs text-faint capitalize">{field.replace('_', ' ')}</label>
          <Input className="mt-1" value={(profile[field] as string) ?? ''} onChange={(e) => setProfile({ ...profile, [field]: e.target.value })} />
        </div>
      ))}
      <div>
        <label className="text-xs text-faint">Highlights JSON</label>
        <Textarea className="mt-1 font-mono text-xs" rows={6} value={JSON.stringify(profile.highlights ?? [], null, 2)} onChange={(e) => { try { setProfile({ ...profile, highlights: JSON.parse(e.target.value) }) } catch {} }} />
      </div>
      <div>
        <label className="text-xs text-faint">Approach (one string per line in JSON array)</label>
        <Textarea className="mt-1 font-mono text-xs" rows={5} value={JSON.stringify(profile.approach ?? [], null, 2)} onChange={(e) => { try { setProfile({ ...profile, approach: JSON.parse(e.target.value) }) } catch {} }} />
      </div>
      <Button onClick={save}><Save className="mr-2 h-4 w-4" />Save profile</Button>
    </div>
  )
}
