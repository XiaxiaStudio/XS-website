import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSiteData } from "@/lib/data"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData()
  return {
    title: data.site.title,
    description: data.site.description,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await getSiteData()

  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Navbar logoText={data.site.logoText} />
          {children}
          <Footer
            name={data.profile.name}
            builtWith={data.contact.footer.builtWith}
            copyright={data.contact.footer.copyright}
            socials={data.profile.socials}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
