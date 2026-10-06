import Link from "next/link"
import { ArrowLeft, ShieldCheck, Smartphone } from "lucide-react"
import { TelegramDummyChat } from "./telegram-dummy-chat"
import { TelegramQr } from "./telegram-qr"

const steps = [
  "Open Telegram on your phone.",
  "Go to Settings → Devices.",
  "Tap Link Desktop Device and scan the code.",
]

export function TelegramLoginPage() {
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
          Scan the QR code with your Telegram app to link your account. This is a UI preview - no
          real connection is made.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-card p-6">
          <div className="mx-auto w-fit rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
            <TelegramQr />
          </div>

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
              <ShieldCheck className="size-4 shrink-0" />
              Waiting for scan - status updates are mocked for this preview.
            </div>
          </div>
        </section>

        <section className="flex min-h-96 flex-col">
          <TelegramDummyChat />
        </section>
      </div>
    </div>
  )
}