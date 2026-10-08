"use client"

import { useCurrentUser } from "@/features/auth/hooks/use-auth"
import { isTelegramConnected } from "@/lib/telegram"
import { jobSources } from "../data/job-sources"
import { JobSourceCard } from "./job-source-card"
import { TelegramSourceCard } from "./telegram-source-card"

export function JobSourcesGrid() {
  const { user } = useCurrentUser()
  const telegram = user?.telegram ?? null
  const telegramConnected = isTelegramConnected(telegram)

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {jobSources.map((source) => {
        if (source.id === "telegram" && telegramConnected && telegram) {
          return <TelegramSourceCard key={source.id} telegram={telegram} />
        }

        return <JobSourceCard key={source.id} source={source} />
      })}
    </div>
  )
}
