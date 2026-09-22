import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";

// POST /api/dev/simulate
// TEMPORARY testing aid: the contractor-side app doesn't exist yet, so
// there is no real way for a job to receive an estimate or move through
// IN_PROGRESS / COMPLETED. This route stands in for that so the full
// customer journey (post job -> estimates -> pick contractor -> track ->
// pay -> review) can be tested end-to-end today.
//
// Disabled outside development. Delete this route once the contractor
// app exists and posts real estimates / status updates.
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { jobId, action } = body ?? {};
  if (!jobId || !action) {
    return NextResponse.json({ error: "Missing jobId or action" }, { status: 400 });
  }

  const customer = await getOrCreateCustomer();
  const job = await db.job.findUnique({ where: { id: jobId } });
  if (!job || job.customerId !== customer.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (action === "submit-estimate") {
    let contractor = await db.contractor.findFirst({
      orderBy: { createdAt: "asc" },
    });
    if (!contractor) {
      contractor = await db.contractor.create({
        data: {
          businessName: "Sample Hauling Co. (test contractor)",
          email: "test-contractor@example.com",
        },
      });
    }

    const amount = 8000 + Math.floor(Math.random() * 12000); // $80–$200 test range

    await db.$transaction([
      db.estimate.create({
        data: {
          jobId: job.id,
          contractorId: contractor.id,
          amountCents: amount,
          message: "Can do this Tuesday or Thursday morning. Two-person crew.",
        },
      }),
      db.job.update({
        where: { id: job.id },
        data: {
          status:
            job.status === "AWAITING_ESTIMATES" ? "ESTIMATES_RECEIVED" : job.status,
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  }

  if (action === "start-progress") {
    if (job.status !== "CONTRACTOR_SELECTED") {
      return NextResponse.json(
        { error: "Pick a contractor before starting the job" },
        { status: 409 }
      );
    }
    await db.job.update({ where: { id: job.id }, data: { status: "IN_PROGRESS" } });
    return NextResponse.json({ ok: true });
  }

  if (action === "complete") {
    if (job.status !== "IN_PROGRESS") {
      return NextResponse.json({ error: "Job isn't in progress" }, { status: 409 });
    }
    await db.job.update({ where: { id: job.id }, data: { status: "COMPLETED" } });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
