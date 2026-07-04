"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ExternalLink } from "lucide-react"
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card"
import { GithubIcon } from "./social-icons"
import { cn } from "@/lib/utils"
import type { Projects } from "@/lib/data"

interface ProjectsSectionProps {
  projects: Projects
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("全部")
  const filteredItems =
    activeCategory === "全部"
      ? projects.items
      : projects.items.filter((item) => item.category === activeCategory)

  return (
    <section className="relative py-24 px-4 md:px-6 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            {projects.label}
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {projects.title}
            <span className="text-lime-500">{projects.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            {projects.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {projects.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-lime-500 text-white"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <CardContainer className="inter-var">
                  <CardBody className="bg-white dark:bg-neutral-900 relative group/card border border-neutral-200 dark:border-white/[0.2] w-full h-auto rounded-2xl p-6 hover:shadow-2xl hover:shadow-lime-500/10">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-900 dark:text-white"
                    >
                      {project.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 dark:text-neutral-400 text-sm mt-2 line-clamp-2"
                    >
                      {project.description}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-6">
                      <div className="relative h-48 w-full rounded-xl overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </CardItem>
                    <div className="flex items-center justify-between mt-4 mb-4">
                      <span className="text-xs font-medium text-lime-500">
                        {project.category}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-500">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <CardItem
                          key={tag}
                          translateZ={40}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        >
                          {tag}
                        </CardItem>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <CardItem
                        translateZ={40}
                        as="a"
                        href={project.repo}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        源码
                      </CardItem>
                      <CardItem
                        translateZ={40}
                        as="a"
                        href={project.demo}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-lime-500 hover:bg-lime-600 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        在线演示
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
