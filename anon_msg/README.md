# AnonMsg — Anonymous Messaging Platform

AnonMsg is a full-stack Next.js application that lets users receive anonymous messages through a public profile link.  
It includes authentication, email verification, message management, and AI-powered prompt suggestions.

## Features

- Username/email sign-up with OTP email verification
- Credential login plus Google and GitHub OAuth (NextAuth)
- Public profile pages (`/u/[username]`) for anonymous message submission
- Dashboard for viewing and deleting received messages
- Toggle to accept or pause incoming anonymous messages
- AI-generated message suggestions (OpenRouter) with fallback prompts
- Contact form endpoint and database health endpoint
- Dark/light theme support

## Tech Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Auth:** NextAuth (Credentials, Google, GitHub)
- **Database:** MongoDB + Mongoose
- **Validation:** Zod + React Hook Form
- **UI:** Tailwind CSS, Radix UI, custom components
- **Email:** Resend (verification and contact flow)
- **AI:** OpenRouter SDK

## Project Structure

```text
src/
├── app/
│   ├── (app)/                  # Main pages (landing, dashboard, public profile, legal pages)
│   ├── (auth)/                 # Sign-in, sign-up, verify routes
│   ├── api/                    # API route handlers
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── created/                # App-specific components
│   └── ui/                     # Reusable UI primitives
├── context/                    # Session/theme providers
├── helpers/                    # Email helper logic
├── lib/                        # DB and third-party client setup
├── middlewares/                # Auth middleware logic
├── model/                      # Mongoose models
├── schemas/                    # Zod validation schemas
└── types/                      # Shared TypeScript types
```

## API Overview

- `POST /api/sign-up` — create or update unverified account, send OTP
- `POST /api/user-otp-verification` — verify account using OTP
- `POST /api/resend-otp` — resend verification code
- `GET /api/unique-username-check` — username availability check
- `POST /api/send-user-messages` — send anonymous message to a user
- `GET /api/get-user-messages` — fetch authenticated user messages
- `DELETE /api/delete-message` — delete a message from dashboard
- `GET/POST /api/is-accepting-messages` — get or set message acceptance
- `GET /api/check-acceptance` — check if a public user accepts messages
- `GET /api/discover-channels` — list verified user channels
- `POST /api/suggest-messages` — generate AI message suggestions
- `POST /api/contact` — contact form submission endpoint
- `GET /api/health/db` — database connectivity health check

## Environment Variables

Create a `.env.local` file in `/home/runner/work/Anonmous_Message_NextJs/Anonmous_Message_NextJs/anon_msg`:

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

RESEND_API_KEY=
RESEND_FROM=

CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

OPENROUTER_API_KEY=
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Authentication & Access Behavior

- Unauthenticated users are redirected from `/dashboard` to `/sign-in`
- Authenticated users are redirected away from `/`, `/sign-in`, `/sign-up`, and `/verify/*` to `/dashboard`
- Credential login requires a verified account

## Notes

- AI suggestions gracefully fall back to static prompts if OpenRouter is unavailable.
- Message data is embedded in each user document (`messages` array) in MongoDB.
