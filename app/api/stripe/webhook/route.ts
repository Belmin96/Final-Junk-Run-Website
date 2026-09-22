import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

// POST /api/stripe/webhook
// Keeps Payment rows in sync with Stripe even if the customer closes the
// tab mid-payment (the synchronous confirmation in
// app/api/jobs/[jobId]/pay/route.ts only catches the immediate result).
// Stripe calls this directly -- it can't sign in as a Clerk user, so this
// route is explicitly excluded from Clerk's protected routes in
// middleware.ts and verifies the request itself via the Stripe-Signature
// header instead.
//
// Uses constructEventAsync (Web Crypto/SubtleCrypto) rather than the
// synchronous constructEvent (Node's `crypto` module), since Web Crypto is
// natively available in the Cloudflare Workers runtime without needing the
// nodejs_compat flag to cover it -- same reasoning as the fetch-based
// Stripe HTTP client in lib/stripe.ts.
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Signature verification failed: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  if (
    event.type === "payment_intent.succeeded" ||
    event.type === "payment_intent.payment_failed"
  ) {
    // Webhook payloads carry `latest_charge` as a plain string id, not the
    // expanded charge object the synchronous confirmation in
    // app/api/jobs/[jobId]/pay/route.ts gets -- so this only reconciles
    // status here, not receiptUrl. That's still the important part: it's
    // what keeps a Payment row correct if the customer closed the tab
    // before the synchronous confirmation ran.
    const paymentIntent = event.data.object as { id: string };
    const status = event.type === "payment_intent.succeeded" ? "SUCCEEDED" : "FAILED";

    await db.payment.updateMany({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status },
    });
  }

  return NextResponse.json({ received: true });
}
