import { ProjectsSection } from "@/components/projects-section"
import { getSiteData } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const data = await getSiteData()

  return <ProjectsSection projects={data.projects} />
}
