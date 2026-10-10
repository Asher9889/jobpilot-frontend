"use client"

import { useQuery } from "@tanstack/react-query"
import { JOB_MATCHES_QUERY_KEY } from "@/constants"
import { getJobMatch } from "../apis/job-matches"

export function useJobMatch(id: string | null) {
  return useQuery({
    queryKey: [...JOB_MATCHES_QUERY_KEY, "detail", id] as const,
    queryFn: async () => {
      const response = await getJobMatch(id as string)
      return response.data
    },
    enabled: Boolean(id),
  })
}
