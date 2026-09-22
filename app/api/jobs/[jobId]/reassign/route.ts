import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import { getArrivalTiming } from "@/lib/timing";

// POST /api/jobs/[jobId]/reassign
// Customer-initiated: once a contractor has gone 45+ minutes past starting
// a job without confirming arrival (see lib/timing.ts), the customer can
// reopen it to other contractors. Resets the job back to AWAITING_ESTIMATES
// and declines the estimate that had been accepted, so a different one can
// be chosen.
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

  const job = await db.job.findUnique({ where: { id: jobId } });
  if (!job || job.customerId !== customer.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.status !== "IN_PROGRESS") {
    return NextResponse.json(
      { error: "This job isn't in a state that can be reopened" },
      { status: 409 }
    );
  }

  const timing = getArrivalTiming(job);
  if (!timing.reassignmentEligible) {
    return NextResponse.json(
      { error: "Not eligible for reassignment yet" },
      { status: 409 }
    );
  }

  await db.$transaction([
    db.estimate.updateMany({
      where: { jobId: job.id, status: "ACCEPTED" },
      data: { status: "DECLINED" },
    }),
    db.job.update({
      where: { id: job.id },
      data: {
        status: "AWAITING_ESTIMATES",
        chosenContractorId: null,
        startedAt: null,
        arrivedAt: null,
        arrivalLat: null,
        arrivalLng: null,
        arrivalVerified: false,
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
