<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# JobPilot Frontend — Conventions & Architecture

The rules below document how this repo is structured. Follow them; do not re-invent. If you are unsure whether a convention still holds, grep the codebase before asking.

## Golden rules

- `app/` lives at the project **ROOT** (not inside `src/`) and contains **routes only**. Each route file is a thin barrel that imports the feature page component and renders it (e.g. `app/login/page.tsx` → `<LoginPage />`). No business logic in `app/`.
- All other code lives in `src/`, imported via the `@/*` alias which maps to `./src/*` (`tsconfig.json` paths).
- Keep `next dev` AGENTS block above; never delete it (it is re-added automatically).
- Raw HTTP goes through the centralized `apiRequest` (axios) — no bare `fetch` for normal JSON endpoints.
- Every API response is typed with the global generic `AxiosApiResponse<T>`.
- TanStack Query v5 for all server state. Always let generics be **inferred** — never write explicit `useMutation<TData, TError, TVars>(...)` unless strictly required.
- zod for validation, react-hook-form + shadcn `Form` for forms.
- Business constants are centralized in `src/constants/`; infrastructure config lives in `src/config/`.

## Folder layout

```
app/                        # routes only (barrels)
  page.tsx
  login/page.tsx
  job-sources/page.tsx
  job-sources/telegram/page.tsx
  layout.tsx               # root shell: sidebar + providers
src/
  components/ui/           # shadcn components (installed via CLI)
  config/                  # axios.ts, apiEndPoints.ts, envConfig.ts, index.ts (barrel)
  constants/               # business constants + index.ts (barrel)
    user/user.constants.ts
  features/
    layout/sidebar/        # app shell (AppSidebar is "use client")
    pages/<feature>/       # one folder per page/domain
      apis/                # raw HTTP functions using apiRequest
      components/          # FLAT components, no subfolders
      hooks/               # data hooks (useMutation/useQuery)
      schema/              # zod schemas only
      types/               # domain types + inferred form-value types
      data/                # optional: static/dummy data
  hooks/                   # app-wide hooks (e.g. use-mobile.ts)
  lib/                     # utils (cn re-exported from "cn")
  providers/               # TanStackClientProviders.tsx (QueryClient etc.)
  types/                   # global types (e.g. api-response.type.ts)
  features/pages/job-sources/data/   # example of data/ usage
```

## Feature build order (top-down)

For a new page feature, build in this order:

```
types → schema → apis → hooks → components → barrel route
```

Example file roles (login feature):

| File | Purpose |
|------|---------|
| `types/types.ts` | All domain interfaces; `LoginFormValues = z.infer<typeof loginFormSchema>` |
| `schema/login.schema.ts` | zod schema only, e.g. `loginFormSchema` |
| `apis/auth.ts` | `loginUser(credentials)` — URL/method from `apiEndPoints`, returns `Promise<AxiosApiResponse<T>>` |
| `hooks/uselogin.ts` | `useLogin()` wraps `useMutation`; generics inferred from `mutationFn` |
| `components/login-form.tsx` | the form (react-hook-form + zodResolver) |
| `components/login-page.tsx` | page composition (header + sections) |
| `app/login/page.tsx` | barrel: import + render `<LoginPage />` |

## API layer rules

- `src/config/axios.ts` — axios instance with `baseURL` from `envConfig` and `withCredentials: true` (cookie auth). The response interceptor unwraps `response.data`, normalizes non-2xx into `ApiError` (`message` + `statusCode`), and handles `/auth/refresh` retry on 401. Call via `apiRequest<T>({ url, method, data })`.
- `src/config/apiEndPoints.ts` — one object, camelCase: `{ <domain>: { <action>: { url, method } } }`. Feature api functions read from here; never hardcode paths in feature code.
- `src/config/envConfig.ts` — reads `process.env.NEXT_PUBLIC_BASE_URL ?? ""`. `import.meta.env` (Vite) **crashes** in Next, and client-side vars must be prefixed `NEXT_PUBLIC_`. Current value: `http://127.0.0.1:4512/api/v1`.
- Server responses: always `AxiosApiResponse<T>` from `src/types/api-response.type.ts` (`{ success, statusCode, message, data }`). Do not duplicate response shapes per endpoint.
- **Exception** — SSE/streaming endpoints (e.g. Telegram QR login) cannot be consumed by axios. Use a `fetch`-based streaming reader, but still resolve the URL/method from `apiEndPoints` + `envConfig`. See `src/features/pages/job-sources/apis/telegram.ts`.

## Constants rules

- Business constants go under `src/constants/<domain>/` (e.g. `user/user.constants.ts`), re-exported from `src/constants/index.ts`.
- File pattern: `<domain>.constants.ts`. Export `as const` objects **plus derived types**, types prefixed `T`:
  ```ts
  export const USER_ROLE = { SUPER_ADMIN: "SUPER_ADMIN", ADMIN: "ADMIN", USER: "USER" } as const;
  export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
  ```
- Constants are the single source of truth — feature types import the derived types from `@/constants`; never re-declare literal unions in feature files.
- Keep infrastructure (axios, env, endpoints) in `src/config/`. Constants are for **business values** (enums, labels, keys).

## Server state (TanStack Query v5)

- Infer generics: `useMutation({ mutationFn: (credentials: LoginRequest) => loginUser(credentials) })` — `data`, `error`, `variables` are all typed from `mutationFn`.
- Provider `src/providers/TanStackClientProviders.tsx` is mounted once in `app/layout.tsx`. Do not create more QueryClientProviders.
- The installed `MutationFunctionContext` has **no `signal`** — manage aborts with `useRef<AbortController>` inside the hook (see `use-telegram-connect.ts`).

## Styling / UI components (Tailwind v4 + shadcn "radix-lyra")

- Use shadcn components from `src/components/ui/`. **Always install via the shadcn CLI** — never write them by hand.
- Add with: `npx shadcn@latest add <name>`.
- Known quirk: the `radix-lyra` registry has an **empty** `form` item. Install form from the new-york style instead:
  `npx shadcn@latest add "https://ui.shadcn.com/r/styles/new-york/form.json"` (it pulls `@radix-ui/react-label`/`@radix-ui/react-slot` automatically).
- Existing ui components import `cn` from `"cn"` (also re-exported at `@/lib/utils`). Feature components use tokens: `bg-card`, `text-muted-foreground`, `border`, `rounded-xl`, `text-xs`.
- File convention: feature components are flat in `components/`; page-level component is `<feature>-page.tsx`.

## Naming

- Files: lowercase, kebab-case; suffixes `*.schema.ts`, `*.constants.ts`, `*.type.ts`; components `<name>.tsx`.
- Hook files export `use<Name>()` (e.g. `uselogin.ts` → `useLogin`, `use-telegram-connect.ts` → `useTelegramConnect`).
- Route barrels export a default fn `<Route>Route` (e.g. `LoginRoute`).
- DOM casing in apiEndPoints: URL paths listed without the `/api/v1` base (the axios `baseURL` provides it).

## Checks

- Before finishing any change, run:
  - `npx tsc --noEmit`
  - `npm run lint`
- Enforced rules to respect: `react-hooks/set-state-in-effect` (no synchronous `setState` in an effect body), `react-hooks/purity` (no impure calls like `Date.now()` during render).
- Pre-existing findings — leave them alone: unused `Image` in `app/page.tsx`; `set-state-in-effect` error in `src/hooks/use-mobile.ts`.

## Backend integration (separate repo)

- Backend repo: `/Users/Programming/jobpilot/jobpilot-backend` (Express). Served at `http://127.0.0.1:4512/api/v1`.
- Runs **without watch** (`tsx --env-file=.env ./src/server.ts`) — after backend edits the process must be restarted manually (`npm run dev` will not pick them up).
- Auth: JWT in **httpOnly cookies** (`accessToken`/`refreshToken`); CORS must allow `http://localhost:3001` with `credentials: true`. Backend `server.ts` must mount `app.use(express.json())` before POST routes or request bodies arrive as `undefined`.
- API reference: `docs/auth-api.md` and `docs/user-api.md` (also mirrored in the backend repo).
