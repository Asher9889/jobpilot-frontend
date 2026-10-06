import { jobSources } from "../data/job-sources"
import { JobSourceCard } from "./job-source-card"

export function JobSourcesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {jobSources.map((source) => (
        <JobSourceCard key={source.id} source={source} />
      ))}
    </div>
  )
}