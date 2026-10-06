"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { SidebarItem } from "./sidebar-types"

function isItemActive(item: SidebarItem, pathname: string): boolean {
  if (item.href) {
    if (item.href === "/") {
      return pathname === "/"
    }
    if (pathname.startsWith(item.href)) {
      return true
    }
  }
  return item.items?.some((sub) => isItemActive(sub, pathname)) ?? false
}

export function SidebarNavItem({ item }: { item: SidebarItem }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  const active = isItemActive(item, pathname)
  const hasChildren = (item.items?.length ?? 0) > 0
  const Icon = item.icon
  const content = (
    <>
      {Icon && <Icon />}
      <span>{item.title}</span>
      {item.badge != null && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
      {hasChildren && (
        <ChevronRight
          className={cn(
            "ml-auto size-4 shrink-0 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      )}
    </>
  )

  return (
    <SidebarMenuItem>
      {hasChildren ? (
        <SidebarMenuButton
          aria-expanded={open}
          isActive={active}
          tooltip={item.title}
          onClick={() => setOpen((value) => !value)}
        >
          {content}
        </SidebarMenuButton>
      ) : item.href ? (
        <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
          <Link href={item.href}>{content}</Link>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton isActive={active} tooltip={item.title}>
          {content}
        </SidebarMenuButton>
      )}
      {hasChildren && open && item.items && (
        <SidebarMenuSub>
          {item.items.map((sub) => (
            <SidebarMenuSubItem key={sub.title}>
              <SidebarMenuSubButton asChild>
                <Link href={sub.href ?? "/"}>
                  <span>{sub.title}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  )
}