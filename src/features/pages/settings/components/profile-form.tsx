"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  EMPLOYMENT_TYPE,
  EMPLOYMENT_TYPE_LABEL,
  WORK_MODE,
  WORK_MODE_LABEL,
  type TEmploymentType,
  type TWorkMode,
} from "@/constants"
import { useUpdateProfile } from "../hooks/use-update-profile"
import { useUploadResume } from "../hooks/use-upload-resume"
import { profileFormSchema } from "../schema/profile.schema"
import type {
  CandidateProfile,
  ProfileFormValues,
  UpdateCandidateProfilePayload,
} from "../types/profile"
import { EducationField } from "./education-field"
import { OptionChipsField } from "./option-chips-field"
import { ResumeField } from "./resume-field"
import { SkillsField } from "./skills-field"
import { StringListField } from "./string-list-field"

function cleanString(value: string | null | undefined): string | null {
  const trimmed = (value ?? "").trim()
  return trimmed.length > 0 ? trimmed : null
}

function formValuesFromProfile(profile: CandidateProfile): ProfileFormValues {
  return {
    headline: profile?.headline ?? "",
    summary: profile?.summary ?? "",
    skills: profile?.skills?.map((skill) => ({
      name: skill.name,
      level: skill.level ?? null,
    })) ?? [],
    experience: {
      totalYears: profile?.experience?.totalYears ?? null,
      currentRole: profile?.experience?.currentRole ?? "",
      previousRoles: profile?.experience?.previousRoles ?? [],
    },
    education: profile?.education?.map((entry) => ({
      institution: entry.institution ?? "",
      degree: entry.degree ?? "",
      fieldOfStudy: entry.fieldOfStudy ?? "",
      graduationYear: entry.graduationYear ?? null,
    })) ?? [],
    preferences: {
      preferredRoles: profile?.preferences?.preferredRoles ?? [],
      preferredLocations: profile?.preferences?.preferredLocations ?? [],
      workModes: profile?.preferences?.workModes ?? [],
      employmentTypes: profile?.preferences?.employmentTypes ?? [],
      minSalary: profile?.preferences?.minSalary ?? null,
    },
  }
}

function payloadFromFormValues(values: ProfileFormValues): UpdateCandidateProfilePayload {
  return {
    headline: cleanString(values.headline),
    summary: cleanString(values.summary),
    skills: values.skills.map((skill) => ({
      name: skill.name.trim(),
      level: skill.level ?? null,
    })),
    experience: {
      totalYears: values.experience.totalYears ?? null,
      currentRole: cleanString(values.experience.currentRole),
      previousRoles: values.experience.previousRoles,
    },
    education: values.education.map((entry) => ({
      institution: cleanString(entry.institution),
      degree: cleanString(entry.degree),
      fieldOfStudy: cleanString(entry.fieldOfStudy),
      graduationYear: entry.graduationYear ?? null,
    })),
    preferences: {
      preferredRoles: values.preferences.preferredRoles,
      preferredLocations: values.preferences.preferredLocations,
      workModes: values.preferences.workModes,
      employmentTypes: values.preferences.employmentTypes,
      minSalary: values.preferences.minSalary ?? null,
    },
  }
}

function SectionHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-0.5">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]
}

export function ProfileForm({ profile }: { profile: CandidateProfile }) {
  const update = useUpdateProfile()
  const uploadResume = useUploadResume()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: formValuesFromProfile(profile),
  })

  function handleSubmit(values: ProfileFormValues) {
    update.mutate(payloadFromFormValues(values))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
        noValidate
      >
        <Card className="">
          <CardContent className="space-y-4 p-5">
            <SectionHeader
              title="Basic information"
              description="A headline and summary that describe you at a glance."
            />
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Senior Frontend Engineer | React & Next.js"
                      maxLength={160}
                      className="text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                      maxLength={2000}
                      placeholder="A short professional summary — your focus, strengths, and what you are looking for."
                      className="text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="space-y-4 p-5">
            <SectionHeader
              title="Skills"
              description="Skills you want jobs matched against. Optionally rate your proficiency."
            />
            <SkillsField control={form.control} />
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="space-y-4 p-5">
            <SectionHeader
              title="Work experience"
              description="How much experience you have and where you are now."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="experience.totalYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total years of experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={60}
                        value={field.value ?? ""}
                        onChange={(event) => {
                          const raw = event.target.value
                          field.onChange(raw === "" ? null : Number(raw))
                        }}
                        placeholder="e.g. 5"
                        className="text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience.currentRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current role</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="e.g. Software Engineer at Acme"
                        maxLength={120}
                        className="text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="experience.previousRoles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous roles</FormLabel>
                  <FormControl>
                    <StringListField
                      placeholder="e.g. Junior Developer at Beta — press Enter to add"
                      values={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="space-y-4 p-5">
            <SectionHeader
              title="Education"
              description="Your academic background."
            />
            <EducationField control={form.control} />
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="space-y-5 p-5">
            <SectionHeader
              title="Job preferences"
              description="What kind of roles, locations and work styles suit you."
            />
            <FormField
              control={form.control}
              name="preferences.preferredRoles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred roles</FormLabel>
                  <FormControl>
                    <StringListField
                      placeholder="e.g. Frontend Engineer — press Enter to add"
                      values={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences.preferredLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred locations</FormLabel>
                  <FormControl>
                    <StringListField
                      placeholder="e.g. Bengaluru, Pune — press Enter to add"
                      values={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences.workModes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work modes</FormLabel>
                  <FormControl>
                    <OptionChipsField
                      options={Object.values(WORK_MODE).map((mode) => ({
                        value: mode,
                        label: WORK_MODE_LABEL[mode],
                      }))}
                      values={field.value}
                      onToggle={(value) =>
                        field.onChange(toggleValue(field.value, value as TWorkMode))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences.employmentTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment types</FormLabel>
                  <FormControl>
                    <OptionChipsField
                      options={Object.values(EMPLOYMENT_TYPE).map((type) => ({
                        value: type,
                        label: EMPLOYMENT_TYPE_LABEL[type],
                      }))}
                      values={field.value}
                      onToggle={(value) =>
                        field.onChange(
                          toggleValue(field.value, value as TEmploymentType)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences.minSalary"
              render={({ field }) => (
                <FormItem className="sm:max-w-xs">
                  <FormLabel>Minimum salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={field.value ?? ""}
                      onChange={(event) => {
                        const raw = event.target.value
                        field.onChange(raw === "" ? null : Number(raw))
                      }}
                      placeholder="e.g. 150000"
                      className="text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="">
          <CardContent className="space-y-4 p-5">
            <SectionHeader
              title="Resume"
              description="Attach your resume so JobPilot can surface the most relevant jobs."
            />
            <ResumeField
              objectKey={profile.resumeObjectKey ?? null}
              isUploading={uploadResume.isPending}
              error={
                uploadResume.error instanceof Error
                  ? uploadResume.error.message
                  : null
              }
              onUpload={(file) => uploadResume.mutate(file)}
            />
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {update.isError && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {update.error instanceof Error
                ? update.error.message
                : "Could not save your profile."}
            </p>
          )}
          {update.isSuccess && (
            <p role="status" className="text-xs font-medium text-emerald-600">
              Profile saved.
            </p>
          )}
          <Button type="submit" disabled={update.isPending}>
            {update.isPending && <LoaderCircle className="animate-spin" />}
            {update.isPending ? "Saving..." : "Save profile"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
