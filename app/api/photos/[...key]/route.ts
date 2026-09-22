import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getJobPhoto } from "@/lib/r2";

// GET /api/photos/jobs/<jobId>/<photoId>
// Streams a job photo out of the JOB_PHOTOS R2 bucket. Gated on being
// signed in (as either a customer or a contractor) rather than checking
// that the requester specifically owns/won this exact job -- matches the
// original data-URL behavior, where any signed-in dashboard visitor with
// the page open could see the image. Tightening this to a strict
// per-job ownership check is a reasonable follow-up.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await params;
  const r2Key = key.join("/");

  const photo = await getJobPhoto(r2Key);
  if (!photo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(photo.body, {
    headers: {
      "Content-Type": photo.contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
