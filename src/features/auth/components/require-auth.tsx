"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AUTH_ROUTES, AUTH_STATUS } from "@/constants"
import { useCurrentUser } from "../hooks/use-auth"
import { PageLoader } from "./page-loader"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      router.replace(`${AUTH_ROUTES.LOGIN}?next=${encodeURIComponent(pathname)}`)
    }
  }, [pathname, router, status])

  if (status !== AUTH_STATUS.AUTHENTICATED) {
    return <PageLoader />
  }

  return children
}