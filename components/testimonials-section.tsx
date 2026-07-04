"use client"

import { motion } from "motion/react"
import { Quote } from "lucide-react"
import type { HomeTestimonials } from "@/lib/data"

interface TestimonialsSectionProps {
  testimonials: HomeTestimonials
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string
  author: string
  role: string
}) {
  return (
    <div className="relative shrink-0 w-[340px] md:w-[420px] p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mx-3">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-lime-500/20" />
      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 relative z-10">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div className="font-semibold text-neutral-900 dark:text-white">{author}</div>
        <div className="text-sm text-neutral-500 dark:text-neutral-500">{role}</div>
      </div>
    </div>
  )
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials.items
  // Duplicate items for seamless looping
  const duplicatedItems = [...items, ...items]

  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            {testimonials.label}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {testimonials.title}
            <span className="text-lime-500">{testimonials.titleHighlight}</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedItems.map((item, idx) => (
            <TestimonialCard
              key={`${item.author}-${idx}`}
              quote={item.quote}
              author={item.author}
              role={item.role}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
