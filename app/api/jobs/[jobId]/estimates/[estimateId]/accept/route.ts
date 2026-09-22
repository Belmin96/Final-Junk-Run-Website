import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import type { Estimate } from "@prisma/client";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";

// POST /api/jobs/[jobId]/estimates/[estimateId]/accept
// Customer chooses a contractor: the picked estimate is accepted, every
// other estimate on the job is declined, and the job moves to
// CONTRACTOR_SELECTED.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ jobId: string; estimateId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId, estimateId } = await params;
  const customer = await getOrCreateCustomer();

  const job = await db.job.findUnique({
    where: { id: jobId },
    include: { estimates: true },
  });

  if (!job || job.customerId !== customer.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const estimate = job.estimates.find((e: Estimate) => e.id === estimateId);
  if (!estimate) {
    return NextResponse.json({ error: "Estimate not found" }, { status: 404 });
  }

  if (job.chosenContractorId) {
    return NextResponse.json(
      { error: "A contractor has already been selected for this job" },
      { status: 409 }
    );
  }

  await db.$transaction([
    db.estimate.update({
      where: { id: estimate.id },
      data: { status: "ACCEPTED" },
    }),
    db.estimate.updateMany({
      where: { jobId: job.id, id: { not: estimate.id } },
      data: { status: "DECLINED" },
    }),
    db.job.update({
      where: { id: job.id },
      data: {
        chosenContractorId: estimate.contractorId,
        status: "CONTRACTOR_SELECTED",
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
