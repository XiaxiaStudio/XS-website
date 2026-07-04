import { AboutSection } from "@/components/about-section"
import { ValuesSection } from "@/components/values-section"
import { StorySection } from "@/components/story-section"
import { getSiteData } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const data = await getSiteData()

  return (
    <>
      <AboutSection about={data.about} />
      <StorySection story={data.about.story} />
      <ValuesSection values={data.about.values} />
    </>
  )
}
