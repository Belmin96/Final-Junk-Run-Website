# Junk Run

Started as the `junkrun-single-file-site.html` mockup rebuilt as a proper
Next.js 14 (App Router) project. It has since grown into the full app:
the marketing site plus real customer sign-up/login, a dashboard for
posting jobs, reviewing contractor estimates, tracking a job, paying, and
leaving a review.

## Structure

- `app/` — one route per original "page" section: `/`, `/how-it-works`,
  `/customers`, `/haulers`, `/about`, `/faq`, `/terms`. Each `page.tsx` holds
  that page's unique content.
- `components/Header.tsx` — shared nav bar + mobile menu (client component;
  highlights the active link based on the current route).
- `components/Footer.tsx` — shared icon strip + legal footer, identical on
  every page in the original file.
- `components/GlobalSmoke.tsx` — the decorative background glow, also shared.
- `lib/nav.ts` — the nav link list used by the header/mobile menu.
- `app/globals.css` — the original `<style>` block, unchanged except that the
  three font families now reference the `next/font` CSS variables below.
- `public/images/` — the 9 base64 images from the original file, extracted to
  real `.jpg` files (one pair was byte-identical and got de-duplicated).

## Notable conversions from the original file

- The original was a single HTML document with 7 sections shown/hidden via
  `location.hash` + JS. That's now 7 real routes, so links use `next/link`
  and browser back/forward, direct URLs, and SEO all work normally.
- `Inter`, `Poppins`, and `Caveat` are loaded with `next/font/google` in
  `app/layout.tsx` instead of relying on ambient system fonts (the original
  file referenced these families in CSS but never actually loaded them).
- The FAQ accordion (`toggleFaqCat` / `toggleFaqQ`) is reproduced in
  `app/faq/page.tsx` as a small client-side effect that wires up the same
  class-toggle behavior as the original inline `<script>`.
- Buttons that were placeholders in the original (`Log In`, `Get Started`,
  `Privacy`, etc. — all `onclick="return false"`, going nowhere yet) are now
  real `<button type="button">` elements instead of dead links.

## Customer app (auth, dashboard, jobs, payments, reviews)

Added on top of the marketing site:

- **Auth** — Clerk (`@clerk/nextjs`), with real OAuth sign-in/sign-up at
  `/sign-in` and `/sign-up` (whichever social providers are turned on in
  the Clerk dashboard show up automatically — no code change needed to
  add/remove one). `middleware.ts` protects everything under `/dashboard`.
- **Database** — Prisma + Neon Postgres. Schema is in `prisma/schema.prisma`
  (`Customer`, `Contractor`, `Job`, `JobPhoto`, `Estimate`, `Payment`,
  `Review`). A `Customer` row is created/synced automatically the first
  time a signed-in user hits any `/dashboard` page (`lib/getOrCreateCustomer.ts`).
- **Payments** — Stripe. `/dashboard/profile` lets a customer save a card
  (SetupIntent + Stripe Elements); a completed job can then be paid with
  that saved card from the job page (PaymentIntent charged server-side).
- **Dashboard** (`/dashboard`) — My Jobs list, Post a Job (with photo
  upload), a job detail page with the estimate list, a status timeline,
  payment + receipt, and the post-completion review form.

### One-time setup

1. Copy `.env.example` to `.env.local` and fill in real values:
   - Clerk: dashboard.clerk.com → your app → **API Keys**.
   - Database: your Neon project → **Connection Details** (use the pooled
     connection string).
   - Stripe: dashboard.stripe.com → **Developers → API keys** (use the
     **test mode** keys while developing).
2. Install dependencies and push the schema to your database:
   ```bash
   npm install
   npm run db:push
   ```
   (`npm install` also runs `prisma generate` automatically via the
   `postinstall` script.)
3. Run it:
   ```bash
   npm run dev
   ```
   Then open http://localhost:3000, sign up as a new customer, and post a
   job.

### Testing the full journey without a contractor app yet

There's no contractor-facing app yet, so nothing will submit real
estimates or move a job to "in progress"/"completed" on its own. Every
job detail page shows a **Dev Testing Tools** panel (only outside
production — see `app/api/dev/simulate/route.ts`) with buttons to
simulate a contractor estimate coming in, the job starting, and the job
completing, so you can walk the whole flow — post a job → estimates come
in → choose a contractor → job progresses → pay → leave a review — end to
end today. Delete that route and panel once a real contractor app exists.

### Known follow-ups (not blocking, worth doing before real production traffic)

- **Photo storage**: job photos are currently stored as base64 `data:`
  URLs directly in Postgres (`JobPhoto.dataUrl`, flagged in the schema).
  Fine for testing; swap for object storage (e.g. Cloudflare R2 or S3)
  before real usage so the database doesn't balloon.
- **Payment sync**: `/api/jobs/[jobId]/pay` confirms the Stripe charge and
  updates the `Payment` row synchronously. Adding a Stripe webhook
  (`payment_intent.succeeded` / `.payment_failed`) would make that more
  robust against the customer closing the tab mid-payment.
- **Cloudflare Workers deployment**: if this app gets deployed the same
  way as the marketing site (Cloudflare Workers via OpenNext) rather than
  a normal Node host (e.g. Vercel), Prisma's default binary query engine
  won't run in the Workers runtime — it'll need Prisma's driver adapter
  for Neon (`@prisma/adapter-neon`, WASM-based) instead. Flagging this now
  rather than guessing at the swap blind.

## Building

```bash
npm run build
npm run start
```

The marketing pages statically prerender; everything under `/dashboard`,
`/sign-in`, `/sign-up`, and `/api/*` renders dynamically per-request (as
expected, since they depend on the signed-in user).
