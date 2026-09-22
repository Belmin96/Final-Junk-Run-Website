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
  `/sign-in` and `/sign-up` for customers, and separately at
  `/contractor/sign-in` and `/contractor/sign-up` for contractors (same
  Clerk app/instance for both — a person could in principle sign in to
  both sides, they're just different database rows). `middleware.ts`
  protects everything under `/dashboard` and `/contractor`.
- **Database** — Prisma + Neon Postgres. Schema is in `prisma/schema.prisma`
  (`Customer`, `Contractor`, `Job`, `JobPhoto`, `Estimate`, `Payment`,
  `Review`). A `Customer`/`Contractor` row is created/synced automatically
  the first time a signed-in user hits any `/dashboard` or `/contractor`
  page (`lib/getOrCreateCustomer.ts` / `lib/getOrCreateContractor.ts`).
- **Payments** — Stripe. `/dashboard/profile` lets a customer save a card
  (SetupIntent + Stripe Elements); a completed job can then be paid with
  that saved card from the job page (PaymentIntent charged server-side).
  A webhook (`/api/stripe/webhook`) keeps the `Payment` row in sync even
  if the customer closes the tab mid-payment.
- **Photo storage** — job photos upload to a Cloudflare R2 bucket
  (`lib/r2.ts`) and are served back through `/api/photos/[...key]`, rather
  than being stored as base64 in Postgres.
- **Customer dashboard** (`/dashboard`) — My Jobs list, Post a Job (with
  photo upload), a job detail page with the estimate list, a status
  timeline, payment + receipt, and the post-completion review form.
- **Contractor app** (`/contractor`) — a separate login/dashboard: browse
  open jobs and submit estimates, see jobs you've won under My Jobs, and
  on a won job: Start Job → Confirm Arrival (GPS-checked against the job's
  address, see below) → Mark Completed.
- **45-minute contractor timing** (`lib/timing.ts`) — once a contractor
  starts a job, the customer sees a "running late" note at 30 minutes and,
  at 45 minutes without a confirmed arrival, can reopen the job to other
  contractors (`/api/jobs/[jobId]/reassign`). This is computed on page
  load/refresh rather than pushed by a background timer — see "Known
  follow-ups" below.
- **GPS arrival verification** — a job's address is best-effort geocoded
  when it's posted (`lib/geocode.ts`, via OpenStreetMap's free Nominatim
  API — no API key needed). When a contractor confirms arrival, their
  browser's location is compared against those coordinates (500m
  threshold, `lib/timing.ts`). A mismatch doesn't block them from
  continuing — GPS/geocoding can both be imprecise — it just shows the
  customer a flag that the location didn't auto-verify.

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

### Testing the full journey

Post a job as a customer at `/dashboard/jobs/new`, then sign in as a
contractor at `/contractor/sign-up` (use a different browser/incognito
window, or sign out of the customer account first — Clerk only holds one
session per browser at a time) to submit an estimate from `/contractor`.
Back on the customer side, choose that estimate; back on the contractor
side, Start Job → Confirm Arrival → Mark Completed from `/contractor/my-jobs`;
back on the customer side, pay and leave a review. The old **Dev Testing
Tools** panel that used to stand in for a contractor is gone now that this
real flow exists.

### Known follow-ups (not blocking, worth doing before real production traffic)

- **Reassignment/timing is computed on page load, not pushed**: the
  30-/45-minute contractor timing (`lib/timing.ts`) is calculated whenever
  a job page is viewed or refreshed, not via a background job or push
  notification. A customer/contractor who doesn't have the page open won't
  get proactively notified at the 30- or 45-minute mark. Adding a
  Cloudflare Cron Trigger + an email/SMS notification would close this
  gap; it wasn't added here because OpenNext's generated Worker doesn't
  cleanly expose a custom `scheduled()` handler alongside the Next.js app
  without extra wrapping.
- **Geocoding provider**: `lib/geocode.ts` uses OpenStreetMap's free
  Nominatim API (no key needed, but rate-limited to ~1 request/second and
  meant for light use). Fine at this app's current volume; swap for a
  paid geocoder (Google Maps, Mapbox) if job-posting volume grows —
  nothing else needs to change, just that one function.
- **Photo/job visibility**: `/api/photos/[...key]` only checks that the
  requester is signed in (as any customer or contractor), not that they
  specifically own/won that exact job — matching how the old base64
  approach worked (anyone with the page open could see the image).
  Tightening this to a strict per-job check is a reasonable follow-up.

## Building

```bash
npm run build
npm run start
```

The marketing pages statically prerender; everything under `/dashboard`,
`/sign-in`, `/sign-up`, and `/api/*` renders dynamically per-request (as
expected, since they depend on the signed-in user).

## Deploying to Cloudflare Workers

This deploys with the same `junkrun-website` Worker the marketing site was
already using — running `npm run deploy` replaces that Worker in place with
the full app (same URL), rather than creating a separate one.

Two things had to change from a "plain Node.js app" setup so the code can
actually run inside the Workers runtime, which has no raw TCP sockets and no
native binaries, only `fetch` and WebSocket:

- **Database**: `lib/db.ts` connects through Prisma's Neon driver adapter
  (`@prisma/adapter-neon`) instead of Prisma's default engine, which talks
  to Postgres over HTTP/WebSocket rather than a raw TCP connection. This is
  why `prisma` and `@prisma/client` are on version 7 here (driver adapters
  need it) and why `@opennextjs/cloudflare` is pinned to exactly `1.15.0` —
  it's the last release that still supports Next.js 14; later ones require
  Next 15+. Upgrading Next.js itself is a reasonable next step down the
  line, just not bundled into this change.
- **Stripe**: `lib/stripe.ts` uses Stripe's fetch-based HTTP client
  (`Stripe.createFetchHttpClient()`) instead of its Node default, which
  relies on `http`/`https` sockets Workers doesn't have.

Both changes work the same in plain `npm run dev` too, so local development
isn't any different.

### One-time setup (in addition to the steps above)

You're already signed in to Cloudflare from the earlier `wrangler login`. From
the project folder:

```bash
npm install
```

One new Cloudflare resource IS needed now: an R2 bucket for job photos
(Hyperdrive still isn't needed — the Neon adapter talks to your database
directly). **R2 needs to be turned on for your Cloudflare account first** —
this is a one-time account-level step only you can do:

1. dashboard.cloudflare.com → **R2** in the left sidebar → follow the
   prompt to enable R2 (it has a free tier; no purchase needed for this
   app's scale).
2. Once enabled, create a bucket named exactly `junkrun-job-photos` (R2 →
   Create bucket), matching the name already set in `wrangler.jsonc`. If
   you'd rather use a different name, just update `bucket_name` in
   `wrangler.jsonc` to match.

`npm run deploy` will fail with a clear error naming this bucket until
both steps are done.

### Secrets

Cloudflare Workers needs its own copy of your secrets (it doesn't read
`.env.local` — that only exists for your machine). Set each one once with:

```bash
npx wrangler secret put CLERK_SECRET_KEY
npx wrangler secret put DATABASE_URL
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

Each command will prompt you to paste the value directly into the terminal
— nothing to type into a config file. `STRIPE_WEBHOOK_SECRET` comes from
Stripe: dashboard.stripe.com → **Developers → Webhooks → Add endpoint**,
URL `https://junkrunapp.com/api/stripe/webhook`, events
`payment_intent.succeeded` and `payment_intent.payment_failed` — Stripe
shows you the signing secret (`whsec_...`) once the endpoint is created.

The two `NEXT_PUBLIC_...` keys aren't secret (they're meant to be visible
in the browser), so they're already set as plain `vars` in
`wrangler.jsonc`:

```jsonc
"vars": {
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": "pk_...",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": "pk_..."
}
```

### Preview, then deploy

```bash
npm run preview
```

Builds the app and runs it locally inside the actual Workers runtime (not
just `next dev`) — the closest thing to a dress rehearsal before it's live.
Once that looks right:

```bash
npm run deploy
```

This builds and pushes straight to the `junkrun-website` Worker.

### Also worth knowing

- The old **Dev Testing Tools** panel is gone — the real contractor app
  replaces it (see "Testing the full journey" above).
- After you run `npm run db:push` with the updated schema, existing local
  data (if any) is fine — the new columns are all optional/defaulted, so
  this isn't a breaking migration for a fresh database.
- This was verified in a sandbox by running the full OpenNext build
  (`npx opennextjs-cloudflare build`) end to end successfully — including
  bundling the Clerk middleware, every API route (customer and
  contractor), and the Neon-adapter database code for the Workers
  runtime. What couldn't be verified from that sandbox: the R2 bucket
  (that account doesn't have R2 enabled), the Stripe webhook actually
  receiving a live event, and the real deploy + a request hitting
  production — those first real tests happen once you finish the setup
  steps above and run `npm run deploy` yourself.
