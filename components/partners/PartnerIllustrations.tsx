/** Lightweight cartoon-style illustrations for Partner Network (theme teal / blue). */

export function HandshakeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="160" cy="230" rx="110" ry="16" fill="rgba(var(--color-primary-rgb),0.12)" />
      {/* Left figure */}
      <circle cx="95" cy="72" r="28" fill="#19d3c5" />
      <circle cx="88" cy="68" r="4" fill="#081016" />
      <circle cx="104" cy="68" r="4" fill="#081016" />
      <path d="M86 82c4 6 14 6 18 0" stroke="#081016" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M70 110c8-18 42-18 50 0v70H70V110z"
        fill="#19d3c5"
        opacity="0.85"
      />
      {/* Right figure */}
      <circle cx="225" cy="72" r="28" fill="#6f8cff" />
      <circle cx="216" cy="68" r="4" fill="#081016" />
      <circle cx="232" cy="68" r="4" fill="#081016" />
      <path d="M216 82c4 6 14 6 18 0" stroke="#081016" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M200 110c8-18 42-18 50 0v70H200V110z"
        fill="#6f8cff"
        opacity="0.9"
      />
      {/* Handshake arms */}
      <path
        d="M118 145c18 8 36 18 52 18s28-8 42-16"
        stroke="#edf2f7"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M130 148c14 6 28 12 40 12s22-5 34-12"
        stroke="#19d3c5"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Sparkles */}
      <circle cx="160" cy="118" r="5" fill="#19d3c5" />
      <circle cx="148" cy="108" r="3" fill="#6f8cff" />
      <circle cx="174" cy="106" r="3" fill="#6f8cff" />
    </svg>
  )
}

export function RocketIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="162" rx="48" ry="10" fill="rgba(var(--color-primary-rgb),0.12)" />
      <path
        d="M100 28c28 18 40 52 36 92H64c-4-40 8-74 36-92z"
        fill="#19d3c5"
      />
      <circle cx="100" cy="78" r="14" fill="#081016" opacity="0.35" />
      <circle cx="100" cy="78" r="8" fill="#edf2f7" />
      <path d="M64 110l-22 28h22" fill="#6f8cff" />
      <path d="M136 110l22 28h-22" fill="#6f8cff" />
      <path d="M88 130l12 28 12-28" fill="#ffb44c" />
      <circle cx="52" cy="48" r="4" fill="#6f8cff" />
      <circle cx="156" cy="40" r="3" fill="#19d3c5" />
      <circle cx="168" cy="68" r="2.5" fill="#6f8cff" />
    </svg>
  )
}

export function BotWorkflowIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="162" rx="52" ry="10" fill="rgba(111,140,255,0.12)" />
      <rect x="58" y="48" width="84" height="78" rx="22" fill="#6f8cff" />
      <rect x="72" y="68" width="56" height="36" rx="10" fill="#081016" opacity="0.35" />
      <circle cx="88" cy="86" r="6" fill="#19d3c5" />
      <circle cx="112" cy="86" r="6" fill="#19d3c5" />
      <path d="M90 108h20" stroke="#edf2f7" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 34v14" stroke="#19d3c5" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="30" r="6" fill="#19d3c5" />
      <rect x="40" y="78" width="14" height="28" rx="7" fill="#19d3c5" />
      <rect x="146" y="78" width="14" height="28" rx="7" fill="#19d3c5" />
    </svg>
  )
}

export function GlobeDealIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="120" cy="178" rx="70" ry="12" fill="rgba(var(--color-primary-rgb),0.1)" />
      <circle cx="120" cy="96" r="58" fill="#131c24" stroke="#19d3c5" strokeWidth="4" />
      <ellipse cx="120" cy="96" rx="28" ry="56" stroke="#6f8cff" strokeWidth="3" />
      <path d="M64 96h112" stroke="#6f8cff" strokeWidth="3" />
      <path d="M72 70h96M72 122h96" stroke="rgba(237,242,247,0.35)" strokeWidth="2" />
      <circle cx="78" cy="48" r="10" fill="#19d3c5" />
      <circle cx="168" cy="44" r="8" fill="#6f8cff" />
      <circle cx="190" cy="110" r="7" fill="#19d3c5" />
      <path
        d="M78 48c18 8 40 20 70 14"
        stroke="#edf2f7"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  )
}
