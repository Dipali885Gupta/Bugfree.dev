import { Metadata } from 'next'
import './globals.css'
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "getcodefree.tech",
  description: "Building and shipping products faster with AI. Transform your ideas into exceptional digital experiences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  )
}