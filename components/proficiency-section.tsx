"use client"

import { motion } from "motion/react"
import type { Proficiency } from "@/lib/data"

interface ProficiencySectionProps {
  proficiency: Proficiency[]
}

export function ProficiencySection({ proficiency }: ProficiencySectionProps) {
  return (
    <section className="py-24 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            熟练度
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            核心技术
            <span className="text-lime-500">掌握程度</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {proficiency.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-neutral-900 dark:text-white">
                  {item.name}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-500">
                  {item.level}%
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-lime-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
