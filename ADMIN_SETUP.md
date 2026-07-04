# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for your Bugfree.dev landing page.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Vercel account (for deployment)

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to be ready (takes ~2 minutes)
3. Go to **Settings > API** and copy:
   - Project URL
   - `anon` public key

## Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL editor and click **Run**

This will create:
- All required tables (12 total)

### CMS v2 (full landing page control)

After `schema.sql`, also run **`supabase/cms-landing-v2.sql`** in the SQL Editor. This adds:

- Extended hero fields (headline lines, panel cards, ticker, meta chips)
- `landing_sections` — section eyebrows/titles for every block
- `social_proof_items`, `metrics_items`, `tech_stack_items`, `developer_profile`, `product_preview_cards`
- Extended `feature_cards` with `section` (`about` | `services`), badges, bullets, modal details
- Extended `process_steps` (subtitle, timeline, outcomes, highlight)
- Seed data matching the current GetCodeFree landing page

Until this migration runs, the site still works — it falls back to static defaults in code.
- Row Level Security (RLS) policies
- Indexes for performance
- Seed data for your landing page

## Step 4: Create Admin User

1. In Supabase, go to **Authentication > Users**
2. Click **Add User** > **Create New User**
3. Enter your email and password
4. Click **Create User**
5. (Optional) Confirm the user's email manually in the dashboard

## Step 5: Run the Application

```bash
npm install
npm run dev
```

Visit:
- **Landing Page**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login

## Admin Dashboard Features

### Dashboard (`/admin`)
Overview of all content sections with quick edit links.

### Hero Section (`/admin/hero`)
Edit the main hero banner:
- Title and subtitle
- CTA button text and link
- Background image URL

### About Section (`/admin/about`)
Edit the about us content:
- Section title and description
- Feature cards (add/edit/delete)

### Projects (`/admin/projects`)
Manage portfolio projects:
- Add new projects
- Edit existing projects
- Set project order and visibility
- Upload images (URLs)

### Process Steps (`/admin/process`)
Edit your workflow process:
- Add/edit/delete steps
- Reorder steps
- Set icons and descriptions

### Contact Section (`/admin/contact`)
Configure contact settings:
- Section title and description
- FAQ items
- Budget options for the form

### Footer (`/admin/footer`)
Manage footer links:
- Quick Links
- Services
- Legal links
- Social media links

### Site Settings (`/admin/settings`)
Global site configuration:
- Company name and description
- Logo text
- Contact email, phone, address
- Social media URLs

### Submissions (`/admin/submissions`)
View contact form submissions:
- See all inquiries
- Mark as read/unread
- Filter and search

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## Database Tables Reference

| Table | Description |
|-------|-------------|
| `site_settings` | Global site configuration |
| `nav_items` | Navigation menu items |
| `hero_section` | Hero banner content |
| `about_section` | About us content |
| `feature_cards` | Feature cards in about section |
| `projects` | Portfolio projects |
| `process_steps` | Process/workflow steps |
| `contact_section` | Contact section content |
| `faq_items` | FAQ questions and answers |
| `budget_options` | Budget options for contact form |
| `footer_links` | Footer links (categorized) |
| `contact_submissions` | Form submissions |

## Troubleshooting

### "Database error querying schema"
This is a **Supabase Auth database issue**, not a bug in the Next.js login page. It usually means your admin user row in `auth.users` has NULL token columns (often from creating the user with raw SQL instead of the Supabase Dashboard).

**Fix (recommended):**
1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Run the script in `supabase/fix-auth-login.sql`
3. Try logging in again

**If it still fails:**
1. Go to **Authentication → Users**
2. Delete the broken admin user
3. **Add user → Create new user** (Dashboard UI only — do not INSERT into `auth.users` manually)
4. Set email + password, enable **Auto Confirm User**
5. Log in at `/admin/login`

Check **Authentication → Logs** for the exact Postgres error if problems persist.

### "Invalid login credentials"
- Make sure you created a user in Supabase Authentication
- Check that the email is confirmed

### "Failed to fetch" errors
- Verify your environment variables are correct
- Check that the database schema was executed successfully

### No data showing on landing page
- Run the seed data from `schema.sql`
- Check the browser console for errors

### RLS policy errors
- Make sure you ran the entire `schema.sql` file
- Check that RLS is enabled on all tables

## Customization

### Adding New Sections
1. Add a new table in `schema.sql`
2. Add the TypeScript type in `lib/supabase/types.ts`
3. Add fetch function in `lib/supabase/queries.ts`
4. Create admin page in `app/admin/[section]/page.tsx`
5. Update landing page component

### Changing Icons
Icons are stored as string names (e.g., "Rocket", "Code"). Available icons are from `lucide-react`. Add to the `iconMap` in each component to support more icons.

## Security Notes

- All admin routes are protected by middleware
- Supabase RLS ensures only authenticated users can modify data
- Public users can only read data and submit contact forms
- Never expose your service role key in client-side code
