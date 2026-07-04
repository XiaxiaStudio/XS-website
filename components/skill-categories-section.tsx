"use client"

import { motion } from "motion/react"
import type { SkillCategory } from "@/lib/data"

interface SkillCategoriesSectionProps {
  categories: SkillCategory[]
}

export function SkillCategoriesSection({ categories }: SkillCategoriesSectionProps) {
  return (
    <section className="py-24 px-4 md:px-6 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            技能分类
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            跨领域的
            <span className="text-lime-500">综合能力</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-lime-500/10 text-lime-600 dark:text-lime-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
