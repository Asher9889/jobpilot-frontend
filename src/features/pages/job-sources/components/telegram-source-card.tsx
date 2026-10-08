"use client"

import Link from "next/link"
import { Send } from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { TelegramAvatar } from "@/components/shared/telegram-avatar"
import type { AuthTelegram } from "@/features/auth/types/types"
import { telegramDisplayName } from "@/lib/telegram"
import { useJobSources } from "../hooks/use-job-sources"

function DisconnectTelegramDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Disconnect
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect Telegram?</AlertDialogTitle>
          <AlertDialogDescription>
            JobPilot will stop monitoring your selected Telegram sources. You can
            reconnect any time by linking your account again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* TODO: call the backend disconnect endpoint once it exists; for now the dialog only confirms intent. */}
          <AlertDialogAction variant="destructive">Disconnect</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function TelegramSourceCard({ telegram }: { telegram: AuthTelegram }) {
  const { sources, isLoading } = useJobSources()
  const monitoredCount = sources.length
  const displayName = telegramDisplayName(telegram)

  return (
    <div className="flex min-h-48 flex-col gap-4 rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: "#229ed91f", color: "#229ed9" }}
        >
          <Send className="size-5" />
        </span>
        <h3 className="min-w-0 truncate font-semibold leading-tight">Telegram</h3>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Connected
        </span>
      </div>

      <div className="flex items-center gap-3">
        <TelegramAvatar src={telegram.avatarBase64} name={displayName} size="lg" />
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">
            Connected as {telegram.username ? `@${telegram.username}` : "your Telegram account"}
          </p>
          <p className="truncate text-sm font-medium">{displayName}</p>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-4 w-36" />
      ) : (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{monitoredCount}</span>{" "}
          {monitoredCount === 1 ? "source" : "sources"} monitored
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Button asChild size="sm">
          <Link href="/job-sources/telegram">Manage Sources</Link>
        </Button>
        <DisconnectTelegramDialog />
      </div>
    </div>
  )
}
