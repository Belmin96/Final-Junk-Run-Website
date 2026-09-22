import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import type { Customer } from "@prisma/client";

/**
 * Ensures a Customer row exists for the signed-in Clerk user and returns it.
 * Called at the top of every dashboard page/route so the DB row is always
 * in sync with Clerk (name/email can change on Clerk's side over time).
 *
 * This is a lazy-sync approach (simplest to ship first). For a more robust
 * setup later, move this into a Clerk webhook (`user.created` / `user.updated`)
 * so the row exists even before the user's first dashboard visit.
 */
export async function getOrCreateCustomer(): Promise<Customer> {
  const user = await currentUser();
  if (!user) {
    throw new Error("getOrCreateCustomer called with no signed-in user");
  }

  const email = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!email) {
    throw new Error("Signed-in Clerk user has no primary email address");
  }

  const customer = await db.customer.upsert({
    where: { clerkId: user.id },
    update: {
      email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
    },
    create: {
      clerkId: user.id,
      email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
    },
  });

  return customer;
}
