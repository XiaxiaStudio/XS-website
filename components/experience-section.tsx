"use client"

import { motion } from "motion/react"
import { Timeline } from "@/components/ui/timeline"
import type { Experience } from "@/lib/data"

interface ExperienceSectionProps {
  experience: Experience
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const timelineData = experience.items.map((item) => ({
    title: item.title,
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
            {item.content.role}
          </h3>
          <p className="text-lime-500 font-medium">{item.content.company}</p>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
          {item.content.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.content.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  }))

  return (
    <section className="relative py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            {experience.label}
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {experience.title}
            <span className="text-lime-500">{experience.titleHighlight}</span>
          </h1>
        </motion.div>
      </div>
      <Timeline
        data={timelineData}
        heading={experience.heading}
        subheading={experience.subheading}
      />
    </section>
  )
}
