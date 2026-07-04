-- Seed projects table with full data matching lib/projects.ts DEFAULT_PROJECTS
-- NOTE: Run add-project-extended-columns.sql FIRST before this seed
INSERT INTO projects (slug, title, tagline, industry, description, image_url, tags, categories, status, display_order, is_active, featured, metrics, outcomes)
SELECT * FROM (VALUES
  (
    'nativenest',
    'NativeNest',
    'Language learning that actually sticks',
    'Mobile · EdTech',
    'Language-learning mobile app built for engagement-first onboarding and daily practice loops.',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80',
    ARRAY['React Native', 'Expo', 'Node.js', 'Supabase', 'PostgreSQL', 'Redis'],
    ARRAY['mobile', 'featured'],
    'Live — App Store',
    1,
    true,
    true,
    '[{"value":"10k+","label":"Downloads"},{"value":"85%","label":"Retention"},{"value":"4.8","label":"App Rating"},{"value":"40min","label":"Daily Session"}]'::jsonb,
    ARRAY['Achieved 85% user retention through engagement-first design', 'Reached 4.8 star rating on App Store with 500+ reviews', 'Generated 10k+ downloads within first quarter', 'Built scalable architecture supporting 50k+ daily active users']
  ),
  (
    'accounsaathi',
    'AccounSaathi',
    'Accounting ops, simplified',
    'Web App · FinOps',
    'Accounting workflow platform for small businesses — simplifying internal ops and financial process management.',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
    ARRAY['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    ARRAY['web', 'featured'],
    'Beta — Web App',
    2,
    true,
    true,
    '[{"value":"500+","label":"Businesses"},{"value":"40+","label":"Integrations"},{"value":"99.9%","label":"Uptime"},{"value":"12hrs","label":"Weekly Savings"}]'::jsonb,
    ARRAY['Onboarded 500+ small businesses within first year', 'Integrated with 40+ accounting and banking platforms', 'Achieved 99.9% uptime with auto-scaling infrastructure', 'Saved businesses an average of 12 hours per week on accounting tasks']
  ),
  (
    'outbound-ai',
    'Outbound AI Engine',
    'AI-powered sales at scale',
    'AI Automation · Sales Ops',
    'AI-assisted outbound workflow for prospect research, personalisation at scale, and CRM-ready campaigns.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    ARRAY['Python', 'FastAPI', 'LangChain', 'GPT-4o', 'PostgreSQL', 'Redis'],
    ARRAY['ai', 'automations', 'featured'],
    'Internal Tool',
    3,
    true,
    true,
    '[{"value":"10k+","label":"Campaigns"},{"value":"60%","label":"Reply Rate"},{"value":"3x","label":"Pipeline Growth"},{"value":"100%","label":"CRM Sync"}]'::jsonb,
    ARRAY['Achieved 60% average reply rate across campaigns', 'Generated 3x pipeline growth for sales teams', 'Processed 10k+ campaigns with 99.9% delivery rate', 'Integrated seamlessly with Salesforce, HubSpot, and Pipedrive']
  ),
  (
    'medtracker',
    'MedTracker',
    'Healthcare scheduling made simple',
    'Healthcare · SaaS',
    'Patient scheduling and medication tracking platform for clinics and pharmacies.',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    ARRAY['React Native', 'Node.js', 'PostgreSQL', 'AWS SES', 'Twilio'],
    ARRAY['mobile', 'web'],
    'Live — Web + Mobile',
    4,
    true,
    false,
    '[{"value":"95%","label":"Appt. Show Rate"},{"value":"60%","label":"No-Show Reduction"},{"value":"3days","label":"Avg. Setup Time"}]'::jsonb,
    ARRAY['Reduced no-show rates by 60% through automated reminders', 'Achieved 95% appointment show rate with reminder system', 'Deployed to 50+ clinics across 3 states']
  ),
  (
    'inventory-pro',
    'Inventory Pro',
    'Real-time stock intelligence',
    'Enterprise · Logistics',
    'Real-time inventory management system with predictive restocking and multi-warehouse support.',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    ARRAY['Next.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    ARRAY['web', 'featured'],
    'Live — Enterprise',
    5,
    true,
    true,
    '[{"value":"2M+","label":"SKUs Managed"},{"value":"30%","label":"Inventory Reduction"},{"value":"99.99%","label":"System Uptime"}]'::jsonb,
    ARRAY['Reduced excess inventory by 30% through predictive analytics', 'Managed 2M+ SKUs across 8 warehouse locations', 'Achieved 99.99% uptime with auto-healing infrastructure']
  )
) AS v(slug, title, tagline, industry, description, image_url, tags, categories, status, display_order, is_active, featured, metrics, outcomes)
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);
