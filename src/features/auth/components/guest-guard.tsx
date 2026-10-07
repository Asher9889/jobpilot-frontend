"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AUTH_ROUTES, AUTH_STATUS } from "@/constants"
import { useCurrentUser } from "../hooks/use-auth"
import { PageLoader } from "./page-loader"

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { status } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (status !== AUTH_STATUS.AUTHENTICATED) return;
    const next = new URLSearchParams(window.location.search).get("next")
    const target = next && next.startsWith("/") ? next : AUTH_ROUTES.HOME
    router.replace(target)
  }, [router, status])

  if (status !== AUTH_STATUS.UNAUTHENTICATED) {
    return <PageLoader />
  }

  return children;
}