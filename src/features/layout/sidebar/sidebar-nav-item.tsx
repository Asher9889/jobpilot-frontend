"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const active = isItemActive(item, pathname)
  const hasChildren = (item.items?.length ?? 0) > 0
  const Icon = item.icon
  const content = (
    <>
      {Icon && <Icon />}
      <span>{item.title}</span>
      {item.badge != null && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    </>
  )

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild={Boolean(item.href) && !hasChildren} isActive={active} tooltip={item.title}>
        {item.href && !hasChildren ? <Link href={item.href}>{content}</Link> : content}
      </SidebarMenuButton>
      {hasChildren && item.items && (
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