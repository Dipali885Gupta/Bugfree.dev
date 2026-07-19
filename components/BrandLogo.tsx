import Image from "next/image"
import Link from "next/link"

interface BrandLogoProps {
  href?: string
  /** "full" = mark + wordmark image; "mark" = icon only */
  variant?: "full" | "mark"
  className?: string
  /** Height in px for the image */
  height?: number
  showTagline?: boolean
  tagline?: string
  name?: string
}

/**
 * GetCodeFree brand mark. Light chip behind logo so navy+cyan mark
 * stays readable on the dark primary theme.
 */
export function BrandLogo({
  href = "/",
  variant = "full",
  className = "",
  height = 36,
  showTagline = false,
  tagline,
  name = "GetCodeFree",
}: BrandLogoProps) {
  const src =
    variant === "mark"
      ? "/brand/getcodefree-mark.png"
      : "/brand/getcodefree-logo.png"
  const width = variant === "mark" ? height : Math.round(height * (719 / 365))

  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-white px-2 py-1 shadow-sm"
        style={{ boxShadow: "0 4px 16px rgba(var(--color-shadow-rgb),0.12)" }}
      >
        <Image
          src={src}
          alt={name}
          width={width}
          height={height}
          className="h-auto w-auto object-contain"
          style={{ height, width: "auto" }}
          priority
        />
      </span>
      {showTagline && tagline ? (
        <span className="hidden flex-col leading-none sm:flex">
          <span className="text-[0.7rem] text-faint">{tagline}</span>
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
