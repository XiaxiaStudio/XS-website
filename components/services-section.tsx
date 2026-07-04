"use client"

import { motion } from "motion/react"
import { getIcon } from "./icon-mapper"
import type { HomeServices } from "@/lib/data"

interface ServicesSectionProps {
  services: HomeServices
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-24 px-4 md:px-6 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            {services.label}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {services.title}
            <span className="text-lime-500">{services.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.items.map((service, idx) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500 dark:hover:border-lime-500 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-lime-500/10 flex items-center justify-center mb-4 group-hover:bg-lime-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-lime-500" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
