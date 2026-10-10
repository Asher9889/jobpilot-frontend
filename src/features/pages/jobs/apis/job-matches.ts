import { apiEndPoints, apiRequest } from "@/config"
import type { AxiosApiResponse } from "@/types/api-response.type"
import type { GetJobMatchesResult, JobMatchDetail } from "../types/job-match"

interface GetJobMatchesParams {
  page: number
  limit: number
}

export async function getJobMatches(
  params: GetJobMatchesParams
): Promise<AxiosApiResponse<GetJobMatchesResult>> {
  const endpoint = apiEndPoints.jobMatches.list
  return apiRequest<AxiosApiResponse<GetJobMatchesResult>>({
    url: endpoint.url,
    method: endpoint.method,
    params: { page: params.page, limit: params.limit },
  })
}

export async function getJobMatch(
  id: string
): Promise<AxiosApiResponse<JobMatchDetail>> {
  const endpoint = apiEndPoints.jobMatches.detail
  return apiRequest<AxiosApiResponse<JobMatchDetail>>({
    url: `${endpoint.url}${id}`,
    method: endpoint.method,
  })
}
