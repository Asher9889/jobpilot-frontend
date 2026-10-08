// Prefix key: invalidating it refreshes both the job-sources list and the
// Telegram available-sources query (["job-sources", "telegram", "available"]).
export const JOB_SOURCES_QUERY_KEY = ["job-sources"] as const;

export const JOB_SOURCE_PROVIDER = {
  TELEGRAM: "TELEGRAM",
  LINKEDIN: "LINKEDIN",
  NAUKRI: "NAUKRI",
  INDEED: "INDEED",
} as const;

export type TJobSourceProvider =
  (typeof JOB_SOURCE_PROVIDER)[keyof typeof JOB_SOURCE_PROVIDER];

export const JOB_SOURCE_TYPE = {
  TELEGRAM_CHANNEL: "TELEGRAM_CHANNEL",
  TELEGRAM_GROUP: "TELEGRAM_GROUP",
  LINKEDIN: "LINKEDIN",
  NAUKRI: "NAUKRI",
  INDEED: "INDEED",
} as const;

export type TJobSourceType = (typeof JOB_SOURCE_TYPE)[keyof typeof JOB_SOURCE_TYPE];

export const JOB_SOURCE_STATUS = {
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

export type TJobSourceStatus =
  (typeof JOB_SOURCE_STATUS)[keyof typeof JOB_SOURCE_STATUS];

export const JOB_SOURCE_SKIP_REASON = {
  ALREADY_EXISTS: "ALREADY_EXISTS",
  DUPLICATE_IN_REQUEST: "DUPLICATE_IN_REQUEST",
} as const;

export type TJobSourceSkipReason =
  (typeof JOB_SOURCE_SKIP_REASON)[keyof typeof JOB_SOURCE_SKIP_REASON];
