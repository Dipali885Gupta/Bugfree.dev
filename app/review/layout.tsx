// Force dynamic rendering for this route to ensure environment variables are available
export const dynamic = 'force-dynamic'

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
