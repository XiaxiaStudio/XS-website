"use client"

import { motion } from "motion/react"
import type { AboutStory } from "@/lib/data"

interface StorySectionProps {
  story: AboutStory
}

export function StorySection({ story }: StorySectionProps) {
  return (
    <section className="py-24 px-4 md:px-6 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
            {story.title}
          </h2>
        </motion.div>

        <div className="space-y-8">
          {story.paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
