import {
  Code2,
  Palette,
  Rocket,
  Sparkles,
  Heart,
  Star,
  BookOpen,
  MessageCircle,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Rocket,
  Sparkles,
  Heart,
  Star,
  BookOpen,
  MessageCircle,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Code2
}
