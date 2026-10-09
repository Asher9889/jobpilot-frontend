"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AUTH_QUERY_KEY, JOB_SOURCES_QUERY_KEY } from "@/constants"
import { disconnectTelegram } from "../apis/telegram"
import { useTelegramSourceSelection } from "./use-telegram-source-selection"

export function useDisconnectTelegram() {
  const queryClient = useQueryClient()
  const { clearSelection } = useTelegramSourceSelection()

  return useMutation({
    mutationFn: () => disconnectTelegram(),
    onSuccess: () => {
      clearSelection()
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: JOB_SOURCES_QUERY_KEY })
    },
  })
}
