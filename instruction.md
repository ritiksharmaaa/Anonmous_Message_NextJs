# anon_msg codebase guide

Use this checklist to get productive in a minute and follow the existing patterns.

## Quick setup
- Requirements: Node 18+, npm. Clone repo, `cd anon_msg`, then `npm install`.
- Env (.env.local): `MONGODB_URI`, `NEXTAUTH_SECRET`, `RESEND_API_KEY`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`. Add `NEXTAUTH_URL` when deploying.
- Scripts: `npm run dev` (app), `npm run lint` (eslint), `npm run build` (production check). Lint currently fails on pre-existing issues called out in `npm run lint`; do not treat as new regressions.

## Project layout & naming
- App Router with route groups: `(app)` for marketing/dashboard pages, `(auth)` for auth flows, `/u/[username]` for public profiles. Global shell in `src/app/layout.tsx`.
- API route handlers live in `src/api/<feature>/route.ts`; HTTP verb exports (GET/POST/DELETE) define behavior. Always call `dbConnect()` first.
- UI components: Shadcn-based primitives in `src/components/ui`, custom pieces in `src/components/created`, feature blocks in `src/components/app-feature.tsx`.
- Shared concerns: `src/context` (AuthProvider, ThemeProvider), `src/lib` (db/resend/utils), `src/helpers` (mail), `src/schemas` (Zod validation), `src/model` (Mongoose schemas), `src/types` (ApiResponse, next-auth augmentation), `src/middlewares` (auth redirect logic).
- Path aliasing is enabled (`@/*` -> `src/*`); use it instead of relative paths.

## API design style
- Pattern: `dbConnect()` ➜ session check via `getServerSession(authOptions)` when protected ➜ validate request with Zod schema ➜ perform Mongoose action ➜ return `Response.json(ApiResponse)`.
- Authentication: NextAuth JWT strategy with Google, GitHub, and credentials; custom fields (`_id`, `isVerified`, `isAcceptingMessages`, `username`) flow through jwt/session as defined in `src/types/next-auth.d.ts`.
- Examples: message acceptance (`/api/is-accepting-messages` GET/POST), inbox fetch (`/api/get-user-messages` with aggregation + Zod message validation), message send/delete routes, username uniqueness and OTP verification routes.
- Streaming AI: `/api/suggest-messages` uses `ai` + `@ai-sdk/openai` (`streamText`) with `convertToModelMessages` and returns `toUIMessageStreamResponse`.

## Database schema (MongoDB via Mongoose)
- Defined in `src/model/User.model.tsx`. User fields: `username`, `password`, `email`, `verifyCode`, `verifyCodeExpire`, `isAcceptingMessages` (default true), `isVerified` (default false), and embedded `messages`.
- Embedded `Message` schema: `{ content: string; createdAt: Date }` stored inside each user doc. Message arrays are unwound/aggregated in read APIs and appended directly in write APIs.
- Passwords hashed with `bcryptjs`; verification codes are 6-digit strings with expiry windows.

## Styling & UI patterns
- Tailwind v4 with CSS variable design tokens in `src/app/globals.css`; theme toggles via `[data-theme]` set by `ThemeProvider` and inline `themeInitScript`.
- Components favor Shadcn “new-york” styling, `lucide-react` icons, `sonner` for toasts, `react-hook-form` + `@hookform/resolvers/zod` for form validation, and `axios` for client-side API calls.
- `cn` helper in `src/lib/utils.ts` merges classNames; keep class composition consistent.

## Email & external services
- Resend client in `src/lib/resend.ts`; verification email template in `src/email_template_resend/verificationEmail.tsx` via `@react-email/components`.
- OpenAI access through `ai` SDK; uses `gpt-4.1` model identifier.
- NextAuth requires provider secrets plus `NEXTAUTH_SECRET`; middleware in `src/middleware.ts` + `src/middlewares/authMiddleware.ts` redirects based on auth status.

## Working style
- Favor small, single-responsibility handlers with explicit HTTP verb exports.
- Validate inputs with the existing Zod schemas (`src/schemas/*`) before DB work; reuse `ApiResponse` shape for consistency.
- Keep embedded message operations aggregation-based (see `/api/get-user-messages`) and respect `isAcceptingMessages` checks before writes.
- When updating UI, stick to existing tokenized Tailwind classes and data-theme approach rather than ad-hoc colors.
