import { BriefcaseBusiness, Globe, Network, Send } from "lucide-react"
import type { JobSource } from "../types/job-source"

export const jobSources: JobSource[] = [
  {
    id: "telegram",
    name: "Telegram",
    description:
      "Scan a QR code once and JobPilot will send new jobs and updates straight to your Telegram.",
    accent: "#229ed9",
    icon: Send,
    status: "connectable",
    connectHref: "/job-sources/telegram",
  },
  {
    id: "naukri",
    name: "Naukri",
    description: "Sync applications and job postings from your Naukri recruiter account.",
    accent: "#f47521",
    icon: BriefcaseBusiness,
    status: "coming-soon",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Post jobs and import candidates directly from LinkedIn Recruiter.",
    accent: "#0a66c2",
    icon: Network,
    status: "coming-soon",
  },
  {
    id: "indeed",
    name: "Indeed",
    description: "Centralize your Indeed postings and applicants in a single pipeline.",
    accent: "#2557a7",
    icon: Globe,
    status: "coming-soon",
  },
]