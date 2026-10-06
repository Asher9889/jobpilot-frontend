import {
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  FileText,
  LayoutDashboard,
  ListChecks,
  Settings,
  Users,
} from "lucide-react"
import type { SidebarGroup, SidebarUserInfo } from "./sidebar-types"

export const mainNav: SidebarGroup[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Recruiting",
    items: [
      // { title: "Jobs", href: "/jobs", icon: BriefcaseBusiness, badge: 12 },
      { title: "Job Sources", href: "/job-sources", icon: BriefcaseBusiness },
      { title: "Candidates", href: "/candidates", icon: Users },
      { title: "Companies", href: "/companies", icon: Building2 },
      {
        title: "Applications",
        href: "/applications",
        icon: FileText,
        items: [
          { title: "Pipeline", href: "/applications/pipeline" },
          { title: "Interviewing", href: "/applications/interviewing" },
          { title: "Archived", href: "/applications/archived" },
        ],
      },
    ],
  },
  {
    label: "Organize",
    items: [
      { title: "Tags", href: "/tags", icon: ListChecks },
      { title: "Reports", href: "/reports", icon: FileText },
    ],
  },
]

export const footerNav: SidebarGroup[] = [
  {
    items: [
      { title: "Help & Support", href: "/help", icon: CircleHelp },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export const sidebarUser: SidebarUserInfo = {
  name: "Saurabh Kumar",
  email: "saurabh@jobpilot.dev",
}