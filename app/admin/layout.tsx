import type { Metadata } from "next"
import { AuthProvider } from "@/components/admin/use-auth"

export const metadata: Metadata = {
  title: "后台管理 | 个人网站",
  description: "网站内容管理后台",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
