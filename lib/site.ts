// Central site constants for the static marketing page.
// Replace BOOKING_URL with the real Calendly link when available.

export const SITE = {
  name: "GetCodeFree",
  tagline: "AI-native product studio",
  email: "hello@getcodefreetech.com",
  bookingUrl: "https://calendly.com/getcodefree/intro",
  domain: "getcodefreetech.com",
  social: {
    linkedin: "https://www.linkedin.com/company/getcodefree",
    github: "https://github.com/getcodefree",
  },
} as const

export const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "FAQ", href: "#faq" },
] as const
