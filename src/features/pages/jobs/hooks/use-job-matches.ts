"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { JOB_MATCHES_QUERY_KEY } from "@/constants"
import { getJobMatches } from "../apis/job-matches"

interface UseJobMatchesOptions {
  page: number
  limit: number
}

export function useJobMatches({ page, limit }: UseJobMatchesOptions) {
  return useQuery({
    queryKey: [...JOB_MATCHES_QUERY_KEY, "list", page, limit] as const,
    queryFn: async () => {
      const response = await getJobMatches({ page, limit })
      return response.data
    },
    placeholderData: keepPreviousData,
  })
}
