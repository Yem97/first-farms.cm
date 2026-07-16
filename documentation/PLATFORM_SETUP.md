# Firstfarms Digital Cooperative — Platform Setup & Morning Guide

Good morning 👋 — here's everything that was built overnight and the short list
of things only **you** can do to switch it fully on.

---

## What's live now (all committed & pushed to `main`)

The site has been rebuilt from a content site into a **multi-user platform** on
Supabase. Five phases:

| Phase | What it does | Status |
|-------|--------------|--------|
| 1 · Foundation | Postgres database (7 tables), Row-Level Security, moderation triggers, seeded board | ✅ verified live |
| 2 · Auth | Email + password signup / login / logout, member dashboard | ✅ verified live |
| 3 · Member listings | Members post produce → **pending → admin-approved → public** | ✅ built, typechecked |
| 4 · Admin panel | User management, listing moderation, blog & events posting | ✅ built, typechecked |
| Brand | Course-corrected to **Firstfarms Digital Cooperative**; added FFD-2031 + focus areas | ✅ live |

The old marketing site (home, about, services, marketplace, education, contact)
is intact and now Firstfarms-branded. Sanity is being retired — it no longer
crashes the site when unconfigured.

---

## ✅ Your 4 morning to-dos

### 1. Add the Supabase keys to Vercel (REQUIRED for the live site)
Your local site works, but **the live Vercel site needs the same 3 keys** or
sign-in/admin won't work there.

- Vercel → your project → **Settings → Environment Variables**, add (from
  Supabase → Settings → API):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER` (your WhatsApp business number)
- Then **redeploy** (Deployments → ⋯ → Redeploy). The site was hardened so it
  won't crash before you do this — it just can't sign anyone in yet.

### 2. Make yourself an admin
1. Go to `/signup` on the site and create your account.
2. Open Supabase → **SQL Editor**, run `supabase/make-admin.sql` (replace the
   email with yours).
3. Refresh — your dashboard now shows an **Admin Panel** button (`/admin`).

### 3. (Recommended) Turn off email confirmation for now
Supabase → **Authentication → Providers → Email** → turn **"Confirm email" off**.
This lets farmers sign up and use the site instantly. (With it on, signup shows
"check your email" first — fine, but more friction for rural users.)

### 4. Decide on photo uploads
Members currently add a produce photo by **pasting an image URL**. Native photo
**upload** needs a Supabase **Storage bucket**, which I did not create without
your go-ahead. Say the word and I'll wire real uploads (≈30 min of work).

---

## How to test it (5 minutes)

1. **Sign up** at `/signup` → you land on `/dashboard`.
2. **Post a listing**: dashboard → *New Listing* → fill it in → Submit. It shows
   as **Pending review**.
3. Make yourself admin (to-do #2), open **`/admin`**:
   - **Listings** → *Approve* your listing. It's now Live.
   - **Users** → you'll see yourself; try the role/suspend controls on a second
     test account.
   - **Blog** → *New Post* → write, publish.
   - **Events** → *New Event* → schedule a training.
4. (Phase 5, not yet wired) the public marketplace/blog/education pages still
   read the old fallback data — connecting them to your live Supabase data is
   the next phase.

---

## What's intentionally NOT done yet (next session)

- **Phase 5** — wire the public pages (marketplace, blog, education, home
  featured/testimonials/team) to read live from Supabase, then fully retire Sanity.
- **Photo upload** — pending your OK on a Storage bucket (see to-do #4).
- **Phone/SMS login** — deferred (needs a paid SMS provider).
- Old placeholders still to replace: contact `+237 6XX XXX XXX`,
  `hello@firstfarms.cm`, Google Maps embed, real board/team photos.

---

## Notes for developers

- Stack: Next.js 14.2.5 · Supabase (`@supabase/ssr`) · Tailwind v3 · TS.
- Node 20 needs the `ws` WebSocket polyfill (already wired in
  `lib/supabase/ws-polyfill.ts`).
- Dev server: `npm run dev` (this repo has `.claude/launch.json` on port 3100).
- DB schema: `supabase/migrations/0001_initial_schema.sql`; seed:
  `supabase/seed.sql`. Both already applied to the live project.
- Auth guard for admin: `lib/auth.ts` → `requireAdmin()`.
