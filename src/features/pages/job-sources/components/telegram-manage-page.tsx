"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CircleAlert, CircleCheck, LoaderCircle, Radar, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { TelegramAvatar } from "@/components/shared/telegram-avatar"
import type { AuthTelegram } from "@/features/auth/types/types"
import { ApiError } from "@/config"
import { JOB_SOURCE_PROVIDER, JOB_SOURCE_TYPE } from "@/constants"
import { telegramDisplayName } from "@/lib/telegram"
import { cn } from "@/lib/utils"
import { useAddJobSources } from "../hooks/use-add-job-sources"
import { useTelegramSourceSelection } from "../hooks/use-telegram-source-selection"
import { useTelegramSources } from "../hooks/use-telegram-sources"
import type {
  AddJobSourceItem,
  AddJobSourcesResult,
  JobSourceApiError,
} from "../types/job-sources-api"
import type {
  TelegramSource,
  TelegramSourceFilter,
  TelegramSourceSection,
} from "../types/telegram-source"
import { TelegramSourceList } from "./telegram-source-list"

const filters: { value: TelegramSourceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "channel", label: "Channels" },
  { value: "group", label: "Groups" },
]

type MonitorFeedback = {
  kind: "success" | "error"
  title: string
  details: string[]
}

function buildSuccessFeedback(result: AddJobSourcesResult): MonitorFeedback {
  const { created, skipped } = result

  if (created.length === 0) {
    return {
      kind: "success",
      title: "Selected sources are already monitored",
      details: [
        `${skipped.length} ${skipped.length === 1 ? "source was" : "sources were"} already added — nothing new to do.`,
      ],
    }
  }

  const createdLabel = `${created.length} ${created.length === 1 ? "source" : "sources"} added — JobPilot will watch ${created.length === 1 ? "it" : "them"} for new jobs.`

  if (skipped.length === 0) {
    return {
      kind: "success",
      title: "Monitoring started",
      details: [createdLabel],
    }
  }

  return {
    kind: "success",
    title: "Monitoring started",
    details: [
      createdLabel,
      `${skipped.length} ${skipped.length === 1 ? "was" : "were"} already monitored.`,
    ],
  }
}

function extractErrorDetails(error: unknown): string[] {
  if (!(error instanceof ApiError)) return []

  return error.errors
    .filter(
      (entry): entry is JobSourceApiError =>
        typeof entry === "object" && entry !== null && "message" in entry,
    )
    .map((entry) => {
      const identifier = entry.externalSourceId ?? entry.field
      return identifier ? `${identifier}: ${entry.message}` : entry.message
    })
}

function SourcesSkeleton() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-24 w-full" />
      ))}
    </div>
  )
}

function SourcesError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-dashed px-4 py-10 text-center">
      <p className="text-sm font-medium">Could not load Telegram sources</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <Button size="sm" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

export function TelegramManagePage({ telegram }: { telegram: AuthTelegram }) {
  const { selectedIds, selectedCount, clearSelection } = useTelegramSourceSelection()
  const { sources, isLoading, error, refetch } = useTelegramSources()
  const monitorMutation = useAddJobSources()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<TelegramSourceFilter>("all")
  const [feedback, setFeedback] = useState<MonitorFeedback | null>(null)

  const displayName = telegramDisplayName(telegram)
  const normalizedQuery = query.trim().toLowerCase()

  const handleMonitor = () => {
    if (selectedCount === 0 || monitorMutation.isPending) return

    const sourcesById = new Map(sources.map((source) => [source.id, source]))
    const items: AddJobSourceItem[] = []
    for (const id of selectedIds) {
      const source = sourcesById.get(id)
      if (!source) continue
      items.push({
        provider: JOB_SOURCE_PROVIDER.TELEGRAM,
        type:
          source.kind === "channel"
            ? JOB_SOURCE_TYPE.TELEGRAM_CHANNEL
            : JOB_SOURCE_TYPE.TELEGRAM_GROUP,
        externalSourceId: source.id,
      })
    }
    if (items.length === 0) return

    setFeedback(null)
    monitorMutation.mutate(
      { sources: items },
      {
        onSuccess: ({ data }) => {
          clearSelection()
          setFeedback(buildSuccessFeedback(data))
        },
        onError: (mutationError) => {
          setFeedback({
            kind: "error",
            title:
              mutationError instanceof Error
                ? mutationError.message
                : "Could not start monitoring",
            details: extractErrorDetails(mutationError),
          })
        },
      },
    )
  }

  const matchesQuery = (source: TelegramSource) =>
    !normalizedQuery || source.name.toLowerCase().includes(normalizedQuery)

  const sections: TelegramSourceSection[] = []
  if (filter !== "group") {
    sections.push({
      kind: "channel",
      label: "Channels",
      sources: sources.filter(
        (source) => source.kind === "channel" && matchesQuery(source),
      ),
    })
  }
  if (filter !== "channel") {
    sections.push({
      kind: "group",
      label: "Groups",
      sources: sources.filter(
        (source) => source.kind === "group" && matchesQuery(source),
      ),
    })
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <Link
        href="/job-sources"
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Job Sources
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Telegram Sources
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Choose the Telegram groups and channels where you want JobPilot to
            find job postings.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
          <TelegramAvatar src={telegram.avatarBase64} name={displayName} size="md" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Connected account</p>
            <p className="flex items-center gap-2 truncate text-sm font-medium">
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
              {telegram.username ? `@${telegram.username}` : displayName}
            </p>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Select sources to monitor</h2>
            <p className="text-xs text-muted-foreground">
              Select the chats you want JobPilot to watch, then click Monitor.
            </p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {selectedCount} selected
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sources..."
              className="pl-9"
              aria-label="Search sources"
            />
          </div>

          <div className="flex w-fit gap-1 rounded-lg border bg-muted p-1">
            {filters.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === option.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <SourcesSkeleton />
        ) : error ? (
          <SourcesError message={error.message} onRetry={() => refetch()} />
        ) : (
          <TelegramSourceList
            sections={sections}
            emptyMessage={
              normalizedQuery
                ? `No sources match "${query.trim()}".`
                : "No groups or channels found on this Telegram account."
            }
          />
        )}
      </section>

      {(feedback || selectedCount > 0) && (
        <div className="pointer-events-none fixed inset-x-0 bottom-16 z-40 flex flex-col items-center gap-2 px-4">
          {feedback && (
            <div
              className={cn(
                "pointer-events-auto flex w-full max-w-xl items-start gap-3 rounded-xl border bg-card px-4 py-3 shadow-lg",
                feedback.kind === "success"
                  ? "border-emerald-500/30"
                  : "border-destructive/30",
              )}
            >
              {feedback.kind === "success" ? (
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              ) : (
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{feedback.title}</p>
                {feedback.details.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                    {feedback.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="button"
                aria-label="Dismiss message"
                onClick={() => setFeedback(null)}
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          {selectedCount > 0 && (
            <div className="pointer-events-auto flex items-center gap-4 rounded-xl border bg-card px-4 py-3 shadow-lg">
              <span className="text-sm text-muted-foreground">
                {selectedCount} {selectedCount === 1 ? "source" : "sources"}{" "}
                selected
              </span>
              <Button size="sm" onClick={handleMonitor} disabled={monitorMutation.isPending}>
                {monitorMutation.isPending ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Radar className="size-4" />
                )}
                Monitor
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
