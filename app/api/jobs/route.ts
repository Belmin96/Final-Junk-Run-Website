import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getOrCreateCustomer } from "@/lib/getOrCreateCustomer";
import { jobFormSchema } from "@/lib/schemas";
import { geocodeAddress } from "@/lib/geocode";
import { parseDataUrl } from "@/lib/dataUrl";
import { putJobPhoto } from "@/lib/r2";

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

  // Best-effort geocode so the GPS arrival check has coordinates to compare
  // against later. Doesn't block job creation if it fails/times out.
  const geocoded = await geocodeAddress({
    line1: jobFields.pickupAddressLine1,
    city: jobFields.city,
    state: jobFields.state,
    zip: jobFields.zip,
  });

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
      latitude: geocoded?.latitude ?? null,
      longitude: geocoded?.longitude ?? null,
      status: "AWAITING_ESTIMATES",
    },
  });

  // Photos are uploaded to R2 (not stored as data: URLs in Postgres --
  // see lib/r2.ts) after the job row exists, since the object key is
  // namespaced by job id.
  for (const photo of photos) {
    const parsedPhoto = parseDataUrl(photo.dataUrl);
    if (!parsedPhoto) continue; // already validated by jobPhotoSchema; defensive skip only

    const photoRow = await db.jobPhoto.create({
      data: {
        jobId: job.id,
        r2Key: "", // set below once we know the id
        contentType: parsedPhoto.contentType,
        caption: photo.caption || null,
      },
    });

    const r2Key = `jobs/${job.id}/${photoRow.id}`;
    await putJobPhoto(r2Key, parsedPhoto.bytes, parsedPhoto.contentType);
    await db.jobPhoto.update({ where: { id: photoRow.id }, data: { r2Key } });
  }

  const fullJob = await db.job.findUnique({
    where: { id: job.id },
    include: { photos: true },
  });

  return NextResponse.json({ job: fullJob }, { status: 201 });
}
