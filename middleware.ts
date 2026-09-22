import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Everything under /dashboard, plus the customer-only API routes, requires
// a signed-in customer. Marketing pages and sign-in/sign-up stay public.
// (There's no public API route yet -- e.g. a future Stripe webhook handler
// would need to be excluded here, since Stripe can't sign in as a customer.)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/jobs(.*)",
  "/api/profile(.*)",
  "/api/stripe(.*)",
  "/api/dev(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
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
