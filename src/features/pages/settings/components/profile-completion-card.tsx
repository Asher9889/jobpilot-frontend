import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  PROFILE_COMPLETION_SECTIONS,
  PROFILE_COMPLETION_STATUS,
} from "@/constants"
import type { ProfileCompletion } from "../types/profile"

export function ProfileCompletionCard({ completion }: { completion: ProfileCompletion }) {
  const isComplete = completion.status === PROFILE_COMPLETION_STATUS.COMPLETE

  return (
    <Card className="">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-sm font-medium">Profile completion</h2>
            <p className="text-xs text-muted-foreground">
              {isComplete
                ? "Your profile is complete — JobPilot can match you with the best opportunities."
                : "Fill every section to reach 100% and improve job matching."}
            </p>
          </div>
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className={isComplete ? "bg-emerald-600 text-white" : undefined}
          >
            {completion.percentage}%
          </Badge>
        </div>

        <Progress
          value={completion.percentage}
          className={isComplete ? "[&>div]:bg-emerald-600" : undefined}
        />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
          {PROFILE_COMPLETION_SECTIONS.map((section) => (
            <div
              key={section.label}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <dt className="text-muted-foreground">{section.label}</dt>
              <dd className="font-medium">{section.weight}%</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
