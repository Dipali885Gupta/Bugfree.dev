import { Metadata } from 'next'
import './globals.css'
import { Toaster } from "sonner"
import StickyCTA from "@/components/StickyCTA"

export const metadata: Metadata = {
  title: "GetCodeFree — Ship your MVP in 3 weeks",
  description:
    "AI-native product engineering studio. We build mobile apps, web platforms, and AI automations for founders — MVPs in ~3 weeks, automations in ~5 days.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('gcf-theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground pb-16 md:pb-14">
        {children}
        <Toaster />
        <StickyCTA />
      </body>
    </html>
  )
}