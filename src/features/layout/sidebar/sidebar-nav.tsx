import { SidebarNavGroup } from "./sidebar-nav-group"
import type { SidebarGroup } from "./sidebar-types"

export function SidebarNav({ groups }: { groups: SidebarGroup[] }) {
  return (
    <>
      {groups.map((group, index) => (
        <SidebarNavGroup key={group.label ?? `group-${index}`} group={group} />
      ))}
    </>
  )
}