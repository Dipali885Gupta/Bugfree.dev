"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Mail, Check, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"
import { SITE } from "@/lib/site"

const QUALIFIERS = [
  "You have a product idea but need the build team",
  "You have an MVP but need it production-hardened",
  "You want AI automation but don't know where to start",
  "You need it shipped — not just designed",
]

const FAQ_ITEMS = [
  {
    q: "How fast can you actually ship an MVP?",
    a: "Most MVPs go from scope to a deployed, usable product in about 5 weeks. Automations typically ship in 3–7 days per workflow.",
  },
  {
    q: "Who actually writes the code?",
    a: "Senior engineers only — and you talk directly to the person building. No account managers, no junior handoffs.",
  },
  {
    q: "What happens after launch?",
    a: "We deploy with monitoring and load testing, then transition into a Production Upgrade & Support track if the product gains traction.",
  },
]

const BUDGET_OPTIONS = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-40k", label: "$15,000 – $40,000" },
  { value: "40k-plus", label: "$40,000+" },
  { value: "not-sure", label: "Not sure yet" },
]

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectBrief: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string

      if (!serviceId || !templateId || !publicKey) {
        toast.error(`Email isn't configured yet. Reach us directly at ${SITE.email}.`)
        return
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_brief: formData.projectBrief,
        budget: formData.budget || "Not specified",
        to_email: SITE.email,
        message: `New project enquiry:\n\nName: ${formData.name}\nEmail: ${formData.email}\nBudget: ${
          formData.budget || "Not specified"
        }\nBrief: ${formData.projectBrief}`,
      }

      emailjs.init(publicKey)
      await emailjs.send(serviceId, templateId, templateParams)
      toast.success("Message sent. We'll be in touch shortly.")
      setFormData({ name: "", email: "", projectBrief: "", budget: "" })
    } catch {
      toast.error(`Couldn't send. Email us directly at ${SITE.email}.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-x">
        {/* Final CTA panel */}
        <div
          className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] p-8 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(25,211,197,0.14), rgba(111,140,255,0.10) 55%, transparent)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">Let&apos;s build</span>
              <h2 className="section-title mt-4">Tell us what you&apos;re building.</h2>
              <p className="section-sub mt-4 max-w-md">
                Whether it&apos;s a mobile app, a web platform, or an AI automation — book a 30-minute
                call and we&apos;ll scope it together.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Calendar className="h-4 w-4" />
                  Book intro call
                </a>
                <a href={`mailto:${SITE.email}`} className="btn btn-ghost">
                  <Mail className="h-4 w-4" />
                  {SITE.email}
                </a>
              </div>
            </div>

            {/* Qualification box */}
            <div
              className="rounded-[1.5rem] border border-[var(--color-border)] p-6 md:p-7"
              style={{ background: "rgba(2,8,14,0.55)", backdropFilter: "blur(8px)" }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-faint">A good fit if…</p>
              <ul className="mt-4 space-y-3.5">
                {QUALIFIERS.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--color-text)]">
                    <span className="icon-pill h-7 w-7 rounded-lg">
                      <Check className="h-4 w-4" />
                    </span>
                    <span style={{ lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lead form + FAQ */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="card-3d p-6 md:p-8">
            <h3 className="font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
              Or send a quick brief
            </h3>
            <p className="mt-1.5 text-sm text-muted">We reply within 24 hours.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="bg-white/5"
              />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="bg-white/5"
              />
              <Textarea
                name="projectBrief"
                value={formData.projectBrief}
                onChange={handleChange}
                placeholder="What are you building? Paste a doc link if you have one."
                required
                className="h-28 bg-white/5"
              />
              <Select onValueChange={(v) => setFormData((p) => ({ ...p, budget: v }))} value={formData.budget}>
                <SelectTrigger className="bg-white/5">
                  <SelectValue placeholder="Estimated budget (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                {isSubmitting ? "Sending…" : "Send brief"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div id="faq" className="scroll-mt-28">
            <span className="eyebrow">FAQ</span>
            <h3 className="section-title mt-4" style={{ fontSize: "var(--text-xl)" }}>
              Quick answers.
            </h3>
            <div className="mt-6 space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-[var(--color-border)] p-5"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--color-text)]">
                    {item.q}
                    <span className="text-[var(--color-primary)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted" style={{ lineHeight: 1.6 }}>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
