import { useMutation, useQueryClient } from "@tanstack/react-query"
import { JOB_SOURCES_QUERY_KEY } from "@/constants"
import { addJobSources } from "../apis/job-sources"
import type { AddJobSourcesPayload } from "../types/job-sources-api"

export function useAddJobSources() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AddJobSourcesPayload) => addJobSources(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOB_SOURCES_QUERY_KEY })
    },
  })
}
