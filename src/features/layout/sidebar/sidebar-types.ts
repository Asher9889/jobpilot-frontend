import type { LucideIcon } from "lucide-react"

export type SidebarItem = {
  title: string
  href?: string
  icon?: LucideIcon
  badge?: string | number
  items?: SidebarItem[]
}

export type SidebarGroup = {
  label?: string
  items: SidebarItem[]
}

export type SidebarUserInfo = {
  name: string
  email?: string
}