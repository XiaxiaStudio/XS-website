import { SkillsIntroSection } from "@/components/skills-intro-section"
import { SkillCategoriesSection } from "@/components/skill-categories-section"
import { ProficiencySection } from "@/components/proficiency-section"
import { CertificationsSection } from "@/components/certifications-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { getSiteData } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function SkillsPage() {
  const data = await getSiteData()

  return (
    <>
      <SkillsIntroSection skills={data.skills} />
      <SkillCategoriesSection categories={data.skills.categories} />
      <ProficiencySection proficiency={data.skills.proficiency} />
      <TechStackSection techStack={data.skills.techStack} />
      <CertificationsSection certifications={data.skills.certifications} />
    </>
  )
}
