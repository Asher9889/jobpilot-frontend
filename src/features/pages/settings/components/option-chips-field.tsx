"use client"

import { cn } from "cn"

interface OptionChip {
  value: string
  label: string
}

interface OptionChipsFieldProps {
  options: OptionChip[]
  values: string[]
  onToggle: (value: string) => void
}

export function OptionChipsField({ options, values, onToggle }: OptionChipsFieldProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = values.includes(option.value)

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(option.value)}
            className={cn(
              "h-7 border px-2.5 text-xs transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
