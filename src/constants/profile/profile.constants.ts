export const PROFILE_QUERY_KEY = ["candidate-profile"] as const;

export const SKILL_PROFICIENCY_LEVELS = {
    "BEGINNER": "BEGINNER",
    "INTERMEDIATE": "INTERMEDIATE",
    "ADVANCED": "ADVANCED",
    "EXPERT": "EXPERT"
} as const;

export type TSkillProficiencyLevel =
    (typeof SKILL_PROFICIENCY_LEVELS)[keyof typeof SKILL_PROFICIENCY_LEVELS];

export const SKILL_PROFICIENCY_LEVEL_LABEL: Record<TSkillProficiencyLevel, string> = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
    EXPERT: "Expert",
};

export const WORK_MODE = {
    "REMOTE": "REMOTE",
    "HYBRID": "HYBRID",
    "ONSITE": "ONSITE"
} as const;

export type TWorkMode = (typeof WORK_MODE)[keyof typeof WORK_MODE];

export const WORK_MODE_LABEL: Record<TWorkMode, string> = {
    REMOTE: "Remote",
    HYBRID: "Hybrid",
    ONSITE: "On-site",
};

export const EMPLOYMENT_TYPE = {
    "FULL_TIME": "FULL_TIME",
    "PART_TIME": "PART_TIME",
    "CONTRACT": "CONTRACT",
    "INTERNSHIP": "INTERNSHIP",
    "FREELANCE": "FREELANCE"
} as const;

export type TEmploymentType = (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];

export const EMPLOYMENT_TYPE_LABEL: Record<TEmploymentType, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
    FREELANCE: "Freelance",
};

export const PROFILE_COMPLETION_STATUS = {
    "INCOMPLETE": "INCOMPLETE",
    "PARTIALLY_COMPLETE": "PARTIALLY_COMPLETE",
    "COMPLETE": "COMPLETE"
} as const;

export type TProfileCompletionStatus =
    (typeof PROFILE_COMPLETION_STATUS)[keyof typeof PROFILE_COMPLETION_STATUS];

export const PROFILE_COMPLETION_SECTIONS = [
    { label: "Basic details", weight: 10 },
    { label: "Skills", weight: 25 },
    { label: "Work experience", weight: 25 },
    { label: "Education", weight: 10 },
    { label: "Job preferences", weight: 15 },
    { label: "Resume", weight: 15 },
] as const;
