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

export const metadata: Metadata = {
  title: "陈亚历 | 全栈开发工程师与UI设计师",
  description: "使用 React、Next.js、TypeScript 和现代 UI 设计，构建美观、高性能的 Web 体验。",
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
          <Navbar />
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
