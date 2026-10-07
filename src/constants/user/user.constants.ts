export const USER_ROLE = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    USER: "USER"
} as const;

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_ACCOUNT_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const;

export type TUserAccountStatus = (typeof USER_ACCOUNT_STATUS)[keyof typeof USER_ACCOUNT_STATUS];