import type { TUserAccountStatus, TUserRole } from "@/constants"

export interface AuthUser {
  id: string
  email: string
  role: TUserRole
  accountStatus: TUserAccountStatus
}

export interface LoginRequest {
  email: string
  password: string
}