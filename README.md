# Portfolio: Olopade Oreoluwa

Personal portfolio with a password-protected admin dashboard, built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Vercel Blob** for storage and **Resend** for email.

## Features

- **Public site**: hero, about, skills, projects (full-stack and data), experience timeline and a contact form
- **Contact form**: validated with Zod, honeypot and rate-limited; saves every message and emails a notification through Resend
- **Admin dashboard** (`/admin`), password protected with a signed, HTTP-only JWT cookie:
  - **Inbox**: read, mark read/unread, delete, and reply to visitors by email
  - **Projects**: add, edit, feature and delete portfolio projects
  - **Profile**: edit bio, links, skills, experience and leadership
- Edits go live instantly, with no redeploy needed

## Architecture

```
src/
  app/
    page.tsx               public portfolio (server component)
    actions/contact.ts     contact form Server Action
    admin/
      login/               password login
      (panel)/             auth-guarded inbox, projects, profile
      actions.ts           admin Server Actions (all call requireAdmin())
  lib/
    store.ts               JSON document store on Vercel Blob (ETag optimistic locking)
    auth.ts                session cookies with jose
    email.ts               Resend helpers
    defaults.ts            seed content
```

Data lives in two private blobs, `content.json` and `messages.json`. Writes use `ifMatch` ETags, so two quick edits can't overwrite each other.

## Run locally

```bash
cp .env.example .env.local   # fill in ADMIN_PASSWORD and SESSION_SECRET
npm install
npm run dev
```

Without `BLOB_READ_WRITE_TOKEN`, data is stored in `./.data/`.

## Deploy on Vercel

1. Import the repo into Vercel.
2. **Storage → Create → Blob**, then connect it to the project. This adds `BLOB_READ_WRITE_TOKEN`.
3. Add env vars: `ADMIN_PASSWORD`, `SESSION_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GITHUB_USERNAME`.
4. Redeploy.

### Email notes

The default sender `onboarding@resend.dev` can only deliver to the email that owns the Resend account, so owner notifications work out of the box. To **reply to visitors** or send auto-replies, verify your own domain in Resend, set `FROM_EMAIL=You <hello@yourdomain>` and `AUTO_REPLY=true`.
