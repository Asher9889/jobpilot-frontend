"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AUTH_QUERY_KEY } from "@/constants"
import { loginUser } from "@/features/auth/apis/auth.api"
import type { LoginRequest } from "@/features/auth/types/types"

export function useLogin() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (credentials: LoginRequest) => loginUser(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })
    },
  })

  return {
    login: mutation.mutate,
    isLoggingIn: mutation.isPending,
    isLoggedIn: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  }
}