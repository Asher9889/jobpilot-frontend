import z from "zod"
import {
  EMPLOYMENT_TYPE,
  SKILL_PROFICIENCY_LEVELS,
  WORK_MODE,
  type TEmploymentType,
  type TSkillProficiencyLevel,
  type TWorkMode,
} from "@/constants"

const SKILL_LEVEL_VALUES = Object.values(
  SKILL_PROFICIENCY_LEVELS
) as [TSkillProficiencyLevel, ...TSkillProficiencyLevel[]]

const WORK_MODE_VALUES = Object.values(WORK_MODE) as [TWorkMode, ...TWorkMode[]]

const EMPLOYMENT_TYPE_VALUES = Object.values(EMPLOYMENT_TYPE) as [
  TEmploymentType,
  ...TEmploymentType[],
]

// Mirrors the backend zod schema (graduationYear cannot be in the future).
const CURRENT_YEAR = new Date().getFullYear()

export const profileSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required")
    .max(60, "Skill name must be at most 60 characters"),
  level: z.enum(SKILL_LEVEL_VALUES).nullable(),
})

export const profileEducationSchema = z.object({
  institution: z.string().trim().max(120),
  degree: z.string().trim().max(120),
  fieldOfStudy: z.string().trim().max(120),
  graduationYear: z
    .number()
    .int("Enter a valid year")
    .min(1950, "Enter a valid year")
    .max(CURRENT_YEAR, `Year cannot be later than ${CURRENT_YEAR}`)
    .nullable(),
})

export const profileFormSchema = z.object({
  headline: z.string().trim().max(160, "Headline must be at most 160 characters"),
  summary: z.string().trim().max(2000, "Summary must be at most 2000 characters"),
  skills: z.array(profileSkillSchema).max(50, "You can add up to 50 skills"),
  experience: z.object({
    totalYears: z
      .number()
      .int("Enter a whole number of years")
      .min(0, "Years of experience cannot be negative")
      .max(60, "Enter a realistic number")
      .nullable(),
    currentRole: z.string().trim().max(120),
    previousRoles: z
      .array(z.string().trim().min(1).max(120))
      .max(25, "You can add up to 25 previous roles"),
  }),
  education: z
    .array(profileEducationSchema)
    .max(10, "You can add up to 10 education entries"),
  preferences: z.object({
    preferredRoles: z
      .array(z.string().trim().min(1).max(120))
      .max(25, "You can add up to 25 roles"),
    preferredLocations: z
      .array(z.string().trim().min(1).max(120))
      .max(25, "You can add up to 25 locations"),
    workModes: z.array(z.enum(WORK_MODE_VALUES)).max(3),
    employmentTypes: z.array(z.enum(EMPLOYMENT_TYPE_VALUES)).max(5),
    minSalary: z
      .number()
      .int("Enter a whole amount")
      .min(0, "Salary cannot be negative")
      .nullable(),
  }),
})
