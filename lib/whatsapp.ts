import { SITE } from "@/lib/site"

/** Digits-only international number for wa.me (default: India +91 7077404655). */
export function getWhatsAppNotifyNumber(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "")
  return fromEnv || SITE.whatsappNotifyNumber
}

export function buildWhatsAppUrl(text: string): string {
  const phone = getWhatsAppNotifyNumber()
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

/** Opens WhatsApp with a prefilled message (client taps Send). Same pattern as EcomAI. */
export function openWhatsAppNotify(text: string): void {
  if (typeof window === "undefined") return
  window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer")
}
