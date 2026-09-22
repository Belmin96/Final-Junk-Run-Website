import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateContractor } from "@/lib/getOrCreateContractor";
import { arrivalFormSchema } from "@/lib/schemas";
import { distanceMeters, ARRIVAL_RADIUS_METERS } from "@/lib/timing";

// POST /api/contractor/jobs/[jobId]/arrive — GPS arrival verification. The
// contractor's browser reports its current position; this compares it
// against the job's geocoded address (lib/geocode.ts, set at job creation).
//
// A mismatch or missing job coordinates does NOT block the contractor from
// proceeding -- GPS can be inaccurate and geocoding can fail, and a hard
// block here could strand a real job over a false negative. Instead
// arrivalVerified is set to whatever the check found, and the customer's
// job page (components/dashboard/ArrivalStatus.tsx) surfaces a warning when
// it's false so they can follow up if something actually looks wrong.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = arrivalFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Missing or invalid GPS coordinates" },
      { status: 400 }
    );
  }

  const { jobId } = await params;
  const contractor = await getOrCreateContractor();

  const job = await db.job.findUnique({ where: { id: jobId } });
  if (!job || job.chosenContractorId !== contractor.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.status !== "IN_PROGRESS" || !job.startedAt) {
    return NextResponse.json(
      { error: "This job hasn't been started yet" },
      { status: 409 }
    );
  }

  const { lat, lng } = parsed.data;

  let verified = false;
  let distance: number | null = null;
  if (job.latitude != null && job.longitude != null) {
    distance = distanceMeters(job.latitude, job.longitude, lat, lng);
    verified = distance <= ARRIVAL_RADIUS_METERS;
  }

  await db.job.update({
    where: { id: job.id },
    data: {
      arrivedAt: new Date(),
      arrivalLat: lat,
      arrivalLng: lng,
      arrivalVerified: verified,
    },
  });

  return NextResponse.json({ ok: true, verified, distanceMeters: distance });
}
