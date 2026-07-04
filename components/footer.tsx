"use client"

import Link from "next/link"
import { GithubIcon, TwitterIcon, LinkedinIcon, DribbbleIcon } from "./social-icons"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedinIcon,
  Dribbble: DribbbleIcon,
}

const footerLinks = [
  { name: "首页", href: "/" },
  { name: "关于", href: "/about" },
  { name: "技能", href: "/skills" },
  { name: "项目", href: "/projects" },
  { name: "联系", href: "/contact" },
]

interface FooterProps {
  name: string
  builtWith: string
  copyright: string
  socials: { label: string; href: string }[]
}

export function Footer({ name, copyright, socials }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-lime-500"
          >
            {name.split(" ")[0]}.
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-lime-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = iconMap[social.label]
              if (!Icon) return null
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg text-neutral-500 hover:text-lime-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} {name} · {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
