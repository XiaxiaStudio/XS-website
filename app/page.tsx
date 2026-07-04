import { HeroSection } from "@/components/hero-section"
import { FeaturedProjectsSection } from "@/components/featured-projects-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { getSiteData } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const data = await getSiteData()

  return (
    <>
      <HeroSection hero={data.home.hero} profile={data.profile} />
      <FeaturedProjectsSection
        projects={data.home.featuredProjects}
        items={data.projects.items.slice(0, 3)}
      />
      <ServicesSection services={data.home.services} />
      <TestimonialsSection testimonials={data.home.testimonials} />
      <CtaSection cta={data.home.cta} />
    </>
  )
}
