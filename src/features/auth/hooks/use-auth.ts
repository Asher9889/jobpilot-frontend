"use client"

import { useQuery } from "@tanstack/react-query"
import { AUTH_QUERY_KEY, AUTH_STATUS, TAuthStatus } from "@/constants"
import { getCurrentUser } from "../apis/auth.api"


export function useCurrentUser() {
  const query = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  })

  const status: TAuthStatus = query.isPending ? AUTH_STATUS.LOADING : query.data ? AUTH_STATUS.AUTHENTICATED : AUTH_STATUS.UNAUTHENTICATED;

  return { user: query.data?.data ?? null, status, refetch: query.refetch }
}