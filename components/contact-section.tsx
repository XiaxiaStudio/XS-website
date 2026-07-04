"use client"

import { motion } from "motion/react"
import { Mail, MapPin, Send, Phone, Clock } from "lucide-react"
import { GithubIcon, TwitterIcon, LinkedinIcon, DribbbleIcon } from "./social-icons"
import type { Contact, Profile } from "@/lib/data"

interface ContactSectionProps {
  contact: Contact
  profile: Profile
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedinIcon,
  Dribbble: DribbbleIcon,
}

export function ContactSection({ contact, profile }: ContactSectionProps) {
  return (
    <section className="relative py-24 px-4 md:px-6 bg-neutral-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold tracking-wider text-lime-500 uppercase">
            {contact.label}
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {contact.title}
            <span className="text-lime-500">{contact.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="p-3 rounded-xl bg-lime-500/10 text-lime-500">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {contact.emailLabel}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="p-3 rounded-xl bg-lime-500/10 text-lime-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {contact.locationLabel}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {profile.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="p-3 rounded-xl bg-lime-500/10 text-lime-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {contact.phoneLabel}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {profile.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  回复时间
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {contact.availability}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {contact.socialLabel}
              </h3>
              <div className="flex items-center gap-3">
                {profile.socials.map((social) => {
                  const Icon = iconMap[social.label]
                  if (!Icon) return null
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-lime-500 hover:border-lime-500 dark:hover:border-lime-500 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  {contact.form.nameLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={contact.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  {contact.form.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={contact.form.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500 transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                {contact.form.subjectLabel}
              </label>
              <input
                id="subject"
                type="text"
                placeholder={contact.form.subjectPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500 transition-colors"
              />
            </div>
            <div className="space-y-2 mb-6">
              <label
                htmlFor="message"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                {contact.form.messageLabel}
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder={contact.form.messagePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-yellow-400 to-lime-500 rounded-xl hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              {contact.form.submitText}
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center mb-12">
            常见
            <span className="text-lime-500">问题</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {contact.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
              >
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                  {item.question}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
