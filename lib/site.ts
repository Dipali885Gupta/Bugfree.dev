// Central site constants for the static marketing page.

export const SITE = {
  name: "GetCodeFree",
  tagline: "AI-native product studio",
  email: "getcodefree.tech@gmail.com",
  bookingEmail: "getcodefree.tech@gmail.com",
  bookingUrl: "https://cal.com/amitav-panda-c6qrd9/15min",
  domain: "getcodefreetech.com",
  /** Owner WhatsApp for form notify (EcomAI-style wa.me). Override via NEXT_PUBLIC_WHATSAPP_NUMBER. */
  whatsappNotifyNumber: "917077404655",
  social: {
    linkedin: "https://www.linkedin.com/company/getcodefree-tech/?viewAsMember=true",
    twitter: "https://x.com/getcodefre",
    github: "https://github.com/getcodefree",
  },
} as const

export const NAV_LINKS = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/projects" },
  { name: "Partners", href: "/partners" },
  { name: "Process", href: "/#process" },
  { name: "FAQ", href: "/#faq" },
] as const
