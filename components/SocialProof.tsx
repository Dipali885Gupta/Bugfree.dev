"use client"

import { DEFAULT_SOCIAL_PROOF } from "@/lib/cms/defaults"
import { getIcon } from "@/lib/cms/icons"

interface SocialProofProps {
  items?: { iconName: string; label: string }[]
}

const SocialProof = ({ items = DEFAULT_SOCIAL_PROOF }: SocialProofProps) => {
  return (
    <section className="py-10 md:py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
          {items.map(({ iconName, label }) => {
            const Icon = getIcon(iconName)
            return (
              <span key={label} className="chip fade-in">
                <Icon className="h-4 w-4 text-[var(--color-primary)]" />
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SocialProof
