import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import { reviewFormSchema } from "@/lib/schemas";

// POST /api/jobs/[jobId]/review
// Leaves a review for the contractor on a completed, paid job, then
// recomputes that contractor's average rating.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await params;
  const body = await request.json().catch(() => null);
  const parsed = reviewFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid review", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const customer = await getOrCreateCustomer();
  const job = await db.job.findUnique({
    where: { id: jobId },
    include: { review: true },
  });

  if (!job || job.customerId !== customer.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  if (job.status !== "COMPLETED") {
    return NextResponse.json({ error: "This job isn't completed yet" }, { status: 409 });
  }
  if (!job.chosenContractorId) {
    return NextResponse.json({ error: "No contractor to review" }, { status: 409 });
  }
  if (job.review) {
    return NextResponse.json({ error: "You've already reviewed this job" }, { status: 409 });
  }

  await db.review.create({
    data: {
      jobId: job.id,
      customerId: customer.id,
      contractorId: job.chosenContractorId,
      rating: parsed.data.rating,
      comment: parsed.data.comment || null,
    },
  });

  const agg = await db.review.aggregate({
    where: { contractorId: job.chosenContractorId },
    _avg: { rating: true },
  });

  await db.contractor.update({
    where: { id: job.chosenContractorId },
    data: { avgRating: agg._avg.rating ?? undefined },
  });

  return NextResponse.json({ ok: true });
}
