"use client"

import { TelegramStatusCard } from "./telegram-status-card"

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Welcome back to JobPilot.
        </p>
      </header>

      <div className="max-w-xl">
        <TelegramStatusCard />
      </div>
    </div>
  )
}
