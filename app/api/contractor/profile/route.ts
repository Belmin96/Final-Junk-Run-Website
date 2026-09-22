import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import { contractorProfileFormSchema } from "@/lib/schemas";

// PATCH /api/contractor/profile — update the contractor's business name/phone.
export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contractorProfileFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid profile details", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const contractor = await getOrCreateContractor();
  const updated = await db.contractor.update({
    where: { id: contractor.id },
    data: {
      businessName: parsed.data.businessName,
      phone: parsed.data.phone || null,
    },
  });

  return NextResponse.json({ contractor: updated });
}
