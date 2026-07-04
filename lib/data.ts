import { promises as fs } from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "site-data.json")

export interface SocialLink {
  label: string
  href: string
}

export interface Site {
  title: string
  description: string
  logoText: string
  favicon: string
}

export interface Profile {
  name: string
  title: string
  subtitle: string
  availableText: string
  description: string
  email: string
  location: string
  phone: string
  socials: SocialLink[]
}

export interface Hero {
  badge: string
  greeting: string
  name: string
  flipWords: string[]
  role: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface HomeCta {
  title: string
  titleHighlight: string
  description: string
  buttonText: string
  buttonHref: string
}

export interface FeaturedProjects {
  label: string
  title: string
  titleHighlight: string
  description: string
}

export interface HomeServices {
  label: string
  title: string
  titleHighlight: string
  items: ServiceItem[]
}

export interface HomeTestimonials {
  label: string
  title: string
  titleHighlight: string
  items: Testimonial[]
}

export interface Home {
  hero: Hero
  featuredProjects: FeaturedProjects
  services: HomeServices
  testimonials: HomeTestimonials
  cta: HomeCta
}

export interface Value {
  title: string
  description: string
  icon: string
}

export interface AboutStory {
  title: string
  paragraphs: string[]
}

export interface AboutItem {
  title: string
  description: string
  icon: string
  gradient: string
  iconColor: string
  className: string
}

export interface Stat {
  value: string
  label: string
}

export interface About {
  label: string
  title: string
  titleHighlight: string
  textGenerate: string
  description: string
  story: AboutStory
  values: Value[]
  remoteText: string
  mottoText: string
  stats: Stat[]
  items: AboutItem[]
}

export interface Skill {
  title: string
  description: string
  link: string
}

export interface SkillCategory {
  name: string
  description: string
  skills: string[]
}

export interface Proficiency {
  name: string
  level: number
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface TechStackItem {
  id: number
  name: string
  designation: string
  image: string
}

export interface Skills {
  label: string
  title: string
  titleHighlight: string
  description: string
  categories: SkillCategory[]
  proficiency: Proficiency[]
  certifications: Certification[]
  items: Skill[]
  techStack: TechStackItem[]
}

export interface Project {
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  demo: string
  repo: string
  year: string
}

export interface Projects {
  label: string
  title: string
  titleHighlight: string
  description: string
  categories: string[]
  items: Project[]
}

export interface ExperienceContent {
  role: string
  company: string
  description: string
  tags: string[]
}

export interface ExperienceItem {
  title: string
  content: ExperienceContent
}

export interface Experience {
  label: string
  title: string
  titleHighlight: string
  heading: string
  subheading: string
  items: ExperienceItem[]
}

export interface Faq {
  question: string
  answer: string
}

export interface ContactForm {
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  subjectLabel: string
  subjectPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitText: string
}

export interface ContactFooter {
  copyright: string
  builtWith: string
}

export interface Contact {
  label: string
  title: string
  titleHighlight: string
  description: string
  emailLabel: string
  locationLabel: string
  phoneLabel: string
  socialLabel: string
  availability: string
  faq: Faq[]
  form: ContactForm
  footer: ContactFooter
}

export interface SiteData {
  site: Site
  profile: Profile
  home: Home
  about: About
  skills: Skills
  projects: Projects
  experience: Experience
  contact: Contact
}

export async function getSiteData(): Promise<SiteData> {
  const file = await fs.readFile(dataFilePath, "utf-8")
  return JSON.parse(file) as SiteData
}

export async function updateSiteData(data: SiteData): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8")
}
