import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import { estimateFormSchema } from "@/lib/schemas";

// POST /api/contractor/jobs/[jobId]/estimates — a contractor submits a bid
// on an open job. One estimate per contractor per job.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = estimateFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid estimate", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { jobId } = await params;
  const contractor = await getOrCreateContractor();

  const job = await db.job.findUnique({ where: { id: jobId } });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.status !== "AWAITING_ESTIMATES" && job.status !== "ESTIMATES_RECEIVED") {
    return NextResponse.json(
      { error: "This job isn't open for estimates" },
      { status: 409 }
    );
  }

  const existing = await db.estimate.findFirst({
    where: { jobId: job.id, contractorId: contractor.id },
  });
  if (existing) {
    return NextResponse.json(
      { error: "You already submitted an estimate for this job" },
      { status: 409 }
    );
  }

  await db.$transaction([
    db.estimate.create({
      data: {
        jobId: job.id,
        contractorId: contractor.id,
        amountCents: parsed.data.amountCents,
        message: parsed.data.message || null,
      },
    }),
    db.job.update({
      where: { id: job.id },
      data: {
        status: job.status === "AWAITING_ESTIMATES" ? "ESTIMATES_RECEIVED" : job.status,
      },
    }),
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}
