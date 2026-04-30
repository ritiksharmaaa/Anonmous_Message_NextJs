# AnonMsg Project - Complete Flow Guide

## 📋 Project Overview
**AnonMsg** is an anonymous messaging platform where users can receive messages from others anonymously. The project is ~80% complete and uses Next.js, MongoDB, NextAuth, and AI integration.

---

## 🏗️ Folder Structure & Purpose

```
src/
├── app/                          # Next.js App Router (main application)
│   ├── layout.tsx               # Root layout with Auth & Theme providers
│   ├── globals.css              # Global styles
│   ├── (app)/                   # Public/authenticated pages group
│   │   ├── page.tsx             # HOME PAGE - Landing/hero section
│   │   ├── dashboard/           # User dashboard (authenticated)
│   │   ├── u/[username]/        # Public profile - send anon messages HERE
│   │   ├── suggest-anon-channel/ # Message suggestion feature
│   │   ├── about/, contact/     # Info pages
│   │   └── privacy-policy/, terms-of-service/
│   └── (auth)/                  # Auth pages group
│       ├── sign-in/             # Login page
│       ├── sign-up/             # Registration page
│       └── verify/[username]/   # Email verification page
│
├── api/                         # API Routes (backend logic)
│   ├── auth/[...nextauth]/      # NextAuth configuration
│   │   ├── option.ts            # Auth providers & callbacks
│   │   └── route.ts             # NextAuth handler
│   ├── sign-up/                 # User registration endpoint
│   ├── send-user-messages/      # Send anonymous message
│   ├── get-user-messages/       # Fetch user's received messages
│   ├── user-otp-verification/   # Email verification
│   ├── is-accepting-messages/   # Check acceptance status
│   ├── delete-message/          # Remove a message
│   ├── suggest-messages/        # AI message suggestions
│   ├── unique-username-check/   # Validate username
│   └── check-acceptance/        # Check if user accepts messages
│
├── components/
│   ├── created/                 # Custom components
│   │   ├── navbar.tsx           # Navigation bar
│   │   ├── footer.tsx           # Footer
│   │   ├── message-card.tsx     # Message display card
│   │   ├── phone-mockup.tsx     # Mobile mockup UI
│   │   └── carousel.tsx         # Image carousel
│   └── ui/                      # Shadcn UI components
│       ├── button, input, form, card, etc.
│
├── context/
│   ├── authProvider.tsx         # NextAuth SessionProvider wrapper
│   └── themeProvider.tsx        # Theme switching (dark/light)
│
├── lib/
│   ├── dbConnect.ts            # MongoDB connection
│   ├── resend.ts               # Resend email config
│   └── utils.ts                # Helper utilities
│
├── helpers/
│   └── sendVerificationMail.ts # Email sending logic
│
├── middlewares/
│   └── authMiddleware.ts       # Route protection middleware
│
├── model/
│   └── User.model.tsx          # Mongoose User & Message schemas
│
├── schemas/
│   ├── signUpSchema.ts         # Zod schema for sign-up
│   ├── signInSchema.ts         # Zod schema for sign-in
│   ├── messageSchema.ts        # Message validation schema
│   └── verifySchema.ts         # OTP verification schema
│
├── types/
│   ├── ApiResponse.ts          # Standard API response type
│   └── next-auth.d.ts          # NextAuth type extensions
│
└── middleware.ts               # Next.js middleware (route protection)
```

---

## 🔄 Complete Data Flow

### **1️⃣ ENTRY POINT: Landing Page**
```
User visits localhost:3000
    ↓
src/app/(app)/page.tsx (HOME PAGE)
    ↓
Displays: Hero section, features, CTA buttons for "Sign Up" or "Sign In"
Components used: Navbar, Hero section, PhoneMockup, AppFeatures, Footer
```

---

### **2️⃣ REGISTRATION FLOW**
```
User clicks "Sign Up" → Route to /sign-up
    ↓
src/app/(auth)/sign-up/page.tsx
    ↓
User fills form: username, email, password
    ↓
Form submission → POST /api/sign-up
    ↓
API Logic (sign-up/route.ts):
  1. Connect to MongoDB
  2. Hash password with bcryptjs
  3. Generate 6-digit verification code
  4. Check if email exists:
     - If verified user: Return error "User already exists"
     - If unverified user: Update password & verification code
     - If new user: Create new User document
  5. Send verification email via Resend
  6. Return success response
    ↓
User receives verification email with OTP code
    ↓
User redirected to verify page: /verify/[username]
```

---

### **3️⃣ EMAIL VERIFICATION FLOW**
```
User enters OTP from email → /verify/[username]
    ↓
src/app/(auth)/verify/[username]/page.tsx
    ↓
User submits OTP
    ↓
POST /api/user-otp-verification
    ↓
API Logic:
  1. Match OTP code with database record
  2. Check if code hasn't expired
  3. Update user: isVerified = true
  4. Return success
    ↓
User redirected to sign-in (or auto-sign-in)
```

---

### **4️⃣ LOGIN FLOW**
```
User goes to /sign-in
    ↓
src/app/(auth)/sign-in/page.tsx
    ↓
User enters: email/username + password
    ↓
Form submission → NextAuth CredentialsProvider
    ↓
API Logic (auth/option.ts - authorize function):
  1. Find user by email or username
  2. Check if user isVerified
  3. Compare password with bcrypt
  4. If correct: Return user object
  5. If incorrect: Throw error
    ↓
NextAuth creates JWT token with user data:
  - _id, username, email, isVerified, isAcceptingMessages
    ↓
Redirect to /dashboard (or home)
```

**Note**: Can also login with Google OAuth or GitHub OAuth (configured in authOptions)

---

### **5️⃣ AUTHENTICATED USER FLOW - DASHBOARD**
```
Authenticated user visits /dashboard
    ↓
src/app/(app)/dashboard/page.tsx
    ↓
Middleware (middleware.ts) checks:
  - Is user authenticated? (NextAuth session)
  - Routes protected: /dashboard, /verify, etc.
    ↓
Dashboard displays:
  1. Toggle "Accept Messages" status
  2. Public profile link: /u/[username]
  3. List of received messages
  4. Delete message button
```

---

### **6️⃣ SENDING ANONYMOUS MESSAGE FLOW**
```
Anyone (logged in or not) visits /u/[username]
    ↓
src/app/(app)/u/[username]/page.tsx
    ↓
Page displays:
  1. User's profile
  2. Message form (if user accepts messages)
  3. Option to generate AI suggestions
    ↓
User writes message → Click Send
    ↓
POST /api/send-user-messages
    ↓
API Logic:
  1. Verify sender is authenticated & verified
  2. Find recipient by username
  3. Check if recipient.isAcceptingMessages === true
  4. If false: Return 403 (not accepting)
  5. If true: Push message to recipient.messages array
  6. Save to database
  7. Return success
    ↓
Sender sees success message (Sonner toast)
Recipient receives new message (visible on dashboard refresh)
```

---

### **7️⃣ GET USER MESSAGES FLOW**
```
User on dashboard needs to view messages
    ↓
GET /api/get-user-messages (called on component mount)
    ↓
API Logic:
  1. Get authenticated user from session
  2. MongoDB aggregation pipeline:
     - $match: Find this user
     - $unwind: Expand messages array
     - $sort: Sort by createdAt descending
     - $group: Re-aggregate messages in sorted order
  3. Validate each message with Zod schema
  4. Return messages array
    ↓
Frontend renders MessageCard components for each message
```

---

### **8️⃣ DELETE MESSAGE FLOW**
```
User clicks delete on a message
    ↓
DELETE /api/delete-message
    ↓
API Logic:
  1. Find user by session
  2. Find message by ID
  3. Remove message from messages array
  4. Save changes
    ↓
Message removed from dashboard
```

---

### **9️⃣ AI MESSAGE SUGGESTIONS FLOW**
```
User visits /suggest-anon-channel or message page
    ↓
Click "Get AI Suggestions"
    ↓
POST /api/suggest-messages
    ↓
API Logic:
  1. Call OpenAI API via AI SDK
  2. Generate creative anonymous message suggestions
  3. Return array of suggestions
    ↓
Suggestions displayed in UI
User can select and send one
```

---

## 🔐 Authentication Architecture

### **NextAuth Configuration** (`src/api/auth/[...nextauth]/option.ts`)
```
Providers:
├── Google OAuth (clientId, clientSecret)
├── GitHub OAuth (clientId, clientSecret)
└── Credentials (email/username + password)

JWT Strategy:
  - User data stored in JWT token
  - Token refreshed on each request
  - Session extracted from token

Callbacks:
  - jwt(): Add custom fields to token (username, isVerified, etc)
  - session(): Expose token fields to session object
```

---

## 📧 Email Verification System

```
1. User signs up with email
   ↓
2. Random 6-digit OTP generated
   ↓
3. Email sent via Resend
   └─ src/helpers/sendVerificationMail.ts
   └─ src/email_template_resend/verificationEmail.tsx
   ↓
4. OTP expires after X minutes (verifyCodeExpire)
   ↓
5. User enters OTP on /verify/[username]
   ↓
6. Server validates:
   - OTP matches
   - Not expired
   - Mark user as verified
```

---

## 🎯 Feature Checklist (80% Complete)

✅ User Registration  
✅ Email Verification  
✅ Authentication (Email, Google, GitHub)  
✅ Send Anonymous Messages  
✅ Receive Messages  
✅ Message Dashboard  
✅ Theme Toggle (Dark/Light)  
✅ AI Message Suggestions  
✅ Message Deletion  
✅ Accept/Reject Messages Toggle  

⚠️ **Remaining Tasks (~20%)**:
- [ ] Real-time notifications when new message arrives
- [ ] Message reactions/ratings
- [ ] User blocking feature
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] Message scheduling
- [ ] Search/filter messages
- [ ] Export messages as PDF
- [ ] Profile customization options

---

## 🚀 Where to Start / Resume Development

### **Option 1: Test Existing Features**
```bash
cd anon_msg
npm install
npm run dev  # Start at localhost:3000
```

Then manually test:
1. Sign up with email
2. Verify email with OTP
3. Log in
4. Visit another user's profile → Send message
5. Check dashboard for received messages

---

### **Option 2: Add New Features** (Priority Order)

1. **Real-time Notifications** (Most impactful)
   - Add Socket.io or Pusher
   - Notify user when new message arrives
   - File: Add WebSocket handler

2. **Message Search & Filter**
   - Add search box in dashboard
   - Filter by date, sender, keyword
   - Files: `dashboard/page.tsx`, create `/api/search-messages`

3. **User Profile Customization**
   - Bio, profile picture, custom message prompt
   - Update User schema
   - Files: Create `/app/(app)/profile` page

4. **Rate/React to Messages**
   - Add emoji reactions
   - Update Message schema with reactions array
   - Files: Update `User.model.tsx`, `message-card.tsx`

---

### **Option 3: Bug Fixes & Refactoring**
- Check console for any TypeScript warnings
- Review and clean up temporary files (marked with comments like "TODO", "WIP")
- Add error handling for failed email sends
- Optimize database queries

---

## 📁 Key Files to Understand First

1. **[src/app/(app)/page.tsx](src/app/(app)/page.tsx)** - Landing page entry point
2. **[src/api/auth/[...nextauth]/option.ts](src/api/auth/[...nextauth]/option.ts)** - Auth configuration
3. **[src/model/User.model.tsx](src/model/User.model.tsx)** - Database schema
4. **[src/app/(app)/dashboard/page.tsx](src/app/(app)/dashboard/page.tsx)** - Main user interface
5. **[src/api/send-user-messages/route.ts](src/api/send-user-messages/route.ts)** - Core messaging logic
6. **[src/lib/dbConnect.ts](src/lib/dbConnect.ts)** - Database connection setup

---

## 🔗 Environment Variables Needed

Create `.env.local`:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret

GITHUB_CLIENT_ID=your_github_oauth_id
GITHUB_CLIENT_SECRET=your_github_oauth_secret

RESEND_API_KEY=your_resend_email_api_key

OPENAI_API_KEY=your_openai_api_key  # For AI suggestions
```

---

## 💡 Tips for Resuming Development

1. **Start small**: Pick one API endpoint and trace its flow
2. **Use browser DevTools**: Check Network tab to see API calls
3. **Check browser Console**: See any React/JavaScript errors
4. **MongoDB Atlas**: Use cloud dashboard to inspect data changes in real-time
5. **NextAuth Debugging**: Add console logs in `option.ts` callbacks
6. **Email Testing**: Use Resend dashboard to check if emails were sent

---

Good luck! You're 80% there 🎉
