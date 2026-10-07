"use client"

import { useCurrentUser } from "@/features/auth/hooks/use-auth"
import { isTelegramConnected, telegramDisplayName } from "@/lib/telegram"
import { jobSources } from "../data/job-sources"
import { JobSourceCard, type JobSourceConnectedUser } from "./job-source-card"

export function JobSourcesGrid() {
  const { user } = useCurrentUser()
  const telegram = user?.telegram ?? null
  const telegramConnected = isTelegramConnected(telegram)

  const telegramUser: JobSourceConnectedUser | undefined =
    telegramConnected && telegram
      ? {
          displayName: telegramDisplayName(telegram),
          username: telegram.username,
          avatarBase64: telegram.avatarBase64,
        }
      : undefined

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {jobSources.map((source) => {
        const isConnectedSource = source.id === "telegram" && !!telegramUser

        return (
          <JobSourceCard
            key={source.id}
            source={isConnectedSource ? { ...source, status: "connected" } : source}
            connectedUser={isConnectedSource ? telegramUser : undefined}
          />
        )
      })}
    </div>
  )
}
