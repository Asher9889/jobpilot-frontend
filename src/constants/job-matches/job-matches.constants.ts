// Prefix key for all job-matches queries (list + detail).
export const JOB_MATCHES_QUERY_KEY = ["job-matches"] as const;

export const JOB_MATCHING_STATUS = {
    "PENDING": "PENDING",
    "FAILED": "FAILED",
    "COMPLETED": "COMPLETED"
} as const;

export type TJobMatchingStatus =
    (typeof JOB_MATCHING_STATUS)[keyof typeof JOB_MATCHING_STATUS];
