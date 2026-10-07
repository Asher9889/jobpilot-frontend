import { apiEndPoints, apiRequest } from "@/config"
import type { AxiosApiResponse } from "@/types/api-response.type"
import type { AuthUser, LoginRequest } from "../types/types"

export async function loginUser(credentials: LoginRequest): Promise<AxiosApiResponse<unknown[]>> {
  const endpoint = apiEndPoints.auth.login
  return apiRequest<AxiosApiResponse<unknown[]>>({
    url: endpoint.url,
    method: endpoint.method,
    data: credentials,
  })
}

export async function getCurrentUser(): Promise<AxiosApiResponse<AuthUser>> {
  const endpoint = apiEndPoints.auth.me;
  return apiRequest<AxiosApiResponse<AuthUser>>({
    url: endpoint.url,
    method: endpoint.method,
  })
}

export async function logoutUser(): Promise<AxiosApiResponse<unknown[]>> {
  const endpoint = apiEndPoints.auth.logout
  return apiRequest<AxiosApiResponse<unknown[]>>({
    url: endpoint.url,
    method: endpoint.method,
  })
}