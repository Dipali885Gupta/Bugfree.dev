-- Seed process_steps with the 3 phases matching DEFAULT_PROCESS from lib/cms/defaults.ts
INSERT INTO process_steps (icon_name, phase_number, title, subtitle, timeline, description, outcomes, highlight, display_order, is_active)
SELECT * FROM (VALUES
  (
    'Target',
    '01',
    'Build your MVP',
    'Under 3 weeks',
    'Weeks 1–3',
    'We align on your vision, define the scope, and ship a production-grade MVP. No ambiguity, no scope creep — just a working product with real architecture.',
    ARRAY['Clear spec with user flows and milestones', 'Production-grade MVP deployed on your infra', 'Admin dashboard and user auth included', 'Clean codebase with full handoff docs'],
    'From zero to deployed in weeks — not months',
    1,
    true
  ),
  (
    'Gauge',
    '02',
    'Iterate & Scale',
    'Ongoing sprints',
    'Weekly',
    'Once the MVP is live, we run weekly sprints to ship features, improve UX, optimize performance, and prepare your product for growth.',
    ARRAY['Feature sprints with clear priorities', 'Performance optimization and scalability hardening', 'User feedback integration and UX polish', 'Architecture evolution as you grow'],
    'Ship features every week — not every quarter',
    2,
    true
  ),
  (
    'Headphones',
    '03',
    'Support & Partner',
    'Weekly calls',
    'Always on',
    'We stay with you. Weekly sync calls, async communication, ongoing maintenance, and strategic advice to keep your product ahead.',
    ARRAY['Weekly strategy and progress calls', 'Active communication on Slack / WhatsApp', 'Bug fixes and hotfix SLA under 24 hours', 'Ongoing product and growth consulting'],
    'A partner who cares about outcomes — not just output',
    3,
    true
  )
) AS v(icon_name, phase_number, title, subtitle, timeline, description, outcomes, highlight, display_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM process_steps LIMIT 1);
