import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";

// POST /api/stripe/setup-intent
// Creates (or reuses) a Stripe Customer for the signed-in user, then
// creates a SetupIntent so the client can securely collect and verify a
// card via Stripe Elements without ever sending card data to our server.
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await getOrCreateCustomer();

  let stripeCustomerId = customer.stripeCustomerId;
  if (!stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: customer.email,
      name: [customer.firstName, customer.lastName].filter(Boolean).join(" ") || undefined,
      metadata: { clerkId: customer.clerkId, customerId: customer.id },
    });
    stripeCustomerId = stripeCustomer.id;
    await db.customer.update({
      where: { id: customer.id },
      data: { stripeCustomerId },
    });
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: stripeCustomerId,
    payment_method_types: ["card"],
  });

  return NextResponse.json({ clientSecret: setupIntent.client_secret });
}
