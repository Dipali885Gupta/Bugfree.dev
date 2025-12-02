'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Star, 
  Send, 
  CheckCircle, 
  Linkedin, 
  Twitter, 
  Globe,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function ReviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    client_name: '',
    client_title: '',
    client_company: '',
    client_image_url: '',
    testimonial_text: '',
    linkedin_url: '',
    twitter_url: '',
    website_url: '',
  })
  
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.client_name || !formData.testimonial_text) {
      alert('Please fill in your name and review')
      return
    }

    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          client_name: formData.client_name,
          client_title: formData.client_title || null,
          client_company: formData.client_company || null,
          client_image_url: formData.client_image_url || null,
          testimonial_text: formData.testimonial_text,
          rating: rating,
          linkedin_url: formData.linkedin_url || null,
          twitter_url: formData.twitter_url || null,
          website_url: formData.website_url || null,
          is_active: false, // Requires admin approval
          submitted_via_form: true,
          display_order: 999, // Will be sorted by admin
        })

      if (error) throw error
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return (
      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= (hoveredRating || rating)
          
          return (
            <button
              key={index}
              type="button"
              onMouseEnter={() => setHoveredRating(starValue)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(starValue)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                } transition-colors`}
              />
            </button>
          )
        })}
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
          <p className="text-gray-400 mb-6">
            Your review has been submitted successfully. It will be visible on our website once approved by our team.
          </p>
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Share Your <span className="text-gradient">Experience</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We&apos;d love to hear about your experience working with us. Your feedback helps us improve and helps others make informed decisions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="glass-card p-8 space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-lg font-medium mb-4">How would you rate your experience?</label>
              <div className="flex items-center gap-4">
                {renderStars()}
                <span className="text-gray-400">
                  {rating === 5 && 'Excellent!'}
                  {rating === 4 && 'Great!'}
                  {rating === 3 && 'Good'}
                  {rating === 2 && 'Fair'}
                  {rating === 1 && 'Poor'}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Review *</label>
              <Textarea
                value={formData.testimonial_text}
                onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                placeholder="Tell us about your experience working with us. What did you like? What could be improved?"
                rows={5}
                required
                className="resize-none"
              />
            </div>

            <hr className="border-gray-700" />

            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-medium mb-4">About You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input
                    value={formData.client_title}
                    onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
                    placeholder="CEO, Product Manager, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    value={formData.client_company}
                    onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Photo URL</label>
                  <Input
                    value={formData.client_image_url}
                    onChange={(e) => setFormData({ ...formData, client_image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-medium mb-4">Social Links (Optional)</h3>
              <p className="text-sm text-gray-400 mb-4">
                Adding your social profiles helps verify your testimonial and allows others to connect with you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                  </label>
                  <Input
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-sky-400" /> Twitter
                  </label>
                  <Input
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-400" /> Website
                  </label>
                  <Input
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full gap-2"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                By submitting this review, you agree to allow us to display your testimonial on our website.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
