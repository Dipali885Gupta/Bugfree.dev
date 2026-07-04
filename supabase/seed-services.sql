-- Seed service rows for section='services'
-- These match DEFAULT_SERVICES from lib/cms/defaults.ts
INSERT INTO feature_cards (section, icon_name, title, badge, description, bullets, details, display_order, is_active)
SELECT * FROM (VALUES
  (
    'services',
    'Rocket',
    'MVP Launch Sprint',
    '~3 weeks',
    'Launch a mobile or web app fast enough for user validation, investor demos, or fundraising rounds.',
    ARRAY['Product scoping, UX flows, frontend, backend, auth, admin panel', 'React / Next.js / React Native builds', 'Deployment on Vercel, Railway, or AWS', 'Clean codebase with handoff documentation'],
    '[{"label":"Included","value":"Scoping workshop, UX direction, full-stack build, deployment, handoff docs"},{"label":"Best fit","value":"Startup founders, pre-seed teams, investor demo builds, pilot launches"},{"label":"Deliverables","value":"Working app, admin panel, user auth, deployment, clean repo"},{"label":"Timeline","value":"~3 weeks"},{"label":"Not for","value":"Teams with no clarity on what to build"},{"label":"Projects","value":"NativeNest, Photobytes"}]'::jsonb,
    1,
    true
  ),
  (
    'services',
    'Layers',
    'Full Product Development',
    'Scratch → Production',
    'From zero to production-ready — complete product design, build, deployment, and ongoing monthly support.',
    ARRAY['Product strategy, UX design, full-stack build from scratch', 'Admin dashboard, analytics, user management, payments', 'Production deployment with CI/CD, monitoring, SSL', 'Monthly support and iteration retainer included'],
    '[{"label":"Included","value":"Strategy, UX, full-stack build, admin panel, deployment, monthly support"},{"label":"Best fit","value":"Founders with a validated idea, companies building a flagship product"},{"label":"Deliverables","value":"Full production app, admin dashboard, monitoring, support SLA"},{"label":"Timeline","value":"8–16 weeks depending on scope"},{"label":"Not for","value":"Tight budgets under $15K, single-page projects"},{"label":"Projects","value":"AccountSaathi, InsureFlow"}]'::jsonb,
    2,
    true
  ),
  (
    'services',
    'ShieldCheck',
    'Production Upgrade & Support',
    'Scale-ready',
    'Take a rough MVP to production-grade — stronger architecture, performance, observability, ongoing support.',
    ARRAY['Code audit, architecture cleanup, CI/CD, infra, QA hardening', 'Monitoring, alerting, security review', 'Ongoing feature delivery and bug fix SLA'],
    '[{"label":"Included","value":"Code audit, refactor, monitoring, CI/CD, infra setup, QA"},{"label":"Best fit","value":"Teams with traction, post-fundraise build-out, messy MVP code"},{"label":"Deliverables","value":"Clean architecture, monitoring dashboard, release process"},{"label":"Timeline","value":"4–12 weeks typical"},{"label":"Not for","value":"Products with no existing codebase"},{"label":"Projects","value":"AccountSaathi"}]'::jsonb,
    3,
    true
  ),
  (
    'services',
    'Brain',
    'AI Setups & Integrations',
    '1–2 weeks',
    'Add AI capabilities to your existing product — LLM integration, RAG pipelines, chatbots, and AI agents.',
    ARRAY['LLM integration (GPT-4o, Claude, Gemini) into your product', 'RAG pipelines for document Q&A and knowledge retrieval', 'Custom AI agents, chatbots, and copilots', 'Fine-tuning, prompt engineering, and evaluation'],
    '[{"label":"Included","value":"AI architecture, integration, prompt engineering, testing, deployment"},{"label":"Use cases","value":"Chatbots, document search, content generation, data extraction, copilots"},{"label":"Best fit","value":"Products that need AI features without hiring a dedicated ML team"},{"label":"Timeline","value":"1–2 weeks per integration"},{"label":"Not for","value":"Training foundation models from scratch"},{"label":"Projects","value":"AccountSaathi AI, Outbound AI Engine"}]'::jsonb,
    4,
    true
  ),
  (
    'services',
    'Cpu',
    'AI Workflow Automation',
    'Within 5 days',
    'Install AI into your operations — lead gen to content to internal copilots. Live in 5 days.',
    ARRAY['Lead capture, outbound personalization, content pipelines', 'CRM automation, reporting, invoice/doc processing', 'Internal support copilots and ops assistants', 'Powered by LLMs, LangChain, Python agent systems'],
    '[{"label":"Included","value":"Workflow mapping, tool integrations, prompt engineering, testing, handover"},{"label":"Use cases","value":"Lead gen, content pipelines, CRM sync, ops copilots, support agents"},{"label":"Best fit","value":"D2C brands, SaaS ops teams, service businesses, founders who want leverage"},{"label":"Timeline","value":"3–7 days per workflow"},{"label":"Not for","value":"Companies with no defined operations or data yet"},{"label":"Projects","value":"Outbound AI Engine"}]'::jsonb,
    5,
    true
  ),
  (
    'services',
    'Palette',
    'Landing Pages & Small Projects',
    '1–2 weeks',
    'High-impact landing pages, marketing sites, and small web projects with custom admin panels baked in.',
    ARRAY['Pixel-perfect landing pages with modern animations', 'Custom admin dashboard for content management', 'Form integrations, analytics, SEO setup', 'Deployment with hosting configuration'],
    '[{"label":"Included","value":"Design, build, admin panel, form handling, deployment"},{"label":"Best fit","value":"Marketing sites, agency pages, small business web presence"},{"label":"Deliverables","value":"Live site, admin panel, analytics, deployment"},{"label":"Timeline","value":"1–2 weeks"},{"label":"Not for","value":"Complex web apps or marketplaces"},{"label":"Projects","value":"HotelSupply, FixiSecurity landing pages"}]'::jsonb,
    6,
    true
  )
) AS v(section, icon_name, title, badge, description, bullets, details, display_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM feature_cards WHERE section = 'services' LIMIT 1);
