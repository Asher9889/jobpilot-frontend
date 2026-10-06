import { JobSourcesGrid } from "./job-sources-grid"

export function JobSourcesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Job Sources</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Connect external platforms so JobPilot can post jobs and pull applications into your
          pipeline automatically.
        </p>
      </header>
      <JobSourcesGrid />
    </div>
  )
}