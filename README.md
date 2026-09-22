# Junk Run — Marketing Site

This is the `junkrun-single-file-site.html` mockup rebuilt as a proper Next.js
14 (App Router) project, mirroring the folder layout of the main Junk Run app
(`app/`, `components/`, `lib/`, `public/`).

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

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Building

```bash
npm run build
npm run start
```

This has been verified to build and statically prerender all 7 routes
successfully (`npm run build`) as a standalone Next.js app. To fold it into
the existing Cloudflare Workers / OpenNext deployment pipeline used by the
main Junk Run app, add `open-next.config.ts` and `wrangler.jsonc` the same
way that repo does, and merge `package.json`'s scripts/dependencies.
