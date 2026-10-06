import type { LucideIcon } from "lucide-react"

export type JobSourceStatus = "connected" | "connectable" | "coming-soon"

export type JobSource = {
  id: string
  name: string
  description: string
  accent: string
  icon: LucideIcon
  status: JobSourceStatus
  connectHref?: string
}