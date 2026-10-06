import { Search } from "lucide-react"
import { SidebarInput } from "@/components/ui/sidebar"

type SidebarSearchProps = {
  placeholder?: string
}

export function SidebarSearch({ placeholder = "Search…" }: SidebarSearchProps) {
  return (
    <div className="relative p-2">
      <Search className="pointer-events-none absolute top-1/2 left-6 size-4 -translate-y-1/2 text-sidebar-foreground/60" />
      <SidebarInput type="search" placeholder={placeholder} className="pl-8 rounded-md" />
    </div>
  )
}