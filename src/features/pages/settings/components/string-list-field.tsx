"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StringListFieldProps {
  placeholder: string
  values: string[]
  onChange: (values: string[]) => void
  max?: number
}

export function StringListField({
  placeholder,
  values,
  onChange,
  max = 25,
}: StringListFieldProps) {
  const [draft, setDraft] = useState("")

  function add() {
    const value = draft.trim()
    if (!value || values.includes(value) || values.length >= max) return
    onChange([...values, value])
    setDraft("")
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              add()
            }
          }}
          placeholder={placeholder}
          className="h-8 text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={add}
          disabled={!draft.trim() || values.length >= max}
        >
          Add
        </Button>
      </div>

      {values.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {values.map((value) => (
            <li key={value}>
              <span className="inline-flex h-6 items-center gap-1 border bg-muted px-2 text-xs">
                {value}
                <button
                  type="button"
                  onClick={() => onChange(values.filter((item) => item !== value))}
                  aria-label={`Remove ${value}`}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <X className="size-3" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
