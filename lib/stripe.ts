import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV !== "test") {
  // Thrown lazily (only when Stripe is actually used), not at import time,
  // so pages that don't touch Stripe still build/render without the key set.
  console.warn(
    "STRIPE_SECRET_KEY is not set -- Stripe-dependent routes will fail until it is."
  );
}

export const stripe = new Stripe(secretKey ?? "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia",
});
