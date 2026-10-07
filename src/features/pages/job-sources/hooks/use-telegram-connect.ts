"use client"

import { useMutation } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { connectTelegramViaQr } from "../apis/telegram"
import type { TelegramConnectedUser, TelegramQrCode } from "../types/telegram"

export function useTelegramConnect() {
  const [qrCode, setQrCode] = useState<TelegramQrCode | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  const mutation = useMutation<TelegramConnectedUser, Error>({
    mutationFn: async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      return connectTelegramViaQr({
        signal: abortControllerRef.current.signal,
        onQrCode: setQrCode,
      })
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