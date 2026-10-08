import { apiEndPoints, apiRequest } from "@/config"
import type { AxiosApiResponse } from "@/types/api-response.type"
import type {
  AddJobSourcesPayload,
  AddJobSourcesResult,
  GetJobSourcesResult,
} from "../types/job-sources-api"

export async function getJobSources(): Promise<AxiosApiResponse<GetJobSourcesResult>> {
  const endpoint = apiEndPoints.jobSources.list
  return apiRequest<AxiosApiResponse<GetJobSourcesResult>>({
    url: endpoint.url,
    method: endpoint.method,
  })
}

export async function addJobSources(
  payload: AddJobSourcesPayload,
): Promise<AxiosApiResponse<AddJobSourcesResult>> {
  const endpoint = apiEndPoints.jobSources.addSources
  return apiRequest<AxiosApiResponse<AddJobSourcesResult>>({
    url: endpoint.url,
    method: endpoint.method,
    data: payload,
  })
}
