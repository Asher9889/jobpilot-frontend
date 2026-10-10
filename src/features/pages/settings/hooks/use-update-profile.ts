"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PROFILE_QUERY_KEY } from "@/constants"
import { updateCandidateProfile } from "../apis/candidate-profile"
import type { UpdateCandidateProfilePayload } from "../types/profile"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateCandidateProfilePayload) =>
      updateCandidateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
    },
  })
}
