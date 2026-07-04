"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import {
  Loader2,
  Save,
  LogOut,
  Home,
  User,
  FileJson,
  Layout,
  Info,
  Wrench,
  FolderKanban,
  Briefcase,
  Mail,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { useAuth } from "@/components/admin/use-auth"
import { RouteGuard } from "@/components/admin/route-guard"
import {
  Field,
  ListEditor,
  SectionCard,
  Tabs,
} from "@/components/admin/edit-helpers"
import type { SiteData } from "@/lib/data"

const tabs = [
  { id: "site", label: "站点", icon: Layout },
  { id: "profile", label: "个人资料", icon: User },
  { id: "home", label: "首页", icon: Layout },
  { id: "about", label: "关于", icon: Info },
  { id: "skills", label: "技能", icon: Wrench },
  { id: "projects", label: "项目", icon: FolderKanban },
  { id: "experience", label: "经历", icon: Briefcase },
  { id: "contact", label: "联系", icon: Mail },
  { id: "json", label: "JSON 源码", icon: FileJson },
]

function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [data, setData] = useState<SiteData | null>(null)
  const [jsonText, setJsonText] = useState("")
  const [activeTab, setActiveTab] = useState("profile")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [jsonError, setJsonError] = useState("")

  useEffect(() => {
    fetch("/api/content", { credentials: "same-origin" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data)
          setJsonText(JSON.stringify(result.data, null, 2))
        }
      })
  }, [])

  const update = (path: string, value: unknown) => {
    if (!data) return
    const keys = path.split(".")
    const next = JSON.parse(JSON.stringify(data)) as SiteData
    let current: Record<string, unknown> = next as unknown as Record<string, unknown>
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] as Record<string, unknown>
    }
    current[keys[keys.length - 1]] = value
    setData(next)
  }

  const syncJsonFromData = () => {
    if (data) {
      setJsonText(JSON.stringify(data, null, 2))
      setJsonError("")
    }
  }

  const syncDataFromJson = () => {
    try {
      const parsed = JSON.parse(jsonText) as SiteData
      setData(parsed)
      setJsonError("")
      return parsed
    } catch (e) {
      setJsonError(e instanceof Error ? e.message : "JSON 解析失败")
      return null
    }
  }

  const handleSave = async () => {
    let payload = data
    if (activeTab === "json") {
      payload = syncDataFromJson()
      if (!payload) {
        setMessage("JSON 解析失败，请检查格式后再保存")
        return
      }
    }

    if (!payload) return
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
        credentials: "same-origin",
      })
      const result = await res.json()
      if (result.success) {
        setMessage("保存成功")
        if (activeTab !== "json" && data) {
          setJsonText(JSON.stringify(data, null, 2))
        }
      } else {
        setMessage(result.message || "保存失败")
      }
    } catch {
      setMessage("网络错误")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Loader2 className="w-8 h-8 animate-spin text-lime-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-lime-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-neutral-900 dark:text-white">管理后台</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-neutral-500 dark:text-neutral-400">
              {user?.username}
            </span>
            <a
              href="/"
              target="_blank"
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="访问前台网站"
            >
              <Home className="w-4 h-4" />
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">退出登录</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(tab) => {
            if (tab === "json") syncJsonFromData()
            setActiveTab(tab)
          }}
        />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 space-y-6"
        >
          {activeTab === "site" && (
            <SectionCard title="站点设置">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="浏览器标签标题" value={data.site.title} onChange={(v) => update("site.title", v)} />
                <Field label="Logo 文字" value={data.site.logoText} onChange={(v) => update("site.logoText", v)} />
              </div>
              <Field
                label="SEO 描述"
                value={data.site.description}
                onChange={(v) => update("site.description", v)}
                textarea
                rows={3}
                className="mt-4"
              />
            </SectionCard>
          )}

          {activeTab === "profile" && (
            <>
              <SectionCard title="个人资料">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="姓名" value={data.profile.name} onChange={(v) => update("profile.name", v)} />
                  <Field label="职位" value={data.profile.title} onChange={(v) => update("profile.title", v)} />
                  <Field label="副标题" value={data.profile.subtitle} onChange={(v) => update("profile.subtitle", v)} />
                  <Field label="可接单文案" value={data.profile.availableText} onChange={(v) => update("profile.availableText", v)} />
                  <Field label="邮箱" value={data.profile.email} onChange={(v) => update("profile.email", v)} />
                  <Field label="电话" value={data.profile.phone} onChange={(v) => update("profile.phone", v)} />
                  <Field label="所在地" value={data.profile.location} onChange={(v) => update("profile.location", v)} />
                </div>
                <Field
                  label="个人简介"
                  value={data.profile.description}
                  onChange={(v) => update("profile.description", v)}
                  textarea
                  rows={4}
                  className="mt-4"
                />
              </SectionCard>

              <SectionCard title="社交链接">
                <ListEditor
                  items={data.profile.socials}
                  onChange={(v) => update("profile.socials", v)}
                  addItem={() => ({ label: "GitHub", href: "#" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field label="平台名称" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
                      <Field label="链接地址" value={item.href} onChange={(v) => updateItem({ ...item, href: v })} />
                    </div>
                  )}
                />
              </SectionCard>
            </>
          )}

          {activeTab === "home" && (
            <>
              <SectionCard title="首屏 Hero">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="角标" value={data.home.hero.badge} onChange={(v) => update("home.hero.badge", v)} />
                  <Field label="问候语" value={data.home.hero.greeting} onChange={(v) => update("home.hero.greeting", v)} />
                  <Field label="姓名" value={data.home.hero.name} onChange={(v) => update("home.hero.name", v)} />
                  <Field label="职位" value={data.home.hero.role} onChange={(v) => update("home.hero.role", v)} />
                  <Field label="主按钮" value={data.home.hero.primaryCta} onChange={(v) => update("home.hero.primaryCta", v)} />
                  <Field label="次按钮" value={data.home.hero.secondaryCta} onChange={(v) => update("home.hero.secondaryCta", v)} />
                </div>
                <Field label="描述" value={data.home.hero.description} onChange={(v) => update("home.hero.description", v)} textarea rows={3} className="mt-4" />
                <Field
                  label="翻转关键词（英文逗号分隔）"
                  value={data.home.hero.flipWords.join(", ")}
                  onChange={(v) => update("home.hero.flipWords", v.split(",").map((s) => s.trim()))}
                  className="mt-4"
                />
              </SectionCard>

              <SectionCard title="精选项目">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="小标题" value={data.home.featuredProjects.label} onChange={(v) => update("home.featuredProjects.label", v)} />
                  <Field label="标题" value={data.home.featuredProjects.title} onChange={(v) => update("home.featuredProjects.title", v)} />
                  <Field label="高亮标题" value={data.home.featuredProjects.titleHighlight} onChange={(v) => update("home.featuredProjects.titleHighlight", v)} />
                </div>
                <Field label="描述" value={data.home.featuredProjects.description} onChange={(v) => update("home.featuredProjects.description", v)} textarea rows={2} className="mt-4" />
              </SectionCard>

              <SectionCard title="服务">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Field label="小标题" value={data.home.services.label} onChange={(v) => update("home.services.label", v)} />
                  <Field label="标题" value={data.home.services.title} onChange={(v) => update("home.services.title", v)} />
                  <Field label="高亮标题" value={data.home.services.titleHighlight} onChange={(v) => update("home.services.titleHighlight", v)} />
                </div>
                <ListEditor
                  items={data.home.services.items}
                  onChange={(v) => update("home.services.items", v)}
                  addItem={() => ({ title: "新服务", description: "服务描述", icon: "Sparkles" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Field label="标题" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
                      <Field label="图标" value={item.icon} onChange={(v) => updateItem({ ...item, icon: v })} />
                      <Field label="描述" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} />
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="客户评价">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Field label="小标题" value={data.home.testimonials.label} onChange={(v) => update("home.testimonials.label", v)} />
                  <Field label="标题" value={data.home.testimonials.title} onChange={(v) => update("home.testimonials.title", v)} />
                  <Field label="高亮标题" value={data.home.testimonials.titleHighlight} onChange={(v) => update("home.testimonials.titleHighlight", v)} />
                </div>
                <ListEditor
                  items={data.home.testimonials.items}
                  onChange={(v) => update("home.testimonials.items", v)}
                  addItem={() => ({ quote: "评价内容", author: "姓名", role: "职位" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="space-y-3">
                      <Field label="评价" value={item.quote} onChange={(v) => updateItem({ ...item, quote: v })} textarea rows={2} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="作者" value={item.author} onChange={(v) => updateItem({ ...item, author: v })} />
                        <Field label="职位" value={item.role} onChange={(v) => updateItem({ ...item, role: v })} />
                      </div>
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="行动召唤 CTA">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="标题" value={data.home.cta.title} onChange={(v) => update("home.cta.title", v)} />
                  <Field label="高亮标题" value={data.home.cta.titleHighlight} onChange={(v) => update("home.cta.titleHighlight", v)} />
                  <Field label="按钮文字" value={data.home.cta.buttonText} onChange={(v) => update("home.cta.buttonText", v)} />
                  <Field label="按钮链接" value={data.home.cta.buttonHref} onChange={(v) => update("home.cta.buttonHref", v)} />
                </div>
                <Field label="描述" value={data.home.cta.description} onChange={(v) => update("home.cta.description", v)} textarea rows={2} className="mt-4" />
              </SectionCard>
            </>
          )}

          {activeTab === "about" && (
            <>
              <SectionCard title="关于 - 标题区">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="小标题" value={data.about.label} onChange={(v) => update("about.label", v)} />
                  <Field label="标题" value={data.about.title} onChange={(v) => update("about.title", v)} />
                  <Field label="高亮标题" value={data.about.titleHighlight} onChange={(v) => update("about.titleHighlight", v)} />
                  <Field label="远程标签" value={data.about.remoteText} onChange={(v) => update("about.remoteText", v)} />
                  <Field label="座右铭" value={data.about.mottoText} onChange={(v) => update("about.mottoText", v)} />
                </div>
                <Field label="动态生成文字" value={data.about.textGenerate} onChange={(v) => update("about.textGenerate", v)} textarea rows={3} className="mt-4" />
                <Field label="详细介绍" value={data.about.description} onChange={(v) => update("about.description", v)} textarea rows={4} className="mt-4" />
              </SectionCard>

              <SectionCard title="我的故事">
                <Field label="标题" value={data.about.story.title} onChange={(v) => update("about.story.title", v)} className="mb-4" />
                <ListEditor
                  items={data.about.story.paragraphs}
                  onChange={(v) => update("about.story.paragraphs", v)}
                  addItem={() => "新段落"}
                  renderItem={(item, _, updateItem) => (
                    <Field label="段落" value={item} onChange={(v) => updateItem(v)} textarea rows={3} />
                  )}
                />
              </SectionCard>

              <SectionCard title="价值观">
                <ListEditor
                  items={data.about.values}
                  onChange={(v) => update("about.values", v)}
                  addItem={() => ({ title: "价值观", description: "描述", icon: "Heart" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Field label="标题" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
                      <Field label="图标" value={item.icon} onChange={(v) => updateItem({ ...item, icon: v })} />
                      <Field label="描述" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} />
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="数据统计">
                <ListEditor
                  items={data.about.stats}
                  onChange={(v) => update("about.stats", v)}
                  addItem={() => ({ value: "0", label: "新数据" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field label="数值" value={item.value} onChange={(v) => updateItem({ ...item, value: v })} />
                      <Field label="标签" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="Bento 卡片">
                <ListEditor
                  items={data.about.items}
                  onChange={(v) => update("about.items", v)}
                  addItem={() => ({
                    title: "新卡片",
                    description: "描述",
                    icon: "Sparkles",
                    gradient: "from-yellow-500/10 to-lime-500/10",
                    iconColor: "text-lime-500",
                    className: "md:col-span-1",
                  })}
                  renderItem={(item, _, updateItem) => (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Field label="标题" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
                        <Field label="图标" value={item.icon} onChange={(v) => updateItem({ ...item, icon: v })} />
                        <Field label="图标颜色类名" value={item.iconColor} onChange={(v) => updateItem({ ...item, iconColor: v })} />
                      </div>
                      <Field label="描述" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} textarea rows={2} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="渐变" value={item.gradient} onChange={(v) => updateItem({ ...item, gradient: v })} />
                        <Field label="布局类名" value={item.className} onChange={(v) => updateItem({ ...item, className: v })} />
                      </div>
                    </div>
                  )}
                />
              </SectionCard>
            </>
          )}

          {activeTab === "skills" && (
            <>
              <SectionCard title="技能 - 标题区">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="小标题" value={data.skills.label} onChange={(v) => update("skills.label", v)} />
                  <Field label="标题" value={data.skills.title} onChange={(v) => update("skills.title", v)} />
                  <Field label="高亮标题" value={data.skills.titleHighlight} onChange={(v) => update("skills.titleHighlight", v)} />
                </div>
                <Field label="描述" value={data.skills.description} onChange={(v) => update("skills.description", v)} textarea rows={3} className="mt-4" />
              </SectionCard>

              <SectionCard title="技能分类">
                <ListEditor
                  items={data.skills.categories}
                  onChange={(v) => update("skills.categories", v)}
                  addItem={() => ({ name: "新分类", description: "描述", skills: ["技能"] })}
                  renderItem={(item, _, updateItem) => (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="名称" value={item.name} onChange={(v) => updateItem({ ...item, name: v })} />
                        <Field label="描述" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} />
                      </div>
                      <Field
                        label="技能列表（英文逗号分隔）"
                        value={item.skills.join(", ")}
                        onChange={(v) => updateItem({ ...item, skills: v.split(",").map((s) => s.trim()) })}
                      />
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="熟练度">
                <ListEditor
                  items={data.skills.proficiency}
                  onChange={(v) => update("skills.proficiency", v)}
                  addItem={() => ({ name: "新技能", level: 80 })}
                  renderItem={(item, _, updateItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                      <Field label="名称" value={item.name} onChange={(v) => updateItem({ ...item, name: v })} />
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          熟练度 ({item.level}%)
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={item.level}
                          onChange={(e) => updateItem({ ...item, level: parseInt(e.target.value) })}
                          className="w-full accent-lime-500"
                        />
                      </div>
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="证书">
                <ListEditor
                  items={data.skills.certifications}
                  onChange={(v) => update("skills.certifications", v)}
                  addItem={() => ({ name: "新证书", issuer: "颁发机构", year: "2024" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Field label="证书名称" value={item.name} onChange={(v) => updateItem({ ...item, name: v })} />
                      <Field label="颁发机构" value={item.issuer} onChange={(v) => updateItem({ ...item, issuer: v })} />
                      <Field label="年份" value={item.year} onChange={(v) => updateItem({ ...item, year: v })} />
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="技能卡片">
                <ListEditor
                  items={data.skills.items}
                  onChange={(v) => update("skills.items", v)}
                  addItem={() => ({ title: "新技能", description: "描述", link: "#" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Field label="标题" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
                        <Field label="链接" value={item.link} onChange={(v) => updateItem({ ...item, link: v })} />
                      </div>
                      <Field label="描述" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} textarea rows={2} />
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="技术栈头像">
                <ListEditor
                  items={data.skills.techStack}
                  onChange={(v) => update("skills.techStack", v)}
                  addItem={() => ({ id: Date.now(), name: "新技术", designation: "角色", image: "" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <Field label="名称" value={item.name} onChange={(v) => updateItem({ ...item, name: v })} />
                      <Field label="角色" value={item.designation} onChange={(v) => updateItem({ ...item, designation: v })} />
                      <Field label="图片 URL" value={item.image} onChange={(v) => updateItem({ ...item, image: v })} className="md:col-span-2" />
                    </div>
                  )}
                />
              </SectionCard>
            </>
          )}

          {activeTab === "projects" && (
            <>
              <SectionCard title="项目 - 标题区">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="小标题" value={data.projects.label} onChange={(v) => update("projects.label", v)} />
                  <Field label="标题" value={data.projects.title} onChange={(v) => update("projects.title", v)} />
                  <Field label="高亮标题" value={data.projects.titleHighlight} onChange={(v) => update("projects.titleHighlight", v)} />
                </div>
                <Field label="描述" value={data.projects.description} onChange={(v) => update("projects.description", v)} textarea rows={3} className="mt-4" />
                <Field
                  label="项目分类筛选项（英文逗号分隔，首个为全部）"
                  value={data.projects.categories.join(", ")}
                  onChange={(v) => update("projects.categories", v.split(",").map((s) => s.trim()))}
                  className="mt-4"
                />
              </SectionCard>

              <SectionCard title="项目列表">
                <ListEditor
                  items={data.projects.items}
                  onChange={(v) => update("projects.items", v)}
                  addItem={() => ({
                    title: "新项目",
                    description: "项目描述",
                    image: "",
                    category: "SaaS",
                    tags: ["Next.js", "TypeScript"],
                    demo: "#",
                    repo: "#",
                    year: "2024",
                  })}
                  renderItem={(item, _, updateItem) => (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Field label="标题" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
                        <Field label="分类" value={item.category} onChange={(v) => updateItem({ ...item, category: v })} />
                        <Field label="年份" value={item.year} onChange={(v) => updateItem({ ...item, year: v })} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Field label="演示链接" value={item.demo} onChange={(v) => updateItem({ ...item, demo: v })} />
                        <Field label="源码链接" value={item.repo} onChange={(v) => updateItem({ ...item, repo: v })} />
                        <Field label="封面 URL" value={item.image} onChange={(v) => updateItem({ ...item, image: v })} />
                      </div>
                      <Field label="描述" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} textarea rows={2} />
                      <Field
                        label="标签（英文逗号分隔）"
                        value={item.tags.join(", ")}
                        onChange={(v) => updateItem({ ...item, tags: v.split(",").map((s) => s.trim()) })}
                      />
                    </div>
                  )}
                />
              </SectionCard>
            </>
          )}

          {activeTab === "experience" && (
            <>
              <SectionCard title="经历 - 标题区">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="小标题" value={data.experience.label} onChange={(v) => update("experience.label", v)} />
                  <Field label="标题" value={data.experience.title} onChange={(v) => update("experience.title", v)} />
                  <Field label="高亮标题" value={data.experience.titleHighlight} onChange={(v) => update("experience.titleHighlight", v)} />
                </div>
                <Field label="经历主标题" value={data.experience.heading} onChange={(v) => update("experience.heading", v)} className="mt-4" />
                <Field label="经历副标题" value={data.experience.subheading} onChange={(v) => update("experience.subheading", v)} textarea rows={2} className="mt-4" />
              </SectionCard>

              <SectionCard title="经历列表">
                <ListEditor
                  items={data.experience.items}
                  onChange={(v) => update("experience.items", v)}
                  addItem={() => ({
                    title: "新经历",
                    content: { role: "职位", company: "公司", description: "经历描述", tags: ["标签"] },
                  })}
                  renderItem={(item, _, updateItem) => (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Field label="时间标题" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
                        <Field label="职位" value={item.content.role} onChange={(v) => updateItem({ ...item, content: { ...item.content, role: v } })} />
                        <Field label="公司" value={item.content.company} onChange={(v) => updateItem({ ...item, content: { ...item.content, company: v } })} />
                      </div>
                      <Field label="描述" value={item.content.description} onChange={(v) => updateItem({ ...item, content: { ...item.content, description: v } })} textarea rows={2} />
                      <Field
                        label="标签（英文逗号分隔）"
                        value={item.content.tags.join(", ")}
                        onChange={(v) => updateItem({ ...item, content: { ...item.content, tags: v.split(",").map((s) => s.trim()) } })}
                      />
                    </div>
                  )}
                />
              </SectionCard>
            </>
          )}

          {activeTab === "contact" && (
            <>
              <SectionCard title="联系 - 标题区">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="小标题" value={data.contact.label} onChange={(v) => update("contact.label", v)} />
                  <Field label="标题" value={data.contact.title} onChange={(v) => update("contact.title", v)} />
                  <Field label="高亮标题" value={data.contact.titleHighlight} onChange={(v) => update("contact.titleHighlight", v)} />
                  <Field label="邮箱标签" value={data.contact.emailLabel} onChange={(v) => update("contact.emailLabel", v)} />
                  <Field label="地址标签" value={data.contact.locationLabel} onChange={(v) => update("contact.locationLabel", v)} />
                  <Field label="电话标签" value={data.contact.phoneLabel} onChange={(v) => update("contact.phoneLabel", v)} />
                  <Field label="社交标签" value={data.contact.socialLabel} onChange={(v) => update("contact.socialLabel", v)} />
                </div>
                <Field label="描述" value={data.contact.description} onChange={(v) => update("contact.description", v)} textarea rows={3} className="mt-4" />
                <Field label="可联系时间" value={data.contact.availability} onChange={(v) => update("contact.availability", v)} textarea rows={2} className="mt-4" />
              </SectionCard>

              <SectionCard title="常见问题">
                <ListEditor
                  items={data.contact.faq}
                  onChange={(v) => update("contact.faq", v)}
                  addItem={() => ({ question: "问题", answer: "回答" })}
                  renderItem={(item, _, updateItem) => (
                    <div className="space-y-3">
                      <Field label="问题" value={item.question} onChange={(v) => updateItem({ ...item, question: v })} />
                      <Field label="回答" value={item.answer} onChange={(v) => updateItem({ ...item, answer: v })} textarea rows={3} />
                    </div>
                  )}
                />
              </SectionCard>

              <SectionCard title="联系表单">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="姓名标签" value={data.contact.form.nameLabel} onChange={(v) => update("contact.form.nameLabel", v)} />
                  <Field label="姓名占位符" value={data.contact.form.namePlaceholder} onChange={(v) => update("contact.form.namePlaceholder", v)} />
                  <Field label="邮箱标签" value={data.contact.form.emailLabel} onChange={(v) => update("contact.form.emailLabel", v)} />
                  <Field label="邮箱占位符" value={data.contact.form.emailPlaceholder} onChange={(v) => update("contact.form.emailPlaceholder", v)} />
                  <Field label="主题标签" value={data.contact.form.subjectLabel} onChange={(v) => update("contact.form.subjectLabel", v)} />
                  <Field label="主题占位符" value={data.contact.form.subjectPlaceholder} onChange={(v) => update("contact.form.subjectPlaceholder", v)} />
                  <Field label="留言标签" value={data.contact.form.messageLabel} onChange={(v) => update("contact.form.messageLabel", v)} />
                  <Field label="留言占位符" value={data.contact.form.messagePlaceholder} onChange={(v) => update("contact.form.messagePlaceholder", v)} />
                  <Field label="提交按钮" value={data.contact.form.submitText} onChange={(v) => update("contact.form.submitText", v)} />
                </div>
              </SectionCard>

              <SectionCard title="页脚">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="版权信息" value={data.contact.footer.copyright} onChange={(v) => update("contact.footer.copyright", v)} />
                  <Field label="技术栈声明" value={data.contact.footer.builtWith} onChange={(v) => update("contact.footer.builtWith", v)} />
                </div>
              </SectionCard>
            </>
          )}

          {activeTab === "json" && (
            <SectionCard title="原始 JSON">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-500 dark:text-neutral-500">
                  直接在下方编辑 JSON 源码，保存前会先验证格式。
                </span>
                {jsonError ? (
                  <span className="flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    {jsonError}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-lime-500">
                    <CheckCircle2 className="w-4 h-4" />
                    JSON 格式正确
                  </span>
                )}
              </div>
              <textarea
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value)
                  try {
                    JSON.parse(e.target.value)
                    setJsonError("")
                  } catch (err) {
                    setJsonError(err instanceof Error ? err.message : "JSON 解析失败")
                  }
                }}
                spellCheck={false}
                className="w-full h-[60vh] px-4 py-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-mono text-sm focus:outline-none focus:border-lime-500 resize-none"
              />
            </SectionCard>
          )}
        </motion.div>
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3">
        {message && (
          <div
            className={`px-4 py-2 rounded-lg text-sm font-medium shadow-lg ${
              message === "保存成功" ? "bg-lime-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {message}
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-yellow-400 to-lime-500 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          保存更改
        </button>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <RouteGuard>
      <Dashboard />
    </RouteGuard>
  )
}
