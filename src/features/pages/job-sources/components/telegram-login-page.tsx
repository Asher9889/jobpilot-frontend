"use client"

import Link from "next/link"
import {
  ArrowLeft,
  CircleCheck,
  CircleX,
  LoaderCircle,
  ShieldCheck,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AUTH_STATUS } from "@/constants"
import { useCurrentUser } from "@/features/auth/hooks/use-auth"
import type { AuthTelegram } from "@/features/auth/types/types"
import { TelegramAvatar } from "@/components/shared/telegram-avatar"
import { isTelegramConnected, telegramDisplayName } from "@/lib/telegram"
import { useTelegramConnect } from "../hooks/use-telegram-connect"
import type { TelegramProfile, TelegramQrCode } from "../types/telegram"
import { TelegramDummyChat } from "./telegram-dummy-chat"
import { TelegramQr } from "./telegram-qr"

const steps = [
  "Open Telegram on your phone.",
  "Go to Settings → Devices.",
  "Tap Link Desktop Device and scan the code.",
]

function formatDateTime(value: string | null) {
  if (!value) return "—"
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 px-3 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  )
}

function QrStep({ qr }: { qr: TelegramQrCode }) {
  return (
    <>
      <div className="mx-auto w-fit rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
        <TelegramQr qr={qr} />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Scan it before it rotates.
      </p>
    </>
  )
}

function ConnectedStep({ user }: { user: TelegramProfile }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
        <CircleCheck className="size-6" />
      </span>
      <div>
        <p className="font-semibold">Telegram connected</p>
        <p className="text-sm text-muted-foreground">
          Logged in as {user.fullName ?? user.username ?? "your Telegram account"}
        </p>
      </div>
    </div>
  )
}

function ConnectedPanel({ telegram }: { telegram: AuthTelegram }) {
  const displayName = telegramDisplayName(telegram)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <TelegramAvatar
          src={telegram.avatarBase64}
          name={displayName}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{displayName}</p>
          <p className="truncate text-sm text-muted-foreground">
            {telegram.username ? `@${telegram.username}` : "No username set"}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Connected
        </span>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        <Detail label="Telegram ID" value={telegram.telegramUserId ?? "—"} />
        <Detail
          label="Username"
          value={telegram.username ? `@${telegram.username}` : "—"}
        />
        <Detail label="Account status" value="Active" />
        <Detail label="Last connected" value={formatDateTime(telegram.lastConnectedAt)} />
      </dl>

      <div className="flex items-start gap-2 rounded-lg bg-muted px-3 py-2.5 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        <span>
          This account is linked to JobPilot. New jobs and updates will be
          delivered in your Telegram chats.
        </span>
      </div>
    </div>
  )
}

function ErrorStep({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-600">
        <CircleX className="size-6" />
      </span>
      <div>
        <p className="font-semibold">Could not connect Telegram</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <Button size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

export function TelegramLoginPage() {
  const { user: authUser, status } = useCurrentUser()
  const { qrCode, user, error, isConnecting, connect } = useTelegramConnect()

  const telegram = authUser?.telegram ?? null
  const isConnected = isTelegramConnected(telegram)

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href="/job-sources"
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Job Sources
      </Link>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isConnected ? "Telegram" : "Connect Telegram"}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {isConnected
            ? "Your Telegram account is linked to JobPilot."
            : "Scan the QR code with your Telegram app to link your account."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-card p-6">
          {status === AUTH_STATUS.LOADING ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          ) : isConnected && telegram ? (
            <ConnectedPanel telegram={telegram} />
          ) : user ? (
            <ConnectedStep user={user} />
          ) : error ? (
            <ErrorStep message={error.message} onRetry={() => connect()} />
          ) : qrCode ? (
            <QrStep qr={qrCode} />
          ) : (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <Button onClick={() => connect()} disabled={isConnecting}>
                {isConnecting && <LoaderCircle className="size-4 animate-spin" />}
                Start Telegram login
              </Button>
            </div>
          )}

          {!isConnected && !user && (
            <div className="mt-6 space-y-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Smartphone className="size-4 text-[#229ed9]" />
                Steps
              </h2>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-foreground">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                {error ? (
                  <>
                    <CircleX className="size-4 shrink-0 text-red-600" />
                    {error.message}
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4 shrink-0" />
                    {isConnecting && !qrCode
                      ? "Fetching QR code..."
                      : qrCode
                        ? "Waiting for scan..."
                        : "Ready - start a login to generate a QR code."}
                  </>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="flex min-h-96 flex-col">
          <TelegramDummyChat variant={isConnected ? "preview" : "login"} />
        </section>
      </div>
    </div>
  )
}
