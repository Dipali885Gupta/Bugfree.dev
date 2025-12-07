export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          logo_text: string
          company_name: string
          company_description: string | null
          primary_email: string | null
          phone_numbers: string[] | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          logo_text?: string
          company_name?: string
          company_description?: string | null
          primary_email?: string | null
          phone_numbers?: string[] | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          logo_text?: string
          company_name?: string
          company_description?: string | null
          primary_email?: string | null
          phone_numbers?: string[] | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      nav_items: {
        Row: {
          id: string
          name: string
          href: string
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          href: string
          display_order: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          href?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      hero_section: {
        Row: {
          id: string
          badge_text: string | null
          headline: string
          headline_highlight: string | null
          subheadline: string | null
          cta_text: string
          cta_link: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          badge_text?: string | null
          headline: string
          headline_highlight?: string | null
          subheadline?: string | null
          cta_text?: string
          cta_link?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          badge_text?: string | null
          headline?: string
          headline_highlight?: string | null
          subheadline?: string | null
          cta_text?: string
          cta_link?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      about_section: {
        Row: {
          id: string
          section_title: string
          section_description: string | null
          secondary_title: string | null
          secondary_description: string | null
          image_url: string | null
          benefits: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_title: string
          section_description?: string | null
          secondary_title?: string | null
          secondary_description?: string | null
          image_url?: string | null
          benefits?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_title?: string
          section_description?: string | null
          secondary_title?: string | null
          secondary_description?: string | null
          image_url?: string | null
          benefits?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      feature_cards: {
        Row: {
          id: string
          icon_name: string
          title: string
          description: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          icon_name: string
          title: string
          description?: string | null
          display_order: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          icon_name?: string
          title?: string
          description?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          video_url: string | null
          tags: string[] | null
          project_url: string | null
          status: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          video_url?: string | null
          tags?: string[] | null
          project_url?: string | null
          status?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          video_url?: string | null
          tags?: string[] | null
          project_url?: string | null
          status?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          id: string
          icon_name: string
          title: string
          description: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          icon_name: string
          title: string
          description?: string | null
          display_order: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          icon_name?: string
          title?: string
          description?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      contact_section: {
        Row: {
          id: string
          section_title: string
          section_description: string | null
          form_title: string | null
          contact_description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_title: string
          section_description?: string | null
          form_title?: string | null
          contact_description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_title?: string
          section_description?: string | null
          form_title?: string | null
          contact_description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          id: string
          question: string
          answer: string
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          display_order: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      budget_options: {
        Row: {
          id: string
          value: string
          label: string
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          value: string
          label: string
          display_order: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          value?: string
          label?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          id: string
          category: string
          name: string
          href: string
          icon_name: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          name: string
          href: string
          icon_name?: string | null
          display_order: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          name?: string
          href?: string
          icon_name?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          project_brief: string | null
          budget: string | null
          prototype_url: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          project_brief?: string | null
          budget?: string | null
          prototype_url?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          project_brief?: string | null
          budget?: string | null
          prototype_url?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_title: string | null
          client_company: string | null
          client_image_url: string | null
          testimonial_text: string
          rating: number
          linkedin_url: string | null
          twitter_url: string | null
          website_url: string | null
          display_order: number
          is_active: boolean
          is_featured: boolean
          submitted_via_form: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_title?: string | null
          client_company?: string | null
          client_image_url?: string | null
          testimonial_text: string
          rating?: number
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          display_order?: number
          is_active?: boolean
          is_featured?: boolean
          submitted_via_form?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_title?: string | null
          client_company?: string | null
          client_image_url?: string | null
          testimonial_text?: string
          rating?: number
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          display_order?: number
          is_active?: boolean
          is_featured?: boolean
          submitted_via_form?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier use
export type SiteSettings = Database['public']['Tables']['site_settings']['Row']
export type NavItem = Database['public']['Tables']['nav_items']['Row']
export type HeroSection = Database['public']['Tables']['hero_section']['Row']
export type AboutSection = Database['public']['Tables']['about_section']['Row']
export type FeatureCard = Database['public']['Tables']['feature_cards']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type ProcessStep = Database['public']['Tables']['process_steps']['Row']
export type ContactSection = Database['public']['Tables']['contact_section']['Row']
export type FaqItem = Database['public']['Tables']['faq_items']['Row']
export type BudgetOption = Database['public']['Tables']['budget_options']['Row']
export type FooterLink = Database['public']['Tables']['footer_links']['Row']
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type AdminProfile = Database['public']['Tables']['admin_profiles']['Row']
