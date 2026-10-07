export type TelegramQrCode = {
  url: string
  expires: number
}

export type TelegramConnectedUser = {
  id: number | string
  user: string
}

export type TelegramConnectError = {
  message: string
}

export type TelegramSseEvent =
  | { type: "qr"; data: TelegramQrCode }
  | { type: "done"; data: TelegramConnectedUser }
  | { type: "error"; data: TelegramConnectError }

export type ConnectTelegramViaQrOptions = {
  signal?: AbortSignal
  onQrCode?: (qrCode: TelegramQrCode) => void
}