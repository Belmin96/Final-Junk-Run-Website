import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import { jobFormSchema } from "@/lib/schemas";

// GET /api/jobs — list the signed-in customer's jobs.
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await getOrCreateCustomer();
  const jobs = await db.job.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: "desc" },
    include: { estimates: true, payment: true },
  });

  return NextResponse.json({ jobs });
}

// POST /api/jobs — create a new job post (with optional photos) and
// immediately move it into AWAITING_ESTIMATES so contractors can see it.
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = jobFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid job details", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const customer = await getOrCreateCustomer();
  const { photos, ...jobFields } = parsed.data;

  const job = await db.job.create({
    data: {
      customerId: customer.id,
      title: jobFields.title,
      description: jobFields.description,
      pickupAddressLine1: jobFields.pickupAddressLine1,
      pickupAddressLine2: jobFields.pickupAddressLine2 || null,
      city: jobFields.city,
      state: jobFields.state,
      zip: jobFields.zip,
      pickupDate: new Date(jobFields.pickupDate),
      status: "AWAITING_ESTIMATES",
      photos: {
        create: photos.map((p) => ({
          dataUrl: p.dataUrl,
          caption: p.caption || null,
        })),
      },
    },
    include: { photos: true },
  });

  return NextResponse.json({ job }, { status: 201 });
}
