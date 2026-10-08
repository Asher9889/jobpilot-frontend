import type {
  TJobSourceProvider,
  TJobSourceSkipReason,
  TJobSourceStatus,
  TJobSourceType,
} from "@/constants"

export interface AddJobSourceItem {
  provider: TJobSourceProvider
  type: TJobSourceType
  externalSourceId: string
}

export interface AddJobSourcesPayload {
  sources: AddJobSourceItem[]
}

export interface JobSourceRecord {
  id: string
  provider: TJobSourceProvider
  type: TJobSourceType
  externalSourceId: string
  sourceName: string
  sourceUsername: string | null
  status: TJobSourceStatus
  createdAt: string
  updatedAt: string
}

export interface GetJobSourcesResult {
  sources: JobSourceRecord[]
}

export interface SkippedJobSource {
  externalSourceId: string
  reason: TJobSourceSkipReason
}

export interface AddJobSourcesResult {
  created: JobSourceRecord[]
  skipped: SkippedJobSource[]
}

export interface JobSourceApiError {
  field?: string
  externalSourceId?: string
  message: string
}
