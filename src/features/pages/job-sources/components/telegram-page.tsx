"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { AUTH_STATUS } from "@/constants"
import { useCurrentUser } from "@/features/auth/hooks/use-auth"
import { isTelegramConnected } from "@/lib/telegram"
import { TelegramConnectPage } from "./telegram-connect-page"
import { TelegramManagePage } from "./telegram-manage-page"

function TelegramPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Skeleton className="h-4 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-9 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-[72px] w-full" />
        <Skeleton className="h-[72px] w-full" />
        <Skeleton className="h-[72px] w-full" />
      </div>
    </div>
  )
}

export function TelegramPage() {
  const { user, status } = useCurrentUser()

  if (status === AUTH_STATUS.LOADING) {
    return <TelegramPageSkeleton />
  }

  const telegram = user?.telegram ?? null
  if (telegram && isTelegramConnected(telegram)) {
    return <TelegramManagePage telegram={telegram} />
  }

  return <TelegramConnectPage />
}
