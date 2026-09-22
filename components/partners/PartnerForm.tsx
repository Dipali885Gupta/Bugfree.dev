"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { SITE } from "@/lib/site"

const NOTIFY_EMAIL = SITE.bookingEmail // getcodefree.tech@gmail.com

const EMPTY = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  linkedinOrWebsite: "",
  workType: "",
  clientTypes: "",
  techOpportunities: "",
  partnershipNote: "",
}

export default function PartnerForm() {
  const [formData, setFormData] = useState(EMPTY)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const buildBrief = () =>
    [
      "[Partner Network Application]",
      `Company: ${formData.company || "—"}`,
      `WhatsApp: ${formData.whatsapp || "—"}`,
      `LinkedIn/Website: ${formData.linkedinOrWebsite || "—"}`,
      `Work type: ${formData.workType || "—"}`,
      `Client types: ${formData.clientTypes || "—"}`,
      `Tech opportunities: ${formData.techOpportunities || "—"}`,
      `Partnership note: ${formData.partnershipNote || "—"}`,
    ].join("\n")

  const saveToDatabase = async (brief: string) => {
    const supabase = createClient()

    const partnerInsert = await supabase.from("partner_submissions").insert({
      name: formData.name,
      company: formData.company || null,
      email: formData.email,
      whatsapp: formData.whatsapp || null,
      linkedin_or_website: formData.linkedinOrWebsite || null,
      work_type: formData.workType || null,
      client_types: formData.clientTypes || null,
      tech_opportunities: formData.techOpportunities || null,
      partnership_note: formData.partnershipNote || null,
    })

    if (!partnerInsert.error) return true

    const contactInsert = await supabase.from("contact_submissions").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.whatsapp || null,
      project_brief: brief,
      budget: "partner-network",
    })

    if (!contactInsert.error) return true

    throw new Error(
      contactInsert.error?.message || partnerInsert.error?.message || "Database save failed"
    )
  }

  const sendEmailNotification = async (brief: string) => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        projectBrief: brief,
        budget: "Partner Network",
      }),
    })
    const payload = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(payload.error || "Failed to send email")
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const brief = buildBrief()
      await saveToDatabase(brief)

      try {
        await sendEmailNotification(brief)
      } catch (emailErr) {
        console.error("Partner email notify failed:", emailErr)
        // DB already saved — still treat as success
      }

      toast.success("Got it — we'll reach out shortly.")
      setFormData(EMPTY)
    } catch (err) {
      console.error("Partner form submit failed:", err)
      toast.error(`Couldn't send. Email us at ${NOTIFY_EMAIL}.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="partner-form">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="bg-white/5"
          aria-label="Name"
        />
        <Input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company / Organisation"
          className="bg-white/5"
          aria-label="Company or organisation"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="bg-white/5"
          aria-label="Email"
        />
        <Input
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp"
          className="bg-white/5"
          aria-label="WhatsApp"
        />
      </div>
      <Input
        name="linkedinOrWebsite"
        value={formData.linkedinOrWebsite}
        onChange={handleChange}
        placeholder="LinkedIn / Website"
        className="bg-white/5"
        aria-label="LinkedIn or website"
      />
      <Textarea
        name="workType"
        value={formData.workType}
        onChange={handleChange}
        placeholder="What type of work do you do? (consulting, agency, IT sales / BDR, etc.)"
        required
        className="h-20 bg-white/5"
        aria-label="What type of work do you do"
      />
      <Textarea
        name="clientTypes"
        value={formData.clientTypes}
        onChange={handleChange}
        placeholder="What type of businesses do you work with? (US / international clients welcome)"
        required
        className="h-20 bg-white/5"
        aria-label="What type of businesses do you work with"
      />
      <Textarea
        name="techOpportunities"
        value={formData.techOpportunities}
        onChange={handleChange}
        placeholder="What technology opportunities do your clients usually need?"
        className="h-20 bg-white/5"
        aria-label="Technology opportunities your clients need"
      />
      <Textarea
        name="partnershipNote"
        value={formData.partnershipNote}
        onChange={handleChange}
        placeholder="Tell us briefly about yourself and the partnership you're looking for."
        required
        className="h-28 bg-white/5"
        aria-label="About yourself and partnership"
      />
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting ? "Sending…" : "Start the Conversation"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-faint">
        Submissions notify {NOTIFY_EMAIL} — same inbox as project enquiries.
      </p>
    </form>
  )
}
