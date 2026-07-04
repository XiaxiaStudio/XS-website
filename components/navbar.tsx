"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "首页", href: "/" },
  { name: "关于", href: "/about" },
  { name: "技能", href: "/skills" },
  { name: "项目", href: "/projects" },
  { name: "经历", href: "/experience" },
  { name: "联系", href: "/contact" },
]

interface NavbarProps {
  logoText?: string
}

export function Navbar({ logoText = "亚历." }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-neutral-200/50 dark:border-neutral-800/50"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-lime-500"
        >
          {logoText}
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative group",
                pathname === link.href
                  ? "text-lime-500"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute bottom-1 left-4 right-4 h-px bg-lime-500 transition-transform origin-left",
                  pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="ml-3 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="切换主题"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-neutral-300" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )
            ) : (
              <span className="block w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="切换主题"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-neutral-300" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )
            ) : (
              <span className="block w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="切换菜单"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "text-lime-500 bg-lime-50 dark:bg-lime-900/20"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
