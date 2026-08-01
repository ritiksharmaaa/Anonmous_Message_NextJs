# AnonMsg

Anonymous messaging platform built with Next.js, NextAuth, MongoDB, and AI-assisted message suggestions.

## Features

- Anonymous message sending via public user links (`/u/[username]`)
- Email/password + Google + GitHub authentication
- OTP-based email verification
- Dashboard to view and delete received messages
- Toggle to accept/reject incoming messages
- AI-powered anonymous message suggestions
- Contact API integration

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Auth:** NextAuth
- **Database:** MongoDB + Mongoose
- **Validation:** Zod + React Hook Form
- **Styling/UI:** Tailwind CSS + Radix UI + Shadcn UI
- **Email:** Resend
- **AI:** OpenRouter

## Getting Started

### 1) Clone and install

```bash
git clone https://github.com/ritiksharmaaa/Anonmous_Message_NextJs.git
cd Anonmous_Message_NextJs/anon_msg
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in `/home/runner/work/Anonmous_Message_NextJs/Anonmous_Message_NextJs/anon_msg`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

RESEND_API_KEY=your_resend_api_key
RESEND_FROM=your_verified_sender@yourdomain.com

CONTACT_TO_EMAIL=your_inbox@yourdomain.com
CONTACT_FROM_EMAIL=your_verified_sender@yourdomain.com

OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3) Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev    # start development server
npm run build  # build for production
npm run start  # start production server
npm run lint   # run ESLint
```

## Project Structure

```text
anon_msg/
├── src/
│   ├── app/          # pages + API routes (App Router)
│   ├── components/   # UI and custom components
│   ├── context/      # auth/theme providers
│   ├── helpers/      # utility helpers (e.g., email sending)
│   ├── lib/          # DB and service clients
│   ├── middlewares/  # custom middleware utilities
│   ├── model/        # Mongoose models
│   ├── schemas/      # Zod validation schemas
│   └── types/        # shared TypeScript types
├── public/
└── package.json
```

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

No license file is currently defined in this repository.
