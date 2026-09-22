# Brief
route: direct
employees: [frontend-engineer]
skip: [product-manager, designer, engineering-manager, architect, security-officer, sprint]
goal: Ship GetCodeFree Partner Network route page (`/partners`) with copy for partnership program (incl. US/international clients, IT sales/BDR audiences), themed UI + light cartoon SVGs, and partner form that notifies via EmailJS + Supabase like existing contact flow.
non_goals: CMS admin for partners, WhatsApp Business API, referral commission system, new design system.
success_checks:
  - `/partners` renders with Navbar/Footer
  - Form fields match brief; submit stores + emails
  - Nav/footer link to Partners
  - `npm run build` green
constraints: Match design.md / globals.css tokens; reuse contact EmailJS pattern; no new deps.
verify: npm run build
max_loop_iters: 3
notes: Prefer contact_submissions fallback if partner_submissions table missing.
