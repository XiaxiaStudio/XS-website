"use client"

import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  textarea?: boolean
  rows?: number
  className?: string
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  rows = 2,
  className,
}: FieldProps) {
  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500 transition-colors"

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={cn(inputClass, "resize-none")}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  )
}

interface ListEditorProps<T> {
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, update: (item: T) => void, remove: () => void) => React.ReactNode
  addItem: () => T
  label?: string
  addLabel?: string
  className?: string
}

export function ListEditor<T>({
  items,
  onChange,
  renderItem,
  addItem,
  label,
  addLabel = "添加",
  className,
}: ListEditorProps<T>) {
  const update = (index: number, next: T) => {
    const copy = [...items]
    copy[index] = next
    onChange(copy)
  }

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </span>
          <button
            onClick={() => onChange([...items, addItem()])}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-lime-500 rounded-lg hover:bg-lime-600 transition-colors"
          >
            <Plus className="w-3 h-3" />
            {addLabel}
          </button>
        </div>
      )}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
          >
            <button
              onClick={() => remove(idx)}
              className="absolute top-3 right-3 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {renderItem(
              item,
              idx,
              (next) => update(idx, next),
              () => remove(idx)
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface SectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
        {title}
      </h2>
      {children}
    </div>
  )
}

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ComponentType<{ className?: string }> }[]
  activeTab: string
  onChange: (tab: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "bg-lime-500 text-white"
              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
        >
          {tab.icon && <tab.icon className="w-4 h-4" />}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export function Divider({ className }: { className?: string }) {
  return (
    <hr className={cn("border-neutral-200 dark:border-neutral-800", className)} />
  )
}
