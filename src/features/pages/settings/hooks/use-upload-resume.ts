"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PROFILE_QUERY_KEY } from "@/constants"
import { uploadCandidateProfileResume } from "../apis/candidate-profile"

export function useUploadResume() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => uploadCandidateProfileResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
    },
  })
}
