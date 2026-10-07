import { QRCodeSVG } from "qrcode.react"
import type { TelegramQrCode } from "../types/telegram"

type TelegramQrProps = {
  qr: TelegramQrCode
  size?: number
}

export function TelegramQr({ qr, size = 176 }: TelegramQrProps) {
  return (
    <QRCodeSVG
      role="img"
      aria-label="Telegram QR code"
      value={qr.url}
      size={size}
      bgColor="#ffffff"
      fgColor="#111827"
      level="M"
      marginSize={2}
    />
  )
}