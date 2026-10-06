import type { SidebarUserInfo } from "./sidebar-types"

type SidebarUserProps = SidebarUserInfo & {
  className?: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function SidebarUser({ name, email, className }: SidebarUserProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 rounded-md p-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground">
          {getInitials(name)}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-xs font-medium">{name}</p>
          {email && <p className="truncate text-xs text-sidebar-foreground/70">{email}</p>}
        </div>
      </div>
    </div>
  )
}