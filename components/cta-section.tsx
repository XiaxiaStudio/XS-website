"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import type { HomeCta } from "@/lib/data"

interface CtaSectionProps {
  cta: HomeCta
}

export function CtaSection({ cta }: CtaSectionProps) {
  return (
    <section className="py-24 px-4 md:px-6 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lime-600 to-yellow-500 dark:from-lime-900 dark:to-yellow-800 p-8 md:p-16 text-center"
        >
          <div className="absolute inset-0 opacity-10 dark:opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {cta.title}
              <br />
              <span className="text-lime-100 dark:text-lime-300">{cta.titleHighlight}</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 dark:text-neutral-200">
              {cta.description}
            </p>
            <Link
              href={cta.buttonHref}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-sm font-medium bg-white text-lime-700 dark:text-lime-900 rounded-full hover:bg-lime-50 dark:hover:bg-white transition-colors"
            >
              {cta.buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
