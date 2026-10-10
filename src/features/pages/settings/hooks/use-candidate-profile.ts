"use client"

import { useQuery } from "@tanstack/react-query"
import { PROFILE_QUERY_KEY } from "@/constants"
import { getCandidateProfile } from "../apis/candidate-profile"

export function useCandidateProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await getCandidateProfile()
      return response.data
    },
  })
}
