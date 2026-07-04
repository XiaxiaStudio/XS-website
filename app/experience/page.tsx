import { ExperienceSection } from "@/components/experience-section"
import { getSiteData } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function ExperiencePage() {
  const data = await getSiteData()

  return <ExperienceSection experience={data.experience} />
}
