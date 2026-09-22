import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";

// POST /api/stripe/default-payment-method
// After Stripe Elements confirms a SetupIntent client-side, the client
// sends us the resulting payment_method id so we can save it as the
// customer's default for future job payments.
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const paymentMethodId = body?.paymentMethodId;
  if (typeof paymentMethodId !== "string" || !paymentMethodId) {
    return NextResponse.json({ error: "Missing paymentMethodId" }, { status: 400 });
  }

  const customer = await getOrCreateCustomer();
  if (!customer.stripeCustomerId) {
    return NextResponse.json(
      { error: "No Stripe customer on file yet" },
      { status: 400 }
    );
  }

  // Verify the payment method actually belongs to this Stripe customer
  // before trusting it -- never take the client's word for ownership.
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
  if (paymentMethod.customer !== customer.stripeCustomerId) {
    return NextResponse.json({ error: "Payment method not recognized" }, { status: 403 });
  }

  await stripe.customers.update(customer.stripeCustomerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  await db.customer.update({
    where: { id: customer.id },
    data: {
      defaultPaymentMethodId: paymentMethodId,
      defaultPaymentMethodBrand: paymentMethod.card?.brand ?? null,
      defaultPaymentMethodLast4: paymentMethod.card?.last4 ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
