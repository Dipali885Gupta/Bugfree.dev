import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // During build time, if env vars aren't set, return a mock client to prevent build errors
    // This allows the build to succeed - authentication will fail at runtime if vars are missing
    if (typeof window === 'undefined') {
      console.warn('Supabase environment variables not found during build. Using placeholder values.')
      return createBrowserClient<Database>(
        'https://placeholder.supabase.co',
        'placeholder-anon-key'
      )
    }
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}

// Export typed client for use in components
export type TypedSupabaseClient = ReturnType<typeof createClient>
