"use client"

import { motion } from "motion/react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { Globe, Coffee } from "lucide-react"
import { getIcon } from "./icon-mapper"
import type { About } from "@/lib/data"

interface AboutSectionProps {
  about: About
}

export function AboutSection({ about }: AboutSectionProps) {
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
            {about.label}
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {about.title}
            <br />
            <span className="text-neutral-500 dark:text-neutral-500">
              {about.titleHighlight}
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <TextGenerateEffect
              words={about.textGenerate}
              className="text-lg md:text-xl font-medium"
              duration={0.4}
            />
            <p className="mt-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {about.description}
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Globe className="w-5 h-5 text-lime-500" />
                <span>{about.remoteText}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Coffee className="w-5 h-5 text-yellow-500" />
                <span>{about.mottoText}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {about.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-lime-500">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {about.items.map((item, idx) => {
            const Icon = getIcon(item.icon)
            return (
              <BentoGridItem
                key={idx}
                title={item.title}
                description={item.description}
                header={
                  <div
                    className={`flex h-full min-h-[120px] items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} border border-lime-500/20`}
                  >
                    <Icon className={`w-12 h-12 ${item.iconColor}`} />
                  </div>
                }
                icon={<Icon className={`w-5 h-5 ${item.iconColor}`} />}
                className={item.className}
              />
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
