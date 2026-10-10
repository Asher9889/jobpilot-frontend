import { cn } from "cn"

const SIZE = 52
const STROKE = 4
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function scoreColor(score: number) {
  if (score >= 80) return "stroke-emerald-500"
  if (score >= 50) return "stroke-amber-500"
  return "stroke-rose-500"
}

export function MatchScore({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <div
        className="flex flex-col items-center gap-1"
        title="Add skills to your profile to see match scores"
      >
        <span className="flex size-[52px] items-center justify-center rounded-full border-4 border-dashed text-xs font-medium text-muted-foreground">
          —
        </span>
        <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
          Match
        </span>
      </div>
    )
  }

  const offset = CIRCUMFERENCE * (1 - score / 100)

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="relative inline-flex size-[52px] items-center justify-center">
        <svg width={SIZE} height={SIZE} className="-rotate-90" aria-hidden="true">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-muted"
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className={cn("transition-all duration-500", scoreColor(score))}
          />
        </svg>
        <span
          className={cn(
            "absolute text-xs font-semibold tabular-nums",
            score >= 80 && "text-emerald-600",
            score >= 50 && score < 80 && "text-amber-600",
            score < 50 && "text-rose-600"
          )}
        >
          {score}%
        </span>
      </span>
      <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
        Match
      </span>
    </div>
  )
}
