"use client"

import { Star, Linkedin, Twitter, Globe, Quote, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Testimonial } from '@/lib/supabase/types'

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
}

const TestimonialsSection = ({ testimonials: dbTestimonials }: TestimonialsSectionProps) => {
  const testimonials = dbTestimonials || []
  const featuredTestimonial = testimonials.find(t => t.is_featured)
  const otherTestimonials = testimonials.filter(t => !t.is_featured)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
        }`}
      />
    ))
  }

  const renderSocialLinks = (testimonial: Testimonial) => {
    const links = []
    if (testimonial.linkedin_url) {
      links.push(
        <a
          key="linkedin"
          href={testimonial.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      )
    }
    if (testimonial.twitter_url) {
      links.push(
        <a
          key="twitter"
          href={testimonial.twitter_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
      )
    }
    if (testimonial.website_url) {
      links.push(
        <a
          key="website"
          href={testimonial.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
          aria-label="Website"
        >
          <Globe className="w-4 h-4" />
        </a>
      )
    }
    return links
  }

  return (
    <section id="testimonials" className="section-padding relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
          
          {/* Submit Review Button */}
          <Link 
            href="/review" 
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Share Your Experience
          </Link>
        </div>

        {testimonials.length > 0 ? (
          <>
            {/* Featured Testimonial */}
            {featuredTestimonial && (
              <div className="mb-12 opacity-0 animate-fade-in-up">
                <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                  <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Client Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/30">
                        {featuredTestimonial.client_image_url ? (
                          <Image
                            src={featuredTestimonial.client_image_url}
                            alt={featuredTestimonial.client_name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary">
                              {featuredTestimonial.client_name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-xl md:text-2xl text-gray-200 mb-6 italic">
                        &ldquo;{featuredTestimonial.testimonial_text}&rdquo;
                      </p>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {featuredTestimonial.client_name}
                          </h4>
                          <p className="text-gray-400">
                            {featuredTestimonial.client_title}
                            {featuredTestimonial.client_company && (
                              <> at {featuredTestimonial.client_company}</>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 md:ml-auto">
                          <div className="flex gap-1">
                            {renderStars(featuredTestimonial.rating)}
                          </div>
                          <div className="flex gap-2">
                            {renderSocialLinks(featuredTestimonial)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Testimonials Grid */}
            {otherTestimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`glass-card p-6 relative opacity-0 animate-fade-in-up`}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-gray-300 mb-6 line-clamp-4">
                      &ldquo;{testimonial.testimonial_text}&rdquo;
                    </p>
                    
                    {/* Client Info */}
                    <div className="flex items-center gap-3 mt-auto">
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
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">
                          {testimonial.client_name}
                        </h4>
                        <p className="text-sm text-gray-400 truncate">
                          {testimonial.client_title}
                          {testimonial.client_company && (
                            <>, {testimonial.client_company}</>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {renderSocialLinks(testimonial)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="mb-4">No testimonials available yet.</p>
            <Link 
              href="/review" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Be the first to share your experience
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialsSection
