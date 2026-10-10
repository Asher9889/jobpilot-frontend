"use client"

import { Plus, Trash2 } from "lucide-react"
import { useFieldArray, type Control } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { ProfileFormValues } from "../types/profile"

export function EducationField({ control }: { control: Control<ProfileFormValues> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  })

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative space-y-3 border p-3 pt-4 sm:grid sm:grid-cols-2 sm:gap-3"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1 right-1"
            onClick={() => remove(index)}
            aria-label="Remove education entry"
          >
            <Trash2 />
          </Button>

          <FormField
            control={control}
            name={`education.${index}.institution`}
            render={({ field: institutionField }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...institutionField}
                    value={institutionField.value ?? ""}
                    placeholder="Institution"
                    className="h-8 text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`education.${index}.degree`}
            render={({ field: degreeField }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...degreeField}
                    value={degreeField.value ?? ""}
                    placeholder="Degree, e.g. B.Tech"
                    className="h-8 text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`education.${index}.fieldOfStudy`}
            render={({ field: fieldOfStudyField }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...fieldOfStudyField}
                    value={fieldOfStudyField.value ?? ""}
                    placeholder="Field of study, e.g. Computer Science"
                    className="h-8 text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`education.${index}.graduationYear`}
            render={({ field: yearField }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={yearField.value ?? ""}
                    onChange={(event) => {
                      const raw = event.target.value
                      yearField.onChange(raw === "" ? null : Number(raw))
                    }}
                    placeholder="Graduation year"
                    className="h-8 text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            institution: "",
            degree: "",
            fieldOfStudy: "",
            graduationYear: null,
          })
        }
        disabled={fields.length >= 10}
      >
        <Plus />
        Add education
      </Button>
    </div>
  )
}
