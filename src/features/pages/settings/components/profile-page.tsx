"use client"

import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCandidateProfile } from "../hooks/use-candidate-profile"
import { ProfileCompletionCard } from "./profile-completion-card"
import { ProfileForm } from "./profile-form"
import { SettingsShell } from "./settings-shell"

function ProfileLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  )
}

export function ProfilePage() {
  const { data: profile, isLoading, error, refetch } = useCandidateProfile()

  return (
    <SettingsShell>
      <div className="space-y-6">
        <header className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Share your professional details and resume so JobPilot can match the
            right opportunities for you.
          </p>
        </header>

        {isLoading && <ProfileLoadingSkeleton />}

        {error && (
          <Card className="">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="text-xs font-medium text-destructive">
                {error instanceof Error
                  ? error.message
                  : "Could not load your profile."}
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw />
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && profile && (
          <>
            <ProfileCompletionCard completion={profile.profileCompletion} />
            <ProfileForm profile={profile} />
          </>
        )}
      </div>
    </SettingsShell>
  )
}
