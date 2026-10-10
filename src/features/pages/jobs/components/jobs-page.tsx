"use client"

import { useState } from "react"
import { Inbox, RefreshCw, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useJobMatches } from "../hooks/use-job-matches"
import { JobCard } from "./job-card"
import { JobMatchDetailSheet } from "./job-match-detail-sheet"

const PAGE_SIZE = 10

export function JobsPage() {
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data, isLoading, error, refetch, isFetching } = useJobMatches({
    page,
    limit: PAGE_SIZE,
  })

  const matches = data?.matches ?? []
  const pagination = data?.pagination

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Roles scraped from your job sources, AI-scored against your profile.
          Best matches first.
        </p>
      </header>

      {pagination && pagination.total > 0 && (
        <p className="text-xs text-muted-foreground">
          {pagination.total} match{pagination.total === 1 ? "" : "es"} found
        </p>
      )}

      <div className="space-y-4">
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-44 w-full rounded-xl" />
            ))}
          </>
        )}

        {error && !isLoading && (
          <Card className="rounded-xl">
            <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
              <p className="text-sm font-medium text-destructive">
                {error instanceof Error ? error.message : "Could not load job matches."}
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw />
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && (
          <>
            {matches.map((match) => (
              <JobCard
                key={match.id}
                match={match}
                onSelect={setSelectedId}
              />
            ))}

            {matches.length === 0 && (
              <Card className="rounded-xl">
                <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
                  {pagination?.total === 0 ? (
                    <>
                      <Inbox className="size-5 text-muted-foreground" />
                      <p className="text-sm font-medium">No job matches yet</p>
                      <p className="max-w-sm text-xs text-muted-foreground">
                        Matching runs automatically as jobs are scraped from your
                        connected sources. Check back soon, or connect more
                        sources to widen the pool.
                      </p>
                    </>
                  ) : (
                    <>
                      <SearchX className="size-5 text-muted-foreground" />
                      <p className="text-sm font-medium">Nothing on this page</p>
                      <p className="max-w-sm text-xs text-muted-foreground">
                        This page has no rows — jump back to the first page.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(1)}
                      >
                        Back to first page
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} · {pagination.total}{" "}
            total
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.totalPages || isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <JobMatchDetailSheet
        matchId={selectedId}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
      />
    </div>
  )
}
