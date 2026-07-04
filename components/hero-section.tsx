"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight"
import { FlipWords } from "@/components/ui/flip-words"
import { ArrowRight } from "lucide-react"
import { GithubIcon, TwitterIcon, LinkedinIcon, DribbbleIcon } from "./social-icons"
import type { Hero, Profile } from "@/lib/data"

interface HeroSectionProps {
  hero: Hero
  profile: Profile
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedinIcon,
  Dribbble: DribbbleIcon,
}

export function HeroSection({ hero, profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-5rem)]">
      <HeroHighlight containerClassName="min-h-[calc(100vh-5rem)] h-auto">
        <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
            </span>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              {hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-800 dark:text-white leading-tight tracking-tight"
          >
            {hero.greeting}{" "}
            <Highlight className="text-black dark:text-white px-2">
              {hero.name}
            </Highlight>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-xl md:text-3xl font-normal text-neutral-600 dark:text-neutral-400"
          >
            一名
            <FlipWords
              words={hero.flipWords}
              className="text-lime-600 dark:text-lime-400 font-semibold"
            />
            {hero.role}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-yellow-400 to-lime-500 rounded-full overflow-hidden transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">{hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 relative" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-lime-500 dark:hover:border-lime-500 transition-colors"
            >
              {hero.secondaryCta}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 flex items-center gap-4"
          >
            {profile.socials.map((social) => {
              const Icon = iconMap[social.label]
              if (!Icon) return null
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full text-neutral-500 hover:text-lime-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </motion.div>
        </div>
      </HeroHighlight>
    </section>
  )
}
