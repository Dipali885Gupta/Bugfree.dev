import Image from "next/image"
import Link from "next/link"

interface BrandLogoProps {
  href?: string
  /** "full" = icon mark + text wordmark; "mark" = icon chip only */
  variant?: "full" | "mark"
  className?: string
  /** Icon chip size in px */
  size?: number
  showTagline?: boolean
  tagline?: string
  name?: string
}

/**
 * GetCodeFree brand mark. The navy/cyan icon needs a light backing to stay
 * readable on the dark theme, so we use a compact square chip for the icon
 * only and render the wordmark as theme-colored text — no wide white box.
 */
export function BrandLogo({
  href = "/",
  variant = "full",
  className = "",
  size = 36,
  showTagline = false,
  tagline,
  name = "GetCodeFree",
}: BrandLogoProps) {
  const chip = (
    <span
      className="inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white"
      style={{
        width: size,
        height: size,
        boxShadow: "0 6px 18px rgba(var(--color-shadow-rgb),0.18)",
      }}
    >
      <Image
        src="/brand/getcodefree-mark.png"
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size * 0.82, height: size * 0.82 }}
        priority
      />
    </span>
  )

  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {chip}
      {variant === "full" ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-tight text-[var(--color-text)]">
            {name}
          </span>
          {showTagline && tagline ? (
            <span className="text-[0.7rem] text-faint">{tagline}</span>
          ) : null}
        </span>
      ) : null}
    </span>
  )

  if (!href) return inner
  return (
    <Link href={href} className="inline-flex items-center" aria-label={name}>
      {inner}
    </Link>
  )
}
