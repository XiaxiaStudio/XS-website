"use client"

import { motion } from "motion/react"
import { getIcon } from "./icon-mapper"
import type { Value } from "@/lib/data"

interface ValuesSectionProps {
  values: Value[]
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-24 px-4 md:px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            价值观
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            我坚持的
            <span className="text-lime-500">工作原则</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => {
            const Icon = getIcon(value.icon)
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-lime-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-lime-500" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
