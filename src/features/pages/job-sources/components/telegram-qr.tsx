import { QRCodeSVG } from "qrcode.react"

type TelegramQrProps = {
  value?: string
  size?: number
}

export function TelegramQr({
  value = "tg://login?token=jobpilot-preview",
  size = 176,
}: TelegramQrProps) {
  return (
    <QRCodeSVG
      // role="img"
      aria-label="Telegram QR code"
      value={value}
      size={size}
      bgColor="#ffffff"
      fgColor="#111827"
      level="M"
      marginSize={2}
    />
  )
}