import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";

// POST /api/contractor/jobs/[jobId]/start — the chosen contractor marks the
// job as started, which begins the 45-minute arrival clock (lib/timing.ts).
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await params;
  const contractor = await getOrCreateContractor();

  const job = await db.job.findUnique({ where: { id: jobId } });
  if (!job || job.chosenContractorId !== contractor.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.status !== "CONTRACTOR_SELECTED") {
    return NextResponse.json(
      { error: "This job can't be started right now" },
      { status: 409 }
    );
  }

  await db.job.update({
    where: { id: job.id },
    data: { status: "IN_PROGRESS", startedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
