import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import { profileFormSchema } from "@/lib/schemas";

// PATCH /api/profile — update the customer's contact/address details.
// Name/email stay owned by Clerk and are synced separately in
// getOrCreateCustomer(); this route only touches fields Clerk doesn't have.
export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = profileFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid profile details", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const customer = await getOrCreateCustomer();
  const d = parsed.data;

  const updated = await db.customer.update({
    where: { id: customer.id },
    data: {
      phone: d.phone || null,
      addressLine1: d.addressLine1 || null,
      addressLine2: d.addressLine2 || null,
      city: d.city || null,
      state: d.state ? d.state.toUpperCase() : null,
      zip: d.zip || null,
    },
  });

  return NextResponse.json({ customer: updated });
}
