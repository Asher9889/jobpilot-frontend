"use client"

import Link from "next/link"
import { ArrowUpRight, Send } from "lucide-react"
import { TelegramAvatar } from "@/components/shared/telegram-avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AUTH_STATUS } from "@/constants"
import { useCurrentUser } from "@/features/auth/hooks/use-auth"
import { isTelegramConnected, telegramDisplayName } from "@/lib/telegram"

function formatDateTime(value: string | null) {
  if (!value) return "—"
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export function TelegramStatusCard() {
  const { user, status } = useCurrentUser()

  const telegram = user?.telegram ?? null
  const connected = isTelegramConnected(telegram)
  const isLoading = status === AUTH_STATUS.LOADING

  return (
    <section className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: "#229ed91f", color: "#229ed9" }}
        >
          <Send className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate font-semibold leading-tight">Telegram</h2>
          <p className="text-xs text-muted-foreground">Job source</p>
        </div>
        {!isLoading && (
          <span
            className={
              connected
                ? "ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600"
                : "ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            }
          >
            <span
              className={
                connected ? "size-1.5 rounded-full bg-emerald-500" : "size-1.5 rounded-full bg-muted-foreground/50"
              }
            />
            {connected ? "Connected" : "Not connected"}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-9 w-32" />
        </div>
      ) : connected && telegram ? (
        <>
          <div className="flex items-center gap-3">
            <TelegramAvatar
              src={telegram.avatarBase64}
              name={telegramDisplayName(telegram)}
              size="md"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {telegramDisplayName(telegram)}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {telegram.username ? `@${telegram.username}` : "Linked account"}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last connected {formatDateTime(telegram.lastConnectedAt)}
          </p>
          <Link
            href="/job-sources/telegram"
            className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium transition-colors hover:text-[#229ed9]"
          >
            View details
            <ArrowUpRight className="size-4" />
          </Link>
        </>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Link Telegram to receive new jobs and application updates directly in
            your chats.
          </p>
          <Link
            href="/job-sources/telegram"
            className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium transition-colors hover:text-[#229ed9]"
          >
            Connect Telegram
            <ArrowUpRight className="size-4" />
          </Link>
        </>
      )}
    </section>
  )
}
