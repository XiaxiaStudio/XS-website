import { ContactSection } from "@/components/contact-section"
import { getSiteData } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function ContactPage() {
  const data = await getSiteData()

  return <ContactSection contact={data.contact} profile={data.profile} />
}
