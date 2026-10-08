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
import { useTelegramConnect } from "../hooks/use-telegram-connect"
import type { TelegramProfile, TelegramQrCode } from "../types/telegram"
import { TelegramDummyChat } from "./telegram-dummy-chat"
import { TelegramQr } from "./telegram-qr"

const steps = [
  "Open Telegram on your phone.",
  "Go to Settings → Devices.",
  "Tap Link Desktop Device and scan the code.",
]

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

export function TelegramConnectPage() {
  const { qrCode, user, error, isConnecting, connect } = useTelegramConnect()

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
        <h1 className="text-2xl font-semibold tracking-tight">Connect Telegram</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Scan the QR code with your Telegram app to link your account.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-card p-6">
          {user ? (
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

          {!user && (
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
          <TelegramDummyChat />
        </section>
      </div>
    </div>
  )
}
