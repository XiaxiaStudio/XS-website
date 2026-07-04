"use client"

import Image from "next/image"
import { motion } from "motion/react"
import type { TechStackItem } from "@/lib/data"

interface TechStackSectionProps {
  techStack: TechStackItem[]
}

export function TechStackSection({ techStack }: TechStackSectionProps) {
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
            工具
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            日常使用的
            <span className="text-lime-500">技术栈</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((tech) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500 dark:hover:border-lime-500 transition-colors"
            >
              <Image
                src={tech.image}
                alt={tech.name}
                width={48}
                height={48}
                className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
              />
              <div className="text-center">
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {tech.name}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-500">
                  {tech.designation}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
