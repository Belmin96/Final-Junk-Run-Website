import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import type { Estimate } from "@prisma/client";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";

// POST /api/jobs/[jobId]/pay
// Charges the customer's saved default payment method for the accepted
// estimate amount. Returns the resulting status; if Stripe requires extra
// authentication (3D Secure), returns a clientSecret so the browser can
// complete it with stripe.confirmCardPayment.
//
// Note: this confirms synchronously and trusts the immediate PaymentIntent
// status to update our Payment record. A Stripe webhook
// (payment_intent.succeeded / .payment_failed) would be a more robust way
// to keep this in sync in production and is a good next addition.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await params;
  const customer = await getOrCreateCustomer();

  const job = await db.job.findUnique({
    where: { id: jobId },
    include: { estimates: true, payment: true },
  });

  if (!job || job.customerId !== customer.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.status !== "COMPLETED") {
    return NextResponse.json(
      { error: "This job isn't marked completed yet" },
      { status: 409 }
    );
  }

  if (job.payment?.status === "SUCCEEDED") {
    return NextResponse.json({ error: "This job has already been paid" }, { status: 409 });
  }

  const acceptedEstimate = job.estimates.find(
    (e: Estimate) => e.status === "ACCEPTED"
  );
  if (!acceptedEstimate) {
    return NextResponse.json(
      { error: "No accepted estimate found for this job" },
      { status: 409 }
    );
  }

  if (!customer.stripeCustomerId || !customer.defaultPaymentMethodId) {
    return NextResponse.json(
      { error: "Add a payment method on your profile before paying for a job" },
      { status: 400 }
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: acceptedEstimate.amountCents,
    currency: "usd",
    customer: customer.stripeCustomerId,
    payment_method: customer.defaultPaymentMethodId,
    off_session: false,
    confirm: true,
    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    metadata: { jobId: job.id, customerId: customer.id },
    expand: ["latest_charge"],
  });

  const status =
    paymentIntent.status === "succeeded"
      ? "SUCCEEDED"
      : paymentIntent.status === "requires_action"
        ? "PENDING"
        : paymentIntent.status === "canceled"
          ? "FAILED"
          : "PENDING";

  const receiptUrl =
    typeof paymentIntent.latest_charge === "object" && paymentIntent.latest_charge
      ? paymentIntent.latest_charge.receipt_url
      : null;

  await db.payment.upsert({
    where: { jobId: job.id },
    create: {
      jobId: job.id,
      stripePaymentIntentId: paymentIntent.id,
      amountCents: acceptedEstimate.amountCents,
      status,
      receiptUrl,
    },
    update: {
      status,
      receiptUrl,
    },
  });

  return NextResponse.json({
    status: paymentIntent.status,
    clientSecret: paymentIntent.status === "requires_action" ? paymentIntent.client_secret : null,
  });
}
