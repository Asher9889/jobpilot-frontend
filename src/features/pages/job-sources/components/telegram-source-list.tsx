"use client"

import { CircleCheck, Pause, Pin, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useTelegramSourceSelection } from "../hooks/use-telegram-source-selection"
import type { TelegramSourceSection } from "../types/telegram-source"

type TelegramSourceListProps = {
  sections: TelegramSourceSection[]
  emptyMessage: string
}

function formatMessageDate(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function PauseSourceDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Pause />
          Pause
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pause monitoring?</AlertDialogTitle>
          <AlertDialogDescription>
            JobPilot will stop checking this source for new job postings. You
            can start monitoring it again any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* TODO: call the backend pause endpoint once it exists; for now the dialog only confirms intent. */}
          <AlertDialogAction>Pause</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function RemoveSourceDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="xs" className="text-destructive hover:text-destructive">
          <Trash2 />
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this source?</AlertDialogTitle>
          <AlertDialogDescription>
            JobPilot will stop monitoring this source and it will disappear
            from your list. The chat itself stays in your Telegram account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* TODO: call the backend remove endpoint once it exists; for now the dialog only confirms intent. */}
          <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function TelegramSourceList({
  sections,
  emptyMessage,
}: TelegramSourceListProps) {
  const { isSelected, toggleSource } = useTelegramSourceSelection()

  const visibleSections = sections.filter((section) => section.sources.length > 0)

  if (visibleSections.length === 0) {
    return (
      <p className="rounded-xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {visibleSections.map((section) => (
        <section key={section.kind} className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {section.label}
            </h3>
            <span className="text-xs text-muted-foreground/70">
              {section.sources.length}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {section.sources.map((source) => {
              const monitored = source.isMonitored
              const checked = isSelected(source.id)
              const Wrapper = monitored ? "div" : "label"

              return (
                <Wrapper
                  key={source.id}
                  className={cn(
                    "group/field-label flex min-w-0 items-start gap-3 rounded-xl border bg-card p-4 transition-colors",
                    monitored
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "cursor-pointer hover:bg-accent/40",
                  )}
                >
                  {monitored ? (
                    <CircleCheck
                      className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      aria-label="Monitored"
                    />
                  ) : (
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleSource(source.id)}
                      className="mt-0.5"
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium">
                        {source.name}
                      </span>
                      {source.pinned && (
                        <Pin className="size-3 shrink-0 text-muted-foreground" />
                      )}
                      {source.unreadCount > 0 && (
                        <span className="ml-auto inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#229ed9] px-1.5 text-[11px] font-semibold text-white">
                          {source.unreadCount}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {source.kind === "channel" ? "Channel" : "Group"}
                      {source.lastMessageDate != null &&
                        ` · ${formatMessageDate(source.lastMessageDate)}`}
                    </span>
                    {source.lastMessageText && (
                      <span className="mt-1 block truncate text-xs text-muted-foreground/80">
                        {source.lastMessageText}
                      </span>
                    )}
                    {monitored && (
                      <span className="mt-2 flex items-center justify-between gap-2 border-t pt-2">
                        <span className="text-xs font-medium text-emerald-600">
                          Monitored
                        </span>
                        <span className="flex items-center gap-1.5">
                          <PauseSourceDialog />
                          <RemoveSourceDialog />
                        </span>
                      </span>
                    )}
                  </span>
                </Wrapper>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
