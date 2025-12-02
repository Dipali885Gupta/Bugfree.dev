'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, Eye, Mail, Phone, Calendar, ExternalLink, Check, Clock, Archive } from 'lucide-react'
import { toast } from 'sonner'
import type { ContactSubmission } from '@/lib/supabase/types'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', icon: Clock, color: 'text-blue-500 bg-blue-500/10' },
  { value: 'read', label: 'Read', icon: Eye, color: 'text-yellow-500 bg-yellow-500/10' },
  { value: 'responded', label: 'Responded', icon: Check, color: 'text-green-500 bg-green-500/10' },
  { value: 'archived', label: 'Archived', icon: Archive, color: 'text-gray-500 bg-gray-500/10' },
]

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const supabase = createClient()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch submissions')
    }

    setSubmissions(data || [])
    setIsLoading(false)
  }

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update status')
      return
    }

    setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s))
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status })
    }
    toast.success('Status updated')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete submission')
      return
    }

    setSubmissions(submissions.filter(s => s.id !== id))
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(null)
    }
    toast.success('Submission deleted')
  }

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === filterStatus)

  const getStatusInfo = (status: string) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0]
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
          <h1 className="text-3xl font-bold text-foreground">Contact Submissions</h1>
          <p className="text-muted-foreground mt-1">
            View and manage contact form submissions ({submissions.length} total)
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('all')}
        >
          All ({submissions.length})
        </Button>
        {STATUS_OPTIONS.map((status) => {
          const count = submissions.filter(s => s.status === status.value).length
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredSubmissions.map((submission) => {
            const statusInfo = getStatusInfo(submission.status)
            const StatusIcon = statusInfo.icon
            return (
              <div
                key={submission.id}
                onClick={() => setSelectedSubmission(submission)}
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-colors ${
                  selectedSubmission?.id === submission.id
                    ? 'border-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{submission.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{submission.email}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${statusInfo.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.label}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {submission.project_brief}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(submission.created_at).toLocaleDateString()}
                </p>
              </div>
            )
          })}

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
              No submissions found
            </div>
          )}
        </div>

        {/* Submission Detail */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{selectedSubmission.name}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedSubmission.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value)}
                    className="h-9 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(selectedSubmission.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${selectedSubmission.email}`} className="text-foreground hover:text-primary">
                      {selectedSubmission.email}
                    </a>
                  </div>
                </div>

                {selectedSubmission.phone && (
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${selectedSubmission.phone}`} className="text-foreground hover:text-primary">
                        {selectedSubmission.phone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedSubmission.budget && (
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Budget</label>
                    <p className="text-foreground">{selectedSubmission.budget}</p>
                  </div>
                )}

                {selectedSubmission.prototype_url && (
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Prototype URL</label>
                    <a
                      href={selectedSubmission.prototype_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Prototype
                    </a>
                  </div>
                )}
              </div>

              {selectedSubmission.project_brief && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Project Brief</label>
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-foreground whitespace-pre-wrap">{selectedSubmission.project_brief}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button asChild>
                  <a href={`mailto:${selectedSubmission.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </a>
                </Button>
                {selectedSubmission.phone && (
                  <Button variant="outline" asChild>
                    <a href={`tel:${selectedSubmission.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
