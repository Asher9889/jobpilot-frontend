import type { TJobSourceProvider, TJobMatchingStatus } from "@/constants"

/** Trimmed source row — subset of the detail's `job.source`, same field names. */
export interface JobSourceMini {
  provider: TJobSourceProvider
  sourceName: string | null
  sourceUsername: string | null
  sourceType: string | null
  messageId: number
  messageDate: string | null
}

/** Contact/application channels parsed out of the post — every field optional. */
export interface JobApplication {
  email: string | null
  phone: string | null
  applyUrl: string | null
  companyWebsite: string | null
}

export interface JobMatchListRow {
  /** Match id — pass to the detail endpoint (not the job id). */
  id: string
  jobId: string
  score: number
  company: string | null
  roles: string[]
  matchedSkills: string[]
  reasonExcerpt: string
  source: JobSourceMini | null
  application: JobApplication
}

export interface JobMatchesPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface GetJobMatchesResult {
  matches: JobMatchListRow[]
  pagination: JobMatchesPagination
}

export interface JobSummary {
  id: string
  company: string | null
  roles: string[]
  experience: { minYears: number | null; maxYears: number | null }
  location: { city: string | null; state: string | null; country: string | null }
  skills: string[]
  application: JobApplication
  source: {
    provider: TJobSourceProvider
    externalSourceId: string
    messageId: number
    sourceName: string | null
    sourceUsername: string | null
    sourceType: string | null
    messageDate: string | null
  }
  rawMessage: string
  createdAt: string
}

export interface JobMatchDetail {
  id: string
  jobId: string
  score: number
  reason: string
  matchedSkills: string[]
  missingSkills: string[]
  concerns: string[]
  jobMatchingStatus: TJobMatchingStatus
  createdAt: string
  job: JobSummary | null
}
