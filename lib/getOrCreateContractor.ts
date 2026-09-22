import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import type { Contractor } from "@prisma/client";

/**
 * Ensures a Contractor row exists for the signed-in Clerk user and returns
 * it. Mirrors lib/getOrCreateCustomer.ts exactly -- same Clerk app/instance
 * is used for both customers and contractors, they're just different rows
 * (a person could in principle have both, though the UI doesn't encourage
 * it). Called at the top of every /contractor page/route.
 */
export async function getOrCreateContractor(): Promise<Contractor> {
  const user = await currentUser();
  if (!user) {
    throw new Error("getOrCreateContractor called with no signed-in user");
  }

  const email = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!email) {
    throw new Error("Signed-in Clerk user has no primary email address");
  }

  const fallbackName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const contractor = await db.contractor.upsert({
    where: { clerkId: user.id },
    update: { email },
    create: {
      clerkId: user.id,
      email,
      businessName: fallbackName || "New Contractor",
    },
  });

  return contractor;
}
