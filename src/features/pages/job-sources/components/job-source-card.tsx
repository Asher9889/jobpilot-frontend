import Link from "next/link"
import { ArrowUpRight, Clock3 } from "lucide-react"
import type { JobSource, JobSourceStatus } from "../types/job-source"

const statusMeta: Record<JobSourceStatus, { label: string; className: string }> = {
  connected: { label: "Connected", className: "text-emerald-600" },
  connectable: { label: "Available", className: "text-foreground" },
  "coming-soon": { label: "Coming soon", className: "text-muted-foreground" },
}

export function JobSourceCard({ source }: { source: JobSource }) {
  const Icon = source.icon
  const meta = statusMeta[source.status]
  const isReady = source.status !== "coming-soon"

  return (
    <div className="flex min-h-48 flex-col gap-4 rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${source.accent}1f`, color: source.accent }}
        >
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{source.name}</h3>
          <p className={`text-xs ${meta.className}`}>{meta.label}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{source.description}</p>

      <div className="mt-auto">
        {isReady && source.connectHref ? (
          <Link
            href={source.connectHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-[#229ed9]"
          >
            Connect
            <ArrowUpRight className="size-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/70">
            <Clock3 className="size-4" />
            Coming soon
          </span>
        )}
      </div>
    </div>
  )
}