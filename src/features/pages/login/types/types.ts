import { z } from "zod"
import { loginFormSchema } from "../schema/login.schema"
import type { TUserAccountStatus, TUserRole } from "@/constants"

export type LoginFormValues = z.infer<typeof loginFormSchema>

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  role: TUserRole
  accountStatus: TUserAccountStatus
}