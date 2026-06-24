# GetCodeFree — Landing Page System (README.md)

---

## 1. Project Overview

**Agency:** GetCodeFree | getcodefreetech.com
**Founder:** Amitav Panda — Senior Full-Stack Engineer, Bengaluru
**Positioning:** AI-native product engineering studio. Ships faster than any traditional agency.

### Core Offers

| # | Service                        | Promise                                              | Timeline      |
|---|-------------------------------|------------------------------------------------------|---------------|
| 1 | MVP Launch Sprint              | Ship mobile or web MVP for validation/demos/fundraising | Under 5 weeks |
| 2 | Production Upgrade & Support   | Harden rough MVPs into scale-ready systems           | Ongoing       |
| 3 | AI Workflow Automation         | Lead gen, content, CRM, support copilots, ops        | Within 5 days |

### Target Buyers
- Pre-seed / seed startup founders
- CTOs and product leads at scale-ups
- D2C brands needing mobile presence
- Service businesses wanting AI in their ops

### Brand Voice
Never: generic hype, "leverage AI", "cutting edge transformation"
Always: specific outcomes, timelines, real deliverables, founder-to-founder voice

---

## 2. Page Sections — Full Spec

### 2.1 Navigation
- Left: Logo (teal rounded square) + "GetCodeFree" Cabinet Grotesk + muted tagline "AI-native product studio"
- Center links: Services · Projects · Process · FAQ
- Right: Theme toggle (moon/sun ghost pill) + "Book a strategy call" teal pill CTA
- Behavior: Sticky · backdrop-filter: blur(18px) · shrinks on scroll via JS `.scrolled` class
- Mobile: hamburger → full-height drawer

---

### 2.2 Hero
Layout: 2-col 55/45, stacks on mobile

LEFT COLUMN:
Eyebrow: ✦ For founders who ship — not just plan

Headline (teal accents on numbers):
  Ship your MVP in 5 weeks.
  Automate your ops in 5 days.

Subheadline:
  GetCodeFree builds mobile apps, web platforms, and AI automations
  for startups and growth-stage businesses — with a lean senior team,
  production-grade execution, and founder-level speed.

CTAs:
  Primary (teal pill):   Start a project →
  Secondary (ghost pill): See shipped work ↓

Meta chips: 📱 Mobile apps · 🖥️ Web platforms · 🤖 AI automations · 🛡️ Production support

RIGHT COLUMN (glass panel — pseudo-3D card, inner teal glow top-left):
  Card 1 (teal border highlight):
    MVP Launch Sprint
    Scope, design, build, ship. One focused sprint for products
    that need to get into users' hands fast.

  Card 2:
    Production Upgrade
    Refactor rough MVPs into stable systems — architecture,
    monitoring, CI/CD, and ongoing support.

  Card 3:
    AI Workflow Automation
    Lead gen, content pipelines, CRM sync, and internal copilots
    shipped in days — not months.

TICKER (full-width below hero, infinite CSS marquee, bordered top + bottom):
  React Native builds · Next.js product teams · LangChain workflows ·
  Python automations · Supabase + Node.js · Founder-led execution · AI agent systems ·

---

### 2.3 Social Proof Strip
5 trust signal pills (pill shape, 1px border, fade-in on scroll):
  🚀 5 products shipped
  📱 1 live App Store app
  ⚡ 5-week average MVP delivery
  🤖 AI-native team — not a headcount play
  🔒 Senior engineers only

---

### 2.4 Services Section
Eyebrow: Services
Headline: Three offers. Very clear outcomes.
Sub: Click any service card to see full scope, deliverables, and best-fit projects.
Layout: 3-column grid desktop, 1-col mobile

SERVICE CARD 1 — MVP Launch Sprint
  Icon: rocket (teal pill) | Badge: Under 5 weeks
  Description: Launch a mobile or web app fast enough for user validation, investor demos, or fundraising rounds.
  Bullets:
    - Product scoping, UX flows, frontend, backend, auth, admin panel
    - React / Next.js / React Native builds
    - Deployment on Vercel, Railway, or AWS
    - Clean codebase with handoff documentation
  On click → Modal #1:
    Included:  Scoping workshop, UX direction, full-stack build, deployment, handoff docs
    Best fit:  Startup founders, pre-seed teams, investor demo builds, pilot launches
    Deliverables: Working app, admin panel, user auth, deployment, clean repo
    Timeline:  Weeks 1–5
    Not for:   Teams with no clarity on what to build
    Projects:  NativeNest
    CTA:       Book a scoping call →

SERVICE CARD 2 — Production Upgrade & Support
  Icon: shield (teal pill) | Badge: Scale-ready
  Description: Take a rough MVP to production-grade — stronger architecture, performance, observability, ongoing support.
  Bullets:
    - Code audit, architecture cleanup, CI/CD, infra, QA hardening
    - Monitoring, alerting, security review
    - Ongoing feature delivery and bug fix SLA
  On click → Modal #2:
    Included:  Code audit, refactor, monitoring, CI/CD, infra setup, QA
    Best fit:  Teams with traction, post-fundraise build-out, messy MVP code
    Deliverables: Clean architecture, monitoring dashboard, release process
    Timeline:  4–12 weeks typical
    Not for:   Products with no existing codebase
    Projects:  AccounSaathi
    CTA:       Book a scoping call →

SERVICE CARD 3 — AI Workflow Automation
  Icon: CPU/bot (teal pill) | Badge: Within 5 days
  Description: Install AI into your operations — lead gen to content to internal copilots. Live in 5 days.
  Bullets:
    - Lead capture, outbound personalization, content pipelines
    - CRM automation, reporting, invoice/doc processing
    - Internal support copilots and ops assistants
    - Powered by LLMs, LangChain, Python agent systems
  On click → Modal #3:
    Included:  Workflow mapping, tool integrations, prompt engineering, testing, handover
    Use cases: Lead gen, content pipelines, CRM sync, ops copilots, support agents
    Best fit:  D2C brands, SaaS ops teams, service businesses, founders who want leverage
    Timeline:  3–7 days per workflow
    Not for:   Companies with no defined operations or data yet
    Projects:  Outbound AI Engine
    CTA:       Book a scoping call →

---

### 2.5 Projects — Selected Builds
Eyebrow: Selected builds
Headline: Shipped products. Real architectures.
Sub: Hover a card to reveal the architecture. Click to see the full build story.

Filters (above grid): All · Mobile Apps · Web Apps · AI Products · Automations

PROJECT 1 — NativeNest
  Status: 🟢 Live — App Store | Industry: Mobile · EdTech
  Description: Language-learning mobile app built for engagement-first onboarding and daily practice loops.
  Stack: React Native · Node.js · Supabase · Expo
  On hover — architecture:
    React Native App (Expo)
           ↓
    Node.js REST API
           ↓
    Supabase (Auth + PostgreSQL)
           ↓
    Push Notifications + Analytics
           ↓
    App Store & Play Store Deployment

PROJECT 2 — AccounSaathi
  Status: 🔵 Beta — Web App | Industry: Web App · FinOps
  Description: Accounting workflow platform for small businesses — simplifying internal ops and financial process management.
  Stack: Next.js · Node.js · PostgreSQL · Tailwind
  On hover — architecture:
    Next.js Dashboard (SSR + ISR)
           ↓
    Node.js API Layer
           ↓
    PostgreSQL via Prisma ORM
           ↓
    Admin Ops + Role-based Access Control

PROJECT 3 — Outbound AI Engine
  Status: 🟡 Internal Tool | Industry: AI Automation · Sales Ops
  Description: AI-assisted outbound workflow for prospect research, personalization at scale, CRM-ready campaigns.
  Stack: Python · LangChain · GPT-4o · CRM APIs
  On hover — architecture:
    Prospect Data Intake
           ↓
    Enrichment + Research Agent
           ↓
    LLM Personalization Layer (GPT-4o)
           ↓
    Campaign Content Generator
           ↓
    CRM Sync + Delivery Pipeline

---

### 2.6 Why GetCodeFree — 2×2 Grid
Eyebrow: The difference
Headline: Built differently. On purpose.

Card 1 — AI-native, not AI-adjacent
  Every workflow uses LLM-assisted development, automated QA, and agent-driven processes.
  Speed without sacrificing quality.

Card 2 — Founder-led execution
  You speak directly with the person building. No account managers, no PM layers, no handoff lag.
  What you describe is what gets shipped.

Card 3 — Senior engineers only
  No juniors on your project. Every engineer has shipped production apps with real users and real scale.

Card 4 — Speed as a system, not a promise
  The 5-week MVP timeline is a tested delivery model. It works because scope, tooling,
  and workflow are built around it.

---

### 2.7 Process — 3 Cards
Eyebrow: How we work
Headline: Week by week. No ambiguity.

Week 1 — Scope & System Design
  Align on problem definition, user flows, API contracts, architecture decisions,
  milestones, and success criteria. Kill ambiguity before a line of code is written.

Week 2–4 — Build & Iterate
  Ship in public with weekly demos, async feedback, and rapid product iteration.
  No disappearing for 4 weeks.

Week 5+ — Launch & Harden
  Deploy to production with monitoring, load testing, and bug fixes.
  Transition into support if product gains traction.

---

### 2.8 Tech Stack
Eyebrow: What we build with
One-liner: Frontend · Backend · Mobile · AI · Infrastructure

Row 1: React · Next.js · React Native · Node.js · Python
Row 2: LangChain · GPT-4o / Claude · Supabase · PostgreSQL · Vercel · AWS

---

### 2.9 Testimonials — 2 Glass Cards
Eyebrow: What clients say
Headline: Real feedback. No padding.
Layout: 2-col desktop, carousel mobile

Card 1:
  "We had a half-built product that had been stuck for 3 months. GetCodeFree scoped it
  in a day, shipped it in 4 weeks. It's now our main demo for investors."
  — Alex M., CTO at a fintech startup

Card 2:
  "I needed a lead generation workflow that didn't require a full-time ops hire.
  They built it in 4 days. It's been running without touching it for 2 months."
  — Priya K., Founder at a D2C brand

---

### 2.10 Final CTA
Background: diagonal gradient — teal 14% → blue 10% → transparent

LEFT:
  Eyebrow: Let's build
  Headline: Tell us what you're building.
  Sub: Whether it's a mobile app, a web platform, or an AI automation —
       book a 30-minute call and we'll scope it together.
  CTA 1 (teal pill): Book intro call 📅
  CTA 2 (ghost):     hello@getcodefreetech.com

RIGHT — dark glass qualification box:
  ✅ You have a product idea but need the build team
  ✅ You have an MVP but need it production-hardened
  ✅ You want AI automation but don't know where to start
  ✅ You need it shipped — not just designed

---

### 2.11 Footer
Left:   Logo + tagline + © 2026 GetCodeFree
Center: Services col (MVP Sprint · Production Upgrade · AI Automation)
        Company col (About · Projects · Process · Contact)
Right:  LinkedIn · GitHub · Email icons

---

## 3. Interaction Spec

| Element        | Trigger            | Behavior                                          |
|----------------|--------------------|---------------------------------------------------|
| Service card   | Click              | dialog.showModal() — opens matching modal         |
| Modal          | Escape/backdrop/X  | dialog.close()                                    |
| Project card   | Hover (desktop)    | Reveals architecture panel (opacity + max-height) |
| Filter pill    | Click              | Show/hide matching cards with opacity/scale       |
| Theme toggle   | Click              | Flip data-theme dark↔light on <html>              |
| Cards          | Hover              | translateY(-4px) + shadow + teal border glow      |
| CTA buttons    | Hover              | translateY(-1px) + shadow                         |
| Mobile nav     | Hamburger          | Full-height drawer                                |

---

## 4. Motion & 3D Summary

| Effect                  | Implementation                                             |
|-------------------------|------------------------------------------------------------|
| Hero headline           | Splitting.js per-char reveal, 30ms stagger                 |
| Scroll reveals          | animation-timeline: view() — opacity + clip-path only      |
| Card hover              | translateY(-4px) + shadow + teal border-color              |
| Modal open              | @starting-style scale(0.96)→1 + opacity 0→1               |
| Ticker                  | CSS marquee infinite, duplicate content                    |
| Hero parallax           | Motion One scroll() — bg glow vs copy offset              |
| Rotating gradient border| @property --gradient-angle on ONE featured card           |
| Fable depth trick       | Base gradient + inner teal glow + 0 32px 80px cast shadow  |

---

## 5. Current Site Fix Checklist

| Current                        | Fix                                         |
|-------------------------------|---------------------------------------------|
| "Next Generation Tech Agency"  | Replace with hero headline §2.2             |
| Gmail contact                  | Use hello@getcodefreetech.com               |
| "BugFree.dev" testimonial      | Remove or replace with real client          |
| Inconsistent stage labels      | Use: Live / Beta / In Build / Internal      |
| No pricing signal              | Add "Starting from ₹X" per offer            |
| No booking link                | Add Calendly in CTA section                 |
| No stack row                   | Add tech stack section §2.8                 |
| Hero copy repeats "AI-powered" | Replace with speed + outcome framing        |

---

## 6. Deploy Checklist

- [ ] All placeholder copy replaced with final content
- [ ] Real Calendly / booking link added
- [ ] hello@getcodefreetech.com set
- [ ] Real project screenshots or illustrations
- [ ] Real testimonials
- [ ] OG tags: og:title, og:description, og:image
- [ ] Analytics: Google Analytics or Plausible
- [ ] Mobile tested: iPhone Safari + Chrome Android
- [ ] Lighthouse: LCP < 2s, CLS = 0
- [ ] prefers-reduced-motion disables animations

---
*GetCodeFree — README.md v1.0*
