export const AUTH_QUERY_KEY = ["auth", "currentUser"] as const;

export const AUTH_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
} as const;
export type TAuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES]


export const AUTH_STATUS = {
  LOADING: "LOADING",
  AUTHENTICATED: "AUTHENTICATED",
  UNAUTHENTICATED: "UNAUTHENTICATED",
} as const;

export type TAuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS]

