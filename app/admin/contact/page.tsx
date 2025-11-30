'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, Eye, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { ContactSection, FaqItem, BudgetOption } from '@/lib/supabase/types'

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactSection | null>(null)
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [budgetOptions, setBudgetOptions] = useState<BudgetOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'faq' | 'budget'>('content')
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    
    const [contactResult, faqResult, budgetResult] = await Promise.all([
      supabase.from('contact_section').select('*').single(),
      supabase.from('faq_items').select('*').order('display_order'),
      supabase.from('budget_options').select('*').order('display_order'),
    ])

    setContactData(contactResult.data || {
      id: '',
      section_title: 'Get In Touch',
      section_description: 'Get in touch with us to discuss your project.',
      form_title: 'Send Us a Message',
      contact_description: 'Ready to transform your idea into reality?',
      is_active: true,
      created_at: '',
      updated_at: '',
    })

    setFaqs(faqResult.data || [])
    setBudgetOptions(budgetResult.data || [])
    setIsLoading(false)
  }

  const handleSaveContact = async () => {
    if (!contactData) return
    setIsSaving(true)

    try {
      if (contactData.id) {
        const { error } = await supabase
          .from('contact_section')
          .update({
            section_title: contactData.section_title,
            section_description: contactData.section_description,
            form_title: contactData.form_title,
            contact_description: contactData.contact_description,
            updated_at: new Date().toISOString(),
          })
          .eq('id', contactData.id)

        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('contact_section')
          .insert({
            section_title: contactData.section_title,
            section_description: contactData.section_description,
            form_title: contactData.form_title,
            contact_description: contactData.contact_description,
          })
          .select()
          .single()

        if (error) throw error
        if (data) setContactData(data)
      }

      toast.success('Contact section saved')
    } catch {
      toast.error('Failed to save contact section')
    } finally {
      setIsSaving(false)
    }
  }

  // FAQ functions
  const handleAddFaq = async () => {
    const { data, error } = await supabase
      .from('faq_items')
      .insert({
        question: 'New Question?',
        answer: 'Answer here...',
        display_order: faqs.length + 1,
      })
      .select()
      .single()

    if (error) {
      toast.error('Failed to add FAQ')
      return
    }

    if (data) {
      setFaqs([...faqs, data])
      toast.success('FAQ added')
    }
  }

  const handleUpdateFaq = async (id: string, updates: Partial<FaqItem>) => {
    const { error } = await supabase
      .from('faq_items')
      .update(updates)
      .eq('id', id)

    if (error) {
      toast.error('Failed to update FAQ')
      return
    }

    setFaqs(faqs.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const handleDeleteFaq = async (id: string) => {
    const { error } = await supabase
      .from('faq_items')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete FAQ')
      return
    }

    setFaqs(faqs.filter(f => f.id !== id))
    toast.success('FAQ deleted')
  }

  // Budget Options functions
  const handleAddBudget = async () => {
    const { data, error } = await supabase
      .from('budget_options')
      .insert({
        value: `budget_${budgetOptions.length + 1}`,
        label: 'New Budget Range',
        display_order: budgetOptions.length + 1,
      })
      .select()
      .single()

    if (error) {
      toast.error('Failed to add budget option')
      return
    }

    if (data) {
      setBudgetOptions([...budgetOptions, data])
      toast.success('Budget option added')
    }
  }

  const handleUpdateBudget = async (id: string, updates: Partial<BudgetOption>) => {
    const { error } = await supabase
      .from('budget_options')
      .update(updates)
      .eq('id', id)

    if (error) {
      toast.error('Failed to update budget option')
      return
    }

    setBudgetOptions(budgetOptions.map(b => b.id === id ? { ...b, ...updates } : b))
  }

  const handleDeleteBudget = async (id: string) => {
    const { error } = await supabase
      .from('budget_options')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete budget option')
      return
    }

    setBudgetOptions(budgetOptions.filter(b => b.id !== id))
    toast.success('Budget option deleted')
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
          <h1 className="text-3xl font-bold text-foreground">Contact Section</h1>
          <p className="text-muted-foreground mt-1">
            Manage contact section, FAQs, and budget options
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/#contact" target="_blank">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </a>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(['content', 'faq', 'budget'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'content' ? 'Content' : tab === 'faq' ? 'FAQ Items' : 'Budget Options'}
          </button>
        ))}
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Section Content</h2>
            <Button onClick={handleSaveContact} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Section Title</label>
              <Input
                value={contactData?.section_title || ''}
                onChange={(e) => setContactData(prev => prev ? { ...prev, section_title: e.target.value } : null)}
                placeholder="Get In Touch"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Form Title</label>
              <Input
                value={contactData?.form_title || ''}
                onChange={(e) => setContactData(prev => prev ? { ...prev, form_title: e.target.value } : null)}
                placeholder="Send Us a Message"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Section Description</label>
            <Textarea
              value={contactData?.section_description || ''}
              onChange={(e) => setContactData(prev => prev ? { ...prev, section_description: e.target.value } : null)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Contact Description</label>
            <Textarea
              value={contactData?.contact_description || ''}
              onChange={(e) => setContactData(prev => prev ? { ...prev, contact_description: e.target.value } : null)}
              rows={3}
            />
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            <Button onClick={handleAddFaq}>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          {faqs.map((faq) => (
            <div key={faq.id} className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Question</label>
                    <Input
                      value={faq.question}
                      onChange={(e) => handleUpdateFaq(faq.id, { question: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Answer</label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(faq.id, { answer: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteFaq(faq.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {faqs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
              No FAQs yet. Click &quot;Add FAQ&quot; to create your first one.
            </div>
          )}
        </div>
      )}

      {/* Budget Options Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            <Button onClick={handleAddBudget}>
              <Plus className="w-4 h-4 mr-2" />
              Add Budget Option
            </Button>
          </div>

          {budgetOptions.map((budget) => (
            <div key={budget.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Value (form field)</label>
                    <Input
                      value={budget.value}
                      onChange={(e) => handleUpdateBudget(budget.id, { value: e.target.value })}
                      placeholder="budget_5k_10k"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Display Label</label>
                    <Input
                      value={budget.label}
                      onChange={(e) => handleUpdateBudget(budget.id, { label: e.target.value })}
                      placeholder="$5,000 - $10,000"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteBudget(budget.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {budgetOptions.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
              No budget options yet. Click &quot;Add Budget Option&quot; to create your first one.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
