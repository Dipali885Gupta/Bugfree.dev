# GetCodeFree — Design System (design.md)

> Single source of truth for all GetCodeFree surfaces: landing pages, case studies, dashboards, internal tools, and sales pages. Reference this file in every AI build prompt.

---

## 1. Brand Positioning

**Who:** AI-native product engineering studio
**What:** Ships mobile apps, web apps, AI automations
**Speed:** MVPs in ~5 weeks. Automations in ~5 days
**Style:** Founder-led, senior-only, production-minded

**Tone:** Quietly premium · Technically deep · Calm · Direct
**Avoid:** "Leverage", "10x", "next-gen", "transform your business"
**Prefer:** Specific outcomes, timelines, real deliverables, founder-to-founder voice

---

## 2. Color System

### 2.1 Dark Theme (primary)

:root, [data-theme="dark"] {
  --color-bg:              #090D11;
  --color-surface:         #10161C;
  --color-surface-2:       #131C24;
  --color-surface-offset:  #18222B;
  --color-primary:         #19D3C5;
  --color-primary-hover:   #43E1D5;
  --color-primary-active:  #0FA89D;
  --color-primary-glow:    rgba(25, 211, 197, 0.18);
  --color-primary-highlight: rgba(25, 211, 197, 0.14);
  --color-blue:            #6F8CFF;
  --color-blue-glow:       rgba(111, 140, 255, 0.22);
  --color-blue-soft:       rgba(111, 140, 255, 0.14);
  --color-text:            #EDF2F7;
  --color-text-muted:      #A7B0BA;
  --color-text-faint:      #7C8792;
  --color-text-inverse:    #081016;
  --color-border:          rgba(255, 255, 255, 0.10);
  --color-divider:         rgba(255, 255, 255, 0.07);
  --shadow-sm:   0 1px 2px rgba(0,0,0,0.24);
  --shadow-md:   0 18px 40px rgba(0,0,0,0.45);
  --shadow-lg:   0 32px 80px rgba(0,0,0,0.65);
  --shadow-glow: 0 0 40px rgba(25, 211, 197, 0.14);
}

### 2.2 Light Theme

[data-theme="light"] {
  --color-bg:          #F5F6F8;
  --color-surface:     #FFFFFF;
  --color-surface-2:   #EDF0F3;
  --color-primary:     #00C2B3;
  --color-primary-hover: #00A596;
  --color-text:        #111827;
  --color-text-muted:  #4B5563;
  --color-text-faint:  #6B7280;
  --color-border:      rgba(15, 23, 42, 0.12);
  --color-divider:     rgba(15, 23, 42, 0.08);
  --shadow-sm: 0 1px 2px rgba(15,23,42,0.06);
  --shadow-md: 0 14px 30px rgba(15,23,42,0.10);
  --shadow-lg: 0 24px 60px rgba(15,23,42,0.16);
}

### 2.3 Background Treatment

body {
  background:
    radial-gradient(circle at top left,  rgba(25, 211, 197, 0.12), transparent 28%),
    radial-gradient(circle at 80% 10%,   rgba(111, 140, 255, 0.14), transparent 24%),
    var(--color-bg);
}

---

## 3. Typography

### Font Loading

<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800&f[]=satoshi@400,500,700&display=swap" rel="stylesheet"/>

:root {
  --font-display: 'Cabinet Grotesk', sans-serif;
  --font-body:    'Satoshi', sans-serif;
}

### Type Scale

:root {
  --text-xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.8rem  + 0.35vw, 1rem);
  --text-base: clamp(1rem,     0.95rem + 0.25vw, 1.125rem);
  --text-lg:   clamp(1.125rem, 1rem    + 0.75vw, 1.5rem);
  --text-xl:   clamp(1.5rem,   1.2rem  + 1.25vw, 2.25rem);
  --text-2xl:  clamp(2.25rem,  1.4rem  + 2.4vw,  4rem);
  --text-hero: clamp(3.5rem,   1.2rem  + 6vw,    7rem);
}

### Usage Rules

| Element        | Font             | Weight | Letter-spacing | Line-height |
|----------------|------------------|--------|----------------|-------------|
| Hero headline  | Cabinet Grotesk  | 800    | -0.05em        | 0.92        |
| Section h2     | Cabinet Grotesk  | 700    | -0.04em        | 0.97        |
| Card titles    | Cabinet Grotesk  | 700    | -0.02em        | 1.05        |
| Body copy      | Satoshi          | 400    | 0              | 1.65        |
| Eyebrow labels | Satoshi          | 600    | 0.14em         | —           |
| CTA / buttons  | Satoshi          | 700    | 0.01em         | —           |

---

## 4. Spacing System

:root {
  --space-1: 0.25rem;  --space-2: 0.5rem;
  --space-3: 0.75rem;  --space-4: 1rem;
  --space-5: 1.25rem;  --space-6: 1.5rem;
  --space-8: 2rem;     --space-10: 2.5rem;
  --space-12: 3rem;    --space-16: 4rem;
  --space-20: 5rem;    --space-24: 6rem;
}
.section  { padding: clamp(4rem, 8vw, 6rem) 0; }
.container { width: min(calc(100% - 2rem), 1180px); margin: 0 auto; }

---

## 5. Motion System

### Easing Constants

:root {
  --ease-enter:      cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit:       cubic-bezier(0.4, 0, 1, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-base: 180ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

### Scroll-Driven Reveals (CLS-safe — opacity + clip-path only)

.fade-in { opacity: 1; }
@supports (animation-timeline: view()) {
  .fade-in {
    opacity: 0;
    animation: reveal-fade linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 45%;
  }
}
@keyframes reveal-fade { to { opacity: 1; } }

.reveal-up { opacity: 1; }
@supports (animation-timeline: view()) {
  .reveal-up {
    clip-path: inset(100% 0 0 0);
    animation: reveal-clip linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 55%;
  }
}
@keyframes reveal-clip { to { clip-path: inset(0 0 0 0); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

### Card Hover

.interactive-card {
  transition:
    transform    var(--transition-base),
    box-shadow   var(--transition-base),
    border-color var(--transition-base);
}
.interactive-card:hover {
  transform:    translateY(-4px);
  box-shadow:   0 24px 60px rgba(0,0,0,0.5);
  border-color: rgba(25, 211, 197, 0.28);
}
.interactive-card:active { transform: translateY(-1px); }

### Modal Entry (@starting-style)

dialog {
  border-radius: 1.6rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  padding: 0;
}
dialog::backdrop {
  background: rgba(2, 8, 14, 0.76);
  backdrop-filter: blur(12px);
  animation: backdrop-in 240ms ease;
}
dialog[open] {
  opacity: 1; transform: scale(1);
  transition: opacity 0.3s var(--ease-enter), transform 0.3s var(--ease-enter);
}
@starting-style {
  dialog[open] { opacity: 0; transform: scale(0.96); }
}
@keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }

JS — close on backdrop click:
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right ||
        e.clientY < r.top  || e.clientY > r.bottom)
      dialog.close();
  });
});

### Ticker Marquee

.ticker { overflow: hidden; white-space: nowrap; }
.ticker-track {
  display: inline-flex; gap: 2rem;
  animation: marquee 22s linear infinite;
  will-change: transform;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
(Duplicate content once for seamless loop)

---

## 6. Depth & Pseudo-3D System

### Layered Glow Card

.card-3d {
  background:
    radial-gradient(circle at top left, rgba(25,211,197,0.14), transparent 55%),
    linear-gradient(180deg, var(--color-surface), var(--color-surface-2));
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,0.10),
    0 32px 80px rgba(0,0,0,0.65);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5rem;
}

### Animated Gradient Border

@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
.card-glow-border {
  border: 1px solid transparent;
  background-image:
    linear-gradient(var(--color-surface), var(--color-surface-2)),
    linear-gradient(var(--gradient-angle), #19D3C5, #6F8CFF, #19D3C5);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  animation: border-spin 6s linear infinite;
}
@keyframes border-spin { to { --gradient-angle: 360deg; } }

### Motion One Hero Parallax

<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>

const { scroll, animate } = window.Motion;
scroll(animate('.hero-bg-glow', { y: [-30, 30] }), { target: document.querySelector('.hero') });
scroll(animate('.hero-copy',    { y: [0,  -20] }), { target: document.querySelector('.hero') });

### Splitting.js Per-Char Headline

<h1 data-splitting>Ship your MVP in 5 weeks.</h1>

.splitting .char {
  opacity: 0;
  animation: char-reveal 0.5s var(--ease-enter) forwards;
  animation-delay: calc(var(--char-index) * 30ms + 200ms);
}
@keyframes char-reveal { to { opacity: 1; } }

Call Splitting() inside document.fonts.ready.then()

---

## 7. Component Library

### Eyebrow Label
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 0.9rem; border-radius: 999px;
  background: var(--color-primary-highlight);
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  font-size: var(--text-xs); text-transform: uppercase;
  letter-spacing: 0.14em; font-weight: 600;
}

### Base Card
.card {
  border-radius: 1.4rem;
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, var(--color-surface), var(--color-surface-2));
  padding: 1.35rem;
  box-shadow: var(--shadow-sm);
}

### Icon Pill
.icon-pill {
  width: 2.75rem; height: 2.75rem; border-radius: 0.9rem;
  display: grid; place-items: center;
  background: var(--color-primary-highlight);
  color: var(--color-primary);
}

### Status Badge
.badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.42rem 0.72rem; border-radius: 999px;
  border: 1px solid var(--color-border);
  background: rgba(255,255,255,0.03);
  color: var(--color-text-faint);
  font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em;
}

### Buttons
.btn {
  display: inline-flex; align-items: center; gap: 0.6rem;
  min-height: 46px; padding: 0.85rem 1.15rem; border-radius: 999px;
  font-size: var(--text-sm); font-weight: 700;
  font-family: var(--font-body); cursor: pointer;
  transition: background var(--transition-base), color var(--transition-base),
    box-shadow var(--transition-base), transform var(--transition-base);
}
.btn-primary   { background: var(--color-primary); color: var(--color-text-inverse); box-shadow: 0 14px 30px rgba(25,211,197,0.2); }
.btn-primary:hover { background: var(--color-primary-hover); transform: translateY(-1px); }
.btn-secondary { background: var(--color-surface); border: 1px solid var(--color-border); }
.btn-ghost     { background: transparent; border: 1px solid var(--color-border); color: var(--color-text-muted); }

---

## 8. Responsive Grid

.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.15rem; }
.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.15rem; }
@media (max-width: 1080px) { .grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 720px)  { .grid-3, .grid-2 { grid-template-columns: 1fr; } }

---

## 9. Tools CDN Reference

<!-- Fonts -->
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,700&display=swap" rel="stylesheet"/>
<!-- Icons -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<!-- Motion One -->
<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
<!-- GSAP (optional) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<!-- Splitting.js -->
<link  href="https://unpkg.com/splitting/dist/splitting.css" rel="stylesheet"/>
<script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
<!-- Rough Notation (optional) -->
<script src="https://unpkg.com/rough-notation/lib/rough-notation.iife.js"></script>

---
*GetCodeFree — design.md v1.0*
