'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Star, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Copy,
  Check,
  Linkedin,
  Twitter,
  Globe,
  Award
} from 'lucide-react'
import { toast } from 'sonner'
import type { Testimonial } from '@/lib/supabase/types'
import Image from 'next/image'

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all')
  const supabase = createClient()

  const reviewUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/review` 
    : '/review'

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order')

    if (error) {
      toast.error('Failed to fetch testimonials')
      console.error(error)
    } else {
      setTestimonials(data || [])
    }
    setIsLoading(false)
  }

  const handleAddTestimonial = () => {
    setEditingTestimonial({
      id: '',
      client_name: '',
      client_title: '',
      client_company: '',
      client_image_url: '',
      testimonial_text: '',
      rating: 5,
      linkedin_url: '',
      twitter_url: '',
      website_url: '',
      display_order: testimonials.length + 1,
      is_active: true,
      is_featured: false,
      submitted_via_form: false,
      created_at: '',
      updated_at: '',
    })
  }

  const handleSaveTestimonial = async () => {
    if (!editingTestimonial) return
    
    if (!editingTestimonial.client_name || !editingTestimonial.testimonial_text) {
      toast.error('Client name and testimonial text are required')
      return
    }

    setIsSaving(true)
    try {
      if (editingTestimonial.id) {
        // Update existing
        const { error } = await supabase
          .from('testimonials')
          .update({
            client_name: editingTestimonial.client_name,
            client_title: editingTestimonial.client_title,
            client_company: editingTestimonial.client_company,
            client_image_url: editingTestimonial.client_image_url,
            testimonial_text: editingTestimonial.testimonial_text,
            rating: editingTestimonial.rating,
            linkedin_url: editingTestimonial.linkedin_url,
            twitter_url: editingTestimonial.twitter_url,
            website_url: editingTestimonial.website_url,
            display_order: editingTestimonial.display_order,
            is_active: editingTestimonial.is_active,
            is_featured: editingTestimonial.is_featured,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingTestimonial.id)

        if (error) throw error
        toast.success('Testimonial updated successfully')
      } else {
        // Create new
        const { data, error } = await supabase
          .from('testimonials')
          .insert({
            client_name: editingTestimonial.client_name,
            client_title: editingTestimonial.client_title,
            client_company: editingTestimonial.client_company,
            client_image_url: editingTestimonial.client_image_url,
            testimonial_text: editingTestimonial.testimonial_text,
            rating: editingTestimonial.rating,
            linkedin_url: editingTestimonial.linkedin_url,
            twitter_url: editingTestimonial.twitter_url,
            website_url: editingTestimonial.website_url,
            display_order: editingTestimonial.display_order,
            is_active: editingTestimonial.is_active,
            is_featured: editingTestimonial.is_featured,
          })
          .select()
          .single()

        if (error) throw error
        toast.success('Testimonial created successfully')
      }
      
      setEditingTestimonial(null)
      fetchTestimonials()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save testimonial')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete testimonial')
      console.error(error)
    } else {
      setTestimonials(testimonials.filter(t => t.id !== id))
      toast.success('Testimonial deleted')
    }
  }

  const handleToggleActive = async (testimonial: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ 
        is_active: !testimonial.is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', testimonial.id)

    if (error) {
      toast.error('Failed to update visibility')
      console.error(error)
    } else {
      setTestimonials(testimonials.map(t => 
        t.id === testimonial.id ? { ...t, is_active: !t.is_active } : t
      ))
      toast.success(testimonial.is_active ? 'Testimonial hidden' : 'Testimonial visible')
    }
  }

  const handleToggleFeatured = async (testimonial: Testimonial) => {
    // If setting as featured, unfeatured all others first
    if (!testimonial.is_featured) {
      await supabase
        .from('testimonials')
        .update({ is_featured: false, updated_at: new Date().toISOString() })
        .neq('id', testimonial.id)
    }

    const { error } = await supabase
      .from('testimonials')
      .update({ 
        is_featured: !testimonial.is_featured,
        updated_at: new Date().toISOString()
      })
      .eq('id', testimonial.id)

    if (error) {
      toast.error('Failed to update featured status')
      console.error(error)
    } else {
      fetchTestimonials()
      toast.success(testimonial.is_featured ? 'Removed from featured' : 'Set as featured')
    }
  }

  const copyReviewLink = () => {
    navigator.clipboard.writeText(reviewUrl)
    setCopied(true)
    toast.success('Review link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'active') return t.is_active
    if (filter === 'pending') return !t.is_active
    return true
  })

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && onChange && onChange(index + 1)}
          />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-gray-400 mt-1">Manage client testimonials and reviews</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a 
            href="/#testimonials" 
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Preview
          </a>
          <Button onClick={handleAddTestimonial} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* Review Link Card */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">Client Review Link</h3>
            <p className="text-sm text-gray-400">Share this link with clients to collect their testimonials</p>
          </div>
          <div className="flex items-center gap-2">
            <code className="px-3 py-2 bg-black/30 rounded-lg text-sm text-gray-300 truncate max-w-[300px]">
              {reviewUrl}
            </code>
            <Button variant="outline" size="icon" onClick={copyReviewLink}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
            <a href="/review" target="_blank">
              <Button variant="outline" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({testimonials.length})
        </Button>
        <Button 
          variant={filter === 'active' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active ({testimonials.filter(t => t.is_active).length})
        </Button>
        <Button 
          variant={filter === 'pending' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending ({testimonials.filter(t => !t.is_active).length})
        </Button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`glass-card p-4 ${!testimonial.is_active ? 'opacity-60' : ''} ${testimonial.is_featured ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                  {testimonial.client_image_url ? (
                    <Image
                      src={testimonial.client_image_url}
                      alt={testimonial.client_name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {testimonial.client_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{testimonial.client_name}</h3>
                  <p className="text-sm text-gray-400">
                    {testimonial.client_title}
                    {testimonial.client_company && ` at ${testimonial.client_company}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {testimonial.is_featured && (
                  <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">Featured</span>
                )}
                {testimonial.submitted_via_form && (
                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">Client Submitted</span>
                )}
              </div>
            </div>

            <div className="mb-3">
              {renderStars(testimonial.rating)}
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              &ldquo;{testimonial.testimonial_text}&rdquo;
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 mb-4">
              {testimonial.linkedin_url && (
                <a href={testimonial.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {testimonial.twitter_url && (
                <a href={testimonial.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {testimonial.website_url && (
                <a href={testimonial.website_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleActive(testimonial)}
                className="gap-1"
              >
                {testimonial.is_active ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleFeatured(testimonial)}
                className="gap-1"
              >
                <Award className={`w-4 h-4 ${testimonial.is_featured ? 'text-primary' : ''}`} />
                {testimonial.is_featured ? 'Unfeatured' : 'Feature'}
              </Button>
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingTestimonial(testimonial)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTestimonial(testimonial.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No testimonials found.</p>
          <Button onClick={handleAddTestimonial} className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add Your First Testimonial
          </Button>
        </div>
      )}

      {/* Edit Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingTestimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setEditingTestimonial(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              {/* Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name *</label>
                  <Input
                    value={editingTestimonial.client_name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input
                    value={editingTestimonial.client_title || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_title: e.target.value })}
                    placeholder="CEO"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    value={editingTestimonial.client_company || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_company: e.target.value })}
                    placeholder="Company Inc"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <Input
                    value={editingTestimonial.client_image_url || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, client_image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                {renderStars(editingTestimonial.rating, true, (rating) => 
                  setEditingTestimonial({ ...editingTestimonial, rating })
                )}
              </div>

              {/* Testimonial Text */}
              <div>
                <label className="block text-sm font-medium mb-2">Testimonial Text *</label>
                <Textarea
                  value={editingTestimonial.testimonial_text}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, testimonial_text: e.target.value })}
                  placeholder="Write the testimonial here..."
                  rows={4}
                />
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="font-medium">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </label>
                    <Input
                      value={editingTestimonial.linkedin_url || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Twitter className="w-4 h-4" /> Twitter
                    </label>
                    <Input
                      value={editingTestimonial.twitter_url || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, twitter_url: e.target.value })}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Website
                    </label>
                    <Input
                      value={editingTestimonial.website_url || ''}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, website_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Display Order</label>
                  <Input
                    type="number"
                    value={editingTestimonial.display_order}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTestimonial.is_active}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, is_active: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Visible on site</span>
                  </label>
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTestimonial.is_featured}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Featured testimonial</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTestimonial} disabled={isSaving} className="gap-2">
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Testimonial'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
