"use client"

import {
  Building2,
  CircleCheck,
  CircleX,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  RefreshCw,
  Send,
  Timer,
  TriangleAlert,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { JOB_MATCHING_STATUS } from "@/constants"
import { useJobMatch } from "../hooks/use-job-match"
import { MatchScore } from "./match-score"

function experienceLabel(minYears: number | null, maxYears: number | null) {
  if (minYears == null && maxYears == null) return null
  if (minYears != null && maxYears != null) {
    return minYears === maxYears ? `${minYears} yrs` : `${minYears}-${maxYears} yrs`
  }
  return minYears != null ? `${minYears}+ yrs` : `up to ${maxYears} yrs`
}

function locationLabel(city: string | null, state: string | null, country: string | null) {
  return [city, state ?? country].filter(Boolean).join(", ") || null
}

function telegramPostUrl(username: string | null, messageId: number | null) {
  if (!username || messageId == null) return null
  return `https://t.me/${username}/${messageId}`
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h4>
      {children}
    </div>
  )
}

export function JobMatchDetailSheet({ matchId, onOpenChange }: { matchId: string | null , onOpenChange: (open: boolean) => void}) {
  const { data: detail, isLoading, error, refetch } = useJobMatch(matchId)
  const job = detail?.job ?? null

  return (
    <Sheet open={Boolean(matchId)} onOpenChange={onOpenChange} >
      <SheetContent className="w-full gap-5 overflow-y-auto data-[side=right]:sm:max-w-3xl p-6"> 
        <SheetHeader>
          <SheetTitle className="text-base">
            {job?.roles?.length
              ? job.roles.join(" • ")
              : isLoading
                ? "Loading match..."
                : "Job match"}
          </SheetTitle>
          <SheetDescription>
            {job?.company ?? "Company unavailable"}
          </SheetDescription>
        </SheetHeader>

        {isLoading && (
          <div className="space-y-4 pr-1">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        )}

        {error && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-destructive">
              {error instanceof Error ? error.message : "Could not load this match."}
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw />
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !error && detail && (
          <div className="space-y-5 pr-1">
            <div className="flex items-center gap-4 border p-3">
              <MatchScore score={detail.score} />
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-medium">AI match score</p>
                {detail.jobMatchingStatus !== JOB_MATCHING_STATUS.COMPLETED && (
                  <p
                    className={
                      detail.jobMatchingStatus === JOB_MATCHING_STATUS.FAILED
                        ? "text-[11px] font-medium text-destructive"
                        : "text-[11px] font-medium text-amber-600"
                    }
                  >
                    Matching status: {detail.jobMatchingStatus.toLowerCase()}
                  </p>
                )}
                {job && (
                  <p className="text-[11px] text-muted-foreground">
                    Scraped{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>

            <Section title="Why this matches">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {detail.reason}
              </p>
            </Section>

            <div className="grid gap-5 sm:grid-cols-2">
              <Section title="Matched skills">
                {detail.matchedSkills.length > 0 ? (
                  <ul className="space-y-1.5">
                    {detail.matchedSkills.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400"
                      >
                        <CircleCheck className="size-3.5 shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">None</p>
                )}
              </Section>
              <Section title="Missing skills">
                {detail.missingSkills.length > 0 ? (
                  <ul className="space-y-1.5">
                    {detail.missingSkills.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <CircleX className="size-3.5 shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">None — full coverage</p>
                )}
              </Section>
            </div>

            {detail.concerns.length > 0 && (
              <Section title="Concerns">
                <ul className="space-y-1.5">
                  {detail.concerns.map((concern) => (
                    <li
                      key={concern}
                      className="inline-flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400"
                    >
                      <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
                      {concern}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {job ? (
              <>
                <Section title="Job details">
                  <Card className="rounded-xl">
                    <CardContent className="space-y-2.5 p-4 text-xs">
                      <p className="inline-flex items-center gap-2 font-medium">
                        <Building2 className="size-3.5 text-muted-foreground" />
                        {job.company ?? "Unknown company"}
                      </p>
                      {experienceLabel(job.experience.minYears, job.experience.maxYears) && (
                        <p className="inline-flex items-center gap-2 text-muted-foreground">
                          <Timer className="size-3.5" />
                          {experienceLabel(job.experience.minYears, job.experience.maxYears)}
                          {" experience"}
                        </p>
                      )}
                      {locationLabel(job.location.city, job.location.state, job.location.country) && (
                        <p className="inline-flex items-center gap-2 text-muted-foreground">
                          <MapPin className="size-3.5" />
                          {locationLabel(job.location.city, job.location.state, job.location.country)}
                        </p>
                      )}
                      {job.application.email && (
                        <p className="inline-flex items-center gap-2 text-muted-foreground">
                          <Mail className="size-3.5" />
                          {job.application.email}
                        </p>
                      )}
                      {job.application.phone && (
                        <p className="inline-flex items-center gap-2 text-muted-foreground">
                          <Phone className="size-3.5" />
                          {job.application.phone}
                        </p>
                      )}
                      <p className="inline-flex items-center gap-2 text-muted-foreground">
                        <Send className="size-3.5" />
                        {job.source.sourceName ?? job.source.provider.toLowerCase()}
                        {job.source.sourceUsername ? ` (@${job.source.sourceUsername})` : ""}
                        {job.source.messageId ? ` · msg ${job.source.messageId}` : ""}
                      </p>
                    </CardContent>
                  </Card>
                </Section>

                <Section title="How to apply">
                  <div className="flex flex-wrap gap-2">
                    {job.application.applyUrl && (
                      <Button size="sm" asChild>
                        <a href={job.application.applyUrl} target="_blank" rel="noreferrer">
                          <ExternalLink />
                          Apply now
                        </a>
                      </Button>
                    )}
                    {job.application.email && (
                      <Button size="sm" asChild>
                        <a href={`mailto:${job.application.email}`}>
                          <Mail />
                          Send email
                        </a>
                      </Button>
                    )}
                    {job.application.phone && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={`tel:${job.application.phone}`}>
                          <Phone />
                          Call HR
                        </a>
                      </Button>
                    )}
                    {job.application.companyWebsite && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={job.application.companyWebsite} target="_blank" rel="noreferrer">
                          <Globe />
                          Company website
                        </a>
                      </Button>
                    )}
                    {telegramPostUrl(job.source.sourceUsername, job.source.messageId) && (
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={telegramPostUrl(job.source.sourceUsername, job.source.messageId)!}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Send />
                          View original post
                        </a>
                      </Button>
                    )}
                  </div>
                </Section>

                <Section title="Raw post">
                  <Card className="rounded-xl">
                    <CardContent className="p-4">
                      <pre className="max-h-64 overflow-y-auto text-[11px] leading-relaxed whitespace-pre-wrap text-muted-foreground">
                        {job.rawMessage || "No raw message captured."}
                      </pre>
                    </CardContent>
                  </Card>
                </Section>
              </>
            ) : (
              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <MessageSquareText className="size-3.5" />
                The original job post is no longer available, but the match
                analysis is kept above.
              </p>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
