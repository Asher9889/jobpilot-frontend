import { cn } from "@/lib/utils"

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
} as const

type TelegramAvatarProps = {
  src: string | null
  name: string
  size?: keyof typeof sizeClasses
  className?: string
}

export function TelegramAvatar({
  src,
  name,
  size = "md",
  className,
}: TelegramAvatarProps) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-semibold text-muted-foreground",
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <span
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${src}")` }}
        />
      ) : (
        name.slice(0, 1).toUpperCase()
      )}
    </span>
  )
}
