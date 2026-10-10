import { apiEndPoints, apiRequest } from "@/config"
import type { AxiosApiResponse } from "@/types/api-response.type"
import type {
  CandidateProfile,
  UpdateCandidateProfilePayload,
} from "../types/profile"

/** GET auto-creates a blank profile server-side, so the response is never null. */
export async function getCandidateProfile(): Promise<
  AxiosApiResponse<CandidateProfile>
> {
  const endpoint = apiEndPoints.candidateProfile.get
  return apiRequest<AxiosApiResponse<CandidateProfile>>({
    url: endpoint.url,
    method: endpoint.method,
  })
}

export async function updateCandidateProfile(
  payload: UpdateCandidateProfilePayload
): Promise<AxiosApiResponse<CandidateProfile>> {
  const endpoint = apiEndPoints.candidateProfile.update
  return apiRequest<AxiosApiResponse<CandidateProfile>>({
    url: endpoint.url,
    method: endpoint.method,
    data: payload,
  })
}

/**
 * Multipart upload; form field name must be `resume` (max 5 MB, PDF/DOC/DOCX,
 * server sniffs magic bytes). Re-uploading replaces the stored object.
 * Returns the full profile with `resumeObjectKey` set.
 */
export async function uploadCandidateProfileResume(
  file: File
): Promise<AxiosApiResponse<CandidateProfile>> {
  const endpoint = apiEndPoints.candidateProfile.uploadResume
  const formData = new FormData()
  formData.append("resume", file)
  return apiRequest<AxiosApiResponse<CandidateProfile>>({
    url: endpoint.url,
    method: endpoint.method,
    data: formData,
  })
}
