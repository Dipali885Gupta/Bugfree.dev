'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus, Edit2, Trash2, Save, X, ExternalLink,
  Linkedin, Globe, Mail, Phone, Calendar,
  ArrowUp, ArrowDown, ChevronDown, Search,
  UserPlus, MessageSquare, AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'
import type { Lead } from '@/lib/supabase/types'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'text-blue-500 bg-blue-500/10' },
  { value: 'contacted', label: 'Contacted', color: 'text-yellow-500 bg-yellow-500/10' },
  { value: 'qualified', label: 'Qualified', color: 'text-purple-500 bg-purple-500/10' },
  { value: 'proposal', label: 'Proposal', color: 'text-orange-500 bg-orange-500/10' },
  { value: 'negotiation', label: 'Negotiation', color: 'text-pink-500 bg-pink-500/10' },
  { value: 'closed_won', label: 'Closed Won', color: 'text-green-500 bg-green-500/10' },
  { value: 'closed_lost', label: 'Closed Lost', color: 'text-gray-500 bg-gray-500/10' },
]

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'text-gray-500 bg-gray-500/10' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500 bg-yellow-500/10' },
  { value: 'high', label: 'High', color: 'text-red-500 bg-red-500/10' },
]

const SOURCE_OPTIONS = [
  'linkedin', 'website', 'cold_email', 'referral', 'twitter', 'direct', 'other'
]

const EMPTY_LEAD: Lead = {
  id: '',
  name: '',
  email: null,
  phone: null,
  company: null,
  source: 'direct',
  source_url: null,
  status: 'new',
  priority: 'medium',
  project_type: null,
  budget: null,
  notes: null,
  last_followup_at: null,
  next_followup_at: null,
  created_at: '',
  updated_at: '',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<string>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const supabase = createClient()

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order(sortField, { ascending: sortDir === 'asc' })

    if (error) {
      if (error.message?.includes('relation') || error.code === '42P01') {
        toast.error('Leads table not found. Run the migration SQL first.')
      } else {
        toast.error('Failed to fetch leads')
      }
      console.error(error)
    } else {
      setLeads(data || [])
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!editingLead) return
    if (!editingLead.name) {
      toast.error('Name is required')
      return
    }

    setIsSaving(true)
    try {
      if (editingLead.id) {
        const { error } = await supabase
          .from('leads')
          .update({
            name: editingLead.name,
            email: editingLead.email,
            phone: editingLead.phone,
            company: editingLead.company,
            source: editingLead.source,
            source_url: editingLead.source_url,
            status: editingLead.status,
            priority: editingLead.priority,
            project_type: editingLead.project_type,
            budget: editingLead.budget,
            notes: editingLead.notes,
            last_followup_at: editingLead.last_followup_at,
            next_followup_at: editingLead.next_followup_at,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingLead.id)

        if (error) throw error
        toast.success('Lead updated')
      } else {
        const { error } = await supabase
          .from('leads')
          .insert({
            name: editingLead.name,
            email: editingLead.email,
            phone: editingLead.phone,
            company: editingLead.company,
            source: editingLead.source,
            source_url: editingLead.source_url,
            status: editingLead.status,
            priority: editingLead.priority,
            project_type: editingLead.project_type,
            budget: editingLead.budget,
            notes: editingLead.notes,
            last_followup_at: editingLead.last_followup_at,
            next_followup_at: editingLead.next_followup_at,
          })

        if (error) throw error
        toast.success('Lead created')
      }

      setEditingLead(null)
      fetchLeads()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save lead')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    const { error } = await supabase.from('leads').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete')
      console.error(error)
    } else {
      setLeads(leads.filter(l => l.id !== id))
      toast.success('Lead deleted')
    }
  }

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const getStatusInfo = (status: string) =>
    STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0]

  const getPriorityInfo = (priority: string) =>
    PRIORITY_OPTIONS.find(p => p.value === priority) || PRIORITY_OPTIONS[1]

  const filteredLeads = leads
    .filter(l => filterStatus === 'all' || l.status === filterStatus)
    .filter(l => {
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return [l.name, l.email, l.company, l.source, l.project_type]
        .some(f => f?.toLowerCase().includes(q))
    })

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-50" />
    return sortDir === 'desc'
      ? <ArrowDown className="w-3 h-3" />
      : <ArrowUp className="w-3 h-3" />
  }

  const formatDate = (d: string | null) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-muted-foreground mt-1">Track prospects from first touch to close</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setEditingLead({ ...EMPTY_LEAD })} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All ({leads.length})
          </Button>
          {STATUS_OPTIONS.map((status) => {
            const count = leads.filter(l => l.status === status.value).length
            if (!count) return null
            return (
              <Button
                key={status.value}
                variant={filterStatus === status.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status.value)}
              >
                {status.label} ({count})
              </Button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground cursor-pointer group" onClick={() => toggleSort('name')}>
                  <span className="flex items-center gap-1">Name <SortIcon field="name" /></span>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Contact</th>
                <th className="text-left p-3 font-medium text-muted-foreground cursor-pointer group hidden lg:table-cell" onClick={() => toggleSort('source')}>
                  <span className="flex items-center gap-1">Source <SortIcon field="source" /></span>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">Priority</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground cursor-pointer group" onClick={() => toggleSort('last_followup_at')}>
                  <span className="flex items-center gap-1">Last Follow-up <SortIcon field="last_followup_at" /></span>
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground cursor-pointer group hidden lg:table-cell" onClick={() => toggleSort('next_followup_at')}>
                  <span className="flex items-center gap-1">Next Follow-up <SortIcon field="next_followup_at" /></span>
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const statusInfo = getStatusInfo(lead.status)
                const priorityInfo = getPriorityInfo(lead.priority)
                return (
                  <tr key={lead.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div>
                        <span className="font-medium text-foreground">{lead.name}</span>
                        {lead.company && (
                          <span className="text-muted-foreground ml-1.5 text-xs">({lead.company})</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">
                      <div className="flex flex-col gap-0.5">
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-primary truncate max-w-[200px]">
                            <Mail className="w-3 h-3 shrink-0" />
                            {lead.email}
                          </a>
                        )}
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 shrink-0" />
                            {lead.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs capitalize px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {lead.source || 'direct'}
                        </span>
                        {lead.source_url && (
                          <a href={lead.source_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            {lead.source_url.includes('linkedin') ? (
                              <Linkedin className="w-3.5 h-3.5" />
                            ) : (
                              <Globe className="w-3.5 h-3.5" />
                            )}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${priorityInfo.color}`}>
                        {priorityInfo.label}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">
                      {formatDate(lead.last_followup_at)}
                    </td>
                    <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell">
                      {lead.next_followup_at ? (
                        <span className={new Date(lead.next_followup_at) < new Date() ? 'text-red-400' : ''}>
                          {formatDate(lead.next_followup_at)}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setEditingLead(lead)} title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)} title="Delete" className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filteredLeads.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {searchQuery ? 'No leads match your search.' : 'No leads yet. Add your first one.'}
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingLead.id ? 'Edit Lead' : 'New Lead'}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setEditingLead(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <Input
                    value={editingLead.name}
                    onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    value={editingLead.company || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
                    placeholder="Acme Inc"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={editingLead.email || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    value={editingLead.phone || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Source</label>
                  <select
                    value={editingLead.source || 'direct'}
                    onChange={(e) => setEditingLead({ ...editingLead, source: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {SOURCE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Source URL</label>
                  <Input
                    value={editingLead.source_url || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, source_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={editingLead.status}
                    onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={editingLead.priority}
                    onChange={(e) => setEditingLead({ ...editingLead, priority: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {PRIORITY_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget</label>
                  <Input
                    value={editingLead.budget || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, budget: e.target.value })}
                    placeholder="$5,000 – $15,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <Input
                  value={editingLead.project_type || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, project_type: e.target.value })}
                  placeholder="E-commerce platform, AI automation, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Last Follow-up Date</label>
                  <Input
                    type="date"
                    value={editingLead.last_followup_at ? editingLead.last_followup_at.slice(0, 10) : ''}
                    onChange={(e) => setEditingLead({
                      ...editingLead,
                      last_followup_at: e.target.value ? new Date(e.target.value).toISOString() : null
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Next Follow-up Date</label>
                  <Input
                    type="date"
                    value={editingLead.next_followup_at ? editingLead.next_followup_at.slice(0, 10) : ''}
                    onChange={(e) => setEditingLead({
                      ...editingLead,
                      next_followup_at: e.target.value ? new Date(e.target.value).toISOString() : null
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <Textarea
                  value={editingLead.notes || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  placeholder="Meeting notes, follow-up details, impressions..."
                  rows={4}
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEditingLead(null)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Lead'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
