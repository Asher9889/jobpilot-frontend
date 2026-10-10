"use client"

import { X, Plus } from "lucide-react"
import { useFieldArray, type Control } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SKILL_PROFICIENCY_LEVELS,
  SKILL_PROFICIENCY_LEVEL_LABEL,
  type TSkillProficiencyLevel,
} from "@/constants"
import type { ProfileFormValues } from "../types/profile"

const LEVEL_UNSET = "__NONE__"

export function SkillsField({ control }: { control: Control<ProfileFormValues> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  })

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <FormField
            control={control}
            name={`skills.${index}.name`}
            render={({ field: nameField }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...nameField}
                    placeholder="e.g. React"
                    className="h-8 text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`skills.${index}.level`}
            render={({ field: levelField }) => (
              <FormItem className="w-36">
                <Select
                  value={levelField.value ?? LEVEL_UNSET}
                  onValueChange={(value) =>
                    levelField.onChange(
                      value === LEVEL_UNSET ? null : (value as TSkillProficiencyLevel)
                    )
                  }
                >
                  <FormControl>
                    <SelectTrigger size="sm" className="w-full">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={LEVEL_UNSET}>Level not set</SelectItem>
                    {Object.values(SKILL_PROFICIENCY_LEVELS).map((level) => (
                      <SelectItem key={level} value={level}>
                        {SKILL_PROFICIENCY_LEVEL_LABEL[level]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => remove(index)}
            aria-label="Remove skill"
          >
            <X />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: "", level: null })}
        disabled={fields.length >= 50}
      >
        <Plus />
        Add skill
      </Button>
    </div>
  )
}
