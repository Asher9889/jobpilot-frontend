import { TELEGRAM_ACCOUNT_STATUS, type TTelegramAccountStatus } from "@/constants"

export type TelegramAccountSummary = {
  status: TTelegramAccountStatus
  firstName: string | null
  lastName: string | null
  username: string | null
}

export function isTelegramConnected(
  account?: TelegramAccountSummary | null,
): boolean {
  return account?.status === TELEGRAM_ACCOUNT_STATUS.CONNECTED
}

export function telegramDisplayName(account: TelegramAccountSummary): string {
  const fullName = [account.firstName, account.lastName]
    .filter(Boolean)
    .join(" ")
  return fullName || account.username || "Telegram user"
}
