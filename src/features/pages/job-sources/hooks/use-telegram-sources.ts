"use client"

import { useQuery } from "@tanstack/react-query"
import { getAvailableTelegramSources } from "../apis/telegram"
import type { TelegramSource, TelegramSourceDto } from "../types/telegram-source"

export const TELEGRAM_SOURCES_QUERY_KEY = [ "job-sources", "telegram", "available"] as const

function toTelegramSource(dto: TelegramSourceDto): TelegramSource | null {
  if (!dto.id) {
    return null
  }

  return {
    id: dto.id,
    name: dto.name ?? dto.title ?? "Untitled source",
    kind: dto.isChannel ? "channel" : "group",
    pinned: dto.pinned ?? false,
    archived: dto.archived ?? false,
    unreadCount: dto.unreadCount ?? 0,
    lastMessageText: dto.lastMessageText ?? null,
    lastMessageDate: dto.lastMessageDate ?? null,
    isMonitored: dto.isMonitored ?? false,
  }
}

export function useTelegramSources() {
  const query = useQuery({
    queryKey: TELEGRAM_SOURCES_QUERY_KEY,
    queryFn: getAvailableTelegramSources,
    staleTime: 30_000,
    retry: false,
  })

  const sources = (query.data?.data ?? [])
    .map(toTelegramSource)
    .filter((source): source is TelegramSource => source !== null)

  return {
    sources,
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  }
}
