import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Everything under /dashboard and /contractor, plus their API routes,
// requires a signed-in customer/contractor respectively. Marketing pages
// and both sides' sign-in/sign-up stay public.
//
// Two carve-outs from the blanket rules below:
//  - /contractor/sign-in and /contractor/sign-up must stay public even
//    though they're under /contractor -- otherwise no one could ever reach
//    them to sign in.
//  - /api/stripe/webhook must stay public -- Stripe calls it directly and
//    can't authenticate as a Clerk user. It verifies itself instead via the
//    Stripe-Signature header (see the route for details).
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/contractor(.*)",
  "/api/jobs(.*)",
  "/api/profile(.*)",
  "/api/stripe(.*)",
  "/api/contractor(.*)",
  "/api/photos(.*)",
]);

const isPublicCarveOut = createRouteMatcher([
  "/contractor/sign-in(.*)",
  "/contractor/sign-up(.*)",
  "/api/stripe/webhook(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && !isPublicCarveOut(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
