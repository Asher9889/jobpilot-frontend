import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

type DummyMessage = {
  id: number
  sender: "telegram" | "you"
  text: string
  at: string
}

const dummyMessages: DummyMessage[] = [
  {
    id: 1,
    sender: "telegram",
    text: "Open Telegram on your phone and scan this code with Settings → Devices → Link Desktop Device.",
    at: "2:41 PM",
  },
  {
    id: 2,
    sender: "telegram",
    text: "It looks like you're trying to log in to JobPilot. Confirm the session on your device.",
    at: "2:41 PM",
  },
  {
    id: 3,
    sender: "you",
    text: "Got it, scanning now...",
    at: "2:42 PM",
  },
  {
    id: 4,
    sender: "telegram",
    text: "Success. You can now use Telegram to receive job alerts. This is a dummy preview - no real connection is made.",
    at: "2:42 PM",
  },
]

export function TelegramDummyChat() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#229ed9]/15 text-[#229ed9]">
          <Send className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight">Telegram</p>
          <p className="text-xs text-muted-foreground">JobPilot login preview</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-emerald-600">
          <span className="size-2 rounded-full bg-emerald-500" />
          online
        </span>
      </header>

      <div className="flex-1 space-y-3 p-4">
        {dummyMessages.map((message) => {
          const isYou = message.sender === "you"
          return (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-0.5",
                isYou ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-snug",
                  isYou
                    ? "rounded-br-sm bg-[#229ed9] text-white"
                    : "rounded-bl-sm bg-muted text-foreground"
                )}
              >
                {message.text}
              </div>
              <span className="px-1 text-[10px] text-muted-foreground/70">{message.at}</span>
            </div>
          )
        })}
      </div>

      <footer className="border-t px-4 py-3 text-xs text-muted-foreground">
        Dummy messages - shown only to demonstrate the QR login flow.
      </footer>
    </div>
  )
}