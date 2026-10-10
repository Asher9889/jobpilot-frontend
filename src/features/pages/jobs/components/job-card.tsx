"use client"

import { ChevronRight, ExternalLink, Globe, Mail, Phone, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { JobMatchListRow } from "../types/job-match"
import { MatchScore } from "./match-score"

export function JobCard({
  match,
  onSelect,
}: {
  match: JobMatchListRow
  onSelect: (matchId: string) => void
}) {
  const application = match.application

  return (
    <Card className="rounded-xl transition-colors hover:border-ring/40">
      <CardContent className="gap-4 p-4 sm:grid sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex items-start justify-center sm:justify-start">
          <MatchScore score={match.score} />
        </div>

        <div className="min-w-0 space-y-3">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
              <h3 className="text-sm font-semibold">
                {match.roles.length > 0 ? match.roles.join(" • ") : "Untitled role"}
              </h3>
              {match.source && (
                <Badge variant="outline" className="gap-1 text-[11px]">
                  <Send className="size-3" />
                  {match.source.sourceName ?? match.source.provider.toLowerCase()}
                </Badge>
              )}
            </div>
            {match.company && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="flex size-5 items-center justify-center border bg-muted font-semibold text-[10px] text-foreground">
                  {match.company.charAt(0)}
                </span>
                <span className="font-medium text-foreground/80">{match.company}</span>
              </div>
            )}
          </div>

          {match.matchedSkills.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Matched skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {match.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex h-6 items-center border border-emerald-500/30 bg-emerald-500/10 px-2 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">{match.reasonExcerpt}</p>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
            <p className="text-[11px] text-muted-foreground">
              {match.source?.messageDate
                ? new Date(match.source.messageDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </p>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {application.applyUrl && (
                <Button size="xs" asChild>
                  <a href={application.applyUrl} target="_blank" rel="noreferrer">
                    <ExternalLink />
                    Apply now
                  </a>
                </Button>
              )}
              {application.email && (
                <Button size="xs" asChild>
                  <a href={`mailto:${application.email}`}>
                    <Mail />
                    Send email
                  </a>
                </Button>
              )}
              {application.phone && (
                <Button size="xs" variant="outline" asChild>
                  <a href={`tel:${application.phone}`}>
                    <Phone />
                    Call
                  </a>
                </Button>
              )}
              {application.companyWebsite && (
                <Button size="xs" variant="outline" asChild>
                  <a href={application.companyWebsite} target="_blank" rel="noreferrer">
                    <Globe />
                    Website
                  </a>
                </Button>
              )}
              <Button size="xs" variant="ghost" onClick={() => onSelect(match.id)}>
                View details
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
