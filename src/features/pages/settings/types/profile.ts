import type z from "zod"
import type {
  TEmploymentType,
  TProfileCompletionStatus,
  TSkillProficiencyLevel,
  TWorkMode,
} from "@/constants"
import type { profileFormSchema } from "../schema/profile.schema"

export interface ProfileSkill {
  name: string
  level: TSkillProficiencyLevel | null
}

export interface ProfileExperience {
  totalYears: number | null
  currentRole: string | null
  previousRoles: string[]
}

export interface ProfileEducation {
  institution: string | null
  degree: string | null
  fieldOfStudy: string | null
  graduationYear: number | null
}

export interface ProfilePreferences {
  preferredRoles: string[]
  preferredLocations: string[]
  workModes: TWorkMode[]
  employmentTypes: TEmploymentType[]
  minSalary: number | null
}

export interface ProfileCompletion {
  percentage: number
  status: TProfileCompletionStatus
}

export interface CandidateProfile {
  id: string
  headline: string | null
  summary: string | null
  skills: ProfileSkill[]
  experience: ProfileExperience
  education: ProfileEducation[]
  preferences: ProfilePreferences
  resumeObjectKey: string | null
  profileCompletion: ProfileCompletion
}

export interface UpdateCandidateProfilePayload {
  headline: string | null
  summary: string | null
  skills: ProfileSkill[]
  experience: ProfileExperience
  education: ProfileEducation[]
  preferences: ProfilePreferences
}

export type ProfileFormValues = z.infer<typeof profileFormSchema>
