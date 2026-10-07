import type { TTelegramAccountStatus, TUserAccountStatus, TUserRole } from "@/constants"

export interface AuthTelegram {
  id: string
  telegramUserId: string | null
  username: string | null
  firstName: string | null
  lastName: string | null
  avatarBase64: string | null
  status: TTelegramAccountStatus
  lastConnectedAt: string | null
  lastError: string | null
}

export interface AuthUser {
  id: string
  email: string
  role: TUserRole
  accountStatus: TUserAccountStatus
  telegram?: AuthTelegram | null
}

export interface LoginRequest {
  email: string
  password: string
}
