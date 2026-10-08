"use client"

import { useQuery } from "@tanstack/react-query"
import { JOB_SOURCES_QUERY_KEY } from "@/constants"
import { getJobSources } from "../apis/job-sources"

export function useJobSources() {
  const query = useQuery({
    queryKey: JOB_SOURCES_QUERY_KEY,
    queryFn: async () => (await getJobSources()).data,
    staleTime: 30_000,
  })

  return {
    sources: query.data?.sources ?? [],
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  }
}
