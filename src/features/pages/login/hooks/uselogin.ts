"use client"

import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../apis/auth"
import type { LoginRequest } from "../types/types"

export function useLogin() {
  const mutation = useMutation({
    mutationFn: (credentials: LoginRequest) => loginUser(credentials),
  })

  return {
    login: mutation.mutate,
    isLoggingIn: mutation.isPending,
    isLoggedIn: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  }
}