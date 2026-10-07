export type TelegramQrCode = {
  url: string
  expires: number
}

export type TelegramProfilePhoto = {
  photoId: string
  dcId: number
  hasVideo: boolean
  thumbBase64: string | null
  avatarBase64: string | null
}

export type TelegramProfile = {
  id: string
  firstName: string | null
  lastName: string | null
  fullName: string | null
  username: string | null
  phone: string | null
  photo: TelegramProfilePhoto | null
  isPremium: boolean
  isVerified: boolean
  isSelf: boolean
}

export type TelegramConnectViaQrResponse = {
  id: string,
  user: TelegramProfile,
}

export type TelegramConnectError = {
  message: string
}

export type TelegramSseEvent =
  | { type: "qr"; data: TelegramQrCode }
  | { type: "done"; data: TelegramConnectViaQrResponse }
  | { type: "error"; data: TelegramConnectError }

export type ConnectTelegramViaQrOptions = {
  signal?: AbortSignal
  onQrCode?: (qrCode: TelegramQrCode) => void
}