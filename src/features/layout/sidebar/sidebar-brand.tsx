import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type SidebarBrandProps = {
  title: string
  description?: string
  href?: string
  logo?: LucideIcon
}

export function SidebarBrand({ title, description, href = "/", logo: Logo }: SidebarBrandProps) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link href={href}>
              <span className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {Logo ? <Logo className="size-4" /> : null}
              </span>
              <span className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold">{title}</span>
                {description && (
                  <span className="truncate text-xs text-sidebar-foreground/70">{description}</span>
                )}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}