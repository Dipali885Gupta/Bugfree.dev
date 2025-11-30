import { createClient } from '@/lib/supabase/server'
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  MessageSquare,
  TrendingUp,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch counts for dashboard stats
  const [projectsResult, submissionsResult, processResult, faqResult] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
    supabase.from('process_steps').select('id', { count: 'exact', head: true }),
    supabase.from('faq_items').select('id', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      name: 'Total Projects',
      value: projectsResult.count || 0,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Contact Submissions',
      value: submissionsResult.count || 0,
      icon: MessageSquare,
      href: '/admin/submissions',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Process Steps',
      value: processResult.count || 0,
      icon: TrendingUp,
      href: '/admin/process',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      name: 'FAQ Items',
      value: faqResult.count || 0,
      icon: FileText,
      href: '/admin/contact',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ]

  const quickActions = [
    { name: 'Edit Hero Section', href: '/admin/hero', icon: Eye },
    { name: 'Manage Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'View Submissions', href: '/admin/submissions', icon: MessageSquare },
    { name: 'Site Settings', href: '/admin/settings', icon: LayoutDashboard },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your admin dashboard. Manage your landing page content here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.name}
                href={action.href}
                className="bg-card border border-border rounded-xl p-4 hover:bg-accent transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{action.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Set up your Supabase database</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Run the SQL migration file in your Supabase dashboard to create all required tables.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-semibold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Configure environment variables</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-semibold text-sm">3</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Start managing content</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Use the sidebar to navigate to different sections and update your landing page content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
