import { apiEndPoints, apiRequest } from "@/config"
import { AxiosApiResponse } from "@/types/api-response.type"
import type { LoginRequest } from "../types/types"

export async function loginUser(credentials: LoginRequest): Promise<AxiosApiResponse<unknown[]>> {
  const endpoint = apiEndPoints.auth.login

  return apiRequest<AxiosApiResponse<unknown[]>>({
    url: endpoint.url,
    method: endpoint.method,
    data: credentials,
  })
}