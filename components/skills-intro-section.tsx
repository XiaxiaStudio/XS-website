"use client"

import { motion } from "motion/react"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import type { Skills } from "@/lib/data"

interface SkillsIntroSectionProps {
  skills: Skills
}

export function SkillsIntroSection({ skills }: SkillsIntroSectionProps) {
  return (
    <section className="relative py-24 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            {skills.label}
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {skills.title}
            <span className="text-lime-500">{skills.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            {skills.description}
          </p>
        </motion.div>

        <HoverEffect items={skills.items} />
      </div>
    </section>
  )
}
