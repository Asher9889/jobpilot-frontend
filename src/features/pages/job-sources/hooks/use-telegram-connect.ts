"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { AUTH_QUERY_KEY } from "@/constants"
import { connectTelegramViaQr } from "../apis/telegram"
import type { TelegramProfile, TelegramQrCode } from "../types/telegram"

export function useTelegramConnect() {
  const [qrCode, setQrCode] = useState<TelegramQrCode | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  const mutation = useMutation({
    mutationFn: async (): Promise<TelegramProfile> => {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()
      return connectTelegramViaQr({
        signal: abortControllerRef.current.signal,
        onQrCode: setQrCode,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
    },
  })

  return {
    qrCode,
    user: mutation.data ?? null,
    error: mutation.error,
    isConnecting: mutation.isPending,
    connect: mutation.mutate,
    reset: mutation.reset,
  }
}
