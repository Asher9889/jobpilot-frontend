import { Bell, Shield, User } from "lucide-react"
import Link from "next/link"
import type { ComponentType, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

interface SettingsNavItem {
  label: string
  href?: string
  icon: ComponentType<{ className?: string }>
  active?: boolean
  comingSoon?: boolean
}

const settingsNavItems: SettingsNavItem[] = [
  { label: "Profile", href: "/settings/profile", icon: User, active: true },
  { label: "Account", icon: Shield, comingSoon: true },
  { label: "Notifications", icon: Bell, comingSoon: true },
]

export function SettingsShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Manage how JobPilot works for you.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[210px_minmax(0,1fr)]">
        <nav aria-label="Settings sections" className="space-y-1">
          {settingsNavItems.map((item) => {
            const icon = <item.icon className="size-4" />

            if (item.comingSoon || !item.href) {
              return (
                <div
                  key={item.label}
                  className="flex h-8 items-center gap-2 px-2.5 text-xs text-muted-foreground/60"
                >
                  {icon}
                  {item.label}
                  <Badge variant="outline" className="ml-auto h-4 px-1.5 text-[10px]">
                    Soon
                  </Badge>
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex h-8 items-center gap-2 border px-2.5 text-xs transition-colors",
                  item.active
                    ? "border-border bg-muted font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
