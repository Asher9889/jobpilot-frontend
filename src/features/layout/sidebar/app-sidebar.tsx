"use client"

import { BriefcaseBusiness } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarBrand } from "./sidebar-brand"
// import { SidebarSearch } from "./sidebar-search"
import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"
import { footerNav, mainNav, sidebarUser } from "./sidebar-config"

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarBrand logo={BriefcaseBusiness} title="JobPilot" description="Hiring workspace" />
      <SidebarContent>
        {/* <SidebarSearch placeholder="Search jobs, candidates…" /> */}
        <SidebarNav groups={mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarNav groups={footerNav} />
        <SidebarUser name={sidebarUser.name} email={sidebarUser.email} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}